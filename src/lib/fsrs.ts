import type { FsrsState, FsrsStore, Rating, VocabCard } from '../types'
import { addDays, todayShanghai } from './dates'

export const FSRS_KEY = 'll-fsrs-v1'

export function cardToFsrs(card: VocabCard): FsrsState {
  return {
    due: card.due,
    stability: card.stability ?? 0,
    difficulty: card.difficulty ?? 5,
    status: card.status ?? 'new',
    last_reviewed: null,
  }
}

export function loadStore(): FsrsStore {
  try {
    const raw = localStorage.getItem(FSRS_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as FsrsStore
  } catch {
    return {}
  }
}

export function saveStore(store: FsrsStore): void {
  localStorage.setItem(FSRS_KEY, JSON.stringify(store))
}

export function mergeCard(card: VocabCard, store: FsrsStore): VocabCard {
  const s = store[card.slug]
  if (!s) return { ...card }
  return {
    ...card,
    due: s.due,
    stability: s.stability,
    difficulty: s.difficulty,
    status: s.status,
  }
}

export function applyRating(state: FsrsState, rating: Rating): FsrsState {
  const today = todayShanghai()
  let S = state.stability ?? 0
  let D = state.difficulty ?? 5
  let status = state.status
  let due = today

  switch (rating) {
    case 'again':
      status = 'weak'
      S = Math.max(0.1, S * 0.5)
      due = today
      break
    case 'hard':
      S = S > 0 ? Math.max(1, S * 1.2) : 0.8
      due = addDays(today, Math.max(1, Math.round(S)))
      break
    case 'good':
      S = S === 0 ? 1 : S * 2.5
      due = addDays(today, Math.max(1, Math.round(S)))
      status = 'learning'
      break
    case 'easy':
      S = S === 0 ? 2.5 : S * 3.5
      D = Math.max(1, D - 0.2)
      due = addDays(today, Math.max(2, Math.round(S)))
      status = 'learning'
      break
  }

  return {
    due,
    stability: Math.round(S * 1000) / 1000,
    difficulty: Math.round(D * 100) / 100,
    status,
    last_reviewed: today,
  }
}

export function exportCardsJson(
  base: { version: number; updated: string; cards: VocabCard[] },
  store: FsrsStore,
): string {
  const today = todayShanghai()
  const cards = base.cards.map((c) => {
    const merged = mergeCard(c, store)
    return {
      ...c,
      due: merged.due,
      stability: merged.stability,
      difficulty: merged.difficulty,
      status: merged.status,
    }
  })
  return JSON.stringify({ version: base.version, updated: today, cards }, null, 2)
}

export function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
