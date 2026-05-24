load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")

def _is_same_workspace_source_dep(dep):
    return type(dep) == "string" and dep.startswith("//") and not dep.startswith("//:node_modules/")

def ts_library(
        name,
        srcs,
        deps = [],
        tsconfig = None,
        visibility = None,
        testonly = None,
        tags = [],
        **kwargs):
    types_name = name + "_types"
    forwarded_deps = [dep for dep in deps if not _is_same_workspace_source_dep(dep)]

    ts_project(
        name = types_name,
        srcs = srcs,
        deps = forwarded_deps,
        tsconfig = tsconfig,
        visibility = visibility,
        testonly = testonly,
        tags = tags,
        **kwargs
    )

    js_library(
        name = name,
        srcs = srcs,
        deps = forwarded_deps + [":" + types_name],
        visibility = visibility,
        testonly = testonly,
        tags = tags,
    )
