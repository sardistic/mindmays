# WikiMaze

A browser-based, multiplayer knowledge maze inspired by the atmosphere and discovery loop of classic encyclopedia games. WikiMaze uses an original retro archive aesthetic, free movement, live Wikipedia summaries, and shared expeditions.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

Open `http://localhost:4173` for the title screen and its menu, which leads to `/classic.html` (the fixed-view point-and-click edition), `/walk.html` (the walkable first-person edition), and `/sudden.html` (the one-life typed-answer challenge). To meet a friend, both players enter the same room name under **Expedition settings**. Add `?room=your-room` to a shared URL to prefill it.

## Current vertical slice

- A 1990s CD-ROM title screen at the root: a darkened keep plate behind the wordmark and a beveled menu of eight options with underlined accelerator letters, arrow-key and mouse selection, and a Windows-style status line describing the highlighted option
- The menu opens all three editions, remembers a quest in progress as **Continue the Quest** with its chamber count, confirms **New Quest** before clearing the record, and carries in-window panels for the scholar identity, instructions, a score card, and credits
- A separate classic edition with 100 connected fixed-view chambers, sixteen original period-rendered room plates (including four entirely unoccupied object chambers), painted-door navigation, return and turn-around controls, and a compact 1990s encyclopedia-game interface
- Every uncleared door carries a knowledge seal backed by over 10,000 unique Wikipedia-linked prompts across four levels and twelve selectable areas of interest; a persisted 160-question memory replaces failed prompts and delays repeats, while twelve inhabitants remember repeated dialogue choices and grow visibly irritated when pestered
- The left, forward and right doors open onto the chambers actually to your left, ahead and right, and the route board draws the chambers you have walked with every opened seal marked on the edge between them
- Each level is a different wing of the keep with its own chambers, inhabitants and one offer of its own: a candle stub that relights a match, a star chart, a ledger that buys a seal, or a page that narrows the next question
- A chamber can answer the seal in front of it — "Ask the room" strikes out one wrong answer in the inhabitant's voice for a quarter of the lore, and seals prefer questions in the room's own subject
- Wrong Classic answers extinguish one of the five flames and the seal then asks an easier question; every fourth seal opened relights a match, and losing the fifth returns you to the main menu with the run cleared
- Sudden Death is a distinct one-path challenge: ten progressively deeper free-text questions, no multiple-choice answers, no retries after a wrong submission, escalating procedural ambience, and a final treasure-chest passage into Wikipedia
- `npm run audit:questions` resolves every cited article across both modes and checks each distinct source-and-answer claim against the current article text. A missing article fails the audit, and so does any unsupported claim. A short reviewed list in `scripts/question-audit-allowlist.json` records the claims that are true but unquotable — an answer written as a description, or a datum that lives in an infobox the extracts API strips — and the audit fails if an entry there no longer matches the bank
- User-gated procedural sound has an unmistakable activation chime, layered low-frequency room air, occasional timber shifts and distant bells, door movement, knowledge seals, answer feedback, match strikes, object tones, close-encounter drones, and increasingly harsh irritation cues; the control remains visible on mobile

- Free-moving, textured raycast castle with keyboard and touch controls
- Deterministic 10×10 hidden floors built from one hundred five-by-five chambers, with proper doorways and escalating difficulty
- Door-gated timed trivia across four difficulty ranks and ten knowledge domains
- Live Wikipedia research inside questions, plus article-linked magical paintings
- Five limited cartographer flames that reveal the route for eight seconds
- Six original illustrated inhabitants: archivist, jester, spectral cartographer, Bell Widow, Brother Moth, and the Measurer
- Rare atmospheric anomalies: unreliable compass readings, altered portraits, distant apparitions, whispers, and optional procedural ambience
- Furnished room rendering with warm plaster, carved oak paneling, libraries, tapestries, tiled or carpeted floors, coffered ceilings, tables, lecterns, globes, benches, chandeliers, and arched windows
- Persistent 20,000-lore campaign, multiplayer presence, shared keep rooms, and cooperative door unlocking

## Direction

The game deliberately avoids Encarta names, art, maps, text, and other protected assets. The design target is the broader feeling of wandering through a mysterious educational maze. A production version should add authored themed wings, better question generation and moderation, accounts/progression, accessibility options, authoritative multiplayer state, and Wikipedia attribution/license details for retained content.
