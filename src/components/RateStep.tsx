import { useEffect } from 'react'
import type { Rating, VocabCard } from '../types'
import { parseTargetChunks } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onRate: (r: Rating) => void
}

const BUTTONS: { id: Rating; label: string; key: string; hint: string }[] = [
  { id: 'again', label: 'Again', key: '1', hint: '语块没出来 · 今日再练' },
  { id: 'hard', label: 'Hard', key: '2', hint: '想起来但费劲' },
  { id: 'good', label: 'Good', key: '3', hint: 'chunk + 语域过关' },
  { id: 'easy', label: 'Easy', key: '4', hint: '顺口可发职场' },
]

export function RateStep({ card, onRate }: Props) {
  const chunks = parseTargetChunks(card.target_chunks)

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
      <div className={styles.kicker}>评分 · Rate（按 chunk + 语域）</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <div className={styles.chunkChips}>
        {chunks.map((ch) => (
          <span key={ch} className={styles.chunkChip}>
            {ch}
          </span>
        ))}
      </div>
      <p className={styles.hint}>
        不是「任意含 lemma 的句子都算对」——要目标语块、语域对。键盘 1–4。
      </p>
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
