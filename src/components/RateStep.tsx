import { useEffect } from 'react'
import type { Rating, VocabCard } from '../types'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onRate: (r: Rating) => void
}

const BUTTONS: { id: Rating; label: string; key: string; hint: string }[] = [
  { id: 'again', label: 'Again', key: '1', hint: '重来 · 今日再练' },
  { id: 'hard', label: 'Hard', key: '2', hint: '较难 · 短间隔' },
  { id: 'good', label: 'Good', key: '3', hint: '尚可 · 正常间隔' },
  { id: 'easy', label: 'Easy', key: '4', hint: '轻松 · 加长间隔' },
]

export function RateStep({ card, onRate }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Rating> = {
        '1': 'again',
        '2': 'hard',
        '3': 'good',
        '4': 'easy',
      }
      if (map[e.key]) {
        e.preventDefault()
        onRate(map[e.key])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onRate])

  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>评分 · Rate</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <p className={styles.hint}>这张卡片回忆得怎样？（键盘 1–4）</p>
      <div className={styles.rateGrid}>
        {BUTTONS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`${styles.rateBtn} ${styles[b.id]}`}
            onClick={() => onRate(b.id)}
          >
            <span className={styles.rateKey}>{b.key}</span>
            <span className={styles.rateLabel}>{b.label}</span>
            <span className={styles.rateHint}>{b.hint}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
