# Issues

- `@payloadcms/plugin-form-builder` was initially installed as `^3.79.0` while the repo uses `payload@3.33.0` (peer mismatch). We should align versions (pin plugin to `3.33.0`) to avoid runtime/type incompatibilities.
- Pre-existing TypeScript errors exist in `src/collections/Tours/hooks/revalidateTour.ts` (domainTourId/bussiness). These may cause `pnpm build` / typecheck to fail even if form-builder work is correct.
