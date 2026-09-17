import { useCallback, useEffect, useMemo, useState } from 'react'
import cardsData from '../data/cards.json'
import {
  checkApi,
  fetchCardsFromApi,
  getAdminSecret,
  postReview,
  setAdminSecret,
} from '../lib/api'
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

function cardsToStore(cards: VocabCard[]): FsrsStore {
  const store: FsrsStore = {}
  for (const c of cards) {
    store[c.slug] = {
      due: c.due,
      stability: c.stability ?? 0,
      difficulty: c.difficulty ?? 5,
      status: c.status ?? 'new',
      last_reviewed: null,
    }
  }
  return store
}

export function useCards() {
  const [store, setStore] = useState<FsrsStore>({})
  const [remoteCards, setRemoteCards] = useState<VocabCard[] | null>(null)
  const [ready, setReady] = useState(false)
  const [apiOnline, setApiOnline] = useState(false)
  const [usingApi, setUsingApi] = useState(false)

  const reloadFromApi = useCallback(async (): Promise<boolean> => {
    const online = await checkApi()
    setApiOnline(online)
    if (!online) {
      setUsingApi(false)
      return false
    }
    const cards = await fetchCardsFromApi()
    if (cards && cards.length > 0) {
      setRemoteCards(cards)
      setStore(cardsToStore(cards))
      setUsingApi(true)
      return true
    }
    // API up but empty — still prefer API for writes after seed
    setUsingApi(true)
    setRemoteCards(null)
    return true
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const ok = await reloadFromApi()
      if (cancelled) return
      if (!ok) {
        // Fallback: localStorage canonical when API unavailable
        setStore(loadStore())
        setUsingApi(false)
        setRemoteCards(null)
      }
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [reloadFromApi])

  const cards: VocabCard[] = useMemo(() => {
    if (usingApi && remoteCards && remoteCards.length > 0) {
      return remoteCards.map((c) => mergeCard(c, store))
    }
    return base.cards.map((c) => mergeCard(c as VocabCard, store))
  }, [store, usingApi, remoteCards])

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

  const ensureSecret = (): string | null => {
    let secret = getAdminSecret()
    if (!secret) {
      const entered = window.prompt('Enter ADMIN_SECRET for API reviews')
      if (!entered) return null
      setAdminSecret(entered.trim())
      secret = entered.trim()
    }
    return secret
  }

  const rate = useCallback(
    async (slug: string, rating: Rating) => {
      const card =
        cards.find((c) => c.slug === slug) ??
        (base.cards.find((c) => c.slug === slug) as VocabCard | undefined)
      if (!card) return

      if (usingApi && apiOnline) {
        if (!ensureSecret()) return
        const res = await postReview({
          lemma: card.lemma,
          home_scene_id: card.home_scene_id,
          rating,
        })
        if (!res.ok) {
          window.alert(`Review failed: ${res.error}`)
          return
        }
        // Refresh canonical state from API
        await reloadFromApi()
        return
      }

      // Offline / no API: localStorage fallback (not canonical when API is up)
      setStore((prev) => {
        const current =
          prev[slug] ??
          (card
            ? cardToFsrs(card)
            : {
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
    },
    [apiOnline, cards, reloadFromApi, usingApi],
  )

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
    lemmaCount: cards.length || base.cards.length,
    apiOnline,
    usingApi,
    reloadFromApi,
  }
}
