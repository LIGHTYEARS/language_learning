import { useEffect, useState } from 'react'
import type { VocabCard } from '../types'
import { containsPrimaryChunk, parseTargetChunks } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onNext: () => void
}

export function RewriteStep({ card, onNext }: Props) {
  const targets = parseTargetChunks(card.target_chunks)
  const [input, setInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setInput('')
    setSubmitted(false)
  }, [card.slug])

  const softOk = submitted && containsPrimaryChunk(input, targets)

  const submit = () => {
    if (!input.trim()) return
    setSubmitted(true)
  }

  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>改写 · Rewrite</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <p className={styles.hint}>把中式/弱英文改写成带目标语块的职场英文。</p>

      <div className={styles.rewritePrompt}>
        <div className={styles.rewritePromptLabel}>提示</div>
        <p>{card.rewrite_prompt || '用目标语块改写一句职场英文。'}</p>
      </div>

      <div className={styles.chunkChips}>
        {targets.map((ch) => (
          <span key={ch} className={styles.chunkChip}>
            {ch}
          </span>
        ))}
      </div>

      <label className={styles.field}>
        <span>你的英文改写</span>
        <textarea
          className={styles.textarea}
          value={input}
          rows={4}
          placeholder="Type English using the target chunk…"
          autoFocus
          onChange={(e) => {
            setInput(e.target.value)
            setSubmitted(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
              e.preventDefault()
              if (!submitted && input.trim()) submit()
              else if (submitted) onNext()
            }
          }}
        />
      </label>

      <div className={styles.rowBtns}>
        {!submitted ? (
          <button
            type="button"
            className={styles.next}
            onClick={submit}
            disabled={!input.trim()}
          >
            提交改写
          </button>
        ) : (
          <button type="button" className={styles.next} onClick={onNext}>
            去评分 →
          </button>
        )}
      </div>

      {submitted && (
        <div className={softOk ? styles.feedbackOk : styles.feedback}>
          {softOk ? '✓ 已用到目标语块（软匹配）' : '参考范文（不挡进度）：'}
          <div className={styles.modelAnswer}>
            <strong>范文：</strong>
            {card.rewrite_answer}
          </div>
          <div className={styles.useReminder}>
            <strong>USE：</strong>
            {card.use}
          </div>
        </div>
      )}
    </section>
  )
}
