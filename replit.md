# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Smartmonie (artifacts/metrix) — `previewPath: /`
Biometric merchant payment app built with React + Vite. Payment processed by Metrix. Full payment flow UI:
- Face verification screen with animated scanner
- BVN phone number input
- Authenticating User Data screen with step-by-step progress
- User details display (sensitive info masked: 123XXXX89 style)
- Bank selection modal with search (20 Nigerian banks, 5 registered to BVN)
- Amount + narration entry with quick-select buttons
- Fingerprint biometric confirmation screen
- Processing payment screen with animated steps
- Payment Approved screen with ₦20,000 discount banner
- Printable receipt with full purchase items, VAT, loyalty discount

All biometric steps are simulated (animated UI only) — no backend required.

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
