

---

# Portfolio Website PRD & Implementation Prompt

You are an award-winning Staff Frontend Engineer, Product Designer, UI/UX Designer, and Software Architect. Your responsibility is to design and build my personal portfolio website from scratch.

You are fully accountable for all design, architecture, component, animation, accessibility, performance, and implementation decisions unless I explicitly override them.

Think deeply before writing code.

Never rush into implementation.

First understand the product, create the design system, define the architecture, then build.

Your goal is to create a portfolio that immediately communicates craftsmanship, engineering quality, and attention to detail.

This is **not** just another developer portfolio.

It should feel like a carefully designed software product.

---

# Inputs

I have already prepared the following assets.

### 1. Wireframes

Inside:

```
@sketch/
```

These contain rough layout sketches and section hierarchy.

Treat them as direction rather than strict instructions.

Improve them wherever necessary while preserving the overall vision.

---

### 2. Portfolio Content

Inside:

```
@portfolio-data.md
```

This contains

* biography
* experience
* projects
* education
* technologies
* achievements
* contact information
* social links
* every piece of content required

This file should become the **single source of truth**.

The website should read data from structured content rather than hardcoded JSX so that future updates require editing only one file.

---

# Primary Goal

Build a premium-quality portfolio website with:

* exceptional visual design
* excellent UX
* modular architecture
* accessibility
* responsiveness
* performance
* maintainability

Design quality is the highest priority.

Performance is second.

Maintainability is third.

Never sacrifice design quality unless it significantly affects performance.

---

# Tech Stack

Use:

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Lucide Icons

You may introduce additional libraries if they genuinely improve the product.

Avoid unnecessary dependencies.

Avoid overengineering.

Every dependency should have a clear purpose.

---

# Design Language

The visual style should feel:

* modern
* minimal
* premium
* matte
* soft
* clean
* calm
* engineering focused

Avoid:

* glassmorphism everywhere
* flashy gradients
* loud colors
* excessive animations
* overly rounded components
* generic portfolio templates

The site should resemble something between:

* Linear
* Perplexity AI
* Raycast
* Vercel
* Stripe
* Apple Developer

with its own personality.

---

# Color Palette

Use this palette consistently throughout the website.

Primary

```
#2F2FE4
```

Secondary

```
#162E93
```

Accent

```
#1A1953
```

Background

```
#080616
```

Use lighter neutrals for typography and subtle borders.

Colors should create a soft matte appearance rather than glossy or vibrant.

The UI should feel deep, elegant, and understated.

---

# Visual Design Principles

The interface should include:

* soft matte surfaces
* subtle shadows
* restrained depth
* tasteful 3D elevation
* carefully balanced spacing
* strong typography hierarchy
* pixel-perfect alignment
* generous whitespace
* clean iconography

Buttons should have subtle depth rather than exaggerated neumorphism.

Animations should feel intentional.

Nothing should move without purpose.

---

# Typography

Choose elegant fonts similar to those used by:

* Perplexity
* Linear
* Vercel

Typography should communicate sophistication rather than playfulness.

Focus heavily on hierarchy and readability.

---

# Site Structure

The first version should be a **single-page static portfolio**.

## Hero

Include

* Twitter/X style cover banner
* Matte pixel-rendered profile image
* Name
* Current role
* Location
* Short introduction
* Resume download
* CTA buttons

---

## Experience

Timeline layout.

Include

* company
* designation
* duration
* concise impact statements
* technologies used

---

## Tech Stack

Display technologies as elegant interactive chips/buttons.

Each item should include

* logo
* name

Hover interactions should feel polished but restrained.

---

## Projects

Responsive card layout.

Each project should include

* title
* concise recruiter-focused summary
* technologies
* GitHub link
* live demo (if available)
* highlights

Focus on communicating engineering impact rather than listing features.

---

## Social Section

Present social platforms inside a tasteful Bento Grid.

Include

* GitHub
* LinkedIn
* Twitter/X
* Threads
* Instagram
* Email

Display

* follower counts
* links
* meaningful metrics where appropriate

Include a lightweight visitor counter such as:

> "You are visitor #XXXXX"

---

## GitHub Activity

Display

* contribution graph
* recent activity
* repositories

Use APIs efficiently.

---

## Contact

Minimal contact form.

Simple.

Elegant.

Accessible.

Spam resistant.

---

# Version 2 Scope

Do not build these now.

Design the architecture so they can be added later without restructuring.

## More Page

Future additions include

* Instagram feed
* Threads posts
* Tweets
* Reading list
* Top books
* Notes
* Learning resources

---

## Links Page

A dedicated Linktree-like page hosted on a subdomain.

Purpose:

* resources
* ebooks
* newsletters
* downloadable content
* AI tools
* useful links

This page should eventually be CMS driven.

---

# Architecture Requirements

The project should be modular.

Organize components properly.

Example:

```
components/

sections/

hooks/

lib/

constants/

content/

config/

styles/

types/

utils/
```

Content should never be scattered across components.

Keep business logic separate from presentation.

Avoid giant files.

---

# Responsiveness

Support

* Desktop
* Laptop
* Tablet
* Mobile

Design mobile intentionally.

Do not simply shrink desktop layouts.

---

# Accessibility

Follow WCAG best practices.

Include

* semantic HTML
* keyboard navigation
* focus states
* aria labels
* proper contrast
* reduced motion support

---

# Performance

Target:

* Lighthouse 95+
* excellent Core Web Vitals
* optimized images
* minimal JavaScript
* lazy loading where appropriate
* static generation whenever possible

---

# SEO

Implement

* metadata
* Open Graph
* Twitter Cards
* structured data
* sitemap
* robots.txt
* canonical URLs

---

# Theme

Support

* Dark mode
* Light mode

Dark mode should be the primary design target.

Light mode should feel equally polished rather than being an afterthought.

---

# Engineering Principles

Write production-quality code.

Prioritize

* readability
* maintainability
* scalability
* composability

Avoid duplication.

Avoid premature abstraction.

Avoid unnecessary complexity.

Every component should have a single responsibility.

---

# Workflow

Follow this order exactly.

### Phase 1

Study

* `@portfolio-data.md`
* `@sketch/`

Identify ambiguities.

Resolve reasonable decisions yourself.

Ask only when absolutely necessary.

---

### Phase 2

Produce

* Product specification
* Information architecture
* Component hierarchy
* Design system
* Color usage
* Typography
* Spacing scale
* Animation guidelines
* Responsive behavior
* Folder structure
* Technical architecture

Do **not** write code yet.

---

### Phase 3

Review your own plan critically.

Look for

* UX issues
* accessibility issues
* responsiveness issues
* maintainability concerns
* performance bottlenecks
* visual inconsistencies

Improve the design before implementation.

---

### Phase 4

Implement the portfolio incrementally.

After every major section,

* verify responsiveness
* verify accessibility
* verify consistency
* verify code quality

Do not continue until the current section is production-ready.

---

### Phase 5

Perform a final engineering review.

Critique the website like a senior Staff Engineer and Product Designer.

Fix every issue you discover before considering the project complete.

---

