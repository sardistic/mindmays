// Authors the far-wall door plates for Classic.
//
// The plates paint doors on the side walls only, so a chamber could never offer a way
// straight on. Rather than invent a doorway and its perspective, this takes the gothic
// window already standing in a chamber's far wall and boards it into a door: the stone
// arch, its scale, its place in the wall and the light falling on it are the original
// painting, and only the glazing is replaced. The leaf is built from the planks, iron
// bands and ring of a door elsewhere in the keep, so every pixel of the graft is the
// same paint as the rest.
//
// Output is 640x480, quantised to 256 colours with dithering, which is the art contract.
// Run with: node scripts/build-far-doors.mjs
import { spawnSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const script = String.raw`
import os, random
from PIL import Image, ImageDraw, ImageFilter

SRC = OUT = "public/assets/classic"
donor = Image.open(os.path.join(SRC, "nursery.png")).convert("RGB")
plank = donor.crop((586, 152, 610, 198))
band  = donor.crop((586, 176, 610, 184))
ring  = donor.crop((582, 198, 604, 226))

def tile(patch, size):
    out = Image.new("RGB", size)
    for ty in range(0, size[1], patch.height):
        for tx in range(0, size[0], patch.width):
            piece = patch
            if (tx // patch.width) % 2: piece = piece.transpose(Image.FLIP_LEFT_RIGHT)
            if (ty // patch.height) % 2: piece = piece.transpose(Image.FLIP_TOP_BOTTOM)
            out.paste(piece, (tx, ty))
    return out

def glazing_mask(plate, box, blue_bias):
    """The opening, found by its blue cast, then filled row by row so the leaded bars and
    mullions inside it belong to the opening too rather than showing through the door."""
    x0, y0, x1, y1 = box
    raw = Image.new("L", plate.size, 0)
    px = plate.load(); rp = raw.load()
    for y in range(y0, y1):
        for x in range(x0, x1):
            r, g, b = px[x, y]
            if b - r > blue_bias: rp[x, y] = 255
    filled = Image.new("L", plate.size, 0)
    fp = filled.load()
    for y in range(y0, y1):
        run = [x for x in range(x0, x1) if rp[x, y]]
        if len(run) < 4: continue
        for x in range(min(run), max(run) + 1): fp[x, y] = 255
    # Trim stray single rows top and bottom, then close the outline.
    filled = filled.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    return filled

def board_up(plate, box, blue_bias, seed, light):
    mask = glazing_mask(plate, box, blue_bias)
    bounds = mask.getbbox()
    if not bounds: return None
    bx0, by0, bx1, by1 = bounds
    w, h = bx1 - bx0, by1 - by0
    leaf = tile(plank, (w, h))

    # Two iron bands across the leaf, and the ring where a hand would fall.
    for fraction in (0.32, 0.74):
        by = int(h * fraction)
        leaf.paste(tile(band, (w, band.height)), (0, by))
    ring_w = max(7, int(w * 0.34))
    scaled = ring.resize((ring_w, max(7, int(ring_w * ring.height / ring.width))), Image.NEAREST)
    leaf.paste(scaled, (int(w * 0.52), int(h * 0.52)))

    # Light falls off toward the arch head, and the reveal darkens the very edge.
    lp = leaf.load()
    rng = random.Random(seed)
    for y in range(h):
        t = y / max(1, h - 1)
        factor = light * (0.74 + 0.34 * t)
        for x in range(w):
            edge = min(x, w - 1 - x)
            if edge < 2: factor_x = 0.55
            elif edge < 4: factor_x = 0.78
            else: factor_x = 1.0
            r, g, b = lp[x, y]
            n = rng.randint(-4, 4)
            lp[x, y] = (max(0, min(255, int(r * factor * factor_x) + n)),
                        max(0, min(255, int(g * factor * factor_x) + n)),
                        max(0, min(255, int(b * factor * factor_x) + n)))

    placed = Image.new("RGB", plate.size)
    placed.paste(leaf, (bx0, by0))
    result = plate.copy()
    result.paste(placed, (0, 0), mask)
    return result, bounds

# plate -> (new name, search box for the glazing, blue bias, light)
PLANS = [
    ("library",    "library-far",    (295, 100, 355, 200), 14, 1.00),
    ("music",      "music-far",      (296, 106, 346, 206), 26, 1.10),
    ("maproom",    "maproom-far",    (285,  88, 355, 206), 14, 0.98),
    ("astronomer", "astronomer-far", (280,  85, 358, 195), 10, 1.04),
    ("alchemist",  "alchemist-far",  (286,  92, 328, 178),  5, 1.06),
]

for index, (source, target, box, bias, light) in enumerate(PLANS):
    plate = Image.open(os.path.join(SRC, source + ".png")).convert("RGB")
    made = board_up(plate, box, bias, 2000 + index, light)
    if not made:
        print("%-18s NO GLAZING FOUND in %s" % (target, box)); continue
    result, bounds = made
    out = result.quantize(colors=256, method=Image.MEDIANCUT, dither=Image.FLOYDSTEINBERG)
    path = os.path.join(OUT, target + ".png")
    out.save(path, optimize=True)
    print("%-18s door at %s  %dx%d palette=%d  %.0f KB" % (
        target, bounds, out.size[0], out.size[1], len(out.getpalette()) // 3, os.path.getsize(path) / 1024))
`;

const directory = mkdtempSync(join(tmpdir(), "wikimaze-art-"));
const file = join(directory, "build.py");
writeFileSync(file, script, "utf8");
process.exitCode = spawnSync("python", [file], { stdio: "inherit" }).status ?? 1;
