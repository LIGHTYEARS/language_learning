import { useMemo, useState } from 'react'
import { Admin } from './components/Admin'
import { Home } from './components/Home'
import { StudySession } from './components/StudySession'
import { useCards } from './hooks/useCards'
import type { FilterMode, Rating, VocabCard } from './types'

type View = 'home' | 'study' | 'admin'

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
  const [view, setView] = useState<View>('home')
  const [filter, setFilter] = useState<FilterMode>('due')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [queue, setQueue] = useState<VocabCard[]>([])

  const filtered = useMemo(() => filterCards(filter), [filterCards, filter])
  const displayCards = filtered

  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const selectFiltered = () => {
    setSelected(new Set(displayCards.map((c) => c.slug)))
  }

  const clearSelection = () => setSelected(new Set())

  const startStudy = () => {
    const q = cards.filter((c) => selected.has(c.slug))
    if (q.length === 0) return
    setQueue(q)
    setView('study')
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
        allCards={cards}
        onRate={onRate}
        onExit={() => setView('home')}
      />
    )
  }

  return (
    <Home
      cards={displayCards}
      filter={filter}
      onFilter={setFilter}
      today={today}
      dueCount={dueCount}
      selected={selected}
      onToggle={toggle}
      onSelectFiltered={selectFiltered}
      onClearSelection={clearSelection}
      onStudy={startStudy}
      onExport={exportMerged}
      onAdmin={() => setView('admin')}
      apiOnline={apiOnline}
      usingApi={usingApi}
    />
  )
}
