# Tools

Cerberus owns the repo-wide tooling surface.

That means two things for this migration:

1. The root of the repository defines the platform contract: Bazel version, module graph, caches, and shared language toolchains.
2. The `tools/` tree defines the developer ergonomics layered on top of that contract: formatters, linters, and future code generation workflows.

This directory intentionally contains support code rather than product code.
If a file here starts influencing product behavior directly, it probably belongs in a domain or experience instead.
