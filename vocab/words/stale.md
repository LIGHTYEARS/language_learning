# stale

- **IPA / 音标:** /steɪl/
- **Pronunciation tip:** stayl；一词一音节
- **Etymology / 词源:** 中古英语 *stale*「不新鲜」；职场引申为过期/未刷新的数据或分支（UNCERTAIN 精确中古词源路径，但「不新鲜→过期」义稳定）
- **POS:** adjective
- **Gloss (EN):** no longer fresh or up to date (data, cache, branch, approval)
- **释义 (ZH):** 陈旧的；未刷新的（数据/缓存/分支）
- **Register:** neutral / workplace
- **Status:** new
- **home_scene_id:** stale-branch-pr-review
- **title cue:** `PR · branch behind main`
- **Scene type:** PR review
- **target chunks:** `stale data`; `a stale branch`
- **due:** 2026-09-17
- **stability:** 0
- **difficulty:** 5.0

## Collocations / 固定搭配（别直译）
- USE: *stale data*; *a stale branch*; *stale cache*; *go stale*
- AVOID: *old data* 当唯一说法；别把「过期分支」拼成 *expired branch*（更常说 stale）

## Home scene (frozen)
PR review. CI is green but the branch is 40 commits behind main. Reviewers risk approving **stale data** in the preview environment. You ask for a rebase: this is **a stale branch** — refresh before we merge. Author rebases, CI reruns, and the preview matches current main. You approve only after the diff no longer fights last week’s main.

## Cloze (same home scene)
PR review. CI is green but the branch is 40 commits behind main, so reviewers risk approving ______ in the preview. You ask for a rebase: this is ______ — refresh before we merge.

## Why this chunk
- *stale data* = 未刷新、相对 main/源已过期；不是笼统 *old data*。
- *a stale branch* = 落后 main 的分支；职场更常说 stale，不是 *expired branch*。
- vs *outdated*：可用；Git/缓存语境固定块更常 *stale*。

## Rewrite prompt
弱句：「分支落后 40 个 commit，预览里可能是过期数据；这是个 stale branch，先 rebase。」  
→ 必须用 `stale data` / `a stale branch` 改写。

## Cue-fade (review)
1. CN：PR 落后 main 40 commits → 预览可能是过期数据，先 rebase
2. 只看 title cue → 产出含 target chunk 的一句
3. 为什么不是 *expired branch* / 光说 *old data*
4. 同场景发一条 PR 评论升级（保留 chunk）
5. 稳定后再考虑 transfer（如 stale cache）

## Pitfalls
- *old data* 当唯一说法；别把「过期分支」拼成 *expired branch*（更常说 stale）
- 缓存也可 *stale cache* / *go stale*

## Source
- User provided: stale
- Home scene locked: 2026-09-17；learning-face expanded: 2026-09-18
- Date (Asia/Shanghai): 2026-09-18
