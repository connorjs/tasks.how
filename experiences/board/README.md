# Board Experience

Goose Squadron owns the board experience: the place where task management feels fast, visual, and calm even when the work itself is messy.

This slice starts with a UI-only package because the repository currently needs a clean React + TypeScript story under Bazel more urgently than it needs another backend surface.

## Why the structure looks like this

- `ui/` is the first Goose Squadron deliverable and stays narrow on purpose.
- The UI uses `rules_ts` for type-checking and an explicit esbuild bundle action for the browser artifact.
- Keeping the experience in its own directory leaves room for a future board BFF without forcing front-end concerns back into `common/` or `domains/`.
