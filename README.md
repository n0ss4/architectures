# Architectures

A reference for choosing software architectures, organized by decision rather than by framework. Each approach comes with runnable examples and honest trade-offs: when to use it, when not to, and what it costs.

## Architecture families

| Family | The question it helps answer | Examples |
|--------|------------------------------|----------|
| [Microfrontends](./microfrontends/README.md) | How do you split a frontend so that teams can release parts independently? | [`react-module-federation`](./microfrontends/react-module-federation/README.md), [`angular-federation`](./microfrontends/angular-federation/README.md) |

Not sure where to start? Each family page has a decision guide and a comparison table.

## How examples stay comparable

- **Shared domain**: comparable examples implement the same [store](./domain/store/README.md), and each one declares what it covers.
- **Same format**: every example's README follows [one template](./templates/example-readme.md).
- **Evidence over opinion**: comparisons link to proof or read `Not measured`.
- **Self-contained**: each example has its own dependencies, so you can copy just the one you need.

## Decisions

The [decision log](./decisions/README.md) records the reasoning behind choices that affect more than one example.

## Contributing

See the [contribution guide](./CONTRIBUTING.md). New work starts from a specification, using [Spec Kit](https://github.com/github/spec-kit). The project's rules are in its [constitution](./.specify/memory/constitution.md).

## License

[MIT](./LICENSE), except for the files listed in the [third-party notices](./THIRD_PARTY_NOTICES.md).
