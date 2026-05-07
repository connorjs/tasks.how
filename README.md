# tasks.how

A “distributed” Task Management system for my own experimentation.

_Note: This monorepo approach results from desire for simplicity for experimentation,
rather than “a monorepo is the right decision for this.”_

## Build system

The repository now treats Bazel 9 as the primary build system for all new work.

That choice exists for a few reasons:

- Cerberus needs one place to express shared toolchains, linting, formatting, and CI behavior.
- The Ducks and Goose Squadron should be able to add Go and React code without inventing separate local build conventions.
- Bazelisk gives contributors a lightweight launcher, while `.bazelversion` keeps the actual Bazel version pinned.

### Current language posture

- `Go` is wired into Bazel today and used by the new Ducks-owned `domains/tasks.api` service.
- `React + TypeScript` is wired into Bazel today with `rules_js`, `rules_ts`, esbuild-based browser bundling, ESLint, and Prettier.
- `C# / .NET` remains in the repository, but Bazel integration for it is intentionally deferred for now.

### Quick start

1. Install Bazelisk.
2. Run `bazel build //...`.
3. Run `bazel test //...`.
4. Run `bazel run //:format` to apply repo formatting.
5. Run `bazel run //:format.check` to verify formatting without editing files.
6. Run `bazel run //:gazelle` after changing Go package layout.

## Directory structure

The repository’s follows an “Organize by feature, not by layer” strategy
that emphasizes vertical slicing where it makes sense.
It intentionally does not use a team-based directory structure,
which can simplify ownership change.

At the root, we have the following directories.

- `common` - Shared packages used across teams.
- `domains` - System-of-record services and core backend logic.
- `experiences` - End-user experiences or product areas that pair a BFF with its corresponding UI.
- `teams` - ADRs and team-specific documentation (no code).
- `tools` - Developer tools and scripts.

### Common directory

Contains all cross-cutting code that are **not owned by a single domain or experience**.
Consider everything here as _infrastructure-level_ or _shared dependency_ code:
reusable, versioned, and stable.

Common code follows these design principles.

- Shared code MUST NOT import from domains or experiences.
- Changes here ripple across the entire system: prefer explicit versioning.
- Avoid “miscellaneous utils” - if something is only used in one place, keep it local.
- Treat `/common` as the **foundation layer** for all other directories.

### Domains directory

System-of-record services and core backend logic.

Each domain represents a **bounded context** in the system and owns the following.

1. Core business models and invariants.
2. APIs for authoritative access (OpenAPI contracts).
3. Background workers, projections, or event processors.
4. Domain-level events and schema definitions.

Domains expose stable interfaces through contracts.
Other services or experiences consume them via generated clients.

### Experiences directory

Vertical “feature slices” that pair a BFF (Backend for Frontend) with its corresponding UI.

Each subdirectory represents an end-user experience or product area.
These directories combine all the code that changes together for a given feature.

The following shows the typical project pattern.

- `*.bff` - A backend shaped for UI consumption, regardless of implementation language.
- `*.ui` - A React + TypeScript front-end application.
- Shared view models and API clients are defined locally or imported from generated packages.

This structure keeps feature and UI layers co-located,
promoting vertical ownership and faster iteration.

### Teams directory

Documentation of ownership, architectural decisions, and context for each team.

Each team has its own directory that may contain the following.

- `README.md` - Describes mission, boundaries, and responsibilities.
- `adrs/` - Lightweight architecture decision records.
- `references/` - Links to design docs, dashboards, or specs.

This folder is **documentation-only**; it does not contain any executable code.

### Tools directory

Utility scripts and developer tools that support automation, validation, and code generation.

Today this includes Bazel-facing tooling such as formatter and linter entry points.
Over time it is also where client generation, contract validation, and repo-wide automation should live.

- `generate-clients.ps1` - Generates API and event clients for C# and TypeScript.
- `validate-contracts.ps1` - Ensures OpenAPI and event schemas are well-formed.
- `sync-version.ps1` - Keeps package and assembly versions aligned across projects.

This directory contains **no application logic**.
It only contains supporting utilities used during development or CI.

## Team structure

This repository envisions a 6-team organization building a Task Management system.
Each team has its own root directory for ADRs and other documentation.

- 🐢 Bowser Works: **Admin & Web Shell**
- 🐕 Cerberus: **Builder Tools & Platform**
- 🦆 The Ducks: **Core Tasks & Projects**
- 🪿 Goose Squadron: **Tasks & Board Experience**
- 🐆 Lynx: **Search**
- 🐦 The Magpies: **Collaboration & Notifications**

### 🐢 Bowser Works

> Browser Just Works™.

Owns the web shell, global navigation, onboarding, admin dashboard, and workspace management.
Hosts and stitches micro-frontends from other teams.

(Full-stack + Cross-cutting UX)

### 🐕 Cerberus

> Guard the gates. Power the forge.

Provides shared DevEx tooling, API Platform kit, CI/CD scaffolds, Aspire orchestration,
observability defaults, and the Automation API for RPA/AI/MCP integrations.

Cross-cutting principles (telemetry, security, style guide) are governed jointly
with a shared **Architecture Working Group**.

(Platform / Enablement)

### 🦆 The Ducks

> Keep it in a row.
>
> _We keep your ducks in a row._

Owns the core domain models (Tasks, Projects, Board structure, workflows).
Defines the system of record (authoritative persistence and domain events).
Ensures data integrity, migrations, and partitioning strategy.

(Backend-only)

### 🪿 Goose Squadron

> Flight-ready flow.
>
> _Formation within chaos. Clarity amid noise._

Delivers the interactive task board (Kanban/Scrum/List/Calendar/Timeline) and related UX.
Shapes board-optimized view models in its own BFF.

(Front-end focused, plus BFF)

### 🪶 The Magpies

> Smart chatter. Sharp signal.
>
> _We make the noise worth hearing._

Manages comments, mentions, activity feeds, notifications, and realtime updates.
Provides BFF and UI for collaboration features.

(Full-stack)

### 🐆 Lynx

> See everything. Find anything.
>
> _Fast. Focused. Found._

Builds and maintains the OpenSearch indexing pipeline, global and scoped queries, and search UI.
Responsible for relevance, facets, and query performance.

(Full-stack)

### Team notes

- The Magpies, Lynx, Goose Squadron, and Bowser Works each own a distinct **UI + BFF** pairing,
  which enables independent deploys and type-safe contracts.

## What the repo contains now

- `domains/tasks.api`
  A Ducks-owned Go API that exposes `GET /v1/hello?name=...` via `chi`.
- `experiences/board/ui`
  A Goose Squadron React + TypeScript board shell that is type-checked by `rules_ts` and bundled by esbuild under Bazel.
- `tools/format` and `tools/lint`
  Cerberus-owned repo tooling entry points for Prettier, Buildifier, and ESLint.

## Why the Bazel setup looks like this

- `MODULE.bazel` is fully Bzlmod-native because Bazel 9 removed `WORKSPACE`.
- `rules_go` and Gazelle handle Go compilation and dependency discovery from `go.mod`.
- `rules_js` owns Node and npm graph integration so JavaScript tools run under Bazel instead of beside it.
- `rules_ts` is used for TypeScript type-checking so the compiler contract is explicit in the build graph.
- `rules_lint` provides the shared formatter surface, including multitool-backed formatting for Starlark and Go.
- `REPO.bazel` and `.bazelignore` make the workspace Bazel-9-friendly without leaning on legacy `WORKSPACE` conventions.
- `.bazelversion` keeps Bazelisk and direct Bazel users aligned on one repo-tested Bazel 9 release.
