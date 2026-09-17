import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Rating, StudyStep, VocabCard } from '../types'
import { TeachStep } from './TeachStep'
import { ClozeStep } from './ClozeStep'
import { ChunkCheckStep } from './ChunkCheckStep'
import { RateStep } from './RateStep'
import styles from './StudySession.module.css'

interface Props {
  queue: VocabCard[]
  allCards: VocabCard[]
  onRate: (slug: string, rating: Rating) => void
  onExit: () => void
}

const STEPS: StudyStep[] = ['teach', 'cloze', 'chunk', 'rate']

export function StudySession({ queue, allCards, onRate, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [done, setDone] = useState(false)

  const card = queue[index]
  const step = STEPS[stepIdx]

  const progress = useMemo(
    () => ({
      card: index + 1,
      total: queue.length,
      stepLabel:
        step === 'teach'
          ? '讲解'
          : step === 'cloze'
            ? '填空'
            : step === 'chunk'
              ? '搭配'
              : '评分',
    }),
    [index, queue.length, step],
  )

  const advance = useCallback(() => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((s) => s + 1)
    }
  }, [stepIdx])

  const handleRate = useCallback(
    (rating: Rating) => {
      if (!card) return
      onRate(card.slug, rating)
      if (index + 1 >= queue.length) {
        setDone(true)
      } else {
        setIndex((i) => i + 1)
        setStepIdx(0)
      }
    },
    [card, index, onRate, queue.length],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }
      if (e.key === 'Enter' && step === 'teach') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, step])

  if (done || !card) {
    return (
      <div className={styles.wrap}>
        <div className={styles.doneCard}>
          <h2>本轮完成</h2>
          <p>已复习 {queue.length} 张卡片。进度已写入 localStorage（ll-fsrs-v1）。</p>
          <button type="button" className={styles.primary} onClick={onExit}>
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topbar}>
        <button type="button" className={styles.back} onClick={onExit}>
          ← 退出
        </button>
        <div className={styles.progress}>
          卡片 {progress.card}/{progress.total} · {progress.stepLabel}
        </div>
        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={
                i === stepIdx
                  ? styles.dotActive
                  : i < stepIdx
                    ? styles.dotDone
                    : styles.dot
              }
            />
          ))}
        </div>
      </div>

      {step === 'teach' && <TeachStep card={card} onNext={advance} />}
      {step === 'cloze' && <ClozeStep card={card} onNext={advance} />}
      {step === 'chunk' && (
        <ChunkCheckStep card={card} allCards={allCards} onNext={advance} />
      )}
      {step === 'rate' && <RateStep card={card} onRate={handleRate} />}
    </div>
  )
}
