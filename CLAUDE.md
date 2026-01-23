# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Payload CMS 3.33.0 + Next.js 15.3.0 headless CMS for a travel tours system. Uses PostgreSQL and S3 storage with NextAuth.js integration (payload-authjs).

## Common Commands

```bash
pnpm dev                    # Start development server
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm devsafe                # Clean .next cache and start dev
pnpm lint                   # Run ESLint
pnpm generate:types         # Generate Payload TypeScript types
pnpm generate:importmap     # Generate Payload import map
pnpm payload migrate        # Run database migrations
pnpm seed                   # Seed database
```

## Architecture

### Directory Structure

```
src/
├── app/(payload)/         # Payload CMS routes (admin, api)
├── app/(frontend)/        # Customer-facing frontend
├── collections/           # Payload CMS collections (each in own folder with index.ts)
├── globals/               # Site-wide global data (each with config.ts)
├── blocks/                # Reusable content blocks (each with config.ts)
├── fields/                # Reusable field configurations (slug, link, title, etc.)
├── heros/                 # Hero section configurations for different content types
├── hooks/                 # Shared Payload hooks (populatePublishedAt, formatSlug, etc.)
├── access/                # Access control functions
├── endpoints/             # Custom API endpoints (health, config, seed)
├── lexical/               # Custom Lexical editor features (CustomHeading, CustomList)
├── utilities/             # Helper functions
├── migrations/            # Database migrations
└── payload.config.ts      # Main Payload configuration
```

### Collections

Users, Media, Tours, Paquetes, Post, Pages, Destinations, Ofertas, TourCategory, BlogCategory

### Globals

Footer, RedesNegocio, SociosCarousel, ReconocimientosCarousel, ToursPageGlobal, PaquetePageGlobal, BlogPageGlobal

### Access Control

Functions in `src/access/`: `authenticated`, `authenticatedOrPublished`, `anyone`

## Key Patterns

### Collection Structure
Collections follow a consistent pattern with hooks for revalidation and data population:
- `hooks/revalidate[Name].ts` - ISR revalidation after changes
- `hooks/populate*.ts` - Auto-populate computed fields
- `access/index.ts` - Collection-specific access control

### Block Structure
Blocks are defined in `src/blocks/[BlockName]/config.ts` and export a `Block` type configuration.

### Field Reuse
Common fields are centralized in `src/fields/`:
- `slugField()` - Auto-generated slug with custom component
- `link` - Standardized link field configuration
- `title` - Reusable title field with styling options

## Key Configuration

- Database: PostgreSQL with migrations in `src/migrations/`
- Storage: S3 for media collection
- Plugins: SEO, Lexical editor, Live preview, AuthJS
- Path aliases: `@/*` → `./src/*`, `@payload-config` → `./src/payload.config.ts`
- TypeScript: Strict mode with `noUncheckedIndexedAccess`
- i18n: Supports English (en) and Spanish (es), fallback to English

## Environment Variables

Required: `DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_DOMAIN_URL`, `NEXTJS_FRONTEND_URL`, `NEXTJS_REVALIDATE_URL`, `REVALIDATE_SECRET_TOKEN`, `NAME_BUSINESS`, S3 config variables (`S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`)

## Guidelines

- All code and documentation must be in English
- Generated types in `src/payload-types.ts` - regenerate after collection changes
- When implementing features, check `/home/node/websitePayload` for existing patterns to reuse
