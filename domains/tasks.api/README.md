# Tasks API

The Ducks own this system-of-record service. It is intentionally small while the repo proves out Go under Bazel.

## Current route

- `GET /v1/hello?name=Goose`

If `name` is missing or blank, the route falls back to `world`.
