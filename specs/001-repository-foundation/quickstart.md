# Quickstart: Validate the Repository Foundation

Run these checks on a fresh clone of the finished repository. They prove the feature's success
criteria; the implementation steps belong in `tasks.md`.

**Prerequisites**: Git, Node version manager, pnpm, npm, and Docker for the Angular production check.

## 1. History (SC-001, FR-002)

For each source repository, compare `%an|%ae|%aI|%s` from `git log main` with the same format from
`git log HEAD` in the new repository.

**Expected**: 0 source commits are missing (4 for React, 8 for Angular).

```bash
git log --oneline -- microfrontends/react-module-federation/README.md
git log --oneline -- microfrontends/angular-federation/README.md
git blame microfrontends/angular-federation/README.md
```

**Expected**: Both logs include imported commits, and `blame` attributes lines to imported commits.

## 2. React example (SC-002)

Follow only `microfrontends/react-module-federation/README.md`, with its `.nvmrc` active.

**Expected**: All three apps install and build. With all three running, `http://localhost:3000`
shows the catalog, a product can be added to the cart, and an order can be placed, after which the
cart is empty.

## 3. Angular example (SC-002)

Follow only `microfrontends/angular-federation/README.md`, with its `.nvmrc` active.

**Expected**:

- All five apps install and build (`host-app` and `mfe1-app` to `mfe4-app`).
- `scripts/dev/start.sh` starts them on ports 4200 to 4204 from a fresh clone, and the host loads
  each remote. `scripts/dev/stop.sh` stops them.
- After `scripts/prod/build-all.sh`, `docker compose up -d --build` serves the host through the
  gateway, on port 80.

Any failure is recorded under the example's known limitations, and the example is not reported as
verified.

## 4. Isolation (FR-003)

Remove one example's directory from a temporary copy and repeat the other example's install and
build.

**Expected**: The results do not change.

## 5. Documentation (SC-003 to SC-006)

- **Links**: Every example, the domain, and the decision log are at most 2 links from the root
  README, and no relative link is broken.
- **Template**: Every example README has all the sections of
  [example-readme.md](./contracts/example-readme.md), in order.
- **Comparison table**: Every cell has evidence or reads `Not measured`.
- **Reader test**: A developer new to the repository reaches a relevant example and its trade-offs
  in under 5 minutes.
- **Language**: All new content is in English.
- **Licensing**: The root `LICENSE`, the Angular `LICENSE`, the `mf-nf-poc` source comments and
  credits, and `THIRD_PARTY_NOTICES.md` are all present. The constitution has no Sync Impact Report.

## 6. Publication (FR-014)

Only after the owner approves each step:

1. The repository is public on GitHub, and a fresh clone passes checks 1 to 5.
2. Each source README links to the new location.
3. Each source repository is archived, and `auth-example` remains readable.
