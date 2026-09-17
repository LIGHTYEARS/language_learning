# spectacle

- **IPA / 音标:** /ˈspektəkl/
- **Pronunciation tip:** SPEK-tuh-kl；重音在 SPEK
- **Etymology / 词源:** 拉丁 *spectare*「to look / 看」→ *spectacle*
- **POS:** noun
- **Gloss (EN):** a dramatic public show — often unhelpful when you need calm incident response
- **释义 (ZH):** 场面；公开闹大的「戏」；哗众取宠的公开表现
- **Register:** formal / neutral
- **Status:** new
- **home_scene_id:** incident-comms-warroom
- **title cue:** `war room · public post?`
- **Scene type:** war room / incident
- **target chunks:** `make a spectacle of …`; `avoid a public spectacle`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *make a spectacle of …*; *avoid a public spectacle*; *turn … into a spectacle*
- AVOID: *make a show of outage* 乱套；别把「别闹大」拼成 *don’t big show*

## Home scene (frozen)
Incident war room. Customers are still down; status page is yellow. Someone wants a dramatic public post mid-outage to “own the narrative.” You warn: don’t **make a spectacle of** the outage while customers are still down. **Avoid a public spectacle** until we have a clear status and a fix ETA. Comms lead agrees: ship a factual update, not a theater thread.

## Cloze (same home scene)
Incident war room. Someone wants a dramatic public post mid-outage. You warn: don’t ______ the outage while customers are still down — ______ until we have a clear status and a fix ETA.

## Why this chunk
- *make a spectacle of …* = 把事件闹成公开大戏；否定用法很常见。
- *avoid a public spectacle* = 冷静事故沟通；≠ 放弃透明（*transparency* ≠ 演戏）。
- vs *visibility*：可见度可以冷静；spectacle 带哗众取宠。

## Rewrite prompt
弱句：「客户还挂着的时候别把故障闹成公开大场面。」  
→ 必须用 `make a spectacle of` / `avoid a public spectacle` 改写。

## Cue-fade (review)
1. CN：故障 war room 有人要戏剧性公关贴 → 你劝别把故障闹成公开大场面
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *transparency* / *don’t big show*
4. 同场景发一条 war-room 升级（保留 chunk）
5. 稳定后再考虑 transfer（如 launch：proof, not spectacle）

## Pitfalls
- 职场里常是否定用法：*avoid a public spectacle* / *don’t make a spectacle of X*
- 别和中性 *visibility* / *transparency* 混为一谈——透明不等于演戏

## Source
- User provided: spectacle
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `Start with proof, not spectacle`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
