import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { WebSocketServer, WebSocket } from "ws";

const root = fileURLToPath(new URL("./public/", import.meta.url));
const port = Number(process.env.PORT) || 4173;
const clients = new Map();
const roomDoors = new Map();
const roomPassages = new Map();
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

function safeText(value, fallback, maxLength = 32) {
  const text = typeof value === "string" ? value.trim().slice(0, maxLength) : "";
  return text || fallback;
}

async function wikipediaSummary(title) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    origin: "*",
    redirects: "1",
    prop: "extracts|info|pageimages",
    exintro: "1",
    explaintext: "1",
    inprop: "url",
    pithumbsize: "640",
    titles: title,
  });
  const response = await fetch(`https://en.wikipedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": "WikiMaze/0.1 (educational browser game)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Wikipedia returned ${response.status}`);
  const data = await response.json();
  const page = Object.values(data.query?.pages || {})[0];
  if (!page || page.missing !== undefined) throw new Error("Article not found");
  return {
    title: page.title,
    extract: page.extract,
    url: page.fullurl,
    pageId: page.pageid,
    thumbnail: page.thumbnail?.source || null,
  };
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname === "/health") {
      response.writeHead(200, { "Content-Type": mimeTypes[".json"], "Cache-Control": "no-store" });
      response.end(JSON.stringify({ status: "ok" }));
      return;
    }
    if (url.pathname === "/api/wiki") {
      const title = safeText(url.searchParams.get("title"), "Wikipedia", 100);
      const article = await wikipediaSummary(title);
      response.writeHead(200, { "Content-Type": mimeTypes[".json"], "Cache-Control": "public, max-age=3600" });
      response.end(JSON.stringify(article));
      return;
    }

    const requested = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const normalized = normalize(requested).replace(/^(\.\.(\/|\\|$))+/, "");
    let filePath = join(root, normalized);
    let info = await stat(filePath).catch(() => null);
    if (info?.isDirectory()) filePath = join(filePath, "index.html");
    if (!info) filePath = join(root, "index.html");
    const content = await readFile(filePath);
    response.writeHead(200, { "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream" });
    response.end(content);
  } catch (error) {
    const status = request.url?.startsWith("/api/") ? 502 : 404;
    response.writeHead(status, { "Content-Type": mimeTypes[".json"] });
    response.end(JSON.stringify({ error: error.message }));
  }
});

const wss = new WebSocketServer({ server, path: "/multiplayer" });

function broadcastRoom(room) {
  const players = [...clients.values()]
    .filter((client) => client.room === room)
    .map(({ id, name, color, x, y, angle, score }) => ({ id, name, color, x, y, angle, score }));
  const payload = JSON.stringify({ type: "players", players });
  for (const [socket, client] of clients) {
    if (client.room === room && socket.readyState === WebSocket.OPEN) socket.send(payload);
  }
}

wss.on("connection", (socket) => {
  const id = crypto.randomUUID();
  clients.set(socket, { id, room: "great-hall", name: "Scholar", color: "#e9b95c", x: 3.5, y: 3.5, angle: 0, score: 0 });
  socket.send(JSON.stringify({ type: "welcome", id }));

  socket.on("message", (raw) => {
    try {
      const message = JSON.parse(raw.toString());
      const player = clients.get(socket);
      if (!player) return;
      if (message.type === "join") {
        player.room = safeText(message.room, "great-hall", 40).replace(/[^a-zA-Z0-9_-]/g, "");
        player.name = safeText(message.name, "Scholar", 20);
        player.color = /^#[0-9a-f]{6}$/i.test(message.color) ? message.color : player.color;
        socket.send(JSON.stringify({ type: "doorState", doors: [...(roomDoors.get(player.room) || [])] }));
        socket.send(JSON.stringify({ type: "passageState", passages: [...(roomPassages.get(player.room) || [])] }));
      }
      if (message.type === "state") {
        if (Number.isFinite(message.x)) player.x = Math.max(.5, Math.min(60.5, Number(message.x)));
        if (Number.isFinite(message.y)) player.y = Math.max(.5, Math.min(60.5, Number(message.y)));
        if (Number.isFinite(message.angle)) player.angle = Number(message.angle);
        if (Number.isFinite(message.score)) player.score = Math.max(0, Math.min(999999, Number(message.score)));
      }
      if (message.type === "unlock" && typeof message.doorId === "string" && /^f\d+-\d+-\d+$/.test(message.doorId)) {
        if (!roomDoors.has(player.room)) roomDoors.set(player.room, new Set());
        roomDoors.get(player.room).add(message.doorId);
        const payload = JSON.stringify({ type: "doorUnlocked", doorId: message.doorId, by: player.name });
        for (const [peer, client] of clients) {
          if (client.room === player.room && peer.readyState === WebSocket.OPEN) peer.send(payload);
        }
      }
      if (message.type === "passage" && typeof message.passageId === "string" && /^p\d+-\d+-\d+$/.test(message.passageId) && typeof message.open === "boolean") {
        if (!roomPassages.has(player.room)) roomPassages.set(player.room, new Map());
        roomPassages.get(player.room).set(message.passageId, message.open);
        const payload = JSON.stringify({ type: "passageChanged", passageId: message.passageId, open: message.open });
        for (const [peer, client] of clients) {
          if (client.room === player.room && peer.readyState === WebSocket.OPEN) peer.send(payload);
        }
      }
      broadcastRoom(player.room);
    } catch {
      // Ignore malformed client messages.
    }
  });

  socket.on("close", () => {
    const room = clients.get(socket)?.room;
    clients.delete(socket);
    if (room) broadcastRoom(room);
  });
});

server.listen(port, () => {
  console.log(`WikiMaze is running at http://localhost:${port}`);
});
