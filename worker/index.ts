import cardsSeed from '../vocab/cards.json'
import { todayShanghai, nowIsoShanghai } from './dates'
import { applyRating, defaultFsrs, type Rating, type FsrsState } from './fsrs'

export interface Env {
  DB: D1Database
  ASSETS: Fetcher
  ADMIN_SECRET: string
}

interface SeedCard {
  slug: string
  lemma: string
  home_scene_id: string
  due?: string
  stability?: number
  difficulty?: number
  status?: string
  [key: string]: unknown
}

interface CardsFile {
  version: number
  updated: string
  cards: SeedCard[]
}

const seed = cardsSeed as CardsFile

function json(data: unknown, status = 200, extra: HeadersInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...extra,
    },
  })
}

function err(message: string, status: number): Response {
  return json({ error: message }, status)
}

function requireAdmin(request: Request, env: Env): Response | null {
  const secret = env.ADMIN_SECRET
  if (!secret) {
    return err('ADMIN_SECRET not configured on Worker', 503)
  }
  const header =
    request.headers.get('x-admin-secret') ||
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
    ''
  if (header !== secret) {
    return err('unauthorized', 401)
  }
  return null
}

function isRating(v: unknown): v is Rating {
  return v === 'again' || v === 'hard' || v === 'good' || v === 'easy'
}

async function getFsrs(
  db: D1Database,
  lemma: string,
  homeSceneId: string,
): Promise<FsrsState | null> {
  const row = await db
    .prepare(
      `SELECT due, stability, difficulty, status, last_reviewed
       FROM fsrs_state WHERE lemma = ? AND home_scene_id = ?`,
    )
    .bind(lemma, homeSceneId)
    .first<{
      due: string
      stability: number
      difficulty: number
      status: string
      last_reviewed: string | null
    }>()
  if (!row) return null
  return {
    due: row.due,
    stability: row.stability,
    difficulty: row.difficulty,
    status: row.status,
    last_reviewed: row.last_reviewed,
  }
}

async function upsertFsrs(
  db: D1Database,
  lemma: string,
  homeSceneId: string,
  state: FsrsState,
): Promise<void> {
  const updatedAt = nowIsoShanghai()
  await db
    .prepare(
      `INSERT INTO fsrs_state
         (lemma, home_scene_id, due, stability, difficulty, status, last_reviewed, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(lemma, home_scene_id) DO UPDATE SET
         due = excluded.due,
         stability = excluded.stability,
         difficulty = excluded.difficulty,
         status = excluded.status,
         last_reviewed = excluded.last_reviewed,
         updated_at = excluded.updated_at`,
    )
    .bind(
      lemma,
      homeSceneId,
      state.due,
      state.stability,
      state.difficulty,
      state.status,
      state.last_reviewed,
      updatedAt,
    )
    .run()
}

async function handleHealth(env: Env): Promise<Response> {
  let dbOk = false
  try {
    await env.DB.prepare('SELECT 1 AS ok').first()
    dbOk = true
  } catch {
    dbOk = false
  }
  return json({
    ok: true,
    free_tier: true,
    db: dbOk,
    today: todayShanghai(),
  })
}

async function handleDue(env: Env, dateParam: string | null): Promise<Response> {
  const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : todayShanghai()

  const { results: cardRows } = await env.DB.prepare(
    `SELECT slug, lemma, home_scene_id, payload FROM cards ORDER BY slug`,
  ).all<{ slug: string; lemma: string; home_scene_id: string; payload: string }>()

  if (!cardRows || cardRows.length === 0) {
    return json({ date, count: 0, cards: [], hint: 'POST /api/admin/seed first' })
  }

  const { results: fsrsRows } = await env.DB.prepare(
    `SELECT lemma, home_scene_id, due, stability, difficulty, status, last_reviewed
     FROM fsrs_state`,
  ).all<{
    lemma: string
    home_scene_id: string
    due: string
    stability: number
    difficulty: number
    status: string
    last_reviewed: string | null
  }>()

  const fsrsMap = new Map<string, FsrsState>()
  for (const r of fsrsRows ?? []) {
    fsrsMap.set(`${r.lemma}::${r.home_scene_id}`, {
      due: r.due,
      stability: r.stability,
      difficulty: r.difficulty,
      status: r.status,
      last_reviewed: r.last_reviewed,
    })
  }

  const dueCards = []
  for (const row of cardRows) {
    let card: Record<string, unknown>
    try {
      card = JSON.parse(row.payload) as Record<string, unknown>
    } catch {
      continue
    }
    const key = `${row.lemma}::${row.home_scene_id}`
    const fsrs = fsrsMap.get(key) ?? {
      due: (card.due as string) || date,
      stability: (card.stability as number) ?? 0,
      difficulty: (card.difficulty as number) ?? 5,
      status: (card.status as string) ?? 'new',
      last_reviewed: null,
    }
    if (fsrs.due <= date) {
      dueCards.push({
        ...card,
        due: fsrs.due,
        stability: fsrs.stability,
        difficulty: fsrs.difficulty,
        status: fsrs.status,
        last_reviewed: fsrs.last_reviewed,
      })
    }
  }

  return json({ date, count: dueCards.length, cards: dueCards })
}

async function handleCard(env: Env, slug: string): Promise<Response> {
  const row = await env.DB.prepare(
    `SELECT slug, lemma, home_scene_id, payload FROM cards WHERE slug = ?`,
  )
    .bind(slug)
    .first<{ slug: string; lemma: string; home_scene_id: string; payload: string }>()

  if (!row) return err('card not found', 404)

  let card: Record<string, unknown>
  try {
    card = JSON.parse(row.payload) as Record<string, unknown>
  } catch {
    return err('corrupt card payload', 500)
  }

  const fsrs =
    (await getFsrs(env.DB, row.lemma, row.home_scene_id)) ??
    ({
      due: (card.due as string) || todayShanghai(),
      stability: (card.stability as number) ?? 0,
      difficulty: (card.difficulty as number) ?? 5,
      status: (card.status as string) ?? 'new',
      last_reviewed: null,
    } satisfies FsrsState)

  return json({
    card: {
      ...card,
      due: fsrs.due,
      stability: fsrs.stability,
      difficulty: fsrs.difficulty,
      status: fsrs.status,
      last_reviewed: fsrs.last_reviewed,
    },
    fsrs,
  })
}

async function handleReview(request: Request, env: Env): Promise<Response> {
  const denied = requireAdmin(request, env)
  if (denied) return denied

  let body: { lemma?: string; home_scene_id?: string; rating?: string; slug?: string }
  try {
    body = (await request.json()) as typeof body
  } catch {
    return err('invalid JSON', 400)
  }

  const lemma = body.lemma?.trim()
  const homeSceneId = body.home_scene_id?.trim()
  const rating = body.rating
  if (!lemma || !homeSceneId || !isRating(rating)) {
    return err('lemma, home_scene_id, and rating (again|hard|good|easy) required', 400)
  }

  const existing = await getFsrs(env.DB, lemma, homeSceneId)
  const current = existing ?? defaultFsrs()
  const next = applyRating(current, rating)

  await upsertFsrs(env.DB, lemma, homeSceneId, next)
  await env.DB.prepare(
    `INSERT INTO reviews (lemma, home_scene_id, rating, created_at) VALUES (?, ?, ?, ?)`,
  )
    .bind(lemma, homeSceneId, rating, nowIsoShanghai())
    .run()

  return json({ ok: true, lemma, home_scene_id: homeSceneId, rating, fsrs: next })
}

async function handleSeed(request: Request, env: Env): Promise<Response> {
  const denied = requireAdmin(request, env)
  if (denied) return denied

  const cards = seed.cards
  const updatedAt = nowIsoShanghai()
  const stmts = cards.map((c) =>
    env.DB.prepare(
      `INSERT INTO cards (slug, lemma, home_scene_id, payload, updated_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(slug) DO UPDATE SET
         lemma = excluded.lemma,
         home_scene_id = excluded.home_scene_id,
         payload = excluded.payload,
         updated_at = excluded.updated_at`,
    ).bind(c.slug, c.lemma, c.home_scene_id, JSON.stringify(c), updatedAt),
  )

  // Also ensure fsrs_state rows exist for seeded cards (do not overwrite existing FSRS)
  for (const c of cards) {
    stmts.push(
      env.DB.prepare(
        `INSERT OR IGNORE INTO fsrs_state
           (lemma, home_scene_id, due, stability, difficulty, status, last_reviewed, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, NULL, ?)`,
      ).bind(
        c.lemma,
        c.home_scene_id,
        c.due || todayShanghai(),
        c.stability ?? 0,
        c.difficulty ?? 5,
        c.status ?? 'new',
        updatedAt,
      ),
    )
  }

  await env.DB.batch(stmts)

  const count = await env.DB.prepare('SELECT COUNT(*) AS n FROM cards').first<{ n: number }>()
  return json({ ok: true, seeded: cards.length, cards_in_db: count?.n ?? 0 })
}

async function handleStats(request: Request, env: Env): Promise<Response> {
  const denied = requireAdmin(request, env)
  if (denied) return denied

  const today = todayShanghai()
  const [cards, fsrs, reviews, dueToday, weak, learning, newish] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS n FROM cards').first<{ n: number }>(),
    env.DB.prepare('SELECT COUNT(*) AS n FROM fsrs_state').first<{ n: number }>(),
    env.DB.prepare('SELECT COUNT(*) AS n FROM reviews').first<{ n: number }>(),
    env.DB.prepare('SELECT COUNT(*) AS n FROM fsrs_state WHERE due <= ?').bind(today).first<{ n: number }>(),
    env.DB.prepare(`SELECT COUNT(*) AS n FROM fsrs_state WHERE status = 'weak'`).first<{ n: number }>(),
    env.DB.prepare(`SELECT COUNT(*) AS n FROM fsrs_state WHERE status = 'learning'`).first<{ n: number }>(),
    env.DB.prepare(`SELECT COUNT(*) AS n FROM fsrs_state WHERE status = 'new' OR stability = 0`).first<{
      n: number
    }>(),
  ])

  const recent = await env.DB.prepare(
    `SELECT lemma, home_scene_id, rating, created_at FROM reviews ORDER BY id DESC LIMIT 10`,
  ).all()

  return json({
    today,
    cards: cards?.n ?? 0,
    fsrs_rows: fsrs?.n ?? 0,
    reviews: reviews?.n ?? 0,
    due_today: dueToday?.n ?? 0,
    status: {
      weak: weak?.n ?? 0,
      learning: learning?.n ?? 0,
      new: newish?.n ?? 0,
    },
    recent_reviews: recent.results ?? [],
  })
}


async function handleCards(env: Env): Promise<Response> {
  const { results: cardRows } = await env.DB.prepare(
    `SELECT slug, lemma, home_scene_id, payload FROM cards ORDER BY slug`,
  ).all<{ slug: string; lemma: string; home_scene_id: string; payload: string }>()

  if (!cardRows || cardRows.length === 0) {
    return json({ count: 0, cards: [], hint: 'POST /api/admin/seed first' })
  }

  const { results: fsrsRows } = await env.DB.prepare(
    `SELECT lemma, home_scene_id, due, stability, difficulty, status, last_reviewed FROM fsrs_state`,
  ).all<{
    lemma: string
    home_scene_id: string
    due: string
    stability: number
    difficulty: number
    status: string
    last_reviewed: string | null
  }>()

  const fsrsMap = new Map<string, FsrsState>()
  for (const r of fsrsRows ?? []) {
    fsrsMap.set(`${r.lemma}::${r.home_scene_id}`, {
      due: r.due,
      stability: r.stability,
      difficulty: r.difficulty,
      status: r.status,
      last_reviewed: r.last_reviewed,
    })
  }

  const cards = []
  for (const row of cardRows) {
    let card: Record<string, unknown>
    try {
      card = JSON.parse(row.payload) as Record<string, unknown>
    } catch {
      continue
    }
    const fsrs = fsrsMap.get(`${row.lemma}::${row.home_scene_id}`)
    if (fsrs) {
      cards.push({
        ...card,
        due: fsrs.due,
        stability: fsrs.stability,
        difficulty: fsrs.difficulty,
        status: fsrs.status,
        last_reviewed: fsrs.last_reviewed,
      })
    } else {
      cards.push(card)
    }
  }

  return json({ count: cards.length, cards })
}

async function handleApi(request: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname.replace(/\/+$/, '') || '/'
  const method = request.method.toUpperCase()

  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, POST, OPTIONS',
        'access-control-allow-headers': 'content-type, x-admin-secret, authorization',
      },
    })
  }

  try {
    if (method === 'GET' && path === '/api/cards') return handleCards(env)
    if (method === 'GET' && path === '/api/health') return handleHealth(env)
    if (method === 'GET' && path === '/api/due') return handleDue(env, url.searchParams.get('date'))
    if (method === 'GET' && path.startsWith('/api/card/')) {
      const slug = decodeURIComponent(path.slice('/api/card/'.length))
      if (!slug) return err('slug required', 400)
      return handleCard(env, slug)
    }
    if (method === 'POST' && path === '/api/review') return handleReview(request, env)
    if (method === 'POST' && path === '/api/admin/seed') return handleSeed(request, env)
    if (method === 'GET' && path === '/api/admin/stats') return handleStats(request, env)
    return err('not found', 404)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'internal error'
    return err(message, 500)
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/')) {
      const res = await handleApi(request, env, url)
      // CORS for local Vite → remote API
      const headers = new Headers(res.headers)
      headers.set('access-control-allow-origin', '*')
      return new Response(res.body, { status: res.status, headers })
    }
    return env.ASSETS.fetch(request)
  },
}
