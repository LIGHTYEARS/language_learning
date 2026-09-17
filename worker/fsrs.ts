import { addDays, todayShanghai } from './dates'

export type Rating = 'again' | 'hard' | 'good' | 'easy'
export type CardStatus = 'new' | 'learning' | 'weak' | string

export interface FsrsState {
  due: string
  stability: number
  difficulty: number
  status: CardStatus
  last_reviewed: string | null
}

/** Lightweight FSRS update — same rules as frontend src/lib/fsrs.ts */
export function applyRating(state: FsrsState, rating: Rating, today = todayShanghai()): FsrsState {
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

export function defaultFsrs(due = todayShanghai()): FsrsState {
  return {
    due,
    stability: 0,
    difficulty: 5,
    status: 'new',
    last_reviewed: null,
  }
}
