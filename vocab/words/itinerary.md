# itinerary

- **IPA / 音标:** /aɪˈtɪnərəri/ (US /aɪˈtɪnəˌreri/)
- **Pronunciation tip:** eye-TIN-uh-rerry；重音在 TIN
- **Etymology / 词源:** 拉丁 *iter*「旅程」→ *itinerarium*「旅行记录/路线」→ *itinerary*
- **POS:** noun (pl. itineraries)
- **Gloss (EN):** planned travel/visit route and schedule
- **释义 (ZH):** 行程安排（拜访路线+时间）
- **Register:** neutral / formal
- **Status:** new
- **home_scene_id:** client-onsite-visit
- **title cue:** `email · draft visit plan`
- **Scene type:** email / itinerary
- **target chunks:** `draft/confirm/lock the itinerary`; `any change to the … itinerary`
- **due:** 2026-09-08
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *draft/confirm/lock the itinerary*; *any change to the … itinerary*
- AVOID: 用 *itinerary* 当 *agenda*；别堆 *travel schedule plan*

## Home scene (frozen)
Next week’s client onsite. You own travel and building access. Email to Ops and the AE: please **draft** and **confirm the itinerary** for the visit — flights, hotel, security badge windows. **Any change to the** VIP **itinerary** must clear security before we **lock the itinerary**. Ops won’t book cars until the itinerary is locked. You CC Legal so NDAs stay aligned with the visit order.

## Cloze (same home scene)
Email: please ______ for next week’s onsite; ______ must clear security before we ______. Ops won’t book cars until the itinerary is locked.

## Why this chunk
- *draft/confirm/lock the itinerary* = 拜访路线+时间的工件状态机；不是会议 *agenda*。
- *any change to the … itinerary* = 改动要走安保/确认，不是随便改「行程安排」。
- vs *schedule*：*schedule* 太泛；onsite 旅行计划固定说 *itinerary*。

## Rewrite prompt
弱句：「请起草确认下周行程；任何行程改动要过安保，然后锁定行程。」  
→ 必须用 `draft/confirm/lock the itinerary` / `any change to the … itinerary` 写可发邮件。

## Cue-fade (review)
1. CN：下周 onsite → 起草确认行程；改动过安保后锁定
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *agenda* / *travel schedule plan*
4. 同场景发一条 Slack/邮件升级（保留 chunk）
5. 稳定后再考虑 transfer（如内部 offsite itinerary）

## Pitfalls
- 用 *itinerary* 当 *agenda*；别堆 *travel schedule plan*
- 锁定前用 *draft/confirm*；锁定后改动用 *any change to the … itinerary*

## Source
- User provided: itineraries
- Home scene locked: 2026-09-15；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
