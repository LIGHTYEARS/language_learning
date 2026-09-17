# recurring

- **IPA / 音标:** /rɪˈkɜːrɪŋ/
- **Pronunciation tip:** ri-KUR-ing；重音在 KUR，双写 r 不改变读音
- **Etymology / 词源:** 拉丁 *recurrere*「run back / 跑回」→ *recurring*
- **POS:** adjective
- **Gloss (EN):** happening repeatedly on a schedule or pattern
- **释义 (ZH):** 反复出现的；周期性的
- **Register:** formal / neutral
- **Status:** new
- **home_scene_id:** recurring-sync-calendar
- **title cue:** `calendar · weekly sync?`
- **Scene type:** meeting / calendar
- **target chunks:** `a recurring meeting`; `recurring issue`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *a recurring meeting*; *set … as recurring*; *a recurring issue*; *recurring revenue*（财务侧）
- AVOID: *repeat meeting*；*again and again meeting*；别把「周会」拼成 *every-week meeting* 当正式写法

## Home scene (frozen)
Scheduling the eng sync. Boss asks if this is one-off or every week. You say we should book **a recurring meeting**, not a one-off invite each Monday. In the same thread someone notes the flaky deploy alert is a **recurring issue**, so the sync needs a standing agenda slot. You set the series for 30 minutes and attach the agenda doc. Calendar title: “Eng sync (recurring) — deploy health first.”

## Cloze (same home scene)
Scheduling the eng sync. Boss asks if this is one-off or every week. You say we should book ______, not a one-off invite each Monday. In the same thread someone notes the flaky deploy alert is a ______, so the sync needs a standing agenda slot.

## Why this chunk
- *a recurring meeting* = 日历上的周期性系列；不是 *repeat meeting* / *every-week meeting*。
- *recurring issue* = 反复出现的问题，需要 standing slot；不是一次性 bug。
- 勿与财务 *recurring revenue* 在同一句硬混。

## Rewrite prompt
弱句：「别每周单独发邀请，订一个周期性会议；那个 flaky alert 也是 recurring issue。」  
→ 必须用 `a recurring meeting` / `recurring issue` 改写。

## Cue-fade (review)
1. CN：约 eng sync → 订周期性会议；flaky alert 也是 recurring issue
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *repeat meeting* / *again meeting*
4. 同场景发一条日历/Slack 升级（保留 chunk）
5. 稳定后再考虑 transfer（如 recurring revenue 财务语境）

## Pitfalls
- 日历语境优先 *a recurring meeting*；财务另有 *recurring revenue*，别在同一句里硬混
- 别写 *repeat meeting* / *again meeting*

## Source
- User provided: recurring
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `recurring routines`; `a real recurring job`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
