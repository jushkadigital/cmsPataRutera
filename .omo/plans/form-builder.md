# Form Builder Integration Plan for Tours & Paquetes

## Context & Goal

Integrate `@payloadcms/plugin-form-builder` to allow editors to attach custom forms to Tours and Paquetes. The form schema must be exposed via API, and the forms will be configurable in a dedicated "Form" tab in both collections.

## Key Decisions

- **Form Placement**: A dedicated "Form" tab in `Tours` and `Paquetes` collections.
- **Link Type**: A `relationship` field pointing to the `forms` collection.
- **Form Plugin Setup**: Configured with `redirectRelationships: ['tours', 'paquetes']` so forms can redirect to these endpoints.

## Scope

- **IN**: Install the plugin, update `payload.config.ts`, add the Form tab to both collections, run migrations, and generate types.
- **OUT**: Frontend form rendering implementation (to be handled separately).

## Guardrails (From Metis)

- Ensure the email configuration is acknowledged (though maybe not fully implemented if the user doesn't have an SMTP server yet, but the plugin requires at least knowing it might try to send emails). The plugin's `defaultToEmail` will be set to a safe fallback.
- The `relationship` field should NOT use `hasMany: true` as we want one main form per Tour/Paquete.

## Execution Plan

### Wave 1: Installation

1. [x] Install `@payloadcms/plugin-form-builder` using `pnpm`.
   - **QA**: Run `pnpm list @payloadcms/plugin-form-builder` to confirm version.

### Wave 2: Plugin Configuration

2. [x] Update `src/payload.config.ts`.
   - Import `formBuilderPlugin` from `@payloadcms/plugin-form-builder`.
   - Add to the `plugins` array.
   - Configure `redirectRelationships: ['tours', 'paquetes']`.
   - **QA**: Ensure the file builds correctly without syntax errors.

### Wave 3: Schema Updates

3. [x] Add "Form" tab to `Tours` collection.
   - Edit `src/collections/Tours/index.ts`.
   - Add `{ label: 'Formulario', fields: [{ name: 'form', type: 'relationship', relationTo: 'forms', label: 'Formulario' }] }` to the `tabs` array.
   - **QA**: Ensure `Tours` type correctly infers the `form` field in `payload-types.ts`.
4. [x] Add "Form" tab to `Paquetes` collection.
   - Edit `src/collections/Paquetes/index.ts`.
   - Add `{ label: 'Formulario', fields: [{ name: 'form', type: 'relationship', relationTo: 'forms', label: 'Formulario' }] }` to the `tabs` array.
   - **QA**: Ensure `Paquetes` type correctly infers the `form` field.

### Wave 4: Migration & Types

5. [x] Run Database Migrations.
   - Run `pnpm payload migrate` to create `forms` and `form_submissions` tables and update relations.
   - **QA**: Check that migration completes with no errors.
6. [x] Generate Payload Types.
   - Run `pnpm generate:types`.
   - **QA**: Check `src/payload-types.ts` for the newly added `forms` types.

## Final Verification Wave

Run tests and manual verification.
