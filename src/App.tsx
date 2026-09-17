import { useMemo, useState } from 'react'
import { Home } from './components/Home'
import { StudySession } from './components/StudySession'
import { useCards } from './hooks/useCards'
import type { FilterMode, VocabCard } from './types'

type View = 'home' | 'study'

export default function App() {
  const { ready, cards, today, dueCount, filterCards, rate, exportMerged, lemmaCount } =
    useCards()
  const [view, setView] = useState<View>('home')
  const [filter, setFilter] = useState<FilterMode>('due')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [queue, setQueue] = useState<VocabCard[]>([])

  const filtered = useMemo(() => filterCards(filter), [filterCards, filter])

  // When filter is 'due'/'new'/'all', Home shows filtered list but selection
  // is by slug across the full set. Display list = filtered.
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

  if (!ready) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: '#667' }}>
        加载中… ({lemmaCount} lemmas)
      </div>
    )
  }

  if (view === 'study') {
    return (
      <StudySession
        queue={queue}
        allCards={cards}
        onRate={rate}
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
    />
  )
}
