#!/usr/bin/env bash

set -euo pipefail

# --- begin runfiles.bash initialization v2 ---
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
	echo "Expected BUILD_WORKSPACE_DIRECTORY so oxfmt can run from the workspace root." >&2
	exit 1
fi

runner="$(rlocation 'rules_typescript++npm+npm/oxfmt_bin_bin_runner.sh')"
runfiles_root="${RUNFILES_DIR:-${TEST_SRCDIR:-}}"
node_bin="$(grep -m1 '^RUNTIME="' "${runner}" | cut -d'"' -f2)"
entrypoint="${runfiles_root}/_main/tools/format/node_modules/oxfmt/dist/cli.js"

if [[ -z "${runfiles_root}" || -z "${node_bin}" || ! -f "${entrypoint}" ]]; then
	echo "Could not resolve the Bazel-managed oxfmt runtime." >&2
	exit 1
fi

args=()
for arg in "$@"; do
	if [[ "${arg}" == --log-level=* ]]; then
		continue
	elif [[ "${arg}" == -* ]]; then
		args+=("${arg}")
	elif [[ -e "${workspace_root}/${arg}" ]]; then
		args+=("${workspace_root}/${arg}")
	else
		args+=("${arg}")
	fi
done

cd "${workspace_root}"
exec "${runfiles_root}/${node_bin}" "${entrypoint}" "${args[@]}"
