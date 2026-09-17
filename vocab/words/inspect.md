# inspect

- **IPA / 音标:** /ɪnˈspekt/
- **Pronunciation tip:** in-SPEKT；重音在 SPEKT
- **Etymology / 词源:** 拉丁 *inspicere*「look into / 察看」→ *inspect*
- **POS:** verb
- **Gloss (EN):** look carefully at evidence (logs, traces, diffs) before changing code
- **释义 (ZH):** 仔细检查；审看（日志/链路等）
- **Register:** neutral / workplace
- **Status:** new
- **home_scene_id:** latency-spike-debug
- **title cue:** `pager · p99 spike`
- **Scene type:** pager / debug
- **target chunks:** `inspect the logs`; `inspect … for …`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *inspect the logs*; *inspect … for …*; *inspect traces*; *inspect the diff*
- AVOID: *check carefully the logs* 语序别扭；别把「排查」一律写成 *look look*

## Home scene (frozen)
Pager for a p99 latency spike. Chat is already guessing “just bump the timeout.” Before changing code, you **inspect the logs** and traces. You **inspect** the hot path **for** a lock or N+1 query. Evidence shows a missing index on the new filter — not a timeout knob. Fix comes after evidence, not after a guess; you post the trace link in the war room.

## Cloze (same home scene)
Pager for a p99 latency spike. Before changing code, you ______ and traces and ______ the hot path ______ a lock or N+1 query. Fix comes after evidence, not after a guess.

## Why this chunk
- *inspect the logs* = 有目的地审看证据；比 *look at* / *check check* 更像调试语言。
- *inspect … for …* = 在 X 里找具体嫌疑 Y；不是空泛「再看看」。
- vs *examine*：可用，但日志/链路职场英语更常说 *inspect*。

## Rewrite prompt
弱句：「改代码前先仔细看日志，再查热路径有没有锁或 N+1。」  
→ 必须用 `inspect the logs` / `inspect … for …` 写出可发的 war-room 英文。

## Cue-fade (review)
1. CN：p99 延迟告警 → 改代码前先审日志/链路找锁或 N+1
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *look look* / *check carefully*
4. 同场景发一条 war-room 升级（保留 chunk）
5. 稳定后再考虑 transfer（如 PR：inspect the diff）

## Pitfalls
- *inspect X for Y* = 在 X 里找 Y；别只说 *check check*
- 比 *look at* 更强调「有目的地审看证据」

## Source
- User provided: inspect
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `a short path to inspect`; `decide what to inspect next`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
