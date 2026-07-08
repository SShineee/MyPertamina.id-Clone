# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyPertamina Clone — a full-stack clone of the MyPertamina.id website, built as a Pertamina internship project following Agile. Three independent apps in one repo, each with its own `package.json` and `node_modules` (no workspace/monorepo tooling — run each separately):

- **`frontend/`** — Main Application (public-facing site): Nuxt 4 / Vue 3, SSR.
- **`backend/`** — REST API: Express.js + MySQL (`mysql2`), JWT auth, dynamic RBAC. Also mirrored as its own repo, [`mypertamina-clone-be`](https://github.com/MaheswaraKaindra/mypertamina-clone-be) — see "Pertamina Apps / MyPertamina App Service Mock integration" below.
- **`cms/`** — Admin dashboard (Nuxt 4, SPA/`ssr:false`) for managing content, prices, users, and roles. **Built by a teammate — do not modify files under `cms/` unless explicitly asked.**
- **`docs/`** — `use-case.md` (narrative) and `Use-Case-Diagram-and-Specification.pdf` (formal UML diagrams + spec) covering the Frontend and Backend only; CMS isn't covered in these docs yet.
- **`mypertamina-clone-service/`** — separate mock of the actual Pertamina/MyPertamina mobile app (Anggota 1's work, finished). Its own independent repo/git history — [github.com/MaheswaraKaindra/mypertamina-clone-service](https://github.com/MaheswaraKaindra/mypertamina-clone-service), cloned locally as a sibling folder purely for local dev convenience (not a submodule, not tracked by this repo's git).

## Commands

No linter or test suite is configured in any of the three apps (backend's `npm test` is an unconfigured stub). Verification is done by actually running the app.

```bash
# Backend (from backend/)
npm install
npm run dev              # nodemon, reads backend/.env, http://localhost:3001
npm start                # node (no reload)
npm run seed              # seeds roles/permissions/admin/prices/products/etc; DB must already have the schema applied

# One-time DB setup (schema.sql is not auto-applied by seed or the server):
mysql -u root -p <DB_NAME> < backend/src/db/schema.sql

# Frontend (from frontend/)
npm install
npm run dev               # http://localhost:3000

# CMS (from cms/)
npm install
npm run dev                # also defaults to :3000 — pass `-- --port <n>` if running alongside frontend
```

Default seeded login: `admin@mypertamina.local` / `Admin123!` (Super Admin role).

`CREATE TABLE IF NOT EXISTS` in `schema.sql` does not add columns to an already-existing table — if the schema gains new columns later, existing local databases need a manual `ALTER TABLE` (or drop/recreate) before re-running it.

## Architecture

### Backend (`backend/src`)

Layered per resource: `routes/*Routes.js` → `controllers/*Controller.js` → `models/*Model.js` (raw SQL via `mysql2`, no ORM). `index.js` wires all routers under `/api/*` plus `/api/health` and static file serving at `/public` (→ `backend/public`, used for uploaded content images).

- **Auth**: `middlewares/auth.js` exports `requireAuth` (validates JWT from `Authorization: Bearer`, loads the user + their permissions onto `req.user`/`req.permissions`) and `requirePermission(...codes)` (checks `req.permissions`). Permissions and roles are fully dynamic — seeded in `db/seed.js` (`price.view`, `price.update`, `content.view`, `content.manage`, `user.manage`, `role.manage`) and manageable at runtime via `/api/roles`, not hardcoded per-route beyond which permission code a route requires.
- **Response convention**: success → `{ data: ... }` (or `{ token, user }` for login); errors → `{ message: ... }` with the matching HTTP status (400/401/403/404/500).
- **`utils/findOrNotFound.js`**: shared helper for the "load by id, 404 if missing" pattern used across `price`, `brightGasPrice`, `content`, `faq`, `user`, and `role` controllers — reuse it rather than re-inlining the check.
- **Uploads**: `middlewares/upload.js` (multer) writes into `backend/public/uploads/promos`, creating that directory on load if missing (it's gitignored, not committed).
- **Fuel prices are province-scoped**: `fuel_prices` has a `(province, fuel_type)` unique key; `GET /api/prices` optionally filters by `?province=`.

### Frontend & CMS (Nuxt apps)

Both call the backend exclusively through a `useApi`/`apiFetch` composable (`app/composables/useApi.ts`) that reads the base URL from `runtimeConfig.public.apiBase` (env `NUXT_PUBLIC_API_BASE`, defaults to `http://localhost:3001/api`). **Never hardcode the backend URL in a page/component** — always go through this composable so it respects runtime config in every environment.

- **Frontend**: pages are plain public routes (no auth). Some pages (e.g. `about/keuntungan-mypertamina.vue`, `about/mypertamina-channel.vue`) still render from static composables (`useBenefitContent.ts`, `useFuelPriceMatrix.ts`) rather than the API — see `docs/use-case.md` §9 for the current list of what's still static vs. API-backed.
- **CMS**: JWT is stored in a cookie (`cms_token`) via `useAuthToken()`/`useAuth()` (`app/composables/useAuth.ts`), not `localStorage`. A global route middleware (`app/middleware/auth.global.ts`) redirects to `/login` when there's no valid session. Page-level actions are gated with `hasPermission(code)` from `useAuth()`.

## Git Workflow

- One branch per GitHub issue/user story: `feature/issue-US-MyPertamina-XXX-<slug>`.
- PRs target `develop`, not `main`; `main` is updated from `develop` later after review/audit.
- The repo owner pushes and opens PRs manually — do not `git push` or open PRs unless explicitly asked to in that session.

## Project Status

- **Frontend**: homepage, header nav (incl. nested Subsidi Tepat drawer), fuel/Bright Gas price pages, promo directory + detail, product detail pages, location directory (SPBU/GES/Bright/LPG), sustainability pages, contact page — all implemented and API-backed except the static pages noted above.
- **Backend**: full REST API for auth, prices (province-based), Bright Gas prices, products, locations, contents, sustainability stats, FAQs, users, and roles, with JWT + dynamic RBAC throughout.
- **CMS**: login, dashboard, prices, contents, users, and roles pages (teammate's work, functional).
- **Docs**: `docs/use-case.md` + the generated PDF cover Frontend + Backend use cases, diagrams, API reference, and known limitations. Not yet updated for CMS.

### Pertamina Apps / MyPertamina App Service Mock integration

Done. `mypertamina-clone-service` (Anggota 1) is a finished, separate mock of the Pertamina/MyPertamina mobile app — its own repo, own MySQL database (`mypertamina_app_mock`), own JWT secret. `backend/` integrates with it **only over its public REST API** (`services/appServiceClient.js`, base URL `APP_SERVICE_BASE_URL`, default `http://localhost:4000/api`) — never touches its database directly.

`backend/` exposes this under `/api/app/*` (kept separate from `/api/auth/*`/`/api/users/*`, which are the existing CMS admin login/RBAC — reusing those paths would collide): `/api/app/auth/login`, `/me`, `/balance`, `/points`, `/vehicles`, `/transactions`, `/vouchers`, `/notifications`, `/dashboard`. Every one of these has been checked line-by-line against the App Service's actual source code (not just its docs) and confirmed to match; see `backend/CLAUDE.md` for the full verification report. Error handling (App Service down → `503`; App Service's own 4xx/5xx → forwarded as-is) is implemented and tested against a live instance of the App Service.

Not yet done: a full happy-path run with real seeded data end-to-end (blocked on having MySQL available for both `backend/` and the App Service in the same environment — not a code gap), and the frontend/CMS-facing pieces (login page, dashboard, etc. — Anggota 3's scope).
