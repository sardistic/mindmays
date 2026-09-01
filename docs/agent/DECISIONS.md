# Architecture Decisions

## 2026-08-31 — Production container

- Package the browser game and its WebSocket/Wikipedia proxy as one Node.js container.
- Run as the unprivileged `node` user with a read-only filesystem and no published host ports.
- Expose `/health` for container and deployment verification.
- Keep production orchestration outside the source checkout while retaining a versioned Compose template under `deploy/`.
