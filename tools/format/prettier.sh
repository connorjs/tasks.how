#!/usr/bin/env bash

set -euo pipefail

# --- begin runfiles.bash initialization v2 ---
# Copy-pasted from the Bazel Bash runfiles library v2.
f=bazel_tools/tools/bash/runfiles/runfiles.bash
source "${RUNFILES_DIR:-/dev/null}/$f" 2>/dev/null || \
  source "$(grep -sm1 "^$f " "${RUNFILES_MANIFEST_FILE:-/dev/null}" | cut -f2- -d' ')" 2>/dev/null || \
  source "$0.runfiles/$f" 2>/dev/null || \
  source "$(grep -sm1 "^$f " "$0.runfiles_manifest" | cut -f2- -d' ')" 2>/dev/null || \
  source "$(grep -sm1 "^$f " "$0.exe.runfiles_manifest" | cut -f2- -d' ')" 2>/dev/null || \
  {
    echo >&2 "ERROR: cannot find $f"
    exit 1
  }
f=
# --- end runfiles.bash initialization v2 ---

runfiles_export_envvars

workspace_root="${BUILD_WORKSPACE_DIRECTORY:-}"
if [[ -z "${workspace_root}" ]]; then
	echo "Expected BUILD_WORKSPACE_DIRECTORY so Prettier can run from the workspace root." >&2
	exit 1
fi

runner="$(rlocation 'rules_typescript++npm+npm/prettier_bin_bin_runner.sh')"
runfiles_root="${RUNFILES_DIR:-${TEST_SRCDIR:-}}"

if [[ -z "${runfiles_root}" ]]; then
	echo "Expected RUNFILES_DIR or TEST_SRCDIR so the Prettier entrypoint can be resolved." >&2
	exit 1
fi

node_bin="$(grep -m1 '^RUNTIME="' "${runner}" | cut -d'"' -f2)"
entrypoint="$(grep -m1 '^ENTRY="' "${runner}" | cut -d'"' -f2)"

if [[ -z "${node_bin}" || -z "${entrypoint}" ]]; then
	echo "Could not resolve the rules_typescript Prettier runtime from ${runner}." >&2
	exit 1
fi

cd "${workspace_root}"
exec "${runfiles_root}/${node_bin}" "${runfiles_root}/${entrypoint}" "$@"
