# Decision Log

Records of architectural choices, including their context and alternatives, so the reasoning stays visible.

## Index

| Number | Title | Status |
|--------|-------|--------|
| [0001](./0001-shared-contract-ownership.md) | Ownership of contracts shared between a host and its remotes | Proposed |

## When a record is required

Write a record for any choice that constrains more than one example, or that is costly to reverse. Exceptions to the [constitution](../.specify/memory/constitution.md) also need one.

## How to add a record

1. Copy [`TEMPLATE.md`](./TEMPLATE.md) to `decisions/NNNN-kebab-case-title.md`, using the next four-digit number. Numbers are never reused.
2. Fill it in, with the status `Proposed`.
3. Add it to the index above.
4. Change the status to `Accepted` once the decision is made.

## Superseding a record

Keep the old record. Change its status to `Superseded by NNNN`, linking to its replacement, and link back from the new record.

```text
Proposed → Accepted → Superseded by NNNN
```
