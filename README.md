# HireSwift

A responsive, demo-first applicant-tracking workspace. The published service runs the React frontend and Express API in one Node container; it is not a static-only replacement. It includes candidate/job management, rule-based matches, filtering/ranking, comparison, pipeline, analytics and an in-memory PDF/DOCX parser endpoint.

## Demo mode

No external credentials are required for the demo. It starts with 15 fictional sample candidates and 5 sample jobs. Demo workspace edits persist in this browser's `localStorage` only—they are not shared between team members/devices or saved to a database. Bulk-email actions create drafts only and do not send email. Matching is deterministic, explainable rules against saved candidate/job data; it is not a trained AI model. Use **Reset demo data** to restore the sample workspace.

## Local run

Requirements: Node 20+ and pnpm 11.

```sh
corepack pnpm install
corepack pnpm dev
```

Vite is served at `http://localhost:3000`; the Express parser API listens at `http://localhost:3001`. The Vite development proxy forwards `/api` requests to Express.

## Production container

The root `Dockerfile` uses Node 22 Alpine, installs from the committed pnpm 11 lockfile, builds the React frontend and TypeScript server, then starts Express with `PORT` (default 3000). Express serves the compiled `dist/` frontend and the `/api/*` routes from the same origin. Health check: `GET /api/health` (HTTP 200, unauthenticated). The container listens on `0.0.0.0` and does not require production credentials for demo mode.

Production configuration variables are optional for the demo: `PORT` (host-provided, defaults to 3000), `MAX_RESUME_MB` (defaults to 10), `SUPABASE_URL` and `SUPABASE_ANON_KEY` (used only to report whether Supabase is configured; there is no authenticated database adapter in this build), and `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (client build values reserved for the optional browser client). Do not set or expose `SUPABASE_SERVICE_ROLE_KEY` in browser/client builds. No credentials are included in this repository.

## Resume uploads

`POST /api/resumes/parse` accepts one multipart file named `resume`, PDF or DOCX, maximum 10 MB. PDF/DOCX content is processed in memory; the API does not store files. Text extraction returns only fields it can identify in source text, and missing details are marked for manual review. It does not upload files to private cloud storage. Do not use this demo for real confidential resumes.

## Supabase setup and current limitation

The SQL migration at `supabase/migrations/202611210001_init.sql` describes the Postgres tables, ownership RLS and private resume bucket policy. It is not applied to a live Supabase project. Authentication, persisted Supabase CRUD, private resume upload/storage and multi-user access are not active. Without a Supabase project and implementing/testing the authenticated data adapter, records remain browser-local. The current container requires no Supabase settings for the demo. If enabling Supabase later, apply the migration, configure auth URLs/storage, implement the data adapter, validate RLS and keep any service-role key on the server only.

## Checks

```sh
corepack pnpm check
corepack pnpm test
corepack pnpm build
```

## Deployment and source

A container deployment is configured using the root `Dockerfile` and `/api/health`. Public hosting and secure HTTPS depend on successful platform publication. A public deployed URL must not be considered available until the deployment result confirms it. GitHub transfer and a third-party Vercel account are separate owner-authorized actions; no Vercel or GitHub credentials are included.

Main source areas: `src/` (React app, fixtures, match engine, storage seam), `server/` (Express API and PDF/DOCX parsing), `supabase/migrations/` (database/RLS setup), `tests/` (match/filter checks). Copy `.env.example` for local development and keep `.env` secret.
