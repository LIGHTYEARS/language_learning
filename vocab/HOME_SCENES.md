# Frozen home scenes (写作教练 · adopted 2026-09-15)

FSRS reviews bind **word + scene_id**. Do not invent nightly reskins. Cue fade inside the same scene.

| slug | scene_id | title cue | home scene (freeze) | target chunks |
| --- | --- | --- | --- | --- |
| tentative | q3-roadmap-sync | `Q3 roadmap sync · sticky: dates?` | Wed Q3 roadmap sync with boss. He wants a launch date. Legal not signed off → you can only give a changeable schedule, not a hard commit. | `a tentative timeline`; `mark … as tentative` |
| feasible | phased-rollout-standup | `standup · big-bang Friday?` | Standup: someone pushes a full big-bang launch next Friday. Headcount/bandwidth thin → you argue for phased rollout. | `more feasible under/within …`; `not feasible under …` |
| steer | decision-criteria-drift | `review · pixels again` | Design/planning review drifts into UI pixels or competitor gossip. You pull the room back to decision/acceptance criteria. | `steer … back to …`; `steer clear of …` |
| itinerary | client-onsite-visit | `email · draft visit plan` | Next-week client onsite visit. You own the travel/visit plan and need confirmations (flights, hotels, security) before locking. | `draft/confirm/lock the itinerary`; `any change to the … itinerary` |
| recipe | oncall-runbook-pr | `PR comment · runbook` | PR/review of incident or onboarding runbook: prose is vague; on-call cannot repeat steps. You demand a reproducible step sequence. | `step-by-step recipe`; `a recipe for …` |
| nuance | recommend-vs-require-faq | `FAQ review · soft vs hard` | Policy/FAQ or contract review blurs recommend vs require (or beta vs GA, shall vs should). You flag the fine meaning difference so support/legal don’t overpromise. | `a nuance between A and B`; `with one nuance: …` |
| retention | user-retention-review | `growth review · churn up` | Monthly growth review. Churn rose; PM asks what keeps paying users. You frame user retention and retention rate (policy angle, not vanity signups). | `user retention`; `retention rate` |
| durable | durable-fix-arch-review | `arch review · temp patch?` | Architecture review of a flaky queue fix. Someone proposes another temporary patch; you push for a durable fix and durable storage. | `a durable fix`; `durable storage` |
| recurring | recurring-sync-calendar | `calendar · weekly sync?` | Scheduling the eng sync. Boss asks if this is one-off or every week; you book a recurring meeting and flag a recurring issue for the agenda. | `a recurring meeting`; `recurring issue` |
| rollout | feature-rollout-plan | `launch doc · % gates` | Launch doc review for a new feature. You define percent gates and regions via a phased rollout / rollout plan, not a single cutover. | `phased rollout`; `rollout plan` |
| distinction | beta-vs-ga-copy | `copy review · beta vs GA` | Marketing/support copy blurs beta and GA entitlements. You force a clear distinction so support doesn’t overpromise. | `make a distinction between A and B`; `a key distinction` |
| spectacle | incident-comms-warroom | `war room · public post?` | Incident war room. Someone wants a dramatic public post mid-outage. You warn against making a spectacle of the outage / avoid a public spectacle. | `make a spectacle of …`; `avoid a public spectacle` |
| bounded | scope-spike-ticket | `spike ticket · endless scope` | Research spike ticket keeps growing. You time-box the investigation (time-bounded) and name hard limits (bounded by …). | `time-bounded`; `bounded by …` |
| handoff | oncall-shift-handoff | `Slack · night shift` | End of on-call day shift. You write handoff notes so the night person gets a clean handoff before you leave. | `clean handoff`; `handoff notes` |
| supplemental | rfc-appendix-links | `RFC · appendix or core?` | RFC review. Extra benchmarks/screenshots are useful but must not bury the decision; label as supplemental materials / a supplemental note. | `supplemental materials`; `a supplemental note` |
| inspect | latency-spike-debug | `pager · p99 spike` | Pager for p99 latency. Before changing code, you inspect the logs / inspect … for … the culprit in traces. | `inspect the logs`; `inspect … for …` |
| magnify | risk-review-slide | `risk review · tiny bug` | Risk review before launch. A small edge-case bug on a hot path would magnify the risk / magnify a timeout into a region outage. | `magnify the risk`; `magnify … into …` |

| superseded | api-v1-docs-archive | `docs · v1 still linked?` | API docs review: v1 design note still linked as current. Mark this doc as superseded; it was superseded by the GA contract and should move to Archive. | `superseded by …`; `this doc is superseded` |

| stale | stale-branch-pr-review | `PR · branch behind main` | PR review: branch is far behind main, so preview risks stale data. Ask for rebase — this is a stale branch. | `stale data`; `a stale branch` |

## Review ladder (per due item)
1. Chinese reopen — who / goal / risk
2. Bare — title cue only → sentence with target chunk
3. Why this chunk (not near-synonym)
4. Same-scene Slack/email upgrade
5. Transfer scene — at most one/week after bare recall is stable
