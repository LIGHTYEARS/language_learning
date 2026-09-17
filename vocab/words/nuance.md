# nuance

- **IPA / 音标:** /ˈnjuːɑːns/ (US /ˈnuːɑːns/)
- **Pronunciation tip:** NEW-ahns（美）/ NYOO-ahns（英）
- **Etymology / 词源:** 法语 *nuance*「色调深浅」← *nue*「云」→ 细微差别
- **POS:** noun
- **Gloss (EN):** a subtle difference in meaning, tone, or feeling
- **释义 (ZH):** 细微差别；措辞的微妙处
- **Register:** formal / professional
- **Status:** new
- **home_scene_id:** recommend-vs-require-faq
- **title cue:** `FAQ review · soft vs hard`
- **Scene type:** doc review / FAQ
- **target chunks:** `a nuance between A and B`; `with one nuance: …`
- **due:** 2026-09-08
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *a nuance between A and B*; *with one nuance: …*; *capture/miss a nuance*
- AVOID: 任何小差别都叫 *nuance*；别造 *nuanceful*

## Home scene (frozen)
FAQ / policy review with Support and Legal. The draft misses **a nuance between** “recommend” **and** “require” — soft guidance reads like a hard must. You flag it so Support doesn’t overpromise and Legal doesn’t inherit a shall. I agree on the conclusion, **with one nuance:** timing still needs Legal before we publish. You leave a comment: “Keep recommend language; move the hard must to the contract FAQ.”

## Cloze (same home scene)
FAQ review: the draft misses ______ “recommend” and “require.” I agree on the conclusion, ______: timing still needs Legal.

## Why this chunk
- *a nuance between A and B* = 仍重要的细微色差；不是每个小差别都叫 *nuance*。
- *with one nuance: …* = 基本同意但保留一条微妙条件；比 *but one thing* 更职业。
- vs *distinction*：*distinction* 是硬线；这里是软/硬措辞的细差 → *nuance*。

## Rewrite prompt
弱句：「草稿漏了 recommend 和 require 之间的细微差别；结论我同意，但时机还要过 Legal。」  
→ 必须用 `a nuance between A and B` / `with one nuance: …` 改写。

## Cue-fade (review)
1. CN：FAQ 草稿漏了 recommend vs require 的细微差别 → 你补上，并保留 Legal 时机
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *distinction* / 任何小差别都叫 nuance
4. 同场景发一条评论升级（保留 chunk）
5. 稳定后再考虑 transfer（如 beta vs GA 措辞）

## Pitfalls
- 任何小差别都叫 *nuance*；别造 *nuanceful*
- 与 *distinction* 分工：细色差用 nuance，硬界限用 distinction

## Source
- User provided: nuance
- Home scene locked: 2026-09-15；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
