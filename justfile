# Runs ci-build-like recipes
default: gazelle build format test

# Runs build (no tests)
build:
    bazel build //...

# Formats code
format:
    bazel run //:format

# Updates BUILD files (runs gazelle)
gazelle:
    bazel run //:gazelle

# Runs tests (includes build)
test:
    bazel test //...
