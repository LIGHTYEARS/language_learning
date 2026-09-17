import { useCallback, useEffect, useMemo, useState } from 'react'
import cardsData from '../data/cards.json'
import {
  applyRating,
  cardToFsrs,
  downloadJson,
  exportCardsJson,
  loadStore,
  mergeCard,
  saveStore,
} from '../lib/fsrs'
import { isDue, todayShanghai } from '../lib/dates'
import type {
  CardsFile,
  FilterMode,
  FsrsStore,
  Rating,
  VocabCard,
} from '../types'

const base = cardsData as CardsFile

export function useCards() {
  const [store, setStore] = useState<FsrsStore>({})
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setStore(loadStore())
    setReady(true)
  }, [])

  const cards: VocabCard[] = useMemo(() => {
    return base.cards.map((c) => mergeCard(c as VocabCard, store))
  }, [store])

  const today = todayShanghai()

  const dueCount = useMemo(
    () => cards.filter((c) => isDue(c.due, today)).length,
    [cards, today],
  )

  const filterCards = useCallback(
    (mode: FilterMode) => {
      switch (mode) {
        case 'due':
          return cards.filter((c) => isDue(c.due, today))
        case 'new':
          return cards.filter((c) => c.status === 'new' || c.stability === 0)
        case 'all':
        default:
          return cards
      }
    },
    [cards, today],
  )

  const rate = useCallback((slug: string, rating: Rating) => {
    setStore((prev) => {
      const card = base.cards.find((c) => c.slug === slug) as VocabCard | undefined
      const current = prev[slug] ?? (card ? cardToFsrs(card) : {
        due: todayShanghai(),
        stability: 0,
        difficulty: 5,
        status: 'new',
        last_reviewed: null,
      })
      const next = { ...prev, [slug]: applyRating(current, rating) }
      saveStore(next)
      return next
    })
  }, [])

  const exportMerged = useCallback(() => {
    const json = exportCardsJson(base as CardsFile, store)
    downloadJson('cards.json', json)
  }, [store])

  return {
    ready,
    cards,
    today,
    dueCount,
    filterCards,
    rate,
    exportMerged,
    lemmaCount: base.cards.length,
  }
}
