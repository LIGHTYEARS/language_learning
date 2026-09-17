# recipe

- **IPA / 音标:** /ˈresəpi/
- **Pronunciation tip:** RES-uh-pee
- **Etymology / 词源:** 拉丁 *recipe*「拿取」（药方命令式）→ 食谱/配方 → 可复现步骤
- **POS:** noun (pl. recipes)
- **Gloss (EN):** repeatable steps that produce a result; also cooking instructions
- **释义 (ZH):** 可复现的做法/配方
- **Register:** neutral
- **Status:** new
- **home_scene_id:** oncall-runbook-pr
- **title cue:** `PR comment · runbook`
- **Scene type:** PR comment
- **target chunks:** `step-by-step recipe`; `a recipe for …`
- **due:** 2026-09-08
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *step-by-step recipe*; *a recipe for success/failure*; *no single recipe for …*
- AVOID: 字面「做饭」硬套；别混 *receipt*

## Home scene (frozen)
PR review of the incident runbook. The prose is vague — “check things” with no owner or order. You comment: keep this as a **step-by-step recipe** on-call can repeat at 3 a.m. Vague ownership plus tight deadlines is **a recipe for** failure (and another Sev). You ask for numbered steps, commands, and rollback. Author agrees to rewrite before merge so night shift isn’t guessing.

## Cloze (same home scene)
PR on the runbook: keep this as a ______ on-call can repeat. Vague ownership + tight deadlines is ______ failure.

## Why this chunk
- *step-by-step recipe* = 可复现的逐步做法；不是空泛 *steps* / 字面做饭。
- *a recipe for …* =（常带讽刺）必然导向某结果；比 *will cause* 更像职场习语。
- 别混 *receipt*（收据）。

## Rewrite prompt
弱句：「把 runbook 写成值班能照着重复的逐步配方；权责不清+截止日期紧就是事故配方。」  
→ 必须用 `step-by-step recipe` / `a recipe for …` 写 PR 评论。

## Cue-fade (review)
1. CN：runbook PR → 写成值班能重复的逐步配方；权责不清是事故配方
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是空泛 *steps* / 别混 *receipt*
4. 同场景补一条 PR 升级评论（保留 chunk）
5. 稳定后再考虑 transfer（如 onboarding recipe）

## Pitfalls
- 字面「做饭」硬套；别混 *receipt*
- 反讽块 *a recipe for failure/disaster* 很常见，别直译成「失败的食谱」发呆

## Source
- User provided: recipes
- Home scene locked: 2026-09-15；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
