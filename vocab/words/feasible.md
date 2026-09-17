# feasible

- **IPA / 音标:** /ˈfiːzəbl/
- **Pronunciation tip:** FEE-zuh-bl；重音 FEE；勿读成 *feasable*
- **Etymology / 词源:** 拉丁 *facere*「做」→ 古法 *faisible*「可做的」→ 英 *feasible*（强调约束下能落地，不是纸面可能）
- **POS:** adjective（名词 *feasibility*）
- **Gloss (EN):** possible and practical within real constraints
- **释义 (ZH):** 可行的；在现有资源/约束下能落地的
- **Register:** formal / neutral（方案评估、standup、立项）
- **Status:** new
- **home_scene_id:** phased-rollout-standup
- **title cue:** `standup · big-bang Friday?`
- **Scene type:** standup
- **target chunks:** `more feasible under/within …`; `not feasible under …`
- **due:** 2026-09-18
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *more feasible under/within …*; *not feasible under …*; *a feasible option/timeline*; *assess whether … is feasible*
- AVOID: *feasible to do* 乱套；*can do* / *able plan* 顶替；拼写 *feasable*

## Home scene (frozen)
Daily standup. A teammate pushes a full big-bang launch next Friday to “get it over with.” You look at headcount and the open Sev-2 queue: a phased rollout is **more feasible under** our current bandwidth, and a single cutover is **not feasible under** that constraint. You propose 10% → 50% → 100% with a kill switch, and ask PM to confirm stakeholder messaging before anyone commits Friday.

## Cloze (same home scene)
Daily standup. A teammate pushes a full big-bang launch next Friday. You look at headcount and the open Sev-2 queue: a phased rollout is ______ our current bandwidth, and a single cutover is ______ that constraint.

## Why this chunk
- *more feasible under …* 把「可行」绑在约束上；比光说 *possible* 更像方案语言。
- *not feasible under …* 拒绝时给理由框架，不是硬顶 *impossible*。
- vs *viable*：*viable* 偏长期可持续；这里争的是「这周资源能不能落地」→ *feasible*。

## Rewrite prompt
弱句：「这周五一次全上线不太行，人不够，还是分批吧。」  
→ 必须用 `more feasible under/within …` 或 `not feasible under …` 写 standup 可说的一句。

## Cue-fade (review)
1. CN：有人要周五大爆炸上线；人少还有故障 → 你主张分批  
2. title cue only → 带 chunk 的一句  
3. 为什么不是 *possible* / *can do*  
4. 同场景补一句给 PM 的 Slack（保留 chunk）  
5. transfer 仅在稳定后（如邮件里写 feasibility）

## Pitfalls
- 名词是 *feasibility*，不是 *feasibleness*
- 评估句式优先 *whether X is feasible*，少用中式 *X is can*

## Source
- User provided: feasible
- Home scene locked: 2026-09-15；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
