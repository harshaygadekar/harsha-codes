---
name: refactor-or-add-helper-libs-with-tests
description: Workflow command scaffold for refactor-or-add-helper-libs-with-tests in harsha-codes.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /refactor-or-add-helper-libs-with-tests

Use this workflow when working on **refactor-or-add-helper-libs-with-tests** in `harsha-codes`.

## Goal

Extract, refactor, or add utility/helper functions in lib/ along with corresponding unit tests.

## Common Files

- `web/src/lib/*.ts`
- `web/src/lib/*.test.ts`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit or create files in web/src/lib/*.ts for new or updated helpers
- Edit or create corresponding test files in web/src/lib/*.test.ts
- Run tests to verify correctness

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.