import type { FilterMode, VocabCard } from '../types'
import { isDue } from '../lib/dates'
import styles from './Home.module.css'

interface Props {
  cards: VocabCard[]
  filter: FilterMode
  onFilter: (f: FilterMode) => void
  today: string
  dueCount: number
  totalCount: number
  onStartToday: () => void
  onOpenStudio: (slug: string) => void
  onAddToRound: (slug: string) => void
  roundCount: number
  onStudyRound: () => void
  onExport: () => void
  onAdmin: () => void
  apiOnline: boolean
  usingApi: boolean
}

const FILTERS: { id: FilterMode; label: string }[] = [
  { id: 'due', label: '今日到期' },
  { id: 'new', label: '新词' },
  { id: 'all', label: '全部' },
]

export function Home({
  cards,
  filter,
  onFilter,
  today,
  dueCount,
  totalCount,
  onStartToday,
  onOpenStudio,
  onAddToRound,
  roundCount,
  onStudyRound,
  onExport,
  onAdmin,
  apiOnline,
  usingApi,
}: Props) {
  return (
    <div className={styles.wrap}>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.kicker}>职场英语 · 冻结场景</p>
          <h1 className={styles.title}>今日到期 {dueCount}</h1>
          <p className={styles.sub}>
            {today} · 词库 {totalCount} · {usingApi && apiOnline ? '云端 FSRS' : '本地备份'}
          </p>
        </div>
        <button
          type="button"
          className={styles.cta}
          onClick={onStartToday}
          disabled={dueCount === 0 && filter !== 'new'}
        >
          开始今日学习
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={filter === f.id ? styles.chipActive : styles.chip}
              onClick={() => onFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.actions}>
          {roundCount > 0 && (
            <button type="button" className={styles.primarySm} onClick={onStudyRound}>
              学本轮 ({roundCount})
            </button>
          )}
          <button type="button" className={styles.ghost} onClick={onAdmin}>
            Admin
          </button>
          <button type="button" className={styles.ghost} onClick={onExport}>
            导出
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {cards.map((c) => {
          const due = isDue(c.due, today)
          return (
            <li key={c.slug} className={`${styles.card} ${due ? styles.due : ''}`}>
              <button
                type="button"
                className={styles.row}
                onClick={() => onOpenStudio(c.slug)}
              >
                <div className={styles.meta}>
                  <div className={styles.lemmaRow}>
                    <span className={styles.lemma}>{c.lemma}</span>
                    <span className={styles.ipa}>{c.ipa}</span>
                    {due && <span className={styles.badge}>到期</span>}
                  </div>
                  <div className={styles.cue}>{c.title_cue}</div>
                  <div className={styles.gloss}>{c.gloss_zh}</div>
                </div>
                <span className={styles.chevron} aria-hidden>
                  →
                </span>
              </button>
              <button
                type="button"
                className={styles.addRound}
                title="加入本轮"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToRound(c.slug)
                }}
              >
                +
              </button>
            </li>
          )
        })}
        {cards.length === 0 && (
          <li className={styles.empty}>当前筛选下没有卡片。试试「全部」或「新词」。</li>
        )}
      </ul>
    </div>
  )
}
