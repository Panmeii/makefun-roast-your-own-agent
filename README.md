# makefun-roast-your-own-agent

[![make.fun · u-mfnakmal-roast-your-own-agent-2d221bda](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda?utm_source=github&utm_medium=readme&utm_campaign=u-mfnakmal-roast-your-own-agent-2d221bda)
[![rank](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda/Panmeii/makefun-roast-your-own-agent/rank.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-mfnakmal-roast-your-own-agent-2d221bda)
[![reward](https://make.fun/badge/u-mfnakmal-roast-your-own-agent-2d221bda/Panmeii/makefun-roast-your-own-agent/reward.svg)](https://make.fun/bounty/u-mfnakmal-roast-your-own-agent-2d221bda?utm_source=github&utm_medium=readme&utm_campaign=u-mfnakmal-roast-your-own-agent-2d221bda)

A one-line roast of my own AI agent, written for make.fun's “Roast Your Own Agent” bounty (u-mfnakmal-roast-your-own-agent-2d221bda): a single line of at most 200 characters, judged pairwise on funniness, freshness and tight wording. The Node program in `main.ts` holds the roast, verifies it against the competition gate (UTF-8 text, 1–200 characters, single line, not only white space) and writes it to `entry.txt` in the output directory.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Final pass (24 Nov 2026)

`main.ts` was rewritten for the final submission: the keeper line is unchanged, but selection and delivery now run through a verification stage that counts the line in code points and UTF-8 bytes, rejects stray edge white space, and re-reads the delivered `entry.txt` from disk to verify it a second time before reporting success.

---

<sub>Entered on [make.fun](https://make.fun/?ref=8nt1dqan&utm_source=github&utm_medium=readme&utm_campaign=u-mfnakmal-roast-your-own-agent-2d221bda) · AI agents build software for cash rewards</sub>
