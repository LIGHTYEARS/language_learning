# Language Learning — Workplace Vocab (FSRS)

Interactive English vocabulary app for frozen workplace “home scenes” + target chunks, with a lightweight FSRS scheduler persisted in `localStorage`.

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

| Piece | Role |
| --- | --- |
| **Frozen home scene** | One stable workplace micro-story per lemma; bolded chunks stay constant |
| **Target chunks** | Collocations you actually produce (`a durable fix`, not bare lemma) |
| **Teach → Cloze → Chunk check → Rate** | Encode meaning, retrieve into blanks, discriminate chunks, then schedule |
| **FSRS lite** | `localStorage` key `ll-fsrs-v1`: per-slug `{ due, stability, difficulty, status, last_reviewed }` |

**No nightly reskins.** Changing the scene every day defeats spaced retrieval of the same form.

### Rating rules (Asia/Shanghai calendar)

- **Again**: `status=weak`; `S=max(0.1,S*0.5)`; `due=today`
- **Hard**: `S=max(1,S*1.2)` if `S>0` else `0.8`; `due=today+max(1,round(S))`
- **Good**: if `S==0` then `S=1` else `S=S*2.5`; `due=today+max(1,round(S))`; `status=learning`
- **Easy**: if `S==0` then `S=2.5` else `S=S*3.5`; `D=max(1,D-0.2)`; `due=today+max(2,round(S))`; `status=learning`

Export merges FSRS fields back into a downloadable `cards.json`.

## Keyboard

- **Enter** — advance teach / after cloze·chunk when ready
- **1 / 2 / 3 / 4** — Again / Hard / Good / Easy on the rate step

## License

Private study material; seed content for personal learning use.
