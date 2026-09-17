import { useMemo, useState } from 'react'
import { Admin } from './components/Admin'
import { Home } from './components/Home'
import { StudySession } from './components/StudySession'
import { WordStudio } from './components/WordStudio'
import { useCards } from './hooks/useCards'
import { isDue } from './lib/dates'
import type { AppView, FilterMode, Rating, VocabCard } from './types'

const TODAY_CAP = 6

export default function App() {
  const {
    ready,
    cards,
    today,
    dueCount,
    filterCards,
    rate,
    exportMerged,
    lemmaCount,
    apiOnline,
    usingApi,
    reloadFromApi,
  } = useCards()
  const [view, setView] = useState<AppView>('home')
  const [filter, setFilter] = useState<FilterMode>('due')
  const [queue, setQueue] = useState<VocabCard[]>([])
  const [studioSlug, setStudioSlug] = useState<string | null>(null)
  const [round, setRound] = useState<Set<string>>(new Set())
  const [fromStudio, setFromStudio] = useState(false)

  const filtered = useMemo(() => filterCards(filter), [filterCards, filter])
  const studioCard = useMemo(
    () => (studioSlug ? cards.find((c) => c.slug === studioSlug) ?? null : null),
    [cards, studioSlug],
  )

  const startQueue = (q: VocabCard[], studio = false) => {
    if (q.length === 0) return
    setQueue(q)
    setFromStudio(studio)
    setView('study')
  }

  const startToday = () => {
    const due = cards.filter((c) => isDue(c.due, today)).slice(0, TODAY_CAP)
    if (due.length > 0) {
      startQueue(due)
      return
    }
    // No due: offer new cards up to cap
    const news = cards
      .filter((c) => c.status === 'new' || c.stability === 0)
      .slice(0, TODAY_CAP)
    startQueue(news.length ? news : cards.slice(0, TODAY_CAP))
  }

  const openStudio = (slug: string) => {
    setStudioSlug(slug)
    setView('studio')
  }

  const addToRound = (slug: string) => {
    setRound((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const studyRound = () => {
    const q = cards.filter((c) => round.has(c.slug))
    startQueue(q)
  }

  const onRate = (slug: string, rating: Rating) => {
    void rate(slug, rating)
  }

  if (!ready) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#667' }}>
        加载中… ({lemmaCount} lemmas)
      </div>
    )
  }

  if (view === 'admin') {
    return (
      <Admin
        apiOnline={apiOnline}
        onBack={() => {
          void reloadFromApi()
          setView('home')
        }}
      />
    )
  }

  if (view === 'study') {
    return (
      <StudySession
        queue={queue}
        onRate={onRate}
        fromStudio={fromStudio}
        onExit={() => {
          setView(fromStudio && studioSlug ? 'studio' : 'home')
          setFromStudio(false)
        }}
      />
    )
  }

  if (view === 'studio' && studioCard) {
    return (
      <WordStudio
        card={studioCard}
        onBack={() => setView('home')}
        onPractice={() => startQueue([studioCard], true)}
        onAddToRound={() => addToRound(studioCard.slug)}
      />
    )
  }

  return (
    <Home
      cards={filtered}
      filter={filter}
      onFilter={setFilter}
      today={today}
      dueCount={dueCount}
      totalCount={cards.length}
      onStartToday={startToday}
      onOpenStudio={openStudio}
      onAddToRound={addToRound}
      roundCount={round.size}
      onStudyRound={studyRound}
      onExport={exportMerged}
      onAdmin={() => setView('admin')}
      apiOnline={apiOnline}
      usingApi={usingApi}
    />
  )
}
