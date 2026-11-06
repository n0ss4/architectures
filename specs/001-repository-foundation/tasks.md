---

description: "Task list for the repository foundation feature"
---

# Tasks: Repository Foundation

**Input**: Design documents from `/specs/001-repository-foundation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: The spec does not request automated tests. Verification uses the scenarios in `quickstart.md`.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: The user story the task belongs to (US1 to US4)
- Paths are relative to the repository root

## Execution Rules

- Run shell steps with `bash`. Word splitting differs in zsh.
- Use Conventional Commits and add no attribution trailers or links to commit messages.
- Commit after each task or logical group, on `feat/repository-foundation`.
- Do not create a GitHub repository, push, edit a source repository, or archive anything without the owner's explicit approval. Phase 8 holds all of these steps.
- Record what you actually observe. A failed check goes in `specs/001-repository-foundation/verification.md` and the example's known limitations; do not mark that example as verified.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Git repository and commit the Spec Kit project

- [X] T001 Run `git init -b main` in the repository root, create an empty root commit with `git commit --allow-empty -m "chore: initialize repository"`, and run `git switch -c feat/repository-foundation`
- [X] T002 Create `.gitignore` at the repository root that ignores `.claude/*` except `.claude/skills/`, plus `node_modules/`, `dist/`, and `.DS_Store`
- [X] T003 Remove the Sync Impact Report HTML comment from the top of `.specify/memory/constitution.md`, leaving version 1.0.0 unchanged
- [X] T004 Confirm with `git status --ignored` that nothing under `.claude/` other than `.claude/skills/` will be committed, then commit `.gitignore`, `.claude/skills/`, `.specify/`, and `specs/` as `chore: add Spec Kit project and foundation specification`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Bring the imported content into the repository, since every story documents or verifies it

**⚠️ CRITICAL**: The later phases cannot begin until both imports are verified

- [X] T005 In a new `mktemp -d` directory, run `git clone --single-branch --branch main https://github.com/n0ss4/react-microfrontends.git react`, record its `HEAD` SHA, and in that clone run `uvx git-filter-repo --to-subdirectory-filter microfrontends/react-module-federation --force`
- [X] T006 In the same temporary directory, run `git clone --single-branch --branch main https://github.com/n0ss4/angular-microfrontends.git angular`, record its `HEAD` SHA, and in that clone run `uvx git-filter-repo --to-subdirectory-filter microfrontends/angular-federation --force`
- [X] T007 From the repository root, fetch `main` from the rewritten React clone and run `git merge --no-ff --allow-unrelated-histories FETCH_HEAD` with the subject `chore: import react-microfrontends` and a body naming the source URL and the SHA from T005, creating `microfrontends/react-module-federation/`
- [X] T008 From the repository root, fetch `main` from the rewritten Angular clone and run `git merge --no-ff --allow-unrelated-histories FETCH_HEAD` with the subject `chore: import angular-microfrontends` and a body naming the source URL and the SHA from T006, creating `microfrontends/angular-federation/`
- [X] T009 Run quickstart check 1 against fresh source clones and record the result in `specs/001-repository-foundation/verification.md`: 0 of 4 React and 0 of 8 Angular commits missing by `%an|%ae|%aI|%s`, and `git log` and `git blame` working on `microfrontends/react-module-federation/README.md` and `microfrontends/angular-federation/README.md`

**Checkpoint**: Both projects are in the repository with their history

---

## Phase 3: User Story 1 - Consolidate the Existing Projects (Priority: P1) 🎯 MVP

**Goal**: Both projects work from a fresh clone using only their own READMEs, with their licensing clear

**Independent Test**: Clone the repository, inspect both examples' history, and run each example using only its README (quickstart checks 1 to 4)

### Minimal fixes (research R4)

- [X] T010 [P] [US1] Replace the root-level `pnpm install` step in `microfrontends/react-module-federation/README.md` with an install in each of `host_app`, `mfe1_app`, and `mfe2_app`, and commit as `docs(react): fix install steps`
- [X] T011 [P] [US1] Run `pnpm install` in `microfrontends/react-module-federation/mfe2_app` to generate `microfrontends/react-module-federation/mfe2_app/pnpm-lock.yaml`, and commit it as `chore(react): add missing mfe2 lockfile`
- [X] T012 [P] [US1] Add `mkdir -p logs .pids` after the `cd` to the project root in `microfrontends/angular-federation/scripts/dev/start.sh`, and commit as `fix(angular): create runtime directories in start script`

### Runtime pinning (research R5)

- [X] T013 [P] [US1] Create `microfrontends/react-module-federation/.nvmrc` with `24`; if T017 fails only because of this version, pin the version that passes and record why in `specs/001-repository-foundation/verification.md`
- [X] T014 [P] [US1] Create `microfrontends/angular-federation/.nvmrc` with `20`

### Licensing (FR-012)

- [X] T015 [P] [US1] Create the root `LICENSE` with the MIT license text and `Copyright (c) 2025-2026 n0ss4`, leaving `microfrontends/angular-federation/LICENSE` in place
- [X] T016 [P] [US1] Create `THIRD_PARTY_NOTICES.md` with an entry for `https://github.com/manfredsteyer/mf-nf-poc`, stating that upstream declared no license as of 2026-11-07, that the listed files are excluded from the root license, and listing `microfrontends/angular-federation/host-app/src/app/shared/starts-with.ts`, `microfrontends/angular-federation/host-app/src/app/shared/federation-helpers.ts`, and `microfrontends/angular-federation/host-app/src/app/wrapper/wrapper.component.ts`

### Verification from a fresh clone

Run T017 to T021 in a temporary `git clone --branch feat/repository-foundation` of the local repository, and record every result in `specs/001-repository-foundation/verification.md`.

- [X] T017 [US1] Using only `microfrontends/react-module-federation/README.md` and its `.nvmrc`, install and build all 3 apps, start them, and at `http://localhost:3000` confirm that the catalog loads, a product can be added to the cart, and placing an order empties the cart
- [X] T018 [US1] Using only `microfrontends/angular-federation/README.md` and its `.nvmrc`, install and build `host-app`, `mfe1-app`, `mfe2-app`, `mfe3-app`, and `mfe4-app`
- [X] T019 [US1] Run `microfrontends/angular-federation/scripts/dev/start.sh`, confirm ports 4200 to 4204 respond and the host loads each remote in a browser, then confirm `scripts/dev/stop.sh` stops them
- [X] T020 [US1] Run `scripts/prod/build-all.sh` and then `docker compose up -d --build` in `microfrontends/angular-federation`, confirm the host is served through the gateway on port 80, then run `docker compose down`
- [X] T021 [US1] In a temporary copy, delete `microfrontends/angular-federation` and rebuild the React example, then restore it, delete `microfrontends/react-module-federation`, and rebuild the Angular example, confirming that the results do not change
- [X] T022 [US1] Commit `specs/001-repository-foundation/verification.md` and the T013 to T016 files, and confirm that every failure found in T017 to T021 is listed for inclusion in the example's known limitations

**Checkpoint**: User Story 1 is complete; both projects are consolidated, and their state is known

---

## Phase 4: User Story 2 - Find and Evaluate an Approach (Priority: P2)

**Goal**: A reader can move from the root README to a suitable example and its trade-offs

**Independent Test**: A developer new to the repository reaches a relevant example and its trade-offs from the root README alone (quickstart check 5)

- [X] T023 [US2] Create `templates/example-readme.md` from the template in `specs/001-repository-foundation/contracts/example-readme.md`
- [X] T024 [P] [US2] Reorganize `microfrontends/react-module-federation/README.md` to follow `templates/example-readme.md`, keeping existing content; under known limitations, include the `mfe2_app` `TYPE-001` log error, the `host_app/src/store/index.ts` export of the missing `useCounterStore`, the hotlinked product images, the host and remote mutual dependency, and any failures from `specs/001-repository-foundation/verification.md`; set Domain coverage to `Not yet assessed` until T029
- [X] T025 [P] [US2] Reorganize `microfrontends/angular-federation/README.md` to follow `templates/example-readme.md`, keeping existing content and the `mf-nf-poc` credits; under known limitations, include Node 20's end-of-life status, the Angular 16 `mfe4-app`, a link to `https://github.com/n0ss4/angular-microfrontends/tree/auth-example`, and any failures from `specs/001-repository-foundation/verification.md`; set Domain coverage to `Not yet assessed` until T030
- [X] T026 [US2] Create `microfrontends/README.md` per `specs/001-repository-foundation/contracts/family-page.md`, with an overview, a decision guide that also states when no approach fits, a comparison table with both examples, and an examples list; fact cells link to proof, and measured cells read `Not measured`; "An empty cell is invalid"
- [X] T027 [US2] Create the root `README.md` with the repository's purpose and links to `microfrontends/README.md`, both examples, `domain/store/README.md`, `decisions/README.md`, `CONTRIBUTING.md`, `LICENSE`, and `THIRD_PARTY_NOTICES.md`, so that every example, the domain, and the decision log are at most 2 links away
- [X] T028 [P] [US2] Create `CONTRIBUTING.md` describing the constitution's workflow: when a Spec Kit specification and a decision record are required, branch and commit naming, and the checks required before merging

**Checkpoint**: User Story 2 is complete; links to the domain and decision log resolve once US3 and US4 are done

---

## Phase 5: User Story 3 - Compare Examples Through a Shared Domain (Priority: P3)

**Goal**: One technology-neutral store definition, with each example's coverage declared

**Independent Test**: Using only the domain documentation, an author can list the required entities, flows, and events (quickstart check 5)

- [X] T029 [US3] Create `domain/store/README.md` per `specs/001-repository-foundation/contracts/store-domain.md`; compare flows 1 to 5 against `microfrontends/react-module-federation/host_app/src/store/useCartStore.ts`, `microfrontends/react-module-federation/mfe1_app/src/components/ProviderComponent.tsx`, and `microfrontends/react-module-federation/mfe2_app/src/components/Checkout.tsx`; then set the Domain coverage table in `microfrontends/react-module-federation/README.md`, using "One of `full`, `partial`, or `none` for each of catalog, cart, and checkout" and listing any differences, including how the example transports logical events
- [X] T030 [US3] Set catalog, cart, and checkout to `none` in the Domain coverage table in `microfrontends/angular-federation/README.md`, explain that this example demonstrates integration mechanisms, and update the coverage column in `microfrontends/README.md` for both examples

**Checkpoint**: User Story 3 is complete

---

## Phase 6: User Story 4 - Record Architectural Decisions (Priority: P4)

**Goal**: A decision log with a template, rules, and a first record

**Independent Test**: The first record can be understood without any other document (quickstart check 5)

- [X] T031 [P] [US4] Create `decisions/TEMPLATE.md` from the format in `specs/001-repository-foundation/contracts/decision-record.md`, with status "`Proposed`, `Accepted`, or `Superseded by NNNN`"
- [X] T032 [P] [US4] Create `decisions/0001-shared-contract-ownership.md` with status `Proposed` and the required facts and options from `specs/001-repository-foundation/contracts/decision-record.md`, linking to `microfrontends/react-module-federation/host_app/module-federation.config.ts`, `microfrontends/react-module-federation/mfe1_app/src/components/ProviderComponent.tsx`, and `microfrontends/react-module-federation/mfe2_app/src/components/Checkout.tsx`; do not change the example
- [X] T033 [US4] Create `decisions/README.md` indexing record 0001 and stating when a record is required, the location `decisions/NNNN-kebab-case-title.md`, that the "Number" is the "Next four-digit number; numbers are never reused", and that a superseded record is kept and links to its replacement

**Checkpoint**: All user stories are complete

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete repository

- [X] T034 Run the automatable parts of quickstart check 5 across `README.md`, `CONTRIBUTING.md`, `THIRD_PARTY_NOTICES.md`, `microfrontends/`, `domain/`, and `decisions/`: no broken relative links, depth of at most 2 links, all template sections in order, no empty comparison cells, all new content in English, licensing files and credits present, and no Sync Impact Report; fix what fails
- [X] T035 Run `/speckit-converge` and complete any tasks it appends to `specs/001-repository-foundation/tasks.md`
- [X] T036 Record in `specs/001-repository-foundation/verification.md` that the SC-003 reader test still needs a developer new to the repository, then report the final state of the `feat/repository-foundation` branch to the owner

**Checkpoint**: The repository is complete locally and ready for the owner's review

---

## Phase 8: Publication (Owner Approval Required)

**Purpose**: Publish and retire the sources. **Stop before each task and get explicit approval; do not treat earlier approvals as covering it.**

- [X] T037 Owner asks the upstream author of `mf-nf-poc` to add a license or grant permission, or explicitly accepts publishing with the exclusion alone; record the outcome in `THIRD_PARTY_NOTICES.md`
- [ ] T038 Run the SC-003 reader test with a developer new to the repository and record the result in `specs/001-repository-foundation/verification.md`
- [ ] T039 Merge `feat/repository-foundation` into `main` with `--no-ff`, create the public `n0ss4/architectures` repository with `gh repo create`, and push `main`, adding the description and topics stated in `README.md`
- [ ] T040 Repeat quickstart checks 1 to 5 from a fresh clone of `https://github.com/n0ss4/architectures.git` and record the result in `specs/001-repository-foundation/verification.md`
- [ ] T041 Add a link to the new location at the top of the `README.md` in `n0ss4/react-microfrontends` and in `n0ss4/angular-microfrontends`, on `main`
- [ ] T042 Archive `n0ss4/react-microfrontends` and `n0ss4/angular-microfrontends` with `gh repo archive`, and confirm that `auth-example` remains readable in the archived `n0ss4/angular-microfrontends`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational
- **User Stories 2, 3, and 4 (Phases 4 to 6)**: Depend on User Story 1, because the READMEs report its verification results; T029 and T030 update files from T024 to T026
- **Polish (Phase 7)**: Depends on all user stories
- **Publication (Phase 8)**: Depends on Polish and on the owner's approval of each task

### User Story Dependencies

- **User Story 1 (P1)**: Depends only on Foundational
- **User Story 2 (P2)**: Depends on User Story 1
- **User Story 3 (P3)**: T029 and T030 depend on T024 to T026; `domain/store/README.md` itself is independent
- **User Story 4 (P4)**: Can start after Foundational; it describes the imported code without depending on verification results

### Within Each User Story

- US1: fixes and pinning (T010 to T016) → verification (T017 to T021) → commit (T022)
- US2: template (T023) → example READMEs (T024, T025) → family page (T026) → root README (T027)
- US4: template (T031) and record (T032) → index (T033)

### Parallel Opportunities

- T010 to T016 touch different files; commit each separately
- T024, T025, and T028 touch different files
- T031 and T032 touch different files
- T017 to T021 run one at a time, so that a failure can be traced to its cause
- Phase 8 is strictly sequential

---

## Parallel Example: User Story 1

```text
Task: "Generate microfrontends/react-module-federation/mfe2_app/pnpm-lock.yaml"
Task: "Add the runtime directories to microfrontends/angular-federation/scripts/dev/start.sh"
Task: "Create the root LICENSE"
Task: "Create THIRD_PARTY_NOTICES.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phases 1 and 2
2. Complete Phase 3
3. **STOP and VALIDATE**: Review `specs/001-repository-foundation/verification.md`, which shows what really works

### Incremental Delivery

1. Setup and Foundational → history imported and verified
2. User Story 1 → examples work, or their failures are known
3. User Story 2 → readers can navigate and compare
4. User Story 3 → the domain is defined and coverage declared
5. User Story 4 → the decision log is in place
6. Polish, then Publication, one approved step at a time

---

## Notes

- `verification.md` is created by T009; it is not one of the template's standard artifacts, but it provides the evidence for SC-001 and SC-002
- T037 and T038 need people other than the implementing agent
- Out of scope, per the spec: adapting Angular to the store domain, changing the React host-owned contracts, a mixed React and Angular example, new families, and a full set of comparative measurements

---

## Phase 9: Convergence

- [X] T043 CRITICAL: Correct the claim that each remote can run standalone in `microfrontends/react-module-federation/README.md`, since both remotes render a blank page with `RUNTIME-003` when the host is not running, and record the limitation per Constitution V (contradicts)
- [X] T044 Correct the claim about building remotes without the host in `microfrontends/react-module-federation/README.md`, since their builds exit 0 with the host stopped, per Constitution IV (contradicts)
