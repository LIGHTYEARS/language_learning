# superseded

- **IPA / 音标:** /ˌsuːpəˈsiːdɪd/ (US /ˌsuːpərˈsiːdɪd/)
- **Pronunciation tip:** soo-per-SEE-did；重音在 SEE
- **Etymology / 词源:** 拉丁 *super*「above」+ *sedere*「sit」→ *supersede*「坐到上面取代」→ 过去分词 *superseded*
- **POS:** adjective (also verb: supersede)
- **Gloss (EN):** replaced by something newer or better; no longer the current authority
- **释义 (ZH):** 已被取代的；不再作为现行标准的
- **Register:** formal / neutral / workplace
- **Status:** new
- **home_scene_id:** api-v1-docs-archive
- **title cue:** `docs · v1 still linked?`
- **Scene type:** docs review
- **target chunks:** `superseded by …`; `this doc is superseded`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *superseded by …*; *this doc/API is superseded*; *supersede the old …*
- AVOID: *replaced already by* 堆砌；别拼 *superceded*（常见错拼少一个 s）

## Home scene (frozen)
API docs review. The sidebar still links to the v1 design note as if it were current. You comment: **this doc is superseded** — point readers to v2. The v1 note was **superseded by** the GA contract and must move under Archive. You add a banner on the old page and fix the nav link. Docs owner acks: “Archive + redirect, shipping today.”

## Cloze (same home scene)
API docs review. The sidebar still links to the v1 design note as if it were current. You comment: ______ — point readers to v2. The v1 note was ______ the GA contract and must move under Archive.

## Why this chunk
- *this doc is superseded* = 不再是现行权威；文档/API 归档标准说法。
- *superseded by …* = 被更新的标准取代；比堆砌 *replaced already by* 干净。
- 拼写陷阱：不是 *superceded*（少一个 s）。

## Rewrite prompt
弱句：「这篇 v1 设计说明已经不是现行标准了，被 GA 合同取代了。」  
→ 必须用 `this doc is superseded` / `superseded by …` 改写。

## Cue-fade (review)
1. CN：侧栏还链 v1 设计说明 → 你标它已被 GA 合同取代
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *replaced already by* / 错拼 *superceded*
4. 同场景发一条 docs 评论升级（保留 chunk）
5. 稳定后再考虑 transfer（如 policy superseded）

## Pitfalls
- *replaced already by* 堆砌；别拼 *superceded*（常见错拼少一个 s）
- 动词原形 *supersede*；过去分词/形容词 *superseded*

## Source
- User provided: superseded
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
