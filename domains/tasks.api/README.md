# Tasks API

The Ducks own the system-of-record for tasks, projects, and workflow state.

This service is intentionally small right now.
Its first job is not to model the whole business domain.
Its first job is to prove that the new Bazel-based Go toolchain is easy to understand, easy to test, and easy to extend without leaking platform details into product code.

## Why this domain exists

- `cmd/tasksapi` hosts the executable entry point and keeps process concerns close to startup code.
- `hello/` contains the first vertical slice so feature logic can grow by capability instead of by technical layer.
- The `GET /v1/hello` route demonstrates the contract shape we want for future domain APIs: tiny handler, explicit query parsing, and a test that locks behavior down.

## Current route

- `GET /v1/hello?name=Goose`

If `name` is missing or blank, the route falls back to `world`.
