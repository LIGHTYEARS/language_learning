import type { VocabCard } from '../types'
import { parseTargetChunks, renderBoldMarkdown } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  mode?: 'studio' | 'teach'
  /** Hide full scene (studio never; teach may cue-fade when reviewing). */
  hideScene?: boolean
}

export function WordContent({ card, mode = 'studio', hideScene = false }: Props) {
  const chunks = parseTargetChunks(card.target_chunks)
  const compact = mode === 'teach'

  return (
    <>
      <header className={styles.wordHeader}>
        <h2 className={styles.lemma}>
          {card.lemma} <span className={styles.pos}>{card.pos}</span>
        </h2>
        <p className={styles.ipa}>{card.ipa}</p>
        {card.pronunciation_tip && (
          <p className={styles.tip}>
            <strong>怎么读：</strong>
            {card.pronunciation_tip}
          </p>
        )}
      </header>

      {card.etymology && (
        <p className={compact ? styles.etymologyCompact : styles.etymology}>
          <strong>词源：</strong>
          {card.etymology}
        </p>
      )}

      <div className={styles.glossBox}>
        <div>
          <span className={styles.label}>EN</span> {card.gloss_en}
        </div>
        <div>
          <span className={styles.label}>ZH</span> {card.gloss_zh}
        </div>
        <div>
          <span className={styles.label}>语域</span>
          <span className={styles.registerChip}>{card.register}</span>
        </div>
      </div>

      <div className={styles.chunkSection}>
        <div className={styles.chunkLabel}>目标语块 · Target chunks</div>
        <div className={styles.chunkChips}>
          {chunks.map((ch) => (
            <span key={ch} className={styles.chunkChip}>
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.useAvoid}>
        <div className={styles.useCard}>
          <div className={styles.goodLabel}>USE</div>
          <p>{card.use}</p>
        </div>
        <div className={styles.avoidCard}>
          <div className={styles.badLabel}>AVOID</div>
          <p>{card.avoid}</p>
        </div>
      </div>

      {!hideScene ? (
        <div className={styles.sceneHero}>
          <div className={styles.sceneTitle}>冻结主场景 · Home scene</div>
          <p className={styles.cueSmall}>{card.title_cue}</p>
          <p
            className={styles.sceneBody}
            dangerouslySetInnerHTML={{
              __html: renderBoldMarkdown(card.home_scene),
            }}
          />
        </div>
      ) : (
        <div className={styles.cueFadeBox}>
          <div className={styles.sceneTitle}>线索 · Title cue</div>
          <p className={styles.cueBig}>{card.title_cue}</p>
        </div>
      )}

      {card.why_this_chunk && (
        <div className={styles.whyBox}>
          <div className={styles.whyTitle}>Why this chunk</div>
          <p>{card.why_this_chunk}</p>
        </div>
      )}

      {card.pitfalls && (
        <div className={styles.pitfalls}>
          <div className={styles.pitfallsTitle}>Pitfalls</div>
          <p>{card.pitfalls}</p>
        </div>
      )}

      {!compact && card.article && (
        <p className={styles.articleTip}>
          <strong>Article tip：</strong>
          {card.article}
        </p>
      )}
    </>
  )
}
