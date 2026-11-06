# Contract: Family Page

Each `<family>/README.md` MUST contain the following sections, in this order.

## 1. Overview

What the family is, and the problem it addresses.

## 2. Decision guide

Questions about the reader's constraints, each leading to one or more examples. It MUST also state
when none of the family's approaches fit.

## 3. Comparison table

One row per example. Fact columns link to proof. Measured columns link to a measurement or read
`Not measured`. Cells MUST NOT be empty.

For microfrontends, the columns are:

| Column | Type | Evidence |
|--------|------|----------|
| Example | Fact | Link to the example |
| Framework and version | Fact | Link to `package.json` |
| Integration mechanism | Fact | Link to the federation configuration |
| Host and remote coupling | Fact | Link to the configuration or code that shows it |
| Domain coverage | Fact | Link to the example's README section |
| Independent deployment | Measured | Reproducible procedure and result |
| Remote bundle size | Measured | Date, tool versions, commands, and result |
| Build time | Measured | Date, tool versions, commands, and result |

## 4. Examples

A list of examples, each with a one-line summary of the question it answers.
