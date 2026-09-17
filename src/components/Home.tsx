import type { FilterMode, VocabCard } from '../types'
import { isDue } from '../lib/dates'
import styles from './Home.module.css'

interface Props {
  cards: VocabCard[]
  filter: FilterMode
  onFilter: (f: FilterMode) => void
  today: string
  dueCount: number
  selected: Set<string>
  onToggle: (slug: string) => void
  onSelectFiltered: () => void
  onClearSelection: () => void
  onStudy: () => void
  onExport: () => void
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
  selected,
  onToggle,
  onSelectFiltered,
  onClearSelection,
  onStudy,
  onExport,
}: Props) {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>职场词汇 · FSRS</h1>
          <p className={styles.sub}>
            今日（上海）{today} · 到期 {dueCount} / 共 {cards.length} 张
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.ghost} onClick={onExport}>
            导出 cards.json
          </button>
          <button
            type="button"
            className={styles.primary}
            disabled={selected.size === 0}
            onClick={onStudy}
          >
            开始学习 ({selected.size})
          </button>
        </div>
      </header>

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
        <button type="button" className={styles.linkBtn} onClick={onSelectFiltered}>
          全选当前
        </button>
        <button type="button" className={styles.linkBtn} onClick={onClearSelection}>
          清空
        </button>
      </div>

      <ul className={styles.list}>
        {cards.map((c) => {
          const due = isDue(c.due, today)
          const checked = selected.has(c.slug)
          return (
            <li
              key={c.slug}
              className={`${styles.card} ${due ? styles.due : ''} ${checked ? styles.selected : ''}`}
            >
              <label className={styles.row}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(c.slug)}
                />
                <div className={styles.meta}>
                  <div className={styles.lemmaRow}>
                    <span className={styles.lemma}>{c.lemma}</span>
                    <span className={styles.ipa}>{c.ipa}</span>
                    {due && <span className={styles.badge}>到期</span>}
                    <span className={styles.status}>{c.status}</span>
                  </div>
                  <div className={styles.cue}>{c.title_cue}</div>
                  <div className={styles.gloss}>
                    {c.gloss_zh} · due {c.due} · S={c.stability}
                  </div>
                </div>
              </label>
            </li>
          )
        })}
        {cards.length === 0 && (
          <li className={styles.empty}>当前筛选下没有卡片。</li>
        )}
      </ul>
    </div>
  )
}
