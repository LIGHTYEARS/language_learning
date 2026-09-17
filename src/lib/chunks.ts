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

/** Build 2–3 options: real target chunk(s) + distractors from other cards. */
export function buildChunkOptions(
  card: VocabCard,
  allCards: VocabCard[],
  count = 3,
): string[] {
  const correct = parseTargetChunks(card.target_chunks)
  const primary = correct[0] ?? card.lemma
  const distractors: string[] = []
  const pool = allCards
    .filter((c) => c.slug !== card.slug)
    .flatMap((c) => parseTargetChunks(c.target_chunks))
    .filter((ch) => ch && ch !== primary && !correct.includes(ch))

  // shuffle pool
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  for (const d of shuffled) {
    if (distractors.length >= count - 1) break
    if (!distractors.includes(d)) distractors.push(d)
  }

  // fallback lemmas if not enough
  if (distractors.length < count - 1) {
    for (const c of allCards) {
      if (c.slug === card.slug) continue
      if (!distractors.includes(c.lemma) && c.lemma !== primary) {
        distractors.push(c.lemma)
      }
      if (distractors.length >= count - 1) break
    }
  }

  const options = [primary, ...distractors.slice(0, count - 1)]
  return options.sort(() => Math.random() - 0.5)
}

/** Normalize user cloze answer for loose compare. */
export function normalizeAnswer(s: string): string {
  return s
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function clozeMatches(userInput: string, targets: string[]): boolean {
  const u = normalizeAnswer(userInput)
  if (!u) return false
  // allow semicolon-separated multi-blank answers
  const parts = u.split(/[;；,，]/).map((p) => p.trim()).filter(Boolean)
  const norms = targets.map(normalizeAnswer)
  if (parts.length >= 2) {
    return parts.every((p) => norms.some((t) => t.includes(p) || p.includes(t)))
  }
  return norms.some((t) => t === u || t.includes(u) || u.includes(t))
}
