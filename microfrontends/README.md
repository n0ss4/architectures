# Microfrontends

## Overview

Microfrontends split a web application into parts that different teams can build and deploy separately, then combine them for the user. The main benefit is team and release independence; the cost is more operational and integration complexity. [Martin Fowler's article](https://martinfowler.com/articles/micro-frontends.html) covers both sides.

This family compares ways to do that integration, using runnable examples.

## Decision guide

Start with the first question, and stop at the first answer that fits.

1. **Do you need separate teams to release parts of the frontend independently?**
   - No: microfrontends probably do not fit. See [When none of these fit](#when-none-of-these-fit).
2. **Do all parts use one framework, on a version you can keep aligned?**
   - Yes: start with [`react-module-federation`](./react-module-federation/README.md), which loads remotes as components and shares a single cart across them.
   - No: start with [`angular-federation`](./angular-federation/README.md). Its `mfe4-app` runs Angular 16 inside an Angular 17 host, using a Web Component.
3. **Are you moving between federation mechanisms?**
   - Yes: see [`angular-federation`](./angular-federation/README.md), which runs Module Federation and Native Federation in one host.
4. **Do you need a containerized production setup to start from?**
   - Yes: see [`angular-federation`](./angular-federation/README.md), which includes [Docker Compose and an nginx gateway](./angular-federation/docker-compose.yml). `react-module-federation` is a development setup only.

### When none of these fit

Neither example addresses these situations:

- One team ships the whole frontend on one schedule: the costs described in [the article above](https://martinfowler.com/articles/micro-frontends.html) may not pay off, so consider a single application with well-separated modules.
- You need server-side rendering or composition at the edge: neither example does this.
- Parts need different frameworks, not just different versions: neither example demonstrates this yet.

## Comparison table

Fact columns link to proof. Measured columns read `Not measured` until a reproducible measurement exists.

| Example | Framework and version | Integration mechanism | Host and remote coupling | Domain coverage | Independent deployment | Remote bundle size | Build time |
|---------|-----------------------|-----------------------|--------------------------|-----------------|------------------------|--------------------|------------|
| [`react-module-federation`](./react-module-federation/README.md) | [React 18](./react-module-federation/host_app/package.json) | [Module Federation with Rsbuild](./react-module-federation/host_app/module-federation.config.ts) | [Mutual: remotes import from the host](./react-module-federation/mfe1_app/src/components/ProviderComponent.tsx) | [Catalog, cart, and checkout: full](./react-module-federation/README.md#domain-coverage) | Not measured | Not measured | Not measured |
| [`angular-federation`](./angular-federation/README.md) | [Angular 17](./angular-federation/host-app/package.json), and [Angular 16](./angular-federation/mfe4-app/package.json) for one remote | [Module Federation, Native Federation, and a Web Component](./angular-federation/host-app/src/app/app.routes.ts) | [One-way: the host loads remotes by URL](./angular-federation/host-app/src/main.ts) | [None](./angular-federation/README.md#domain-coverage) | Not measured | Not measured | Not measured |

Domain coverage differs, so measurements from these two examples will not be directly comparable until both implement the [store domain](../domain/store/README.md).

## Examples

- [`react-module-federation`](./react-module-federation/README.md): How can independently built React apps form one store at runtime and share a single cart?
- [`angular-federation`](./angular-federation/README.md): Can one Angular host load remotes built in different ways, and be deployed behind a single gateway?
