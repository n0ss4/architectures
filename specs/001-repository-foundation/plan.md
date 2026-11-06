# Implementation Plan: Repository Foundation

**Branch**: `feat/repository-foundation` | **Date**: 2026-11-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-repository-foundation/spec.md`

## Summary

Create the public `architectures` repository, import `react-microfrontends` and
`angular-microfrontends` as examples with their history rewritten to the new paths, and add the
documentation that makes them comparable: a root README, a microfrontends decision guide and
comparison table, a shared store domain, a decision log, and an example template. Imported projects
only receive the minimal fixes their documented setup needs. See [research.md](./research.md).

## Technical Context

**Language/Version**: Markdown for repository content. Imported examples keep their stacks:
TypeScript with React 18 and Rsbuild, and TypeScript with Angular 17 (`mfe4-app`: Angular 16).

**Primary Dependencies**: Git 2.54 and `git-filter-repo` (run through `uvx`) for the import. No new
runtime dependencies.

**Storage**: N/A

**Testing**: Manual validation scenarios in [quickstart.md](./quickstart.md). Each example uses its
own build commands; no test suite is added.

**Target Platform**: GitHub for the repository; Node.js and modern browsers for the examples.
Node 20 for Angular and Node 24 for React, pinned per example (research R5).

**Project Type**: Documentation repository containing independent runnable examples.

**Performance Goals**: A new reader reaches a relevant example in under 5 minutes (SC-003). Example
performance is not a goal of this feature.

**Constraints**: No repository-wide build tooling (Principle III). No behavior changes to the
examples beyond the fixes in research R4. Publishing and deleting the source repositories require the owner's approval.

**Scale/Scope**: 1 family, 2 examples, 8 runnable apps, 12 imported commits.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Rule | Status | How the plan complies |
|------|--------|-----------------------|
| I. Decisions Over Frameworks | Pass | Content is organized under `microfrontends/`; each example states its question |
| II. One Domain, Many Implementations | Pass | `domain/store/` defines the domain; every example declares its coverage, and Angular declares none |
| III. Self-Contained Examples | Pass | Each example keeps its own dependencies; no root tooling (R7); isolation check in the quickstart |
| IV. Evidence Over Opinion | Pass | Table cells link to proof or read `Not measured`; trial results are not published as measurements |
| V. Explicit Trade-offs | Pass | The template requires when to use, when not to use, trade-offs, and known limitations |
| English only | Pass | The language scan found no Spanish in either project's files or commit messages; new content is in English |
| Directory layout | Pass | Uses `microfrontends/`, `domain/`, `decisions/`, and `specs/` |
| Third-party attribution | Pass | Source comments and credits are kept; undeclared code is listed and excluded (R3) |
| Imported history | Pass | Author, date, and message retained for all commits (R1) |
| Workflow | Pass | Feature started from a specification; `feat/...` branches work with Spec Kit (R6); the first decision record is included |

**Post-design re-check**: Pass, with no violations. The owner chose to request a license from the
upstream author (R3); this affects publication timing and is not a constitutional violation.

## Project Structure

### Documentation (this feature)

```text
specs/001-repository-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── example-readme.md
│   ├── family-page.md
│   ├── decision-record.md
│   └── store-domain.md
├── checklists/
│   └── requirements.md
└── tasks.md             # Created by /speckit-tasks
```

### Source Code (repository root)

```text
architectures/
├── README.md                          # Purpose and links to everything (FR-004)
├── CONTRIBUTING.md                    # Workflow: Spec Kit, decision records, branches
├── LICENSE                            # MIT
├── THIRD_PARTY_NOTICES.md             # Code excluded from the root license
├── .gitignore                         # Keeps .claude/skills/; ignores the rest of .claude/
├── .claude/skills/                    # Spec Kit skills
├── .specify/                          # Spec Kit configuration and constitution
├── specs/                             # Spec Kit features
├── templates/
│   └── example-readme.md              # From contracts/example-readme.md
├── decisions/
│   ├── README.md                      # Index and rules
│   ├── TEMPLATE.md
│   └── 0001-shared-contract-ownership.md
├── domain/
│   └── store/
│       └── README.md
└── microfrontends/
    ├── README.md                      # Decision guide and comparison table
    ├── react-module-federation/       # From react-microfrontends
    │   ├── .nvmrc
    │   ├── host_app/
    │   ├── mfe1_app/
    │   └── mfe2_app/
    └── angular-federation/            # From angular-microfrontends
        ├── .nvmrc
        ├── LICENSE
        ├── docker-compose.yml
        ├── host-app/
        ├── mfe1-app/ to mfe4-app/
        ├── nginx-gateway/
        └── scripts/
```

**Structure Decision**: Imported projects keep their internal structure and app names (such as
`host_app`), which keeps the diff small and the history readable. Their READMEs are reorganized to
follow the template, keeping existing content.

## Implementation Order

Each step depends on the previous one, except that the documentation in steps 3 and 4 can be written
in parallel.

1. **Repository setup**: `git init`, branch, `.gitignore`, and the Spec Kit files, with the Sync
   Impact Report removed from the constitution.
2. **Import and fixes** (User Story 1): import both projects (R1), verify history, then apply the
   fixes in R4 and add `.nvmrc` files (R5).
3. **Verification**: run quickstart checks 2 to 4 and record the results. These results determine
   what each README can state.
4. **Documentation** (User Stories 2 to 4): template and example READMEs, family page, domain,
   decision log, root README, `CONTRIBUTING.md`, `LICENSE`, and `THIRD_PARTY_NOTICES.md`.
5. **Validation**: run quickstart check 5 and `/speckit-converge`.
6. **Publication**: only with owner approval, after the R3 decision (quickstart check 6).

## Complexity Tracking

No constitutional violations to justify.
