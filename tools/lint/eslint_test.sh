#!/usr/bin/env bash
set -euo pipefail

workspace_root="${TEST_SRCDIR}/${TEST_WORKSPACE}"
tool="${workspace_root}/$1"
config="${workspace_root}/$2"
src_root="${workspace_root}/experiences/board/ui/src"

# Run ESLint directly from find so the script stays compatible with Bazel's
# shell launcher on macOS and Linux.
find "${src_root}" \( -name '*.ts' -o -name '*.tsx' \) -type f -exec \
  "${tool}" --max-warnings=0 --config "${config}" {} +
