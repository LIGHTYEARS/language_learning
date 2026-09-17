# handoff

- **IPA / 音标:** /ˈhændɒf/ (US /ˈhændɔːf/)
- **Pronunciation tip:** HAND-off；复合词重音在 HAND
- **Etymology / 词源:** 体育/航空复合词 *hand* + *off*；职场引申为交接（责任与上下文移交）
- **POS:** noun (also verb: hand off)
- **Gloss (EN):** transfer of responsibility, context, and next actions to the next person
- **释义 (ZH):** （值班/班次）交接；责任与上下文移交
- **Register:** neutral / workplace
- **Status:** new
- **home_scene_id:** oncall-shift-handoff
- **title cue:** `Slack · night shift`
- **Scene type:** Slack / on-call
- **target chunks:** `clean handoff`; `handoff notes`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *clean handoff*; *handoff notes*; *hand off to …*; *shift handoff*
- AVOID: *hand over notes* 乱套为唯一说法；别把「干净交接」拼成 *clean give*

## Home scene (frozen)
End of on-call day shift. Night primary is already in the channel. Before you leave Slack, you write **handoff notes** the night person must read: open pages, mitigations tried, and who to page. Goal is a **clean handoff** — no tribal knowledge stuck in your head. You pin the thread and confirm they ack the open Sev-3. Only then you sign off: “Handing off — ping me only if the mitigation regresses.”

## Cloze (same home scene)
End of on-call day shift. Before you leave Slack, you write ______ the night person must read: open pages, mitigations tried, and who to page. Goal is a ______ — no tribal knowledge stuck in your head.

## Why this chunk
- *handoff notes* = 下一班能接着干的上下文包；不是礼貌道别。
- *clean handoff* = 上下文齐全、对方能独立运转；不是 *clean give*。
- vs *hand over*：可用，但值班场景固定块更常说 *handoff* / *handoff notes*。

## Rewrite prompt
弱句：「下班前写交接笔记，要做到干净交接。」  
→ 必须用 `handoff notes` / `clean handoff` 写出可发的 Slack 英文。

## Cue-fade (review)
1. CN：白班值班结束 → 写交接笔记，做到干净交接
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *clean give* / 只说 *hand over*
4. 同场景补一条 pin/ack 升级（保留 chunk）
5. 稳定后再考虑 transfer（如项目 handoff packet）

## Pitfalls
- 名词常 *handoff*（连写）；动词常 *hand off*
- *clean handoff* = 上下文齐全、对方能接着干；不是「礼貌地说再见」

## Source
- User provided: handoff
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `a handoff between Bots`; `compact handoff packet`; `handoff rules`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
