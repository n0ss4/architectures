# Architectures Constitution

## Core Principles

### I. Decisions Over Frameworks

The repository MUST be organized by architectural approach, never by framework. React, Angular,
and any other technology appear only as implementations of an approach. Every example MUST state
the architectural question it answers.

Rationale: frameworks age quickly; the reasoning behind an architecture is what readers can reuse.

### II. One Domain, Many Implementations

Examples that are compared with each other MUST implement the shared domain defined in
`domain/`. An example MAY implement a subset of that domain, but it MUST declare which parts it
covers. It MUST NOT redefine the behavior or contracts of the parts it covers.

Rationale: when the domain is constant, differences between examples can be attributed to the
architecture rather than to the use case.

### III. Self-Contained Examples

Each example MUST own its dependencies and MUST install, build, and run from its own directory.
Examples MUST NOT import code from other examples. Repository-wide build orchestration MUST NOT be
added unless an accepted decision record justifies it.

Rationale: readers must be able to copy one example without taking the rest, and examples must be
free to use different tool and framework versions.

### IV. Evidence Over Opinion

Every comparative claim MUST link to a measurement, a runnable example, or a cited source.
Published measurements MUST record the date, the tool versions, and the commands needed to
reproduce them. Anything not yet measured MUST be labeled as not measured.

Rationale: a comparison that cannot be reproduced cannot be trusted or kept up to date.

### V. Explicit Trade-offs

Every approach MUST document when to use it, when not to use it, and what it costs. No approach
may be presented as the universal default. Known limitations of an example MUST be recorded rather
than hidden.

Rationale: knowing when an architecture does not fit is as valuable as knowing how to build it.

## Repository Standards

- All repository content MUST be written in English, including documentation, specifications,
  decision records, code, comments, commit messages, and branch names.
- Architecture families MUST live in top-level directories (for example, `microfrontends/`), with
  one subdirectory per example.
- Shared domain definitions MUST live in `domain/`; decision records MUST live in `decisions/`;
  Spec Kit feature artifacts MUST live in `specs/`.
- Every example README MUST follow the repository's example template.
- Third-party code MUST keep its license notices and source attribution.
- Imported projects MUST keep their Git history.

## Development Workflow

- Every new example, family, or cross-cutting change MUST start with a Spec Kit specification.
  Small fixes, including documentation corrections and dependency updates, MAY skip it.
- A choice that constrains more than one example, or that is costly to reverse, MUST be recorded
  as a numbered decision record. A superseded record MUST be kept and linked to its replacement.
- Branches MUST use a Conventional Commits type and a short kebab-case description (for example,
  `feat/repository-foundation`), overriding Spec Kit's numbered branch names. Commit messages MUST
  follow Conventional Commits.
- Before merging, every affected example MUST pass its documented install and build commands, and
  every affected README and comparison entry MUST be up to date.

## Governance

This constitution takes precedence over other project practices. Amendments MUST be made through a
pull request that explains the change and updates any affected content.

Versions follow semantic versioning: MAJOR for removing or redefining a principle, MINOR for adding
a principle or section or materially expanding guidance, and PATCH for wording fixes. Every pull
request review MUST check compliance with this constitution, and any justified exception MUST be
recorded in a decision record.

**Version**: 1.0.0 | **Ratified**: 2026-11-07 | **Last Amended**: 2026-11-07
