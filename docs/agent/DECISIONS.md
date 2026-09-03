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
