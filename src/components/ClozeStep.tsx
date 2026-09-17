import { useEffect, useState } from 'react'
import type { VocabCard } from '../types'
import { clozeMatches, parseTargetChunks } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  onNext: () => void
}

export function ClozeStep({ card, onNext }: Props) {
  const targets = parseTargetChunks(card.target_chunks)
  const [input, setInput] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [checked, setChecked] = useState(false)
  const ok = checked && clozeMatches(input, targets)

  useEffect(() => {
    setInput('')
    setRevealed(false)
    setChecked(false)
  }, [card.slug])

  const check = () => {
    setChecked(true)
  }

  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>填空 · Cloze</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <p className={styles.clozeText}>{card.cloze}</p>
      <label className={styles.field}>
        <span>输入目标搭配（多个空可用 ; 分隔）</span>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setChecked(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (!checked && input.trim()) check()
              else if (checked || revealed) onNext()
            }
          }}
          placeholder="e.g. time-bounded; bounded by …"
          autoFocus
        />
      </label>
      <div className={styles.rowBtns}>
        <button type="button" className={styles.secondary} onClick={check} disabled={!input.trim()}>
          核对
        </button>
        <button
          type="button"
          className={styles.secondary}
          onClick={() => {
            setRevealed(true)
            setChecked(true)
          }}
        >
          显示答案
        </button>
        <button
          type="button"
          className={styles.next}
          onClick={onNext}
          disabled={!checked && !revealed}
        >
          下一步 →
        </button>
      </div>
      {(checked || revealed) && (
        <div className={ok ? styles.feedbackOk : styles.feedback}>
          {ok ? '✓ 匹配目标搭配' : '对照目标：'}
          <code>{targets.join(' ; ')}</code>
        </div>
      )}
    </section>
  )
}
