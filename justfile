default: gazelle build format test

build:
    bazel build //...

format:
    bazel run //:format

gazelle:
    bazel run //:gazelle

setup:
    bazel run //:bazel_env

test:
    bazel test //...
