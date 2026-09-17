import { useEffect, useState } from 'react'
import type { VocabCard } from '../types'
import { containsPrimaryChunk, parseTargetChunks } from '../lib/chunks'
import styles from './Steps.module.css'

type FadeKind = 'fade_cn' | 'fade_produce' | 'fade_why' | 'fade_upgrade'

interface Props {
  card: VocabCard
  kind: FadeKind
  onNext: () => void
}

export function CueFadeStep({ card, kind, onNext }: Props) {
  const targets = parseTargetChunks(card.target_chunks)
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setInput('')
    setDone(false)
  }, [card.slug, kind])

  if (kind === 'fade_cn') {
    return (
      <section className={styles.panel}>
        <div className={styles.kicker}>复习 L1 · 中文重开</div>
        <h2 className={styles.lemma}>{card.lemma}</h2>
        <div className={styles.rewritePrompt}>
          <div className={styles.rewritePromptLabel}>谁 / 目标 / 风险</div>
          <p>{card.cue_fade_cn || card.gloss_zh}</p>
        </div>
        <p className={styles.hint}>先在脑子里复述场景，再继续（不对译多选）。</p>
        <button type="button" className={styles.next} onClick={onNext}>
          记得场景 → <kbd>Enter</kbd>
        </button>
      </section>
    )
  }

  if (kind === 'fade_produce') {
    const soft = done && containsPrimaryChunk(input, targets)
    return (
      <section className={styles.panel}>
        <div className={styles.kicker}>复习 L2 · Title cue → 产出</div>
        <p className={styles.cueBig}>{card.title_cue}</p>
        <div className={styles.chunkChips}>
          {targets.map((ch) => (
            <span key={ch} className={styles.chunkChipMuted}>
              ?
            </span>
          ))}
        </div>
        <p className={styles.hint}>只看标题线索，打出一句含目标语块的英文。</p>
        <label className={styles.field}>
          <span>你的句子</span>
          <textarea
            className={styles.textarea}
            rows={3}
            value={input}
            autoFocus
            placeholder="Produce a sentence with the target chunk…"
            onChange={(e) => {
              setInput(e.target.value)
              setDone(false)
            }}
          />
        </label>
        <div className={styles.rowBtns}>
          {!done ? (
            <button
              type="button"
              className={styles.next}
              disabled={!input.trim()}
              onClick={() => setDone(true)}
            >
              提交
            </button>
          ) : (
            <button type="button" className={styles.next} onClick={onNext}>
              下一步 →
            </button>
          )}
        </div>
        {done && (
          <div className={soft ? styles.feedbackOk : styles.feedback}>
            {soft ? '✓ 含目标语块' : '对照语块（不挡进度）：'}
            <code>{targets.join(' ; ')}</code>
          </div>
        )}
      </section>
    )
  }

  if (kind === 'fade_why') {
    return (
      <section className={styles.panel}>
        <div className={styles.kicker}>复习 L3 · Why this chunk</div>
        <h2 className={styles.lemma}>{card.lemma}</h2>
        <p className={styles.hint}>{card.cue_fade_why_prompt}</p>
        <div className={styles.chunkChips}>
          {targets.map((ch) => (
            <span key={ch} className={styles.chunkChip}>
              {ch}
            </span>
          ))}
        </div>
        {!done ? (
          <>
            <label className={styles.field}>
              <span>可选：用自己的话写一句（或直接揭晓）</span>
              <textarea
                className={styles.textarea}
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <div className={styles.rowBtns}>
              <button type="button" className={styles.secondary} onClick={() => setDone(true)}>
                揭晓 Why
              </button>
              <button type="button" className={styles.next} onClick={() => setDone(true)}>
                继续
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={styles.whyBox}>
              <div className={styles.whyTitle}>Why this chunk</div>
              <p>{card.why_this_chunk}</p>
            </div>
            <button type="button" className={styles.next} onClick={onNext}>
              同场景升级 →
            </button>
          </>
        )}
      </section>
    )
  }

  // fade_upgrade
  const soft = done && containsPrimaryChunk(input, targets)
  return (
    <section className={styles.panel}>
      <div className={styles.kicker}>复习 L4 · 同场景升级</div>
      <h2 className={styles.lemma}>{card.lemma}</h2>
      <div className={styles.rewritePrompt}>
        <div className={styles.rewritePromptLabel}>Slack / 邮件</div>
        <p>{card.cue_fade_upgrade}</p>
      </div>
      <div className={styles.chunkChips}>
        {targets.map((ch) => (
          <span key={ch} className={styles.chunkChip}>
            {ch}
          </span>
        ))}
      </div>
      <label className={styles.field}>
        <span>写出可发的一句（保留 chunk）</span>
        <textarea
          className={styles.textarea}
          rows={3}
          value={input}
          autoFocus
          onChange={(e) => {
            setInput(e.target.value)
            setDone(false)
          }}
        />
      </label>
      <div className={styles.rowBtns}>
        {!done ? (
          <button
            type="button"
            className={styles.next}
            disabled={!input.trim()}
            onClick={() => setDone(true)}
          >
            提交
          </button>
        ) : (
          <button type="button" className={styles.next} onClick={onNext}>
            去评分 →
          </button>
        )}
      </div>
      {done && (
        <div className={soft ? styles.feedbackOk : styles.feedback}>
          {soft ? '✓ 保留了语块' : '参考范文：'}
          <div className={styles.modelAnswer}>
            <strong>范文：</strong>
            {card.rewrite_answer}
          </div>
        </div>
      )}
    </section>
  )
}
