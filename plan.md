# HireSwift — implementation and design plan

## Product scope and delivery assumptions

Deliver a responsive, demo-first applicant tracking web application, not just a marketing page. The evaluator should be able to explore the recruiter workspace immediately, populate/reset labeled sample data, and add, edit, search, filter, compare, rank, and move candidates and jobs without external credentials. Build a real resume upload and text-extraction path for PDF/DOCX; report upload and parse failures honestly and leave unextractable details for manual review. Candidate matching is a deterministic, explainable weighted rule-based calculation over candidate/job data, never described as a trained AI prediction. Bulk email remains a clearly labeled demo composer unless a delivery provider is configured.

The current project environment has a managed server/database capability but no Supabase project credentials, GitHub authorization, or Vercel account authorization. Do not claim those services are connected, that demo-local data is private cloud persistence, or that deployment/repository creation has happened. Include Supabase SQL schema and RLS policies, `.env.example`, optional Supabase Auth/Postgres/private Storage integration hooks, and setup/deployment instructions. The credential-free demo uses browser-local storage; label its persistence accurately. Provide a functioning Express API for parsing uploaded documents and health/config status. Avoid hard-coded credentials or actual resume/candidate personal data.

## Implementation approach

- Frontend: React + TypeScript + Vite, Tailwind CSS, Lucide React, and Recharts. Implement navigation and recruiter-workspace views as reusable typed components with a working mobile drawer and responsive layouts.
- Server: Node.js/Express REST API; Multer memory uploads with PDF and DOCX MIME/extension/size validation; extract text with PDF/DOCX parsers; conservative structured parsing from text with per-field provenance, no invented resume details; consistent JSON errors and health/config endpoints.
- Data and auth: a typed data-access abstraction uses localStorage-backed, explicitly demo-labeled workspace data when Supabase browser-safe variables are absent. Add the Supabase client integration seam and SQL migrations for recruiter-owned users/profiles, candidates, resumes, jobs, applications, interviews, recruitment activities, and email logs, with ownership policies and private resume bucket policies. Do not put service-role secrets in browser output. Do not imply managed database tables exist until the evaluator configures Supabase and applies migrations.
- Functionality: create/edit/archive/delete jobs and candidates; calculate selected-job match scores with the specified weights (required skills 40%, education 15%, experience 20%, projects 10%, certifications 5%, additional skills 10%) and show matched/missing skills plus explanation; combine candidate filters and sorting; compare selected candidates; drag/drop or action-move candidates across Applied, Shortlisted, Interview, Offer, Rejected; track notes/interview data/rejection reason; update metrics/charts from current workspace state; export CSV; upload multiple files with per-file status/progress and duplicate detection; expose demo email behavior as a draft only, not a false send claim.
- Quality/deployment: responsive accessible UI, empty/loading/error/confirmation states, no dead navigation/buttons, README, `.env.example`, database migration SQL, tests for matching/parsing/filtering, source ZIP excluding dependencies and secrets. A real external public Vercel URL and connected GitHub repository remain account-dependent and are not represented as complete without verified authorization and publication.

## Project structure

- `src/` — React entry, app shell, navigation, reusable UI, page modules, charts, typed domain models, demo fixtures, matching/filtering, storage adapters, and Supabase browser client.
- `server/` — Express entry, REST routes, upload validation, PDF/DOCX extraction and structured parsing.
- `supabase/migrations/` — PostgreSQL tables, foreign keys, ownership RLS, private resume storage policies, and demo-safe migration setup.
- `public/` — route manifest and static branding assets.
- Root `README.md`, `.env.example`, `package.json`, Tailwind/Vite/TypeScript configuration, test setup, and `.gitignore`.

## Design direction

Three sampled possibilities (each below 0.10): **Swiss editorial hiring desk** (0.07), **midnight AI command center** (0.04), **soft lilac HR workspace** (0.08). Choose **Swiss editorial hiring desk**.

- **Design movement:** Swiss editorial typography and contemporary productivity software, softened for a welcoming small-team hiring workspace.
- **Core principles:** clear information hierarchy; candidate data remains scannable; every consequential action is explicit; demo and computed data are labeled honestly.
- **Color philosophy:** quiet warm off-white and cool grey canvases keep dense lists calm; deep ink/navy anchors navigation and trust; a distinct electric violet marks the primary hiring action and match intelligence; restrained green/amber/rose indicate pipeline states.
- **Layout paradigm:** fixed narrow left rail/sidebar and a spacious, left-aligned working canvas; dashboards use editorial bands and asymmetric panels rather than a centered marketing grid.
- **Signature elements:** compact violet HireSwift monogram tile; slim score rings with explanatory labels; stage-colored pipeline pills and a subtle dotted flow cue.
- **Interaction philosophy:** fast inline search/filter; keyboard-friendly controls; immediate status feedback; confirm destructive actions; mobile navigation collapses cleanly.
- **Animation:** short 140–200 ms opacity/translate transitions for menus, panels, and hover states; restrained chart entrance; honor reduced-motion preferences; no decorative looping motion.
- **Typography system:** Inter for interface and data; use a strong 28–32 px dashboard title, 14 px labels/body, 12 px metadata; tabular numerals for metrics and scores.
- **Brand essence:** a faster, clearer shortlisting desk for lean hiring teams; **precise, energetic, dependable**.
- **Brand voice:** confident, direct and evidence-led. Examples: “Shortlist on signal, not guesswork.” “Every match comes with a reason.”
- **Wordmark & logo:** a custom SVG monogram joining two ascending strokes into a forward-moving H, paired with a clean wordmark.
- **Signature brand color:** bright violet, used sparingly for selection and primary actions.
