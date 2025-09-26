# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` (production build with Turbopack)
- **Production server**: `npm start`
- **Lint**: `npm run lint` (ESLint with Next.js config)

## Project Architecture

This is a **Natasha Buchler Portfolio** - a Next.js 15 application with App Router showcasing design leadership experience. The project includes Figma integration capabilities but is primarily a static portfolio site.

### Core Structure

**Main Portfolio**: Single-page application in `src/app/page.tsx` containing:
- Hero section with animated photo backdrop
- Case studies showcase
- Leadership philosophy ("How I lead")
- About me section with tagged photo
- Experience timeline with icons and timeline visualization
- Contact section with social icons

**Key Technologies**:
- **Next.js 15** with App Router and Turbopack
- **Tailwind CSS v4** with custom design system
- **Framer Motion** for animations and scroll-triggered effects
- **TypeScript** for type safety

### Design System

Custom CSS variables in `src/app/globals.css`:
- `--brown: #421d13` (primary text)
- `--beige: #ad8a6c` (accent color)
- `--background: #e3dcd6` (main background)
- `--text-gray: #6b6763` (secondary text)
- `--orange: #c95127` (highlight color)

Custom fonts: Playfair Display, Roboto Flex, Roboto, Raleway, Comfortaa

### Component Architecture

**Reusable Components** (all in `src/app/page.tsx`):
- `Icon`: Handles SVG icons with consistent sizing (32px, 48px, 64px, 124px)
- `TitleSubTitle`: Section headers with animated underlines
- `CardCase`: Case study cards with alternating layouts
- `CardInsight`: Leadership insight cards with icons
- `CardExperience`: Timeline experience cards with background blur effects

**Client-Side Hydration**: Uses `ClientOnly` wrapper to prevent SSR hydration mismatches with Framer Motion.

### Asset Management

**Public Assets**:
- SVG icons: `cy.svg`, `ponto.svg`, `rosto.svg`, `Line-timeline.svg`, `quote.svg`
- Images: Photos and GIFs for hero section, about section, and case studies
- Timeline visualization using SVG path with opacity

### Figma Integration (Optional)

The project includes Figma MCP (Model Context Protocol) integration setup:
- Environment variables: `FIGMA_ACCESS_TOKEN`, `FIGMA_FILE_KEY`, `FIGMA_MCP_SERVER_URL`
- Service layer: `src/lib/figma-service.ts`
- React hook: `src/hooks/use-figma.ts`
- Component: `src/components/figma-component.tsx`

## Key Implementation Notes

**Timeline Section**: Experience cards use relative positioning with an absolute SVG timeline (`Line-timeline.svg`) positioned behind icons using `left-[22px]` for precise center alignment.

**Animation Pattern**: Consistent `framer-motion` usage with `whileInView` triggers for scroll-based animations, all using `viewport={{ once: true }}` for performance.

**Responsive Design**: Mobile-first approach with `md:` breakpoints for desktop layouts, especially in navigation and card layouts.

**Color Consistency**: SVG icons use the design system colors - ensure `cy.svg` uses `fill: #ad8a6c` to match the theme.

## File Modifications

When editing the experience section, note:
- Icons are 48px with `shrink-0` to prevent flex shrinking
- Timeline SVG uses `object-contain` and precise positioning
- Cards use backdrop blur effects: `bg-[rgba(255,255,255,0.35)] backdrop-blur-sm`