import WebSocket from "ws";

const room = `passage-smoke-${Date.now()}`;
const url = "ws://localhost:4173/multiplayer";

function connect() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    socket.once("open", () => resolve(socket));
    socket.once("error", reject);
  });
}

function waitFor(socket, predicate, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { socket.off("message", onMessage); reject(new Error("Timed out waiting for multiplayer state")); }, timeout);
    const onMessage = (raw) => {
      const message = JSON.parse(raw.toString());
      if (!predicate(message)) return;
      clearTimeout(timer); socket.off("message", onMessage); resolve(message);
    };
    socket.on("message", onMessage);
  });
}

const sockets = [];
try {
  const first = await connect(), second = await connect(); sockets.push(first, second);
  first.send(JSON.stringify({ type: "join", room, name: "First Scholar", color: "#e9b95c" }));
  second.send(JSON.stringify({ type: "join", room, name: "Second Scholar", color: "#70a0b8" }));
  await new Promise((resolve) => setTimeout(resolve, 100));

  const changed = waitFor(second, (message) => message.type === "passageChanged" && message.passageId === "p1-6-3");
  first.send(JSON.stringify({ type: "passage", passageId: "p1-6-3", open: true }));
  if (!(await changed).open) throw new Error("Live shifting-passage update did not preserve its open state");

  const late = await connect(); sockets.push(late);
  const state = waitFor(late, (message) => message.type === "passageState");
  late.send(JSON.stringify({ type: "join", room, name: "Late Scholar", color: "#8c7860" }));
  const snapshot = await state;
  if (!snapshot.passages.some(([id, open]) => id === "p1-6-3" && open === true)) throw new Error("Late joiner did not inherit shifting-passage state");
  console.log("multiplayer=ok live-passage-sync=ok late-join-state=ok");
} finally {
  sockets.forEach((socket) => socket.close());
}
