export type CardStatus = 'new' | 'learning' | 'weak' | string

export interface VocabCard {
  slug: string
  lemma: string
  ipa: string
  pronunciation_tip: string
  etymology: string
  pos: string
  gloss_en: string
  gloss_zh: string
  register: string
  status: CardStatus
  home_scene_id: string
  title_cue: string
  target_chunks: string
  due: string
  stability: number
  difficulty: number
  use: string
  avoid: string
  article: string
  home_scene: string
  cloze: string
  /** Why this chunk (vs near-synonyms) — LEARNING_FACE. */
  why_this_chunk: string
  /** Chinese/weak-English rewrite prompt forcing the target chunk. */
  rewrite_prompt: string
  /** Model English answer(s) using the chunk. */
  rewrite_answer: string
  /** Pitfalls short list. */
  pitfalls: string
  /** Cue-fade L1: Chinese reopen (who / goal / risk). */
  cue_fade_cn: string
  /** Cue-fade L3 prompt. */
  cue_fade_why_prompt: string
  /** Cue-fade L4: same-scene Slack/email upgrade. */
  cue_fade_upgrade: string
  /** Learning-face version marker, e.g. v2-2026-09-18. */
  learning_face?: string
}

export interface CardsFile {
  version: number
  updated: string
  cards: VocabCard[]
}

export interface FsrsState {
  due: string
  stability: number
  difficulty: number
  status: CardStatus
  last_reviewed: string | null
}

export type FsrsStore = Record<string, FsrsState>

export type Rating = 'again' | 'hard' | 'good' | 'easy'

/** Teach path (new / low stability). */
export type TeachStepId = 'teach' | 'cloze' | 'rewrite' | 'rate'

/** Review cue-fade ladder (LEARNING_FACE). */
export type FadeStepId =
  | 'fade_cn'
  | 'fade_produce'
  | 'fade_why'
  | 'fade_upgrade'
  | 'rate'

export type StudyStep = TeachStepId | FadeStepId

export type FilterMode = 'due' | 'new' | 'all'

export type AppView = 'home' | 'studio' | 'study' | 'admin'
