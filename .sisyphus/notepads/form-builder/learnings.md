# Learnings

- Collections `Tours` and `Paquetes` both use a `tabs` field (Hero, Content, Thumbnail, SEO). Adding a new tab labeled `Formulario` fits existing patterns.
- The form builder plugin creates `forms` and `form-submissions` collection slugs by default.
- The repo currently does not appear to have an email adapter configured; form submission emails require one (can be deferred, but should be acknowledged).

## Dependency Installation

- Installed `@payloadcms/plugin-form-builder@3.79.0`.
- **Note**: Version `3.79.0` expects `payload@3.79.0`, but the project is on `payload@3.33.0`. This may cause issues and might require upgrading Payload or downgrading the form builder plugin if errors arise.

## Form Builder Plugin Configuration (Payload v3.33.0+)

### Confirmed Plugin Details

**Export name:** `formBuilderPlugin` (from `@payloadcms/plugin-form-builder`)

**Latest version:** 3.79.0 (March 2026)

### Default Collection Slugs Created

The plugin creates **two collections** by default:

1. **Forms collection:** `forms` (slug: `'forms'`)

   - Stores form schemas/definitions
   - Can be overridden via `formOverrides.slug`

2. **Form Submissions collection:** `form-submissions` (slug: `'form-submissions'`)
   - Stores submitted form data
   - Can be overridden via `formSubmissionOverrides.slug`

### Minimal Configuration

```typescript
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

formBuilderPlugin({
  fields: {
    payment: false, // Disable payment field (most common)
  },
})
```

### Key Configuration Options

**Type Definition:**

```typescript
type FormBuilderPluginConfig = {
  beforeEmail?: BeforeEmail
  defaultToEmail?: string
  fields?: FieldsConfig
  formOverrides?: { fields?: FieldsOverride } & Partial<Omit<CollectionConfig, 'fields'>>
  formSubmissionOverrides?: { fields?: FieldsOverride } & Partial<Omit<CollectionConfig, 'fields'>>
  handlePayment?: HandlePayment
  redirectRelationships?: string[]
}
```

### `redirectRelationships` Explained

**Purpose:** Specifies which collection slugs can be used as redirect targets after form submission.

**Usage:**

```typescript
formBuilderPlugin({
  redirectRelationships: ['pages', 'tours', 'paquetes'],
})
```

**What it does:**

- Populates the form's `redirect` field dropdown with pages from specified collections
- Allows editors to choose a confirmation page to redirect users to after submission
- **Alternative:** Form can display inline confirmation message instead

### Recommended Config for Tours/Paquetes Project

```typescript
formBuilderPlugin({
  fields: {
    payment: false, // We don't need payment processing
    text: true,
    textarea: true,
    email: true,
    number: true,
    select: true,
    checkbox: true,
    // date: false, // Only enable if needed
    // state: false, // US-specific
    // country: false, // Only if needed
  },
  redirectRelationships: ['pages'], // Allow redirect to pages after submission
  formOverrides: {
    // Default slug 'forms' is fine
    access: {
      read: ({ req: { user } }) => !!user, // Authenticated users only
      update: ({ req: { user } }) => !!user,
      delete: ({ req: { user } }) => !!user,
    },
  },
  formSubmissionOverrides: {
    // Default slug 'form-submissions' is fine
    access: {
      create: () => true, // Public can submit
      read: ({ req: { user } }) => !!user, // Only authenticated can read
      update: () => false, // Never allow updates
      delete: ({ req: { user } }) => !!user, // Only authenticated can delete
    },
  },
})
```

### Email Configuration REQUIRED

**CRITICAL:** Form builder plugin **requires** an email adapter to send form submission emails.

**Pitfall:** If no email adapter is configured, form submissions will succeed but emails **will fail silently** (only logged as warnings).

**Minimum email setup in payload.config.ts:**

```typescript
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

export default buildConfig({
  email: nodemailerAdapter({
    defaultFromAddress: 'noreply@yourdomain.com',
    defaultFromName: 'Your Business Name',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  plugins: [
    formBuilderPlugin({
      defaultToEmail: 'info@yourdomain.com', // Fallback recipient
      // ... other config
    }),
  ],
})
```

**Development option (ethereal.email):**

```typescript
email: nodemailerAdapter(), // No args = uses ethereal.email for testing
```

### How Forms Work

1. **Admin creates form** in `forms` collection:

   - Define fields (text, email, checkbox, etc.)
   - Configure confirmation message OR redirect page
   - Set email recipients and template
   - Email supports `{{field_name}}` placeholders and `{{*}}` for all data

2. **Frontend renders form**:

   - Fetch form schema from API: `GET /api/forms/{id}`
   - Map over `fields` array and render your own components
   - Submit to: `POST /api/form-submissions`

3. **On submission**:
   - Data stored in `form-submissions` collection
   - Email sent to configured recipients (requires email adapter!)
   - User sees confirmation message or redirected to page

### Common Issues

1. **GraphQL naming conflicts:**

   ```typescript
   fields: {
     country: {
       interfaceName: 'CountryFormBlock', // Prevents "Country" type collision
     },
   }
   ```

2. **SendGrid 403 errors:**

   - If using SendGrid Link Branding, must also setup Domain Authentication
   - `from` email **must** be from your authenticated domain
   - Can't use `{{email}}` as from address with strict domain auth

3. **Email not sending:**
   - Verify email adapter is configured in payload.config.ts
   - Check console for warnings about missing email config
   - Test with `ethereal.email` first in development

### TypeScript

```typescript
import type {
  PluginConfig,
  Form,
  FormSubmission,
  BeforeEmail,
} from '@payloadcms/plugin-form-builder/types'
```

### References

- **Official docs:** https://payloadcms.com/docs/plugins/form-builder
- **Source code:** https://github.com/payloadcms/payload/tree/main/packages/plugin-form-builder
- **Example:** https://github.com/payloadcms/payload/tree/main/examples/form-builder
- **Email docs:** https://payloadcms.com/docs/email/overview

## Dependency Alignment (2025-03-06)

### Problem

- `@payloadcms/plugin-form-builder` was pinned to `^3.79.0` while `payload` core was `3.33.0`.
- This mismatch caused peer dependency warnings and potential runtime instability.

### Solution

- Downgraded `@payloadcms/plugin-form-builder` to `3.33.0` to match the core payload version.

### Outcome

- `pnpm list @payloadcms/plugin-form-builder` confirms version `3.33.0`.
- Peer dependency warnings for `form-builder` resolved.

## Plugin Registration (2026-03-06)

- Registered `formBuilderPlugin` in `src/payload.config.ts`.
- Configured with `payment: false` and `redirectRelationships: ['tours', 'paquetes']` to allow forms to redirect to these content types.
- Placed after `seoPlugin` to maintain organization.
- Added 'Formulario' tab to `Paquetes` collection with a relationship to `forms` collection (from form-builder plugin).
- Added 'Formulario' tab to `Tours` collection with a relationship to `forms` collection (from form-builder plugin).
