# Tools

Cerberus owns repo-wide tooling that is not product behavior.

The root Bazel files define shared toolchains and formatter entry points. The `tools/` tree holds validation helpers and Bazel adapter rules for tools that need source-workspace execution semantics.

This directory intentionally contains support code rather than product code.
If a file here starts influencing product behavior directly, it probably belongs in a domain or experience instead.
