# rollout

- **IPA / 音标:** /ˈrəʊlaʊt/
- **Pronunciation tip:** ROLL-out；复合词重音在 ROLL
- **Etymology / 词源:** 现代复合词 *roll* + *out*（产品发布义约 mid-20c）
- **POS:** noun (also verb: roll out)
- **Gloss (EN):** a planned release of a feature or change, often in stages
- **释义 (ZH):** （功能/变更的）上线推送；发布节奏
- **Register:** neutral / workplace
- **Status:** new
- **home_scene_id:** feature-rollout-plan
- **title cue:** `launch doc · % gates`
- **Scene type:** meeting / launch doc
- **target chunks:** `phased rollout`; `rollout plan`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *phased rollout*; *rollout plan*; *gradual rollout*; *roll out to N%*
- AVOID: *roll out plan* 当名词时漏连写；别把「分批上线」拼成 *batch online*；勿与单次 *cutover* 混为一谈

## Home scene (frozen)
Launch doc review for a new feature. Someone wants a single Friday cutover. You refuse a big-bang and define percent gates by region. The **rollout plan** calls for a **phased rollout**: 5% → 25% → 100%, with kill switches at each gate. You add owners for metrics and a rollback drill. Doc status moves to “ready for eng + support review” only after the gates are written.

## Cloze (same home scene)
Launch doc review for a new feature. You refuse a single cutover and define percent gates by region. The ______ calls for a ______: 5% → 25% → 100%, with kill switches at each gate.

## Why this chunk
- *rollout plan* = 发布节奏文档；名词常连写 *rollout*。
- *phased rollout* = 分百分比门控上线；≠ 一次 *big-bang cutover* / *batch online*。
- 动词常用 *roll out*（分开写）。

## Rewrite prompt
弱句：「拒绝一次切全量；rollout plan 要分阶段：5%→25%→100%。」  
→ 必须用 `rollout plan` / `phased rollout` 改写。

## Cue-fade (review)
1. CN：launch doc → 拒绝一次切全量，要分阶段 rollout plan
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *cutover* / *batch online*
4. 同场景发一条评论升级（保留 chunk）
5. 稳定后再考虑 transfer（如 region rollout）

## Pitfalls
- 名词常用 *rollout*（连写）；动词常 *roll out*
- *phased rollout* ≠ 一次 *big-bang cutover*

## Source
- User provided: rollout
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `the same rollout`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
