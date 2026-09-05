# Architecture Decisions

## 2026-08-31 — Production container

- Package the browser game and its WebSocket/Wikipedia proxy as one Node.js container.
- Run as the unprivileged `node` user with a read-only filesystem and no published host ports.
- Expose `/health` for container and deployment verification.
- Keep production orchestration outside the source checkout while retaining a versioned Compose template under `deploy/`.

## 2026-09-01 — Classic trivia rotation

- Keep the authored trivia bank client-side so every question remains inspectable and can link directly to a Wikipedia research subject; generated families live in a separate data module to keep game logic readable.
- Maintain 448 unique Classic prompts, including a statically validated 384-question expansion balanced evenly across four levels.
- Persist a 160-question most-recently-used history in the browser.
- Prefer questions absent from that history; after a filtered subject/level pool is exhausted, recycle its least-recently asked prompt.

## 2026-09-01 — Character irritation memory

- Persist dialogue-choice counts by character and action so inhabitants remember repeated questions across encounters.
- Give the first repeated press and the next two escalation tiers character-specific responses; at the highest tier, intensify the close framing and dialogue chrome without changing controls or blocking play.

## 2026-09-01 — Trivia verification

- Treat Wikipedia article titles as question provenance and keep the Research action attached to the cited article.
- Provide an explicit live audit for all 458 prompts across Classic and Sudden Death that follows Wikipedia normalization and redirects, fails on missing sources, and checks correct-answer wording against the current article text.
- Use full article text only for lead-section misses, request those articles individually to honor the Wikipedia extracts API limit, and retry throttled requests.
- Prefer precise, source-matching wording over potentially ambiguous geography or overly broad scientific claims.

## 2026-09-01 — Classic sound

- Generate the classic edition's ambience and interaction cues with Web Audio so the game does not depend on additional licensed audio assets.
- Keep sound opt-in and persist the player's choice; audio context creation remains tied to a user interaction to respect browser autoplay rules.
- Give navigation, seals, right and wrong answers, objects, people, dialogue, irritation escalation, and route matches distinct cues.
- Keep the Sound control visible at mobile widths, explicitly report on/off/blocked state, and test with a trusted pointer event plus running-context and nonzero-gain assertions.

## 2026-09-01 — Analytics

- Track the walkable, classic, and Sudden Death entry points as one WikiMaze property for `maze.sardistic.com` in the self-hosted Umami instance.
- Load the tracker directly from `analytics.sardistic.com` with Cloudflare script deferral disabled so page views remain reliable behind the tunnel.

## 2026-09-02 — Sudden Death and expanded Classic keep

- Expand Classic to a deterministic, connected 10×10 keep while retaining the deliberately hidden route display and preserving four uninhabited artifact-room plates.
- Add Earth science and language prompt families, expose twelve interest filters, and add two visually distinct inhabitants with close-camera encounters.
- Keep Sudden Death separate from shared Classic progression: it is a linear ten-question, free-text run where a wrong answer ends the attempt without a second choice.
- Treat the final clickable treasure chest as a gateway to Wikipedia's random-article endpoint, making the reward informational rather than an in-game currency grant.
- Keep all ambience procedural and opt-in; Sudden Death intensifies its heartbeat interval with depth, while Classic layers filtered room air, timber movement, and distant bells.

## 2026-09-04 — Classic image fidelity

- Treat 640×480 indexed-color output as part of the Classic art contract, not merely a CSS display effect.
- Match new generated plates to the established astronomer-room rendering language: simplified pre-rendered geometry, hard pixel clusters, restrained color ramps, and visible dithering.
- Require a separately authored alternate-expression close plate for every inhabited Classic room; CSS magnification is not an acceptable substitute for the encounter image.
- Keep full-resolution source renders out of the shipped asset set once a smaller 256-color game plate replaces them.

## 2026-09-04 — Classic flame lives

- Treat wrong seal answers as losses that extinguish exactly one flame while retaining the existing new-question-on-failure behavior.
- When a wrong answer extinguishes the fifth flame, immediately reset score, opened seals, route memory, discoveries, dialogue memory, and position, then restore five flames at Chamber 1.
- Do not apply the automatic run reset when a player voluntarily spends the final flame to reveal the route; route hints and answer losses remain distinct mechanics.

## 2026-09-05 — Title screen and entry points

- Make the root path a title screen rather than a game: the walkable edition moves to `/walk.html`, and `/` presents the wordmark over a darkened keep plate with a period-correct menu.
- Model the menu on 1990s desktop software rather than on modern web navigation: beveled options, one underlined accelerator letter each, arrow-key selection with wrap-around, and a status line that describes the highlighted option.
- Give the accelerator its letter at a word boundary where one exists, so the underline falls on the word the option is named for.
- Let the menu read the same persisted keys the editions write, so it can offer Continue with a live chamber count, report the record in a score card, and set the scholar identity that Classic and the walkable edition already share.
- Route New Quest through `/classic.html?new=1` and let `classic.js` own the reset, rather than duplicating reset logic in the menu; the marker is stripped from the URL so a refresh cannot clear the record twice.
- Share the sound preference key with Classic so enabling ambience at the menu carries into the game.
