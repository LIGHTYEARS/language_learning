# Language Learning — Workplace Vocab (FSRS)

Interactive English vocabulary app for frozen workplace “home scenes” + target chunks, with a lightweight FSRS scheduler. Canonical state lives in **Cloudflare D1** when the Worker API is available; `localStorage` is offline fallback only.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Data

- Markdown bank: `vocab/` (`INDEX.md`, `HOME_SCENES.md`, `CARD.template.md`, `words/*.md`, `cards.json`)
- App loads: `src/data/cards.json` (also mirrored at `public/vocab/cards.json`)

There are **17** workplace lemma cards in the seed.

## How to add words

1. Copy `vocab/CARD.template.md` → `vocab/words/<slug>.md` and fill IPA, gloss, **frozen home scene**, cloze, USE/AVOID, target chunks.
2. Register the scene in `vocab/HOME_SCENES.md` / `INDEX.md` if needed.
3. Append a matching object to `vocab/cards.json` (and sync to `src/data/cards.json` + `public/vocab/cards.json`).
4. Rebuild / refresh the app.

Keep the **home scene frozen** — do not nightly-reskin sentences; FSRS schedules the same scene + chunks.

## Pedagogy

See `vocab/LEARNING_FACE.md` (canonical learning-face v2).

| Piece | Role |
| --- | --- |
| **Frozen home scene** | One stable workplace micro-story per lemma; bolded chunks stay constant |
| **Target chunks** | Collocations you produce (`a durable fix`, not bare lemma); grade on chunk + register |
| **Teach (new)** | Full face: IPA → etymology → gloss → chunks → USE/AVOID → scene → Why → cloze → rewrite → rate |
| **Review (due)** | Cue-fade ladder: CN reopen → title cue produce → Why → same-scene upgrade → rate |
| **FSRS lite** | D1 `fsrs_state` when API is up; else `localStorage` `ll-fsrs-v1` |

**Hard bans:** lemma↔Chinese MCQ and synonym-pick chunk MCQ are not the main path. **No nightly reskins.**

### Rating rules (Asia/Shanghai calendar)

- **Again**: `status=weak`; `S=max(0.1,S*0.5)`; `due=today`
- **Hard**: `S=max(1,S*1.2)` if `S>0` else `0.8`; `due=today+max(1,round(S))`
- **Good**: if `S==0` then `S=1` else `S=S*2.5`; `due=today+max(1,round(S))`; `status=learning`
- **Easy**: if `S==0` then `S=2.5` else `S=S*3.5`; `D=max(1,D-0.2)`; `due=today+max(2,round(S))`; `status=learning`

Export merges FSRS fields back into a downloadable `cards.json`.

## Keyboard

- **Enter** — advance teach / after cloze·chunk when ready
- **1 / 2 / 3 / 4** — Again / Hard / Good / Easy on the rate step



## Cloudflare (Free tier only)

Deploys as a single **Worker** that serves the Vite `dist/` assets and `/api/*` against **D1**.  
**Do not enable Workers Paid, Durable Objects, or paid add-ons** — this project is designed for the Free plan.

### 1. Create D1 + config

```bash
npx wrangler d1 create language-learning-db
# Paste database_id into wrangler.jsonc → d1_databases[0].database_id
```

### 2. Secrets (never commit)

```bash
npx wrangler secret put ADMIN_SECRET
# Used for: POST /api/review, POST /api/admin/seed, GET /api/admin/stats
# Header: x-admin-secret: <secret>   (or Authorization: Bearer <secret>)
```

Optional local file (gitignored): `.dev.vars`

```
ADMIN_SECRET=dev-secret
```

### 3. Migrate + deploy

```bash
npm install
npm run build
npm run d1:migrate:remote   # or: npx wrangler d1 migrations apply language-learning-db --remote
npx wrangler deploy         # or: npm run deploy
```

After deploy, open Admin in the app → paste secret → **Seed from vocab/cards.json**.

### 4. Frontend API base

| Mode | Setting |
| --- | --- |
| Same-origin (recommended) | leave `VITE_API_BASE` unset — browser calls `/api/*` |
| Split / local Vite | `.env.local`: `VITE_API_BASE=https://<worker>.workers.dev` |

### Sample curls

```bash
BASE=https://language-learning.<account>.workers.dev
SECRET=your-admin-secret

curl -s "$BASE/api/health"
curl -s "$BASE/api/due?date=2026-09-17"
curl -s "$BASE/api/card/bounded"
curl -s -X POST "$BASE/api/admin/seed" -H "x-admin-secret: $SECRET"
curl -s "$BASE/api/admin/stats" -H "x-admin-secret: $SECRET"
curl -s -X POST "$BASE/api/review" \
  -H "content-type: application/json" \
  -H "x-admin-secret: $SECRET" \
  -d '{"lemma":"bounded","home_scene_id":"scope-spike-ticket","rating":"good"}'
```

### Free-tier checklist

- ✅ Workers + static assets + D1 only  
- ❌ No Durable Objects  
- ❌ No Workers Paid / Queues / Hyperdrive / R2 paid features required  

Local API + assets: `npm run cf:dev` (after `npm run build`).

## License

Private study material; seed content for personal learning use.
