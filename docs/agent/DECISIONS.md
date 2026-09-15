# Architecture Decisions

## 2026-09-14 — Entries domain and canonical identity

- Rename the public game from WikiMaze to Entries and make `https://entries.page/` its sole canonical origin.
- Permanently redirect every path and query on `maze.sardistic.com` to the equivalent location on `entries.page`; redirect `www.entries.page` to the apex as well.
- Keep the existing `wikimaze-*` local-storage keys and JavaScript debug hooks as implementation identifiers so the rebrand does not introduce an unnecessary state migration or test rewrite.
- Publish explicit canonical, description, Open Graph, Twitter, VideoGame structured data, robots, and sitemap metadata. Unknown paths return a real 404 instead of the title screen to avoid soft-404 indexing.

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

## 2026-09-05 — Classic navigation, wings and the route map

- Doors correspond to the chambers they open onto, and a passage is only ever drawn where the plate paints a door. The plates paint the side walls, so the left and right hotspots carry the exits at `facing-1` and `facing+1` and nothing else. Superseded by the 2026-09-05 turning decision below, which is what makes the other exits reachable.
- The route board is no longer hidden. It draws the chambers you have walked and marks, on the shared edge between two cells, every seal you have opened — so the map and the painted doors describe the same keep. A match still reveals the next useful chamber.
- Each level is a different wing of the keep with its own chambers, inhabitants and offer, rather than only a difficulty setting. The four wings between them use all sixteen authored plates.
- Every wing carries one choice, available in about a third of its chambers and only once each: a candle stub that relights a match, a star chart that holds the route open, a ledger that buys the next seal for 400 lore, and an unwritten page that narrows the next question.
- New chambers reuse the sixteen authored 640×480 plates rather than shipping unauthored art; the 2026-09-04 image-fidelity decision still governs any genuinely new room.

## 2026-09-05 — Making a run survivable

- A wrong answer still costs a flame, but every fourth seal opened relights one, so a long run can recover from mistakes.
- After a wrong answer the seal asks again one difficulty level lower, so a stuck door eases rather than hardening.
- Losing the fifth flame ends the run and returns the player to the main menu with a notice, instead of silently resetting them in place.
- The keep no longer makes unprompted noises. The ambience bed and the event cues remain; the timer that fired random bells, timbers and room tones was removed from both the menu and Classic.

## 2026-09-05 — Rooms that answer the seal

- Each chamber plate declares an affinity of question categories. When the player has not narrowed the subject themselves, a seal prefers questions in the room's own subject, so the room and the question are about the same thing.
- "Ask the room" strikes out one wrong answer and says so in the voice of the chamber's inhabitant, or of its central object when the chamber is empty. It costs a quarter of the seal's lore; research still costs half, and the two stack.

## 2026-09-05 — A ten-thousand-question bank

- The bank is stored as families of facts rather than finished questions. A fact is one row of `[clue, Wikipedia article, answer]`, and a family declares the forms that turn a row into a question, so one verified fact supplies several prompts and the shipped data stays small enough to read and correct.
- Two forms are synthesised rather than written out: `describe` adds the recognition question to a family whose clue is a description, and `identify` adds the naming question to a family whose answer is one.
- A reversed question may never offer a second true answer: every other clue sharing the same answer is barred from that question's options, and the bank check proves it for every reversed prompt.
- The audit works on distinct source-and-answer claims rather than on every phrasing, because the bank is far larger than the set of articles behind it.

## 2026-09-05 — What the question audit can and cannot prove

- The audit's guarantee is now stated precisely, because at ten thousand questions the old blanket claim was not true. Every cited article must resolve. Every claim whose answer is the encyclopedia's own — a name, a place, a date, a symbol, a formula in prose — must appear in the article text.
- A mirror question asserts no new fact. When a family declares `describe` or `identify`, the synthesised second form restates the family's fact from the other side, and its "answer" is our description. The audit checks that fact once, in the direction where the answer is quotable, and marks the mirror `authored`.
- British and American spellings are folded before comparison, so "pernicious anaemia" is not reported as unsupported against "pernicious anemia".
- What remains is a short list of claims that are true but unquotable: an answer written as a description for the player, or a datum that lives in an infobox the extracts API strips, such as a chemical formula or an orbital period. These are read by hand and recorded in `scripts/question-audit-allowlist.json` with the date they were reviewed.
- The allow-list is checked in both directions. Any weak claim absent from it fails the audit, and any entry in it that no longer matches a claim in the bank also fails, so the list cannot quietly rot as the bank changes.
- This is a real reduction in what the audit proves for those entries, and it is written down rather than hidden behind a clean number.

## 2026-09-05 — Cache headers for deployed code

- The origin sent no `Cache-Control` at all, so the edge applied its own four-hour default to scripts, styles and artwork. Markup is served dynamically, so every deployment put fresh HTML in front of up to four hours of stale JavaScript. That is what made the first chamber look like a dead end after a deploy.
- Code — HTML, JavaScript, CSS and JSON — is now served `no-cache` with an ETag derived from the file's size and modification time, and conditional requests are answered with 304, so revalidation is cheap and a deployment is visible immediately.
- Artwork is served `public, max-age=604800`; it is large, it changes rarely, and a replacement can carry a new filename or a cache-busted check.
- The edge honours this and now reports `REVALIDATED` rather than `HIT`, so a deployment is visible at once. It still rewrites the browser's directive to four hours, which is a zone setting this project cannot reach from the host; setting Browser Cache TTL to "Respect Existing Headers" in Cloudflare would remove the need for what follows.
- Until then, each page's own script and stylesheet are stamped as the page is served with a version taken from that file's modification time, so a returning player gets a new URL exactly when the file changes and the same URL when it does not. Stamps are read once per process, which matches a deployment recreating the container.

## 2026-09-07 — A keep that needs no turning

- Turning is removed. The keep is built so that the two painted doors are always enough.
- The geometry that forces this: the plates paint doors on the left and right walls, which are opposite one another, so a chamber can only ever show two exits when those exits are opposite. Requiring every exit to be a door on entry would cap every chamber at two exits and reduce the keep to a corridor with no forks.
- What is required instead is weaker and sufficient: a chamber is entered facing the way you travelled, so its doors show the exits perpendicular to the one you came through. The keep is walkable with doors alone exactly when every exit of every chamber has a perpendicular companion. That forbids one shape only — a chamber whose exits are a single opposite pair, entered facing two blank walls. Corners, tees and crossroads all survive, so the keep still forks.
- The generator opens a perpendicular wall wherever that shape appears, repeating because opening a wall changes the neighbour too, and the seed is chosen so the result reaches all one hundred chambers through painted doors alone. The keep that ships has no dead ends, twenty-eight corners, fifty-six tees and sixteen crossroads, and two doors are offered on 42% of entries.
- A chamber may still hold an exit that is not a door on this particular approach; it becomes one when the chamber is approached from another side, and the route board shows it meanwhile. What is guaranteed is that no approach ever faces two blank walls and that every chamber is reachable without turning, both asserted by the smoke test.
- This replaces the quarter-turn decision taken earlier the same week, which solved the same mismatch by asking the player to turn rather than by building a keep that does not need it.

## 2026-09-07 — Doors in the far wall

- Five chambers now offer a way straight on, so a fork can be three ways rather than two.
- The art was made by boarding up a window rather than inventing a doorway. Five plates already carried a face-on gothic window in the far wall, so the glazing is replaced with a planked leaf and the original stone arch is kept. Its scale, perspective, place in the wall and the light falling on it are the original painting; only the opening changes. The leaf's planks, iron bands and ring are lifted from a door elsewhere in the keep, so every pixel of the graft is paint that already existed here.
- `scripts/build-far-doors.mjs` is the authoring step. It finds the opening by its blue cast, fills each row between the outer edges so the leaded bars belong to the opening, then boards it. Output is 640x480 quantised to 256 colours with dithering, which is the standing art contract.
- The hotspot is stored as a rectangle on the painting and mapped through `object-fit: cover` when the chamber is drawn, because the plate is cropped to fill the frame and a percentage would drift with the window. Where the crop puts part of a door off screen the hotspot is clamped, and a door left too small to click is not offered.
- Far doors are a bonus, not a dependency. The keep is still generated so that the two side doors alone reach all one hundred chambers, so a far door only ever adds a route. Which chambers have one depends on the wing, since the plate does.


## 2026-09-07 — The seal waits for the reader

- Answers no longer advance on a timer. The seal shows what was right and why, and a single Continue button carries the player on; Enter and Space do the same, and the hint and encyclopedia controls are disabled while it stands so the only thing to do is read and go.
- The button says what it does rather than "Continue": "Walk through" when the door opens, "Try again" when a match is lost but the run goes on, "Leave the keep" when the last one is out. A player who looks up mid-sentence can still tell what happened from the button alone.
- The timer was there so the game kept moving. Nothing moves without the player now, which is the right default for a game whose whole content is text worth reading.

## 2026-09-07 — Keeping the record

- The best run is persisted in `wikimaze-classic-best` and is deliberately not cleared by the reset that follows a lost run. Everything else — score, opened seals, route, discoveries, dialogue memory, position — is.
- Losing the last match now reports the record and the rank it earned on the menu's notice, so the run ends with something kept rather than only with what was taken. The score card shows it beside the current run, and the menu's rank is read from the record rather than the run in progress.

## 2026-09-07 — What the bank is for

- Thirteen families were removed: the NATO alphabet, animal noises and animal young, collective nouns, proverbs, the names of small things, city and state nicknames, sport slang, star signs, phobias, unit abbreviations and kitchen items. They were rote lookup or playground trivia — the answer is a convention to be memorised, not a fact an encyclopedia establishes — and they made the keep feel like a quiz book rather than a library.
- The bank was backfilled to the same size with `public/questions/substance.js`: scientific works and who wrote them, what Nobel laureates were recognised for, what treaties settled, the rivers cities stand on, medical advances, the ideas philosophers are known for, engineering feats and archaeological finds. Every fact still cites a Wikipedia article and is still checked by the audit.
- The test is whether an educated reader would be glad to learn the answer. A convention with no reason behind it fails it however well-cited it is.
