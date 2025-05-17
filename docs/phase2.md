# Tourism E-commerce CMS: Phase 2 Implementation Checklist

## Phase 2: Feature Development (Days 11-20)

This document provides a detailed checklist for Phase 2 of the Tourism E-commerce CMS project, focusing on implementing advanced features like Live Preview and Draft/Publish versioning.

## Day 11-12: Versioning, Draft/Publish, & UI Framework

### Day 11: Versioning Implementation & Tailwind Setup

- [x] Configure versioning in collections
  - [x] Enable versioning in Tours collection
  - [x] Enable versioning in Passenger collection
  - [ ] Configure version retention policies

- [x] Set up Draft/Publish workflow
  - [x] Add publish status field to versioned collections
  - [x] Create unpublished version state
  - [x] Implement draft saving functionality
  - [x] Set up status indicators in admin UI

- [x] Integrate Tailwind CSS
  - [x] Install Tailwind CSS dependencies
  - [x] Configure `tailwind.config.js` (or .mjs)
  - [x] Set up `postcss.config.js`
  - [x] Import Tailwind directives into global CSS/SCSS

### Day 12: Version Control Testing & Tailwind Styling

- [ ] Implement version comparison
  - [ ] Create version history display component
  - [ ] Implement version comparison view
  - [ ] Set up version rollback functionality

- [ ] Test versioning workflow
  - [ ] Verify draft creation and editing
  - [ ] Test publishing process
  - [ ] Validate version history and rollback
  - [ ] Ensure proper permissions for version management

- [x] Apply Tailwind to Admin UI
  - [x] Customize admin UI components with Tailwind utilities (basic setup)
  - [x] Create custom SCSS file for admin styles using Tailwind (added directives)
  - [ ] Test responsiveness of admin UI with Tailwind

## Day 13-15: Live Preview Implementation

### Day 13: Preview Framework Setup

- [x] Create preview infrastructure
  - [x] Set up preview API routes (backend config)
  - [x] Create preview token generation (implicit via Payload)
  - [ ] Implement preview state management
  - [x] Configure preview security (implicit via Payload auth)

- [ ] Set up preview component structure
  - [ ] Create preview layout components
  - [ ] Implement preview data fetching
  - [ ] Set up real-time preview updates

### Day 14: Device-Based Preview Implementation

- [ ] Implement device preview options
  - [ ] Create mobile view preview
  - [ ] Implement tablet preview mode
  - [ ] Set up desktop preview mode
  - [ ] Add responsive preview controls

- [ ] Create preview UI
  - [ ] Implement preview toolbar
  - [ ] Create device selector component
  - [ ] Add preview mode toggle
  - [ ] Implement preview refresh controls

### Day 15: Preview Integration

- [ ] Integrate preview with editors
  - [ ] Connect rich text editor to preview
  - [ ] Implement form field live preview updates
  - [ ] Set up collection item previews
  - [ ] Create preview links in admin UI

- [ ] Test preview functionality
  - [ ] Verify preview across different devices
  - [ ] Test performance and rendering
  - [ ] Validate preview security
  - [ ] Check preview for various content types

## Day 16-18: Rich Content Editing

### Day 16: Rich Text Configuration

- [x] Set up rich text editor
  - [x] Configure Lexical rich text editor options (default)
  - [ ] Create custom formatting controls
  - [ ] Implement media embedding
  - [ ] Add table and layout options

- [x] Create content blocks system
  - [x] Implement flexible content blocks (using 'blocks' field type)
  - [x] Create block template system (basic Text & Image blocks defined)
  - [ ] Set up block arrangement tools
  - [ ] Add block styling options

### Day 17: Media Management Enhancement

- [x] Improve media handling
  - [x] Implement image cropping and focal point (fields added, example crop defined)
  - [x] Create image gallery component (refactored to group field)
  - [ ] Add video embedding support
  - [ ] Set up SVG and animation support

- [ ] Implement media organization
  - [ ] Create media categories
  - [ ] Implement media search and filtering
  - [ ] Add metadata and tagging for media
  - [ ] Implement media usage tracking

### Day 18: Content Templates

- [x] Create content templates (Data modeled)
  - [ ] Implement template system for common content
  - [x] Create tour package template (Data modeled: price, availability)
  - [ ] Set up product display templates (N/A)
  - [ ] Create location showcase template (N/A)

- [x] Build reusable components (Data modeled)
  - [x] Create pricing component (Data modeled)
  - [x] Implement availability checker (Data modeled)
  - [ ] Build review/rating component (Data modeling skipped)
  - [ ] Create location map component (N/A)

## Day 19-20: Tourism E-commerce Collections

### Day 19: Passenger Collection

- [x] Implement Passenger collection
  - [x] Create passenger schema with necessary fields (name, contact, etc.)
  - [x] Set up relationships (e.g., to bookings or users) (Skipped)
  - [x] Implement access control for passenger data

### Day 20: Tour Collection

- [x] Implement Tour collection
  - [x] Create tour package schema (name, description, duration, price)
  - [x] Set up tour scheduling and availability fields
  - [ ] Implement booking status tracking within the tour or related booking collection
  - [x] Define relationships (e.g., to locations, guides, passengers via bookings) (Gallery group implemented)

## Verification Checklist

- [ ] Draft/publish workflow functions correctly
- [ ] Live preview renders accurately across device sizes
- [ ] Rich text editor supports all required formatting
- [ ] Content blocks allow flexible layouts
- [ ] Media management handles all required file types
- [ ] Passenger and Tour collections are functioning
- [ ] Admin UI is intuitive, responsive, and styled with Tailwind CSS
- [ ] Version history and rollback work properly

## Next Steps for Phase 3

Phase 3 will focus on implementing the Orders system, payment processing, and customer management:

- Orders and checkout system
- Payment gateway integration
- Customer accounts and profiles
- Booking system for tours and packages
- Review and rating system
- Email notifications and confirmations
- Analytics and reporting dashboard

## Reference Documentation

- [Payload CMS Live Preview](https://payloadcms.com/docs/live-preview/overview)
- [Payload CMS Versions](https://payloadcms.com/docs/versions/overview)
- [Payload CMS Rich Text](https://payloadcms.com/docs/fields/rich-text)
- [Payload CMS Relationships](https://payloadcms.com/docs/fields/relationship)
- [Payload CMS Upload](https://payloadcms.com/docs/upload/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 