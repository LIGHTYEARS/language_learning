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

export type StudyStep = 'teach' | 'cloze' | 'chunk' | 'rate'

export type FilterMode = 'due' | 'new' | 'all'
