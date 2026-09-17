# Learning face（每卡学习面）— 词汇专员 · 2026-09-18

用户反馈：多选框对学英语帮助弱、每词内容太少。学习面以 **cue fade + chunk** 为主，不对译。

## 必须露出的字段（对齐 `words/*.md`）

| # | 字段 | 卡内位置 | 前端怎么展示 |
| --- | --- | --- | --- |
| 1 | IPA + Pronunciation tip | YAML 头 | 音标大字 + 一行「怎么读」；可有朗读按钮（可选） |
| 2 | Etymology（诚实；UNCERTAIN 则标） | YAML 头 | 一行小字词源，不展开长文 |
| 3 | Gloss EN + 释义 ZH + Register | YAML 头 | 中英并排；语域 chip（formal/neutral…） |
| 4 | Target chunks（1–2） | YAML `target chunks` | **主目标**：大号 chip；整页评分只认 chunk+语域 |
| 5 | USE / AVOID collocations | Collocations | USE 绿、AVOID 红；AVOID 必须点名中式拼法 |
| 6 | Title cue | YAML `title cue` | 复习时的「场景标题」；cue-fade 第 2 阶只露这个 |
| 7 | Home scene (frozen) | Home scene | 完整 4–6 句职场段；chunk **加粗**；禁止每晚换皮 |
| 8 | Cloze（同场景挖空） | Cloze | 先挖空再揭晓；接受目标 chunk，不接受任意同义词 |
| 9 | Why this chunk | Why this chunk | 1–2 句：为何不是近义（provisional/possible/guide…） |
| 10 | Rewrite prompt | Rewrite | 给弱中文/弱英文 → 用户必须用目标 chunk 写出可发职场句 |
| 11 | Pitfalls | Pitfalls | 拼写/日历误用/中式组装；短列表 |
| 12 | Cue-fade ladder | Cue-fade（卡内或全局） | 五阶：中文重开 → 标题 cue → 裸产 chunk → why → 同场景升级 |

## 前端信息架构（建议）

1. **Teach（首次/new）** 全字段竖滑：IPA→词源→释义→chunks→USE/AVOID→完整主场景→Why→挖空练习→改写→Pitfalls→FSRS 评分  
2. **Review（due）** 默认 cue-fade，**不要**一上来多选释义：  
   - L1 中文：谁/目标/风险（用户口述或点选短答）  
   - L2 只显示 title cue → 用户打出含 target chunk 的一句  
   - L3 Why this chunk（自评或短答）  
   - L4 同场景 Slack/邮件升级（保留 chunk）  
   - 最后 Again/Hard/Good/Easy（按 chunk+register 判）  
3. **禁止**作为主路径：lemma↔中文对译、无场景的四选一释义题。

## 缺啥补啥（相对旧卡）

旧 `words/*.md` 常见缺口：**Rewrite prompt**、**Why this chunk**、**Cue-fade 说明**、场景偏短。样板卡 `tentative` / `feasible` / `steer` 已按完整学习面扩写。
