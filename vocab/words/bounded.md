# bounded

- **IPA / 音标:** /ˈbaʊndɪd/
- **Pronunciation tip:** BOUND-id；重音在 BOUND
- **Etymology / 词源:** bound「set limits / 设界」的过去分词作形容词（边界义；与 bind「捆」同源相关但职场用法指有界约束）
- **POS:** adjective
- **Gloss (EN):** limited by a clear constraint (time, scope, resources)
- **释义 (ZH):** 有界的；被明确限制住的
- **Register:** formal / neutral / academic
- **Status:** new
- **home_scene_id:** scope-spike-ticket
- **title cue:** `spike ticket · endless scope`
- **Scene type:** PR comment / ticket
- **target chunks:** `time-bounded`; `bounded by …`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *time-bounded*; *bounded by …*; *a bounded spike*; *scope-bounded*
- AVOID: *have limit spike*；*limited time research* 乱套；别把「有时限」拼成 *have time bound*

## Home scene (frozen)
Research spike ticket keeps growing — every reply adds another surface to “just check.” You comment on the ticket: mark the investigation as **time-bounded** — two days, then a write-up, no silent extension. You also state the work is **bounded by** the auth path only, not the whole billing surface. In Slack you ping the PM: “If we need billing, open a second spike; don’t inflate this one.” The ticket stays honest so the next reviewer knows the fence.

## Cloze (same home scene)
Research spike ticket keeps growing. You mark the investigation as ______ — two days, then a write-up — and state the work is ______ the auth path only, not the whole billing surface.

## Why this chunk
- *time-bounded* = 把时限写进工单身份，不是口头 *has a time limit*。
- *bounded by …* = 硬上限是范围 X；比 *limited to* 更像 spike/scope 用语。
- vs *constrained*：接近，但工单标题/标签更常说 *time-bounded* / *bounded by*。

## Rewrite prompt
弱句：「这个调研有时间限制，只能做两天，而且范围只限 auth。」  
→ 必须用 `time-bounded` / `bounded by …` 写出可发的工单/Slack 英文。

## Cue-fade (review)
1. CN：spike 工单范围越滚越大 → 你标成有时限，且只限 auth 路径
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *has a time limit* / *limited time research*
4. 同场景发一条 Slack 升级（保留 chunk）
5. 稳定后再考虑 transfer（如 RFC 里写 scope-bounded）

## Pitfalls
- *bounded by X* = 上限是 X；别写成 *bound of X*
- *time-bounded* 比 *has a time limit* 更像工单/spike 用语

## Source
- User provided: bounded
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `bounded task`; `bounded role`; `bounded job`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
