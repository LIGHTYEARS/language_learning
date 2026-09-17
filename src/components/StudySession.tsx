import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Rating, StudyStep, VocabCard } from '../types'
import { isTeachMode } from '../lib/chunks'
import { TeachStep } from './TeachStep'
import { ClozeStep } from './ClozeStep'
import { RewriteStep } from './RewriteStep'
import { CueFadeStep } from './CueFadeSteps'
import { RateStep } from './RateStep'
import styles from './StudySession.module.css'

interface Props {
  queue: VocabCard[]
  onRate: (slug: string, rating: Rating) => void
  onExit: () => void
  fromStudio?: boolean
}

const TEACH_STEPS: StudyStep[] = ['teach', 'cloze', 'rewrite', 'rate']
const FADE_STEPS: StudyStep[] = [
  'fade_cn',
  'fade_produce',
  'fade_why',
  'fade_upgrade',
  'rate',
]

function labelFor(step: StudyStep): string {
  switch (step) {
    case 'teach':
      return '讲解'
    case 'cloze':
      return '挖空'
    case 'rewrite':
      return '改写'
    case 'fade_cn':
      return 'L1 中文'
    case 'fade_produce':
      return 'L2 产出'
    case 'fade_why':
      return 'L3 Why'
    case 'fade_upgrade':
      return 'L4 升级'
    case 'rate':
      return '评分'
    default:
      return step
  }
}

export function StudySession({ queue, onRate, onExit, fromStudio = false }: Props) {
  const [index, setIndex] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [done, setDone] = useState(false)

  const card = queue[index]
  const teach = card ? isTeachMode(card) || (fromStudio && queue.length === 1) : true
  const STEPS = teach ? TEACH_STEPS : FADE_STEPS
  const step = STEPS[Math.min(stepIdx, STEPS.length - 1)]

  // Reset step when card changes mode length
  useEffect(() => {
    setStepIdx(0)
  }, [index])

  const progress = useMemo(
    () => ({
      card: index + 1,
      total: queue.length,
      stepLabel: labelFor(step),
      modeLabel: teach ? 'Teach' : 'Cue-fade',
    }),
    [index, queue.length, step, teach],
  )

  const advance = useCallback(() => {
    if (stepIdx < STEPS.length - 1) {
      setStepIdx((s) => s + 1)
    }
  }, [stepIdx, STEPS.length])

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
      if (e.key === 'Enter' && (step === 'teach' || step === 'fade_cn')) {
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
          <p>已复习 {queue.length} 张。按 chunk + 语域自评；进度写入 FSRS。</p>
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
          {progress.card}/{progress.total} · {progress.modeLabel} · {progress.stepLabel}
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

      {step === 'teach' && (
        <TeachStep card={card} onNext={advance} fromStudio={fromStudio && queue.length === 1} />
      )}
      {step === 'cloze' && <ClozeStep card={card} onNext={advance} />}
      {step === 'rewrite' && <RewriteStep card={card} onNext={advance} />}
      {(step === 'fade_cn' ||
        step === 'fade_produce' ||
        step === 'fade_why' ||
        step === 'fade_upgrade') && (
        <CueFadeStep card={card} kind={step} onNext={advance} />
      )}
      {step === 'rate' && <RateStep card={card} onRate={handleRate} />}
    </div>
  )
}
