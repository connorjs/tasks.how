#!/usr/bin/env bash
set -euo pipefail

workspace_root="${TEST_SRCDIR}/${TEST_WORKSPACE}"
tool="${workspace_root}/$1"

# Keep the lint helper shell-portable so Bazel's launcher does not need to
# preserve Bash-only builtins such as mapfile.
find "${workspace_root}" \( -name '*.bzl' -o -name 'BUILD.bazel' \) -type f -exec "${tool}" -mode=check {} +
"${tool}" -mode=check \
  "${workspace_root}/MODULE.bazel" \
  "${workspace_root}/REPO.bazel"
