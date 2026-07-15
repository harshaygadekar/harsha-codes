---
name: update-section-components-and-layout
description: Workflow command scaffold for update-section-components-and-layout in harsha-codes.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-section-components-and-layout

Use this workflow when working on **update-section-components-and-layout** in `harsha-codes`.

## Goal

Refactor or enhance multiple portfolio sections and shared layout components, often to improve UX, fix alignment, or add features.

## Common Files

- `web/src/components/sections/*.tsx`
- `web/src/components/layout/*.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit one or more files in web/src/components/sections/ (such as experience.tsx, contact.tsx, tech.tsx, etc.)
- Update shared layout components in web/src/components/layout/ (such as section.tsx, site-footer.tsx)
- Optionally update supporting files (e.g., web/src/lib/tech-icons.ts, web/src/content/portfolio.ts)
- Test changes in the browser or with unit tests

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.