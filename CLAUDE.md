# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` (production build with Turbopack)
- **Production server**: `npm start`
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Type Check**: TypeScript type checking is built into the build process

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
- **React 19** with latest features
- **Tailwind CSS v4** with custom design system and inline theme configuration
- **Framer Motion** for animations and scroll-triggered effects
- **TypeScript** for type safety
- **Figma API integrations**: `@figma/rest-api-spec`, `figma-api`, `axios`
- **ESLint** with Next.js configuration for code quality

### Design System

Custom CSS variables in `src/app/globals.css`:
- `--brown: #421d13` (primary text)
- `--beige: #ad8a6c` (accent color)
- `--background: #e3dcd6` (main background)
- `--text-gray: #6b6763` (secondary text)
- `--orange: #c95127` (highlight color)
- `--card: rgba(173, 138, 108, 0.2)` (card background)
- `--card-30: #d0bfb0` (card variant)
- `--white-35: rgba(255, 255, 255, 0.35)` (backdrop blur effects)

Tailwind CSS v4 theme integration makes these variables available as: `bg-brown`, `text-beige`, `bg-background`, etc.

Custom fonts: Playfair Display, Roboto Flex, Roboto, Raleway, Comfortaa

### Component Architecture

**Reusable Components**:
- `Icon`: Handles SVG icons with consistent sizing (32px, 48px, 64px, 124px) - in `src/app/page.tsx`
- `TitleSubTitle`: Section headers with animated underlines - in `src/app/page.tsx`
- `CardCase`: Case study cards with alternating layouts - in `src/app/page.tsx`
- `CardInsight`: Leadership insight cards with icons - in `src/app/page.tsx`
- `CardExperience`: Timeline experience cards with background blur effects - in `src/app/page.tsx`
- `Timeline`: Modular timeline container with vertical line background - in `src/components/Timeline.tsx`
- `TimelineItem`: Individual timeline items with icon and content wrapper - in `src/components/Timeline.tsx`
- `ClientOnly`: SSR hydration wrapper for Framer Motion - in `src/components/ClientOnly.tsx`

**Figma Integration Components**:
- `FigmaComponent`: Original Figma API integration - in `src/components/figma-component.tsx`
- `FigmaMCPComponent`: Main MCP integration interface with tabs - in `src/components/FigmaMCPComponent.tsx`
- `FigmaDirectMCP`: Direct MCP connection component (recommended) - in `src/components/FigmaDirectMCP.tsx`
- `FigmaRealMCP`: MCP via API routes - in `src/components/FigmaRealMCP.tsx`
- `AutoFigmaSync`: Auto-sync functionality - in `src/components/AutoFigmaSync.tsx`
- `FigmaButtons`: Interface buttons for Figma operations - in `src/components/FigmaButtons.tsx`

### Asset Management

**Public Assets**:
- SVG icons: `cy.svg`, `ponto.svg`, `rosto.svg`, `Line-timeline.svg`, `quote.svg`
- Images: Photos and GIFs for hero section, about section, and case studies
- Timeline visualization using SVG path with opacity

### Figma Integration Architecture

The project includes comprehensive Figma integration with two approaches:

**1. Figma REST API Integration**:
- Environment variables: `FIGMA_ACCESS_TOKEN`, `FIGMA_FILE_KEY`
- Service layer: `src/lib/figma-service.ts`
- React hook: `src/hooks/use-figma.ts`
- Component: `src/components/figma-component.tsx`

**2. Figma MCP (Model Context Protocol) Integration**:
- Environment variable: `FIGMA_MCP_SERVER_URL` (default: `http://127.0.0.1:3845/sse`)
- Multiple MCP components with different connection methods
- API routes for MCP operations: `src/app/api/figma-mcp/*` and `src/app/api/figma-direct-mcp/route.ts`
- Supports real-time metadata extraction, code generation, screenshots, and design variables
- Requires Figma Desktop with MCP server enabled

**MCP API Routes**:
- `/api/figma-mcp/metadata` - Extract element metadata
- `/api/figma-mcp/code` - Generate HTML/CSS/React code
- `/api/figma-mcp/screenshot` - Capture element screenshots
- `/api/figma-mcp/variables` - Extract design tokens/variables
- `/api/figma-direct-mcp` - Direct MCP proxy endpoint

## Key Implementation Notes

**Timeline Architecture**: The Experience section uses a modular `Timeline` component that:
- Manages vertical line background (`Line-timeline.svg`) positioned at `left-[22px]`
- Uses z-index layering: line (z-0), content (z-10), icons (z-20)
- `TimelineItem` components wrap individual experience cards with custom icons
- Icons alternate colors: `#421d13` (brown) and `#c95127` (orange)
- SVG icons are inline with `fill="currentColor"` for precise color control

**Animation Pattern**: Consistent `framer-motion` usage with `whileInView` triggers for scroll-based animations, all using `viewport={{ once: true }}` for performance.

**Responsive Design**: Mobile-first approach with `md:` breakpoints for desktop layouts, especially in navigation and card layouts.

**Figma Integration**: Comprehensive integration accessible via footer "Figma MCP ✨" link, opens modal with multiple tabs:
- **Direct MCP**: Recommended approach with real-time connection to Figma Desktop
- **API Routes**: Server-side MCP proxy for additional security
- **Demo**: Static demonstration of capabilities
- Operations include metadata extraction, code generation, screenshot capture, and design variable extraction

## File Modifications

**Timeline Components**: When editing the Experience section:
- Use `Timeline` component as wrapper with `lineImage` prop
- Wrap individual experiences in `TimelineItem` with `icon`, `iconColor`, and `index` props
- Icons are 48px SVG with `z-20` positioning to appear over timeline
- Line uses dual rendering approach (CSS background + Image) for reliability
- Cards use backdrop blur effects: `bg-[rgba(255,255,255,0.35)] backdrop-blur-sm`

**SVG Assets**: Timeline line (`Line-timeline.svg`) is 4px wide with variable height, positioned absolutely with `top-8 bottom-8` for full coverage.