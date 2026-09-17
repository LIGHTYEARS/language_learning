import type { VocabCard } from '../types'

/** Parse `chunk`; `chunk2` style target_chunks into clean strings. */
export function parseTargetChunks(raw: string): string[] {
  if (!raw) return []
  const fromTicks = [...raw.matchAll(/`([^`]+)`/g)].map((m) => m[1].trim())
  if (fromTicks.length) return fromTicks
  return raw
    .split(/;|；/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Render home_scene markdown **bold** as <strong>. */
export function renderBoldMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

/** Soft-match: user text contains primary target chunk (never block progress). */
export function containsPrimaryChunk(userInput: string, targets: string[]): boolean {
  const u = normalizeAnswer(userInput)
  if (!u || !targets.length) return false
  return targets.some((t) => {
    const n = normalizeAnswer(t).replace(/…|\.{3}/g, '').trim()
    return n.length >= 4 && u.includes(n)
  })
}

/** Visual cloze: wrap ______ blanks for styling. */
export function renderClozeVisual(cloze: string): string {
  const escaped = cloze
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  return escaped.replace(/_{3,}/g, '<span class="blank">______</span>')
}

export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[`*_']/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function clozeMatches(userInput: string, targets: string[]): boolean {
  const u = normalizeAnswer(userInput)
  if (!u) return false
  const parts = u.split(/[;；,，]/).map((p) => p.trim()).filter(Boolean)
  const norms = targets.map(normalizeAnswer)
  if (parts.length >= 2) {
    return parts.every((p) => norms.some((t) => t.includes(p) || p.includes(t)))
  }
  return norms.some((t) => t === u || t.includes(u) || u.includes(t))
}

/**
 * LEARNING_FACE: full Teach face for new / low-stability;
 * Review uses cue-fade ladder instead.
 */
export function isTeachMode(card: VocabCard): boolean {
  return card.status === 'new' || (card.stability ?? 0) < 1
}
