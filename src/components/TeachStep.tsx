import type { VocabCard } from '../types'
import { renderBoldMarkdown } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onNext: () => void
}

export function TeachStep({ card, onNext }: Props) {
  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>讲解 · Teach</div>
      <h2 className={styles.lemma}>
        {card.lemma} <span className={styles.pos}>{card.pos}</span>
      </h2>
      <p className={styles.ipa}>{card.ipa}</p>
      <p className={styles.tip}>
        <strong>发音提示：</strong>
        {card.pronunciation_tip}
      </p>
      <p>
        <strong>词源：</strong>
        {card.etymology}
      </p>
      <div className={styles.glossBox}>
        <div>
          <span className={styles.label}>EN</span> {card.gloss_en}
        </div>
        <div>
          <span className={styles.label}>ZH</span> {card.gloss_zh}
        </div>
        <div>
          <span className={styles.label}>语域</span> {card.register}
        </div>
      </div>
      <p className={styles.cue}>
        <strong>场景线索：</strong>
        {card.title_cue}
      </p>
      <div className={styles.scene}>
        <div className={styles.sceneTitle}>冻结主场景（Home scene）</div>
        <p
          dangerouslySetInnerHTML={{
            __html: renderBoldMarkdown(card.home_scene),
          }}
        />
      </div>
      <div className={styles.useAvoid}>
        <div>
          <div className={styles.good}>USE</div>
          <p>{card.use}</p>
        </div>
        <div>
          <div className={styles.bad}>AVOID</div>
          <p>{card.avoid}</p>
        </div>
      </div>
      <button type="button" className={styles.next} onClick={onNext}>
        继续填空 → <kbd>Enter</kbd>
      </button>
    </section>
  )
}
