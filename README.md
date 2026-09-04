# WikiMaze

A browser-based, multiplayer knowledge maze inspired by the atmosphere and discovery loop of classic encyclopedia games. WikiMaze uses an original retro archive aesthetic, free movement, live Wikipedia summaries, and shared expeditions.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm start
```

Open `http://localhost:4173` for the walkable edition, `http://localhost:4173/classic.html` for the fixed-view point-and-click edition, or `http://localhost:4173/sudden.html` for the one-life typed-answer challenge. To meet a friend, both players enter the same room name under **Expedition settings**. Add `?room=your-room` to a shared URL to prefill it.

## Current vertical slice

- A separate classic edition with 100 connected fixed-view chambers, sixteen original period-rendered room plates (including four entirely unoccupied object chambers), painted-door navigation, return and turn-around controls, and a compact 1990s encyclopedia-game interface
- Every uncleared door carries a knowledge seal backed by 448 unique Wikipedia-linked prompts across four levels and twelve selectable areas of interest; a persisted 160-question memory replaces failed prompts and delays repeats, while twelve inhabitants remember repeated dialogue choices and grow visibly irritated when pestered
- Wrong Classic answers extinguish one of the five flames; questions continue changing while a flame remains, and losing the fifth automatically resets score, opened seals, route memory, and discoveries
- Sudden Death is a distinct one-path challenge: ten progressively deeper free-text questions, no multiple-choice answers, no retries after a wrong submission, escalating procedural ambience, and a final treasure-chest passage into Wikipedia
- `npm run audit:questions` resolves all 458 cited prompts across both modes and checks each correct answer against the current article text; missing or weakly evidenced entries fail the audit
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
