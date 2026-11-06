# Contract: Decision Record

`decisions/README.md` MUST index every record and explain when one is required, as defined by the
constitution. `decisions/TEMPLATE.md` MUST contain this format.

```markdown
# NNNN. <Title>

**Status**: Proposed | Accepted | Superseded by [NNNN](./NNNN-title.md)
**Date**: YYYY-MM-DD

## Context
The problem and the constraints, with links to the code or evidence.

## Options considered
Each option with its advantages and costs.

## Decision
The choice, stated in one or two sentences.

## Consequences
What becomes easier, what becomes harder, and any follow-up work.
```

## First record

`decisions/0001-shared-contract-ownership.md` MUST start with status `Proposed`, because the owner
has not yet chosen an option. Changing the React example remains out of scope.

Its context MUST state these facts about the React example:

- `host_app` exposes `./types` and `./products` to its remotes.
- `mfe1_app` and `mfe2_app` import from `host_app/types`, and `mfe1_app` imports from
  `host_app/products`.
- The host also consumes both remotes, so the host and remotes depend on each other.

Its options MUST include at least keeping host ownership, moving contracts to a shared versioned
package, and defining contracts in `domain/` with each app implementing them locally.
