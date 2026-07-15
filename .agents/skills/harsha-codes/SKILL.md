```markdown
# harsha-codes Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you how to contribute to the `harsha-codes` TypeScript codebase, which powers a personal portfolio site. You'll learn the project's coding conventions, how to update or add new portfolio sections and layout components, and how to create or refactor utility libraries with proper testing. The repository favors clean, modular code and thorough unit testing.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `techIcons.ts`, `siteFooter.tsx`

### Import Style
- Use **alias imports** for modules.
  - Example:
    ```typescript
    import { getTechIcon } from '@/lib/techIcons'
    ```

### Export Style
- Use **named exports**.
  - Example:
    ```typescript
    export function getTechIcon(name: string): string { ... }
    ```

### Example Component File
```typescript
// web/src/components/sections/experience.tsx
import { ExperienceItem } from '@/lib/experienceTypes'

export function ExperienceSection(props: { items: ExperienceItem[] }) {
  // ...
}
```

## Workflows

### Update Section Components and Layout
**Trigger:** When you want to update the content, layout, or behavior of portfolio sections (e.g., experience, contact, tech) and their shared layout.
**Command:** `/update-section`

1. Edit one or more files in `web/src/components/sections/` (such as `experience.tsx`, `contact.tsx`, `tech.tsx`, etc.).
2. Update shared layout components in `web/src/components/layout/` (such as `section.tsx`, `siteFooter.tsx`).
3. Optionally update supporting files (e.g., `web/src/lib/techIcons.ts`, `web/src/content/portfolio.ts`).
4. Test your changes in the browser or with unit tests.

**Example:**
```typescript
// Edit a section component
export function TechSection() {
  // Update tech stack display logic
}
```

### Refactor or Add Helper Libs with Tests
**Trigger:** When you want to improve, add, or test utility logic (e.g., validation, ranking, icon mapping) used by the app.
**Command:** `/new-helper-lib`

1. Edit or create files in `web/src/lib/*.ts` for new or updated helpers.
2. Edit or create corresponding test files in `web/src/lib/*.test.ts`.
3. Run tests to verify correctness.

**Example:**
```typescript
// web/src/lib/techIcons.ts
export function getTechIcon(name: string): string {
  // logic here
}

// web/src/lib/techIcons.test.ts
import { getTechIcon } from './techIcons'
import { describe, it, expect } from 'vitest'

describe('getTechIcon', () => {
  it('returns correct icon for known tech', () => {
    expect(getTechIcon('TypeScript')).toBe('ts-icon')
  })
})
```

## Testing Patterns

- Use **Vitest** as the testing framework.
- Test files are named with the pattern `*.test.ts` and placed alongside the code in `web/src/lib/`.
- Example test file:
  ```typescript
  // web/src/lib/validator.test.ts
  import { validateEmail } from './validator'
  import { describe, it, expect } from 'vitest'

  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })
    it('rejects invalid emails', () => {
      expect(validateEmail('not-an-email')).toBe(false)
    })
  })
  ```

## Commands

| Command           | Purpose                                                                 |
|-------------------|-------------------------------------------------------------------------|
| /update-section   | Update content, layout, or behavior of portfolio sections and layout     |
| /new-helper-lib   | Add or refactor utility/helper functions with corresponding unit tests   |
```