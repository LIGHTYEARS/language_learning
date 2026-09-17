# supplemental

- **IPA / 音标:** /ˌsʌplɪˈmentl/
- **Pronunciation tip:** sup-luh-MEN-tl；重音在 MEN
- **Etymology / 词源:** 拉丁 *supplere*「fill up / 补足」→ *supplemental*
- **POS:** adjective
- **Gloss (EN):** extra material that supports the main point but is not the core decision
- **释义 (ZH):** 补充的；附带的（非核心决策部分）
- **Register:** formal / neutral
- **Status:** new
- **home_scene_id:** rfc-appendix-links
- **title cue:** `RFC · appendix or core?`
- **Scene type:** RFC / PR comment
- **target chunks:** `supplemental materials`; `a supplemental note`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *supplemental materials*; *a supplemental note*; *supplemental appendix*
- AVOID: *add materials* 当标签；别把「补充材料」拼成 *extra stuff section* 当正式 RFC 用语

## Home scene (frozen)
RFC review. Extra benchmarks and screenshots are useful but currently sit above the decision. You move them under **supplemental materials** so they don’t bury the call. You add **a supplemental note** that they inform the choice but are not the decision itself. Reviewers can still click through; the RFC body stays scannable. Author updates the TOC: Decision → Alternatives → Supplemental.

## Cloze (same home scene)
RFC review. Extra benchmarks and screenshots are useful but must not bury the decision. You move them under ______ and add ______ that they inform the choice but are not the decision itself.

## Why this chunk
- *supplemental materials* = 额外、非核心附件；比 *extra stuff* 更像 RFC 用语。
- *a supplemental note* = 标明「仅供参考、不是决策本身」。
- vs *essential/core*：supplemental 明确不是决策主体。

## Rewrite prompt
弱句：「额外基准和截图别淹没决策，放到补充材料，并加一条补充说明。」  
→ 必须用 `supplemental materials` / `a supplemental note` 改写。

## Cue-fade (review)
1. CN：RFC 里基准/截图别淹没决策 → 挪到补充材料并加补充说明
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *extra stuff* / 当成 core
4. 同场景发一条 RFC 评论升级（保留 chunk）
5. 稳定后再考虑 transfer（如培训 supplemental materials）

## Pitfalls
- *supplemental* = 额外、非核心；别当成 *essential* / *core*
- RFC 里用 *supplemental materials* 比 *extra stuff* 更干净

## Source
- User provided: supplemental
- Found in: [Grok Bot: The AI Team That Never Sleeps](https://x.com/0xwhrrari/status/2095497109524934750) (X Article)
- Article attest (raw usage): `a longer supplemental training run`
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
