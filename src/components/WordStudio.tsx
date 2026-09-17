import type { VocabCard } from '../types'
import { WordContent } from './WordContent'
import styles from './Studio.module.css'
import stepStyles from './Steps.module.css'

interface Props {
  card: VocabCard
  onBack: () => void
  onPractice: () => void
  onAddToRound?: () => void
}

export function WordStudio({ card, onBack, onPractice, onAddToRound }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <button type="button" className={styles.back} onClick={onBack}>
          ← 返回
        </button>
        <span className={styles.badge}>{card.status}</span>
      </div>

      <article className={styles.book}>
        <div className={stepStyles.kicker}>学习面 · Word studio</div>
        <WordContent card={card} mode="studio" />

        <div className={styles.ctaRow}>
          <button type="button" className={styles.primary} onClick={onPractice}>
            练这张
          </button>
          {onAddToRound && (
            <button type="button" className={styles.ghost} onClick={onAddToRound}>
              加入本轮
            </button>
          )}
        </div>
      </article>
    </div>
  )
}
