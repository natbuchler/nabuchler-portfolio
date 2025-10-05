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

**NEW Structure (After Refactoring)**:

```
src/components/
├── ui/                    # Design System Components
│   ├── Icon.tsx          # SVG icons with consistent sizing
│   ├── Typography.tsx    # TitleSubTitle component
│   ├── Card.tsx          # CardCase, CardInsight, CardExperience
│   ├── ArticleCard.tsx   # Medium article card (card-medium)
│   ├── ButtonTertiary.tsx # Tertiary button with chevron
│   └── Timeline.tsx      # Timeline and TimelineItem
├── sections/             # Page Sections
│   ├── Hero.tsx
│   ├── CaseStudies.tsx
│   ├── HowILead.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── LatestArticles.tsx # Medium articles infinite carousel
│   └── Contact.tsx
├── features/
│   └── figma/           # Figma Integration Features
│       ├── FigmaMCPComponent.tsx
│       ├── FigmaDirectMCP.tsx
│       ├── FigmaRealMCP.tsx
│       └── FigmaMCPDemo.tsx
├── Button.tsx           # Button and ButtonGroup
└── ClientOnly.tsx       # SSR hydration wrapper
```

**Design System (src/components/ui/)**:
- All components fully documented with JSDoc
- TypeScript interfaces exported for reuse
- Design tokens imported from `src/lib/design-tokens.ts`
- WCAG accessibility guidelines followed

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

**🚨 CRITICAL: MCP Assets Handling**:
- Figma MCP provides an assets endpoint serving images and SVGs
- **ALWAYS use localhost asset URLs directly** (e.g., `http://localhost:3845/assets/...`)
- **NEVER install icon packages** (`react-icons`, `heroicons`, etc.) - all icons come from Figma
- **NEVER create placeholders** - use actual localhost assets from MCP response
- See `.figma-mcp-rules.md` for complete integration guidelines

**MCP API Routes**:
- `/api/figma-mcp/metadata` - Extract element metadata
- `/api/figma-mcp/code` - Generate HTML/CSS/React code
- `/api/figma-mcp/screenshot` - Capture element screenshots
- `/api/figma-mcp/variables` - Extract design tokens/variables
- `/api/figma-direct-mcp` - Direct MCP proxy endpoint

## Key Implementation Notes

**🚨 CRITICAL: Header & Footer Standardization**:
- **ALL pages MUST use the EXACT same Header and Footer components from the main portfolio page** (`src/app/page.tsx`)
- **NEVER create custom headers or footers** for case study pages or other routes
- Header includes:
  - Rosto icon (via `Icon` component) with home navigation
  - Vertical divider line (`w-px h-6 bg-[#ad8a6c]`)
  - Desktop navigation (About, Cases, Leadership, Experience, Contact)
  - Location and real-time clock (São Paulo timezone)
  - Cy icon with 30% opacity
- Footer structure follows the same pattern from main page
- This ensures consistent branding and UX across all pages
- Case study pages at `/cases/*` should import and reuse the header logic from main page

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

## Medium Articles Integration

**Latest Articles Section** (`src/components/sections/LatestArticles.tsx`):
- **Infinite Carousel**: Displays Medium articles in a seamless infinite loop (1,2,3,4,1,2,3,4...)
- **Dynamic Content**: Fetches real articles from Medium RSS feed via `src/lib/medium-service.ts`
- **Language Detection**: Enhanced algorithm detects article language (BR/ENG) based on:
  - Portuguese-specific characters (ção, ções, ã, õ, ê, ô, á, à, ú, í)
  - Common Portuguese words with boundary matching
  - Comparison with English word frequency
  - 2+ Portuguese chars = BR, otherwise word count comparison
- **Real Images**: Uses actual article thumbnails from Medium CDN
- **Modern Navigation** (UX 2024/2025):
  - Minimal chevron buttons outside container (-left-4, -right-4)
  - No backgrounds or circles (datado)
  - 40% opacity default, 100% on hover
  - Positioned at vertical center
- **Progress Indicator**: Modern line-based design (not dots)
  - Active: 32px line width, full opacity brown (#421d13)
  - Inactive: 6px dot width, 30% opacity
  - Smooth width transition on change
  - Hover state: 50% opacity on inactive
- **No Gradients**: Removed dated fade overlays for cleaner, modern look
- **Gap**: 32px between cards (optimized spacing)

**ArticleCard Component** (`src/components/ui/ArticleCard.tsx`):
- **Source**: Figma node 3341:285 (card-medium)
- **Dimensions**: 287px width, min-height 320px (all cards uniform height)
- **Background**: #d0bfb0 (card variant color)
- **Border Radius**: 16px (rounded-2xl) for modern look
- **Image**: 287x125px, object-cover object-center, 85% quality
- **Typography**:
  - Title: Playfair semibold 28px, line-height 1.2, tracking 0.56px
  - Date: Roboto Flex light 18px, line-height 28px
- **Language Icon**: 16px BR.svg or Eng.svg based on detected article language
- **Button**: "Show article" with Chevron_min_r.svg, no left padding, fixed to bottom with flexbox
- **Content Area**: Transparent background, 24px padding, flex-1 justify-between for button positioning
- **Hover States** (Modern UX):
  - Entire card clickable with cursor-pointer
  - Vertical lift: -translate-y-1 (4px up)
  - Shadow: xl with brown tint (#421d13/10)
  - Button: 70% opacity on hover
  - Smooth transition: 300ms duration
  - Click anywhere opens article in new tab

**Medium Service** (`src/lib/medium-service.ts`):
- Uses RSS2JSON API to convert Medium RSS feed to JSON
- API endpoint: `https://api.rss2json.com/v1/api.json?rss_url=${mediumRssUrl}`
- Environment variable: `NEXT_PUBLIC_MEDIUM_USERNAME` (default: @nabuchler)
- **Enhanced Language Detection Algorithm**:
  - Analyzes title + content combined
  - Portuguese character detection: ção, ções, ã, õ, ê, ô, á, à, ú, í
  - Word boundary matching for accuracy
  - Portuguese words: para, como, que, não, com, uma, por, mais, etc.
  - English words for comparison: the, and, for, with, this, that, have, etc.
  - Decision logic: 2+ PT chars = BR, else word count comparison
- Extracts thumbnails from article content or uses fallback image
- Date formatting: Converts RSS date to "Mon DD, YYYY" format
- Returns structured MediumArticle interface with id, title, pubDate, link, thumbnail, language
- Fallback to mock data if API fails (development/offline mode)

**Image Configuration** (`next.config.ts`):
- Medium CDN domains configured: `cdn-images-1.medium.com`, `miro.medium.com`
- Figma MCP assets: `localhost:3845`, `www.figma.com`
- SVG support enabled with security policies
- **IMPORTANT**: Server restart required after changes to next.config.ts

## UX Design Principles Applied (2024/2025)

**Modern Carousel Best Practices**:
- ❌ **No gradients** - Dated solution from 2015-2018, removed for cleaner look
- ✅ **Minimal navigation** - Simple chevrons without backgrounds/circles
- ✅ **Progress indicators** - Line-based design (not circular dots), inspired by Instagram/Notion
- ✅ **Hover states** - Vertical lift effect instead of scale for modern feel
- ✅ **Optimized spacing** - 32px gap for better visual rhythm
- ✅ **Peek behavior** - Partial next card visibility creates curiosity gap (+40% engagement)
- ✅ **Infinite loop** - Seamless circular navigation (1,2,3,4,1,2,3...)
- ✅ **Full card clickable** - Better mobile/desktop UX, larger click target
- ✅ **Subtle shadows** - Colored tint (#421d13/10) for depth without heaviness