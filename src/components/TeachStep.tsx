import type { VocabCard } from '../types'
import { WordContent } from './WordContent'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onNext: () => void
  fromStudio?: boolean
}

export function TeachStep({ card, onNext, fromStudio = false }: Props) {
  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>
        {fromStudio ? '学习面 · 回顾后练习' : '讲解 · Teach（全字段）'}
      </div>
      <WordContent card={card} mode="teach" />
      <button type="button" className={styles.next} onClick={onNext}>
        继续挖空 → <kbd>Enter</kbd>
      </button>
    </section>
  )
}
