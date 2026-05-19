# Board Experience

Goose Squadron owns the board experience. The current slice is UI-only while the repo proves out React and TypeScript under Bazel.

## Running the SPA

- Run `bazel build //experiences/board/ui:board_bundle`.
- Open the emitted bundle from `bazel-bin/experiences/board/ui/board_bundle_bundle/`, or serve that directory with any static file server if you want browser routing and assets to behave exactly as they will in deployment.
