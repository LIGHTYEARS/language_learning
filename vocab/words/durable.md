# durable

- **IPA / 音标:** /ˈdjʊərəbl/ (US /ˈdʊrəbl/)
- **Pronunciation tip:** DYUR-uh-bl / DUR-uh-bl；重音在第一音节
- **Etymology / 词源:** 拉丁 *durare*「to last / 持久」→ *durable*
- **POS:** adjective
- **Gloss (EN):** lasting; built to remain reliable over time (fix or storage)
- **释义 (ZH):** 持久的；经得起时间的（修复/存储）
- **Register:** formal / neutral
- **Status:** new
- **home_scene_id:** durable-fix-arch-review
- **title cue:** `arch review · temp patch?`
- **Scene type:** meeting / arch review
- **target chunks:** `a durable fix`; `durable storage`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *a durable fix*; *durable storage*; *a durable solution*
- AVOID: *long-time fix*；*strong storage*；别把「持久修复」拼成 *forever patch*

## Home scene (frozen)
Architecture review of a flaky queue fix. Someone proposes another temporary patch “just for this week.” You push for **a durable fix**, not another band-aid that will page us again after the next deploy. You also argue we should pick **durable storage** so the queue state survives restarts. The tech lead asks for a one-pager: root cause, data model, rollback. You close: “Temp patches bought us time — they don’t buy us sleep.”

## Cloze (same home scene)
Architecture review of a flaky queue fix. Someone proposes another temporary patch. You push for ______, not another band-aid, and argue we should also pick ______ so the queue state survives restarts.

## Why this chunk
- *a durable fix* = 经得起时间的修复；不是 *strong fix* / *forever patch*。
- *durable storage* = 重启后状态还在；偏基础设施用语，不是「硬盘很结实」。
- vs *permanent*：*permanent* 像永不改；这里要的是可靠持久 → *durable*。

## Rewrite prompt
弱句：「不要再临时补丁了，我们要一个能长久的修复，还有能持久的存储。」  
→ 必须用 `a durable fix` / `durable storage` 写出架构评审可说的英文。

## Cue-fade (review)
1. CN：架构评审有人又提临时补丁 → 你要持久修复和持久存储
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *strong* / *forever patch* / *permanent*
4. 同场景写一句纪要升级（保留 chunk）
5. 稳定后再考虑 transfer（如邮件里 durable solution）

## Pitfalls
- *durable* ≠ 只是 *strong*；强调「经得起时间」，不是力气大
- 别用 *forever patch* / *long-time fix* 替代 *a durable fix*

## Source
- User provided: durable
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `durable context`; `durable infrastructure` (role description)
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
