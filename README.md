# WikiMaze

A browser-based, multiplayer knowledge maze inspired by the atmosphere and discovery loop of classic encyclopedia games. WikiMaze uses an original retro archive aesthetic, free movement, live Wikipedia summaries, and shared expeditions.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

Open `http://localhost:4173` for the walkable edition or `http://localhost:4173/classic.html` for the fixed-view point-and-click edition. To meet a friend, both players enter the same room name under **Expedition settings**. Add `?room=your-room` to a shared URL to prefill it.

## Current vertical slice

- A separate classic edition with 64 fixed-view chambers, fourteen original period-rendered room plates (including four entirely unoccupied object chambers), painted-door navigation, return and turn-around controls, and a compact 1990s encyclopedia-game interface
- Every uncleared door carries a knowledge seal backed by 64 Wikipedia-linked questions across four levels; a persisted recent-question memory replaces failed prompts and delays repeats, while room artifacts, ten inhabitants with uncanny alternate close-up encounters, focused object examination, a normally blank route grid, score card progress, and room-level multiplayer presence round out the classic edition

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
