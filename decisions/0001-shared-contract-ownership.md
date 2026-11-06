# 0001. Ownership of contracts shared between a host and its remotes

**Status**: Proposed

**Date**: 2026-11-07

## Context

In a microfrontend architecture, the host and its remotes need to agree on shared contracts, such as what a product or a cart looks like. Someone has to own those definitions. This repository needs a position, because new examples will otherwise copy whatever the first example does.

In the [`react-module-federation`](../microfrontends/react-module-federation/README.md) example, the host owns them:

- `host_app` [exposes `./types` and `./products`](../microfrontends/react-module-federation/host_app/module-federation.config.ts) to its remotes.
- `mfe1_app` [imports from `host_app/types` and `host_app/products`](../microfrontends/react-module-federation/mfe1_app/src/components/ProviderComponent.tsx), and `mfe2_app` [imports from `host_app/types`](../microfrontends/react-module-federation/mfe2_app/src/components/Checkout.tsx).
- The host also consumes both remotes, so the host and remotes depend on each other.
- Remotes suppress type checking on these imports with `// @ts-ignore`, and their builds log a type-generation error (`TYPE-001`), so the compiler does not protect the contract.

The cost is coupling: the apps exist to be released independently, but a contract change in the host can break remotes at runtime with no compile-time warning.

## Options considered

### A. Keep host ownership

- **Advantages**: no new packages, and one obvious place to look. This is what the example does today.
- **Costs**: keeps the mutual dependency. A remote cannot be understood or type-checked without the host. Runtime contract values, such as the product data, also make the remote dependent on the host being available.

### B. Move contracts to a shared versioned package

- **Advantages**: removes the dependency on the host, gives real compile-time checks, and makes breaking changes visible through versions.
- **Costs**: adds a package to publish and release. Apps on different contract versions must stay compatible at runtime, because a version mismatch is only caught if someone upgrades.

### C. Define contracts in `domain/`, with each app implementing them locally

- **Advantages**: no shared code or release process, so apps are fully decoupled. It fits the repository's [self-contained example](../.specify/memory/constitution.md) principle, and the [store domain](../domain/store/README.md) already describes the behavior.
- **Costs**: definitions are duplicated across apps, and nothing enforces that they match unless contract tests are added.

## Decision

Not yet decided. This record stays `Proposed` until the owner chooses an option.

## Consequences

Whichever option is chosen will shape new examples. Changing the existing React example would be a separate feature, and the example's [known limitations](../microfrontends/react-module-federation/README.md#known-limitations) stay as they are until then.
