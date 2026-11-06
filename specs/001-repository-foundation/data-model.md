# Data Model: Repository Foundation

The repository stores documents rather than runtime data, so these entities describe content and
how it is validated. The store's own entities are in
[contracts/store-domain.md](./contracts/store-domain.md).

## Architecture Family

| Field | Rule |
|-------|------|
| Location | `<family>/` at the repository root, in kebab-case |
| Page | `<family>/README.md`, following [family-page.md](./contracts/family-page.md) |
| Examples | One or more subdirectories |

The root README MUST link to every family.

## Example

| Field | Rule |
|-------|------|
| Location | `<family>/<example>/`, in kebab-case, naming the technology and the approach |
| README | Follows [example-readme.md](./contracts/example-readme.md) |
| Runtime | Declared in the example's `.nvmrc`, or the equivalent for its stack |
| Domain coverage | One of `full`, `partial`, or `none` for each of catalog, cart, and checkout |
| Isolation | Installs, builds, and runs from its own directory, importing nothing from other examples |

Initial instances:

| Example | Source | Coverage |
|---------|--------|----------|
| `microfrontends/react-module-federation` | `react-microfrontends` | Catalog, cart, and checkout |
| `microfrontends/angular-federation` | `angular-microfrontends` | None |

## Comparison Entry

One table row per example, within its family page.

| Field | Rule |
|-------|------|
| Example | Links to the example |
| Fact values | Link to the file that proves them |
| Measured values | Link to a measurement with its date, tool versions, and commands, or read `Not measured` |

An empty cell is invalid.

## Decision Record

| Field | Rule |
|-------|------|
| Location | `decisions/NNNN-kebab-case-title.md` |
| Number | Next four-digit number; numbers are never reused |
| Status | `Proposed`, `Accepted`, or `Superseded by NNNN` |
| Sections | Follows [decision-record.md](./contracts/decision-record.md) |

```text
Proposed → Accepted → Superseded by NNNN
```

A superseded record is kept and links to its replacement. The replacement links back.

## Third-Party Notice

| Field | Rule |
|-------|------|
| Location | `THIRD_PARTY_NOTICES.md` at the repository root |
| Entry | Upstream URL, its license status, and the affected file paths |
| Effect | Listed files are excluded from the root license unless the entry states otherwise |
