import { useEffect, useMemo, useState } from 'react'
import type { VocabCard } from '../types'
import { buildChunkOptions, parseTargetChunks } from '../lib/chunks'
import styles from './Steps.module.css'

interface Props {
  card: VocabCard
  allCards: VocabCard[]
  onNext: () => void
}

export function ChunkCheckStep({ card, allCards, onNext }: Props) {
  const targets = useMemo(
    () => parseTargetChunks(card.target_chunks),
    [card.target_chunks],
  )
  const primary = targets[0] ?? card.lemma
  const correctSet = useMemo(
    () => new Set(targets.map((s) => s.toLowerCase())),
    [targets],
  )

  const [options, setOptions] = useState<string[]>([])
  const [picked, setPicked] = useState<string | null>(null)

  useEffect(() => {
    setOptions(buildChunkOptions(card, allCards, 3))
    setPicked(null)
  }, [card, allCards])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && picked) {
        e.preventDefault()
        onNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [picked, onNext])

  const isCorrect =
    picked !== null &&
    (correctSet.has(picked.toLowerCase()) ||
      picked.toLowerCase() === primary.toLowerCase())

  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>搭配检验 · Chunk check</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <p className={styles.hint}>选出正确的目标搭配（chunk）：</p>
      <div className={styles.options}>
        {options.map((opt) => {
          let cls = styles.option
          if (picked) {
            const right =
              correctSet.has(opt.toLowerCase()) ||
              opt.toLowerCase() === primary.toLowerCase()
            if (right) cls = styles.optionCorrect
            else if (opt === picked) cls = styles.optionWrong
          }
          return (
            <button
              key={opt}
              type="button"
              className={cls}
              disabled={picked !== null}
              onClick={() => setPicked(opt)}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className={isCorrect ? styles.feedbackOk : styles.feedback}>
          {isCorrect ? '✓ 正确' : `✗ 正确搭配是「${primary}」`}
        </div>
      )}
      <button
        type="button"
        className={styles.next}
        onClick={onNext}
        disabled={!picked}
        style={{ marginTop: '1rem' }}
      >
        去评分 → <kbd>Enter</kbd>
      </button>
    </section>
  )
}
