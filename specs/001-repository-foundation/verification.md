# Verification: Repository Foundation

Results of the checks in [quickstart.md](./quickstart.md), recorded as observed on 2026-11-07, from
fresh clones of the `feat/repository-foundation` branch.

**Tools**: Git 2.54.0, `git-filter-repo` a40bce548d2c, pnpm 10.32.1, Docker 29.2.1 (Colima), Docker
Compose 5.7.0, and Chrome driven headlessly by Playwright 1.49.1.

## Check 1: History (SC-001, FR-002)

| Source | Imported from | Commits | Missing |
|--------|---------------|---------|---------|
| `react-microfrontends` | `54bf4889cc27ba563150ac81e9c25c246c8f6463` | 4 | 0 |
| `angular-microfrontends` | `5590a72db404dbfc29a91baf01d2b2bc30c41a35` | 8 | 0 |

Commits were compared by `%an|%ae|%aI|%s` against fresh clones of the sources.

| Path | Commits in `git log` | Distinct commits in `git blame` |
|------|----------------------|---------------------------------|
| `microfrontends/react-module-federation/README.md` | 2 | 2 |
| `microfrontends/angular-federation/README.md` | 7 | 6 |

**Result**: Pass.

## Check 2: React example (SC-002)

Node 24.22.2, pinned in `.nvmrc`. R5's planned version is confirmed.

| Step | Result |
|------|--------|
| `pnpm install --frozen-lockfile` in all 3 apps | Pass |
| `pnpm build` in all 3 apps | Pass; `mfe1_app` and `mfe2_app` log `TYPE-001` but exit 0 |
| Dev servers on ports 3000, 3001, and 3002 | Pass, all respond 200 |
| Catalog at `http://localhost:3000` | Pass, 6 products |
| Add 3 units across 2 products | Pass, header shows 3 items and $2647.00 |
| Place an order with all fields filled in | Pass, confirmation states 3 items and $2647.00 |
| Cart after the order | Pass, 0 items, checkout shows the empty state |

Servers were started with `pnpm exec rsbuild dev`, which is `pnpm dev` without `--open`, to avoid
opening browser windows during the test.

**Observations**:

- The browser logged one dev-only error: `HMR update failed, performing full reload`.
- Requests to `plugable.com` and `www.keychron.in` failed. These hosts serve hotlinked product
  images. The cause was not investigated.
- With the host stopped, opening `mfe1_app` or `mfe2_app` directly renders a blank page and logs
  `RUNTIME-003`. With the host running, each shows only a `Running standalone` placeholder. This
  contradicted the imported README, which has been corrected.
- The remotes build successfully while the host is stopped.

**Result**: Pass, with the observations above.

## Check 3: Angular example (SC-002)

Node 20.20.2, pinned in `.nvmrc`. Angular 17.3.12, and Angular 16.2.12 for `mfe4-app`.

| Step | Result |
|------|--------|
| `npm ci` and `ng build` in all 5 apps | Pass |
| `scripts/dev/start.sh` on a fresh clone | Pass, ports 4200 to 4204 respond 200 |
| Host routes `/`, `/mfe1`, `/mfe2`, `/mfe3`, and `/mfe4` | Pass, each remote renders with no browser errors |
| `scripts/dev/stop.sh` | Pass, all 5 ports are free afterward |
| `scripts/prod/build-all.sh` | Pass |
| `docker-compose up -d --build` | Pass, 6 containers running |
| Gateway on port 80: host and each remote entry | Pass, all respond 200 |
| The same 5 routes through the gateway | Pass, each remote renders with no browser errors |

**Corrections to the plan**:

- The README had no install step, and `start.sh` does not install dependencies. The README now
  includes one.
- `docker compose up --build` needs `scripts/prod/build-all.sh` to run first, because the Dockerfiles
  copy `dist/`.

**Not verified**: `scripts/dev/restart.sh`, `scripts/prod/deploy.sh`, and the `scripts/prod/docker-*.sh`
scripts.

**Result**: Pass.

## Check 4: Isolation (FR-003)

| Removed | Rebuilt | Result |
|---------|---------|--------|
| `microfrontends/angular-federation` | All 3 React apps | Pass, install and build exit 0 |
| `microfrontends/react-module-federation` | All 5 Angular apps | Pass, install and build exit 0 |

**Result**: Pass.

## Check 5: Documentation (SC-003 to SC-006)

| Check | Result |
|-------|--------|
| Relative links and anchors | Pass, none broken |
| External links | Pass, all respond 200, except `localhost` URLs, which need the apps to be running |
| Depth from the root README (SC-006) | Pass, every example, the domain, and the decision log are 1 link away |
| Example READMEs follow the template (SC-004) | Pass, for both examples |
| Comparison table has evidence or `Not measured` (SC-005) | Pass, no empty cells |
| New content is in English | Pass, using a pattern scan for Spanish text |
| Licensing and credits | Pass, all notices and `mf-nf-poc` credits are present |
| Sync Impact Report removed | Pass |
| Reader test (SC-003) | **Not done**: needs a developer new to the repository (task T038) |

The link scan reports `templates/example-readme.md` as pointing to a missing path. This is expected:
the link resolves once the template is copied to `<family>/<example>/README.md`.

**Result**: Pass, except for the pending reader test.

## Publication decisions

- **Third-party license (T037, 2026-11-07)**: The owner chose to publish without requesting permission
  from the `mf-nf-poc` author. The upstream author is credited, and the affected files stay excluded
  from the root license in `THIRD_PARTY_NOTICES.md`.
