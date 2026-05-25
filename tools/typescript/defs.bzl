load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")

def ts_library(
        name,
        srcs,
        deps = [],
        tsconfig = None,
        visibility = None,
        testonly = None,
        tags = [],
        **kwargs):
    """
    Macro that produces a `js_library` (`${name}`) and a `ts_project` (`${name}_types`) for the given sources.
    Automatically configures the correct dependencies for `js_library` (the given deps) and `ts_project` (the types of the given deps).

    The `js_library` includes native TypeScript sources.
    The `ts_project` includes the generated `.d.ts` files.
    """

    types_name = name + "_types"

    js_library(
        name = name,
        srcs = srcs,
        deps = deps + [":" + types_name],
        visibility = visibility,
        testonly = testonly,
        tags = tags,
    )

    ts_project(
        name = types_name,
        srcs = srcs,
        deps = [_types_dep(dep) for dep in deps],
        tsconfig = tsconfig,
        visibility = visibility,
        testonly = testonly,
        tags = tags,
        **kwargs
    )

def _is_external_dep(dep):
    """Returns true if the given dep is an external dependency."""

    # Note: This is heuristically valid for THIS repository only. Copiers: Beware.
    return type(dep) != "string" or not dep.startswith("//") or dep.startswith("//:")

def _types_dep(dep):
    """Returns the types dependency for the given dep."""
    if _is_external_dep(dep):
        return dep
    if ":" not in dep:
        fail("ts_library local deps must use explicit labels, got %r" % dep)
    return dep + "_types"
