# Research: Repository Foundation

Findings come from trials run on 2026-11-07 against clones of both source repositories, using
Git 2.54.0, pnpm 10.32.1, npm 11.18.0, and Spec Kit 1.3.2.

## R1. Import method

- **Decision**: Rewrite each source clone with `git filter-repo --to-subdirectory-filter <path>`,
  then merge it with `git merge --no-ff --allow-unrelated-histories`. Run the tool with
  `uvx git-filter-repo`. Each merge commit message names the source repository and the source
  `HEAD` commit.
- **Rationale**: Readers expect `git log` and `git blame` to work on the new paths. In the trial,
  all 4 React and 8 Angular commits kept their author, date, and message, and `git log` returned
  2 and 7 commits for the two READMEs.
- **Alternatives considered**: `git subtree add` keeps the original SHAs, but `git log` returned
  0 commits on the new paths, even with `--full-history`. A squashed import loses the history.
- **Trade-off**: Commit SHAs change. The impact is low: neither source has tags, stars, or forks. The
  original SHAs are mapped to the new ones in [verification.md](./verification.md).
- **Note**: `--no-ff` is required because the owner's Git configuration only allows fast-forward
  merges by default.

## R2. Non-default branches

- **Decision**: Do not merge `auth-example` (`angular-microfrontends`, 3 commits not on `main`). Keep it
  as the unmerged branch `feat/angular-auth-example`, and link to it from the example's known
  limitations.
- **Rationale**: It is an unmerged variant with a large diff (32 files), and merging it would change the
  example's behavior, which is out of scope. The owner chose to delete the source repositories rather
  than archive them, so this branch must live here. It could become a future authentication example.
- **Alternatives considered**: Merging it now; archiving the source repositories, which the owner
  declined.

## R3. Third-party code

- **Decision**: List the three files adapted from `manfredsteyer/mf-nf-poc` in
  `THIRD_PARTY_NOTICES.md` and exclude them from the root MIT license:
  `host-app/src/app/shared/starts-with.ts`, `host-app/src/app/shared/federation-helpers.ts`, and
  `host-app/src/app/wrapper/wrapper.component.ts` (137 lines in total).
- **Rationale**: The upstream repository has no license file, no `license` field in its
  `package.json`, and no license detected by GitHub. The owner cannot grant MIT rights over code
  they do not own, and the current per-file source comments do not address this.
- **Owner decision (2026-11-07)**: Ask the upstream author to add a license or grant permission. The
  exclusion applies in the meantime. The outcome must be known, or the owner must explicitly accept
  publishing with the exclusion alone, before publication.

## R4. Reproducible setup

Each result below was observed on a tree imported with the trial method.

| Check | Result |
|-------|--------|
| React: documented `pnpm install` at the example root | Fails: `ERR_PNPM_NO_PKG_MANIFEST` |
| React: install and build each of the 3 apps (Node 25) | Pass |
| React: `mfe2_app` lockfile | Missing, so its versions are not reproducible |
| React: `mfe2_app` build log | Logs a type-generation error (`TYPE-001`) but exits 0 |
| React: `host_app/src/store/index.ts` | Exports `useCounterStore`, a module that does not exist; nothing imports the file |
| React: product images | Hotlinked from third-party retail and vendor sites |
| Angular: `host-app` install and build (Node 25 and Node 20) | Pass |
| Angular: `mfe4-app` install and build (Node 20) | Pass |
| Angular: `scripts/dev/start.sh` on a fresh clone | `logs/` and `.pids/` are ignored by Git and never created, and redirecting to `../logs/` fails with "No such file or directory" |

**Not yet verified**: builds of Angular `mfe1-app`, `mfe2-app`, and `mfe3-app`; starting any app in a
browser; and the Docker setup. These are covered by [quickstart.md](./quickstart.md).

- **Decision**: Apply three minimal fixes, each as its own commit after the import: correct the React
  install steps, add the `mfe2_app` lockfile, and create the missing directories in `start.sh`.
  Record the other findings under known limitations.
- **Rationale**: SC-002 requires each example to work from its own README, or to record why not.
  Anything beyond this is a behavior change and out of scope.
- **Alternatives considered**: Recording all findings without fixing them would make the first thing a
  reader tries fail, even though each fix is trivial.

## R5. Runtime pinning

- **Decision**: Add a `.nvmrc` to each example: Node 20 for Angular and Node 24 for React.
- **Rationale**: Angular 17 lists Node 20 as supported and both tested apps build on it, including
  `mfe4-app` on Angular 16. Node 24 is the current LTS line for React, whose builds have only been
  verified on Node 25, so implementation must confirm it. If it fails, pin the version that passes
  and record why.
- **Trade-off**: Node 20 is past end of life. Upgrading the frameworks is out of scope, so it is
  recorded as a known limitation.

## R6. Spec Kit compatibility with the branch convention

- **Decision**: Use `feat/...` branches and keep the active feature in `.specify/feature.json`.
- **Rationale**: On a `feat/repository-foundation` branch, `check-prerequisites.sh` resolved the
  feature directory correctly and exited 0.
- **Note**: `setup-plan.sh` printed `BRANCH: 001-repository-foundation` when no Git repository
  existed. That value is informational only.

## R7. Repository-wide tooling

- **Decision**: No workspace, task runner, or CI in this feature.
- **Rationale**: Principle III requires a decision record before adding orchestration. The examples
  use different package managers and Node versions, and verification is defined per example.
- **Alternatives considered**: A root pnpm workspace would couple versions across examples. A
  path-filtered CI matrix is useful, but it belongs in a later feature.

## R8. Store domain source

- **Decision**: Derive the domain from the React example (`types/cart.ts`, `useCartStore.ts`,
  `Checkout.tsx`), written in neutral terms. See [contracts/store-domain.md](./contracts/store-domain.md).
- **Rationale**: It is the only source implementing catalog, cart, and checkout. The Angular example
  demonstrates integration mechanisms and declares no coverage for now.
- **Note**: The React example shares a cart object rather than sending events. The domain therefore
  defines logical events and leaves the transport to each architecture, which is one of the things
  worth comparing.
