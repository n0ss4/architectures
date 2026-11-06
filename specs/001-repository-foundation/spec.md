# Feature Specification: Repository Foundation

**Feature Branch**: `feat/repository-foundation`

**Created**: 2026-11-07

**Status**: Draft

**Input**: User description: "Create a single public architecture reference repository that consolidates the existing `react-microfrontends` and `angular-microfrontends` projects, organizes content by architectural decision instead of framework, and gives every example a shared domain and a comparable format."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consolidate the Existing Projects (Priority: P1)

As the repository owner, I want both existing microfrontend projects to live in one repository, with their history intact, so that all future architecture work has a single home.

**Why this priority**: Every other story depends on this content, and it delivers the owner's core goal even if nothing else ships.

**Independent Test**: Clone the repository, confirm that both projects are present under the microfrontends family, inspect their history, and run each project using only its own README.

**Acceptance Scenarios**:

1. **Given** the two source projects, **When** the consolidation is complete, **Then** each one exists as its own example under the microfrontends family.
2. **Given** a consolidated example, **When** the owner inspects its history, **Then** every commit from the source project's default branch is present with its original author, date, and message, and a file's history can be viewed from its new path.
3. **Given** a fresh clone, **When** a developer follows an example's README, **Then** the example installs, builds, and starts without files from any other example.
4. **Given** the source projects' license and attribution notices, **When** the consolidation is complete, **Then** those notices are preserved.

---

### User Story 2 - Find and Evaluate an Approach (Priority: P2)

As a developer choosing a microfrontend approach, I want one entry point that compares the available options and explains when each one fits, so that I can make an informed choice without reading every example.

**Why this priority**: This is the repository's main value to outside readers, but it needs the consolidated examples to point to.

**Independent Test**: Give a developer who is new to the repository a project scenario and confirm that they can reach a relevant example, and its stated trade-offs, from the root README alone.

**Acceptance Scenarios**:

1. **Given** the root README, **When** a reader opens it, **Then** it explains the repository's purpose and lists every architecture family and example.
2. **Given** the microfrontends family page, **When** a reader describes their constraints, **Then** the decision guide leads them to one or more suitable approaches.
3. **Given** any example, **When** a reader opens its README, **Then** it covers the same sections in the same order: question answered, when to use it, when not to use it, trade-offs, domain coverage, how to run it, and known limitations.
4. **Given** the comparison table, **When** a value has not been measured, **Then** it is labeled as not measured.

---

### User Story 3 - Compare Examples Through a Shared Domain (Priority: P3)

As an example author, I want one definition of the store domain, so that new and existing examples can be compared on the same behavior.

**Why this priority**: It makes fair comparison possible and sets the rules for later work, but readers can already benefit from the first two stories without it.

**Independent Test**: Give an author only the domain documentation and confirm that they can list the required entities, user flows, and events for a store example without reading any example's code.

**Acceptance Scenarios**:

1. **Given** the domain documentation, **When** an author reads it, **Then** it defines the product catalog, cart, and checkout: their entities, user flows, and the events exchanged between them.
2. **Given** an existing example, **When** a reader checks its README, **Then** it states which parts of the domain it covers and which it does not.

---

### User Story 4 - Record Architectural Decisions (Priority: P4)

As the repository owner, I want a lightweight decision record format, so that the reasoning behind each architectural choice stays visible and reviewable.

**Why this priority**: It protects long-term value but does not block the initial consolidation.

**Independent Test**: Read the decision log and confirm that the first decision can be understood, including its context, options, and consequences, without any other document.

**Acceptance Scenarios**:

1. **Given** the decision log, **When** the owner adds a decision, **Then** a documented template and numbering rule define its format and location.
2. **Given** the foundation is complete, **When** a reader opens the decision log, **Then** it contains a first record on who owns contracts shared between a host and its remotes, using the current host-owned types and data as the problem statement.
3. **Given** a superseded decision, **When** a reader opens it, **Then** it remains available and links to its replacement.

### Edge Cases

- If a source project has files that would collide with repository-level files (for example, `README.md`, `LICENSE`, or `.gitignore`), the project's files stay inside its example directory and are not merged into the root.
- If a source project cannot install, build, or start with its documented steps, the failure is recorded under the example's known limitations rather than hidden, and the consolidation is not reported as verified for that example.
- If the source projects use different package managers or runtime versions, each example keeps its own and documents them.
- If a source project has no license file of its own, the repository-level license applies to it.
- If imported code is adapted from a third party that has not declared a license, the repository-level license does not cover that code; the affected files are listed in a third-party notice.
- If a source project has branches other than its default branch, they are not merged; they are kept as unmerged branches in this repository, and the example's known limitations link to them.
- If an example covers only part of the shared domain, or none of it (for example, a project that demonstrates only integration mechanisms), the README says so explicitly; the example is not excluded.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The repository MUST organize content by architecture family, with a microfrontends family as the first entry.
- **FR-002**: The repository MUST include `react-microfrontends` and `angular-microfrontends` as separate examples, retaining all commits from each source project's default branch with their original author, date, and message, and keeping per-file history viewable from the new paths.
- **FR-003**: Each example MUST install, build, and run independently of the other examples.
- **FR-004**: The root README MUST explain the repository's purpose and link to every family, the shared domain, the decision log, and the contribution workflow.
- **FR-005**: The microfrontends family page MUST include a decision guide based on reader constraints and a comparison table of the available examples.
- **FR-006**: Every comparative value in the comparison table MUST link to its evidence or be labeled as not measured.
- **FR-007**: The repository MUST provide an example README template, and every example MUST follow it.
- **FR-008**: The repository MUST define a shared store domain covering the product catalog, cart, and checkout: entities, user flows, and events.
- **FR-009**: Every example README MUST declare its coverage of the shared domain.
- **FR-010**: The repository MUST provide a decision record template and numbering rule.
- **FR-011**: The decision log MUST include a first record on the ownership of contracts shared between a host and its remotes.
- **FR-012**: The repository MUST preserve existing license notices and third-party source attribution, and MUST state its own license at the root.
- **FR-013**: All new repository content MUST be in English.
- **FR-014**: After the new repository is published and verified, and any unmerged branches are preserved in it, the source repositories MUST be deleted. Deletion requires the owner's explicit approval.

### Key Entities

- **Architecture Family**: A group of related approaches, such as microfrontends. Has a page containing its decision guide and comparison table, and contains one or more examples.
- **Example**: A runnable implementation of an approach. Belongs to one family, follows the example template, and declares its domain coverage.
- **Shared Domain**: The technology-neutral definition of the store's entities, user flows, and events that examples implement.
- **Decision Record**: A numbered record of an architectural choice, with its context, options considered, decision, consequences, and status. It may be superseded by a later record.
- **Comparison Entry**: One example's values for the family's comparison criteria. Each value links to evidence or is labeled as not measured.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the commits on each source project's default branch are present in the new repository with their original author, date, and message.
- **SC-002**: 100% of consolidated examples either install, build, and start from a fresh clone using only their own README, or have the failure recorded under known limitations.
- **SC-003**: A developer new to the repository can reach a relevant example and its trade-offs from the root README in under 5 minutes.
- **SC-004**: 100% of example READMEs contain every section of the template, including domain coverage.
- **SC-005**: 100% of values in the comparison table link to evidence or are labeled as not measured.
- **SC-006**: Every example, the domain, and the decision log can be reached from the root README in no more than 2 links.

## Assumptions

- The repository is a public reference, intended primarily for developers evaluating architectures; it is also where the owner's own experiments will be documented (confirmed by the owner on 2026-11-07).
- The repository is named `architectures` and is hosted on the owner's GitHub account (confirmed by the owner on 2026-11-07).
- The repository uses the MIT license, matching `angular-microfrontends` and the license stated in the `react-microfrontends` README, which has no license file (confirmed by the owner on 2026-11-07). Third-party code without a declared license is excluded from it.
- The store domain is derived from the existing React project, which already implements the catalog and checkout flows.
- This feature does not change the behavior of the consolidated projects, beyond the minimal fixes needed for their documented setup steps to work from a fresh clone.
- Out of scope, as separate future features: adapting the Angular example to the store domain, removing the host-owned contracts from the React example, building a mixed React and Angular example, adding non-microfrontend families, and collecting a full set of comparative measurements.
