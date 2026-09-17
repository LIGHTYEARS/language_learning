import type { Rating, VocabCard } from '../types'

const ADMIN_KEY = 'll-admin-secret'

/** Empty string = same-origin /api (Workers assets). Set VITE_API_BASE for split deploys. */
export function apiBase(): string {
  const raw = (import.meta.env.VITE_API_BASE as string | undefined)?.trim()
  if (raw === undefined || raw === '') return ''
  return raw.replace(/\/+$/, '')
}

export function getAdminSecret(): string {
  try {
    return sessionStorage.getItem(ADMIN_KEY) ?? ''
  } catch {
    return ''
  }
}

export function setAdminSecret(secret: string): void {
  sessionStorage.setItem(ADMIN_KEY, secret)
}

export function clearAdminSecret(): void {
  sessionStorage.removeItem(ADMIN_KEY)
}

async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const url = `${apiBase()}${path}`
  return fetch(url, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
    },
  })
}

function withAdmin(headers: HeadersInit = {}): HeadersInit {
  const secret = getAdminSecret()
  return secret ? { ...headers, 'x-admin-secret': secret } : headers
}

export async function checkApi(): Promise<boolean> {
  try {
    const res = await apiFetch('/api/health')
    if (!res.ok) return false
    const data = (await res.json()) as { ok?: boolean }
    return data.ok === true
  } catch {
    return false
  }
}

export async function fetchCardsFromApi(): Promise<VocabCard[] | null> {
  try {
    const res = await apiFetch('/api/cards')
    if (!res.ok) return null
    const data = (await res.json()) as { cards?: VocabCard[]; hint?: string }
    if (!data.cards || data.cards.length === 0) return null
    return data.cards
  } catch {
    return null
  }
}

export async function fetchDueFromApi(date?: string): Promise<VocabCard[] | null> {
  try {
    const q = date ? `?date=${encodeURIComponent(date)}` : ''
    const res = await apiFetch(`/api/due${q}`)
    if (!res.ok) return null
    const data = (await res.json()) as { cards?: VocabCard[] }
    return data.cards ?? []
  } catch {
    return null
  }
}

export async function postReview(input: {
  lemma: string
  home_scene_id: string
  rating: Rating
}): Promise<{ ok: boolean; error?: string; fsrs?: unknown }> {
  try {
    const res = await apiFetch('/api/review', {
      method: 'POST',
      headers: withAdmin({ 'content-type': 'application/json' }),
      body: JSON.stringify(input),
    })
    const data = (await res.json()) as { ok?: boolean; error?: string; fsrs?: unknown }
    if (!res.ok) return { ok: false, error: data.error ?? res.statusText }
    return { ok: true, fsrs: data.fsrs }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network error' }
  }
}

export interface AdminStats {
  today: string
  cards: number
  fsrs_rows: number
  reviews: number
  due_today: number
  status: { weak: number; learning: number; new: number }
  recent_reviews: Array<{
    lemma: string
    home_scene_id: string
    rating: string
    created_at: string
  }>
}

export async function fetchAdminStats(): Promise<
  { ok: true; stats: AdminStats } | { ok: false; error: string }
> {
  try {
    const res = await apiFetch('/api/admin/stats', {
      headers: withAdmin(),
    })
    const data = await res.json()
    if (!res.ok) return { ok: false, error: (data as { error?: string }).error ?? res.statusText }
    return { ok: true, stats: data as AdminStats }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network error' }
  }
}

export async function postAdminSeed(): Promise<
  { ok: true; seeded: number; cards_in_db: number } | { ok: false; error: string }
> {
  try {
    const res = await apiFetch('/api/admin/seed', {
      method: 'POST',
      headers: withAdmin({ 'content-type': 'application/json' }),
      body: '{}',
    })
    const data = (await res.json()) as {
      ok?: boolean
      seeded?: number
      cards_in_db?: number
      error?: string
    }
    if (!res.ok) return { ok: false, error: data.error ?? res.statusText }
    return { ok: true, seeded: data.seeded ?? 0, cards_in_db: data.cards_in_db ?? 0 }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network error' }
  }
}
