# Contributing

This repository follows the rules in its [constitution](./.specify/memory/constitution.md). Everything is written in English, including code, documentation, commit messages, and branch names.

## Choose the right workflow

| Change | What it needs |
|--------|---------------|
| Small fix, such as a documentation correction or a dependency update | A pull request |
| New example, new family, or cross-cutting change | A [Spec Kit](https://github.com/github/spec-kit) specification |
| Choice that constrains more than one example, or is costly to reverse | A [decision record](./decisions/README.md) |

## Add an example or family

Run these Spec Kit commands in your coding agent, reviewing each result before moving on:

```text
/speckit-specify    Describe what to build and why
/speckit-plan       Decide how to build it
/speckit-tasks      Break the plan into tasks
/speckit-implement  Build it
/speckit-converge   Check for remaining work
```

Then make sure that:

- The example lives in `<family>/<example>/`, in kebab-case.
- It installs, builds, and runs from its own directory, and imports nothing from other examples.
- Its README follows [the template](./templates/example-readme.md), with its coverage of the [store domain](./domain/store/README.md) declared.
- It has an entry in its family's comparison table, where every cell links to evidence or reads `Not measured`.
- Its entry in the [root README](./README.md) is up to date.

## Branches and commits

- Name branches with a Conventional Commits type and a short kebab-case description, such as `feat/repository-foundation`. Do not use Spec Kit's numbered branch names.
- Write commit messages in the [Conventional Commits](https://www.conventionalcommits.org/) format.

## Before merging

- Every affected example passes its documented install and build commands.
- Every affected README and comparison entry is up to date.
- The change complies with the constitution, and any justified exception has a decision record.
