# magnify

- **IPA / 音标:** /ˈmæɡnɪfaɪ/
- **Pronunciation tip:** MAG-nih-fy；重音在 MAG
- **Etymology / 词源:** 拉丁 *magnus*「great / 大」+ *facere*「make / 使」→ *magnify*
- **POS:** verb
- **Gloss (EN):** make something larger in impact or appearance; enlarge the blast radius of a risk
- **释义 (ZH):** 放大；使影响/风险变大
- **Register:** formal / neutral
- **Status:** new
- **home_scene_id:** risk-review-slide
- **title cue:** `risk review · tiny bug`
- **Scene type:** meeting / risk review
- **target chunks:** `magnify the risk`; `magnify … into …`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *magnify the risk*; *magnify … into …*; *magnify the blast radius*
- AVOID: *make risk bigger* 当唯一说法；别把「放大风险」拼成 *big the risk*

## Home scene (frozen)
Risk review before launch. A tiny edge-case bug looks minor in isolation on the slide. You flag it: on a hot path it would **magnify the risk**. Left alone, it could **magnify** a single timeout **into** a full-region outage. PM asks whether to ship behind a flag; you say yes until the retry path is fixed. You add one line to the risk register: “Small in unit test; large under load.”

## Cloze (same home scene)
Risk review before launch. A tiny edge-case bug looks minor in isolation, but on a hot path it would ______. Left alone, it could ______ a single timeout ______ a full-region outage.

## Why this chunk
- *magnify the risk* = 在负载/热路径下放大影响；不是字面「用放大镜看」。
- *magnify … into …* = 把小故障放大成大事故；比 *make risk bigger* 更像风险语言。
- vs *amplify*：接近；职场风险 slide 更常说 *magnify the risk*。

## Rewrite prompt
弱句：「这个小 bug 在热路径会把风险放大，一次超时可能放大成全区故障。」  
→ 必须用 `magnify the risk` / `magnify … into …` 写出风险评审英文。

## Cue-fade (review)
1. CN：上线风险评审 → 热路径小 bug 会放大风险，超时可放大成全区故障
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *make risk bigger* / 字面放大镜
4. 同场景发一条 Slack/纪要升级（保留 chunk）
5. 稳定后再考虑 transfer（如 postmortem：magnify blast radius）

## Pitfalls
- *magnify A into B* = 把 A 放大成 B；别写成冗长 *magnify A to become B* 当唯一块
- 职场风险语境优先 *magnify the risk*，不是字面「用放大镜看」

## Source
- User provided: magnify
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `A persistent agent magnifies both model capability and model error`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
