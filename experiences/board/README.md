# Board Experience

Goose Squadron owns the board experience: the place where task management feels fast, visual, and calm even when the work itself is messy.

This slice starts with a UI-only package because the repository currently needs a clean React + TypeScript story under Bazel more urgently than it needs another backend surface.

## Why the structure looks like this

- `ui/` is the first Goose Squadron deliverable and stays narrow on purpose.
- The UI uses `rules_typescript`, so Oxc, tsgo, and Vite share one Bazel-native contract instead of drifting into separate local tools.
- Keeping the experience in its own directory leaves room for a future board BFF without forcing front-end concerns back into `common/` or `domains/`.

## Running the SPA

- Run `bazel build //experiences/board/ui:board_bundle`.
- Open the emitted bundle from `bazel-bin/experiences/board/ui/board_bundle_bundle/`, or serve that directory with any static file server if you want browser routing and assets to behave exactly as they will in deployment.
