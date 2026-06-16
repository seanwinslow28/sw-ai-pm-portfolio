# Council Session — the-block-4q-critique

- **Session ID:** `20260616-164847-d3521f`
- **Profile:** `premium`
- **Duration:** 131.9s
- **Tokens:** 17163 in, 10988 out
- **Cost:** $0.2506

## Original prompt

```
You are critiquing four short answers on a single project page in a product manager's portfolio site. The author is Sean Winslow, an AI Product Manager. This page is for his most recent JOB (not a side project): **The Block**, where he was a Product Manager.

The page is built around four plain questions a recruiter sees as the main content, right after the title and a hero image:

1. **What is this?**
2. **Why this approach?**
3. **What would break?**
4. **What did I learn?**

CONTEXT YOU MUST WEIGH:
- **Audience:** hiring managers and recruiters for AI Product Manager roles. Some technical, many not. Goal: "less reading, faster comprehension, nothing inflated."
- **Voice:** the author's own — confident, concrete, a little dry, recruiter-safe (no profanity). Should read like a specific human, not generic resume/AI prose.
- **Truth bar:** every specific is real and verified against his resume. This is real employer work, so some specifics are deliberately redacted (institutional B2B). Flag anything that reads as inflated, resume-cliché, jargon-walled, or that a recruiter wouldn't believe.
- This is a JOB page. The positioning is deliberately "a PM who ships production software, not just specs" (an AI-PM differentiator), not a generic PM resume bullet list.
- Tight and scannable is the target.

WHAT THIS ACTUALLY WAS (grounding, not to quote): ~6 months as Product Manager at The Block (institutional crypto research/media firm). He shipped 3 production Claude Skills, built a RevOps automation pipeline (collapsed a 7-step manual deal handoff to one Salesforce trigger via 11 Zapier workflows + 10 intake forms), drove a 0-to-1 sponsored-courses revenue vertical (Polymarket × Campus, PRD v1→v3), automated AI media for an enterprise course launch, wrote an x402/agent-economy strategy memo, and co-authored the "Block Pro 2.0" product audit (benchmarked 9 platforms, ran an 11-risk pre-mortem) pitched to leadership.

YOUR TASK — each council member, independently and directly (the author wants the strongest critique, not flattery):

1. **Outsider comprehension.** Read "What is this?" as a busy recruiter. In one sentence, what kind of PM is this person and what did they actually do? If it reads as a generic PM resume bullet, say so.
2. **Credibility / overclaim.** Quote anything that reads inflated, resume-cliché, or too-good-to-be-true for a 6-month tenure. Do the numbers (7 steps, 11 workflows, ~6 hrs/week, 11-risk pre-mortem) help or feel like padding?
3. **Voice / AI-tells.** Quote anything generic-AI or resume-speak ("drove," "leveraged," "cross-functional," stacked lists, "not X but Y"). Where does it sound most like a real person?
4. **Weakest answer + one fix.** Name the single weakest of the four and the one highest-leverage edit. Then name the strongest.
5. **The buried lede.** Is there a more compelling true thing here the four answers underuse? (Especially the strongest AI-PM hiring signal in a B2B/crypto PM role.)

=== THE FOUR ANSWERS ===

**What is this?**
I was a Product Manager at The Block, an institutional crypto research and media firm, and the job I actually did was ship production software, not just write specs for it. In about six months I shipped three Claude Skills against a Q2 OKR, built a RevOps automation pipeline that collapsed a manual deal-handoff process to a single trigger, and drove The Block's first sponsored-courses revenue vertical from PRD to launch. I also co-authored the Block Pro 2.0 product audit pitched to leadership. Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud.

**Why this approach?**
At an institutional B2B firm the product is really the relationship, and a PM's output is mostly documents, coordination, and status. I bet that agentic engineering could compress that: instead of writing the same specs and running the same handoffs by hand, I built the tools that did them, skills for the repetitive PM work and automation that turned a Salesforce close into the whole downstream chain. The wager was simple. Build the lever once, and one PM covers ground that used to need more hands.

**What would break?**
Three places the work could have quietly fallen apart, and what I did about each. Handoff multiplication: closing a deal took seven manual steps across tools, each one a place the ball could drop, so I built an end-to-end pipeline (eleven Zapier workflows, ten intake forms, a central database) that turns one Salesforce "Closed Won" into the tickets, the client emails, and the routed notifications, about three hours back per deal. Manual repetition: the same PM chores ran every week, so three Claude Skills with human-review gates took roughly six hours a week off the team. Pitching past real blockers: the Block Pro 2.0 proposal could have sailed through on enthusiasm and died on capacity, so I ran an eleven-risk pre-mortem that surfaced the engineering-capacity and renewal-cliff problems before the pitch, not after.

**What did I learn?**
Institutional B2B is a relationship business; the tooling underneath is supposed to disappear so the relationship is all the customer feels. What I'm keeping from it: the PM who automates their own repetitive work scales, and the one who hoards it becomes the bottleneck. Build the lever, then hand it to the team.
```

## Council responses

### anthropic/claude-opus-4.7

# Critique of The Block project page

## 1. Outsider comprehension

A busy recruiter walks away with: *"PM at a crypto research firm who built internal AI tools and RevOps automation, plus launched a new revenue line."* That's actually pretty good — the "ship production software, not just specs" framing lands and differentiates him from generic PMs. But the **Claude Skills** line is the most important signal for an AI-PM role and it's buried mid-sentence next to OKR-speak. "Three Claude Skills against a Q2 OKR" reads more like a Jira ticket than the headline of an AI PM's recent work.

## 2. Credibility / overclaim

The numbers mostly help — they're specific, oddly-shaped (11, 10, 7), and resist sounding like padding. A real automation pipeline does look like 11 Zapier workflows and 10 intake forms. The "~6 hrs/week" and "~3 hrs per deal" are believable precisely because they're modest.

Things that read inflated for 6 months:
- **"drove The Block's first sponsored-courses revenue vertical from PRD to launch"** — "drove" + "first revenue vertical" is the most resume-cliché line on the page, and "from PRD to launch" in 6 months at an institutional firm will raise an eyebrow unless he was the sole PM on it. The grounding mentions PRD v1→v3, which is more honest than "to launch."
- **"co-authored the Block Pro 2.0 product audit pitched to leadership"** — "pitched to leadership" is doing work the verb shouldn't have to do. Did it ship? Get funded? If not, say so plainly.
- **"the job I actually did was ship production software, not just write specs for it"** — true to his positioning but slightly defensive; it telegraphs the chip on the shoulder before showing the work.

The 11-risk pre-mortem number is the one that flirts with padding. "Eleven risks" sounds like he counted bullets in a doc to have a number. "Pre-mortem that surfaced engineering-capacity and renewal-cliff problems" would be stronger without the count.

## 3. Voice / AI-tells

Most human, keep these:
- *"Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud."* — best line on the page. Dry, specific, recruiter-safe, sounds like one person.
- *"the product is really the relationship"*
- *"sailed through on enthusiasm and died on capacity"* — concrete and a little wry.
- *"Build the lever once"*

AI/resume tells:
- **"drove ... from PRD to launch"** — classic.
- **"against a Q2 OKR"** — corporate filler; the OKR isn't the interesting thing, the Skills are.
- **"end-to-end pipeline"** — mild jargon.
- **"the PM who automates their own repetitive work scales, and the one who hoards it becomes the bottleneck"** — this is the most LinkedIn-thought-leader sentence on the page. It's a "not X but Y" maxim landing where a specific learning should be.
- **"Build the lever, then hand it to the team."** — same issue. Two aphorisms back-to-back in the shortest answer.

## 4. Weakest + fix; strongest

**Weakest: "What did I learn?"** It's the shortest answer and it ends on two aphorisms rather than a specific lesson. For an AI PM role, this is the place to say something a recruiter hasn't read 200 times. **Fix:** replace the second half with one concrete thing he changed his mind about — e.g., *"I came in assuming the Skills were the product; they weren't. The pipeline that turned a Salesforce close into eleven downstream actions did more for the team than any single skill, because it removed a handoff humans hated. I'd build the connective tissue first next time."* Specific, slightly self-critical, and earns the "ship software, not specs" positioning.

**Strongest: "What would break?"** The three-failure-modes structure is the most differentiated answer on the page, the numbers are load-bearing, and "the ball could drop" / "sailed through on enthusiasm and died on capacity" are the most human sentences in the four.

## 5. The buried lede

The strongest AI-PM hiring signal here is barely surfaced: **he shipped three production Claude Skills with human-review gates against an OKR, at an institutional B2B firm where most PMs are still writing specs in Notion.** That's a rare resume line in late 2024 / 2025 — most PMs talking about "AI" are prompting ChatGPT. He actually shipped agentic tooling into a regulated-ish B2B workflow, with eval/review built in.

Also underused: the **x402 / agent-economy strategy memo**. For an AI PM role, "I wrote the company's position on agent-economy payment rails" is a stronger signal than the sponsored-courses vertical, and it's not on the page at all. If he wants to be hired as an AI PM and not a RevOps PM, that memo deserves a sentence in "What is this?" — even redacted to *"an internal strategy memo on agent-economy payment rails (x402)."*

The current page leads with "PM who ships software." The buried, stronger lede is **"AI PM who shipped agentic tooling into a B2B workflow and was trusted to write the company's agent-economy strategy — at six months in."**

### openai/gpt-5.5

## 1. Outsider comprehension

As a busy recruiter, I understand this as:

**Sean is an AI-fluent B2B Product Manager who shipped internal production automation and AI tools at an institutional crypto firm, especially around RevOps handoffs, PM workflows, and a new sponsored-courses revenue product.**

That is a good signal. It does **not** read like a generic PM resume bullet overall, mainly because “three Claude Skills,” “Salesforce Closed Won,” “Zapier workflows,” and “sponsored-courses revenue vertical” are specific enough to feel real.

The one risk: the first answer is doing a lot at once. A recruiter may remember “he shipped automation and AI tools,” but may lose the sponsored-courses and Block Pro audit because they are stacked quickly.

---

## 2. Credibility / overclaim

### Lines that feel strong and credible

> “In about six months I shipped three Claude Skills against a Q2 OKR”

This is specific and believable. “Against a Q2 OKR” makes it feel like real job work, not a side demo.

> “built a RevOps automation pipeline that collapsed a manual deal-handoff process to a single trigger”

Strong. This is probably the clearest business-impact claim.

> “Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud.”

Good. Human, honest, and sets expectations.

### Lines that feel inflated or slightly too polished

> “the job I actually did was ship production software, not just write specs for it”

The idea is excellent, but “not just write specs” is a familiar portfolio trope. It still works, but it risks sounding like positioning copy rather than a natural sentence.

Possible tighter version:

> “The useful part: I was not only writing PRDs. I was building the systems they described.”

Or:

> “The differentiator was that I shipped the internal tools too.”

---

> “At an institutional B2B firm the product is really the relationship”

This is plausible, but broad. It sounds like a consultant sentence. It is not bad, but it is less concrete than the rest.

---

> “I bet that agentic engineering could compress that”

This is the biggest jargon risk. “Agentic engineering” may be accurate in AI circles, but for many recruiters it sounds inflated or trend-chasing. It also makes the work sound more abstract than it was.

Better:

> “I treated the repetitive PM work as software-shaped: if the same handoff or draft happened every week, I tried to turn it into a tool.”

That sounds more like a specific human and less like AI discourse.

---

> “Build the lever once, and one PM covers ground that used to need more hands.”

Good line rhythmically, but it slightly overclaims. “Used to need more hands” can sound like you replaced headcount unless that is verifiable. Safer:

> “Build the lever once, and the same PM stops spending the week redoing the same handoffs.”

---

> “about three hours back per deal”

This helps if verified. It is concrete and tied to workflow impact.

---

> “roughly six hours a week off the team”

Also helps. This is the kind of number recruiters understand.

---

> “eleven Zapier workflows, ten intake forms, a central database”

Mixed. These numbers make the pipeline feel real, but they may be too implementation-heavy for the main copy. “11 workflows” helps. “10 intake forms” plus “central database” starts to feel like a parts list.

I would keep one implementation number, not all three.

Example:

> “I replaced it with an 11-workflow Zapier pipeline triggered by Salesforce Closed Won.”

That is enough.

---

> “eleven-risk pre-mortem”

This is credible but oddly precise. It sounds like a consulting artifact. The phrase is fine, but “eleven-risk” may feel like padding unless those risks matter.

Better:

> “I ran a pre-mortem that surfaced the two risks leadership actually needed to see: engineering capacity and renewal cliffs.”

That is more persuasive than the number.

---

## 3. Voice / AI-tells

### Most generic / AI-ish phrases

> “drove The Block's first sponsored-courses revenue vertical from PRD to launch”

“Drove” is resume language. Also “revenue vertical” is corporate-speak. The underlying work sounds interesting, but the wording hides it.

Possible replacement:

> “took the first sponsored-courses product from PRD v1 to launch”

Or, if naming is allowed:

> “took the Polymarket × Campus sponsored-course product from PRD v1 to launch”

That is much stronger.

---

> “agentic engineering”

Likely the biggest AI-tell.

---

> “compress that”

Not terrible, but slightly abstract.

---

> “Handoff multiplication”

This label feels a little invented. It is understandable, but not especially natural.

---

> “Pitching past real blockers”

This is a good idea, but the phrase is slightly workshop-y.

---

> “the PM who automates their own repetitive work scales, and the one who hoards it becomes the bottleneck”

This is close to aphorism territory. It is memorable, but a bit polished. Still acceptable because it sounds like a real lesson.

### Where it sounds most like a real person

> “Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud.”

This is the best voice line. Dry, honest, recruiter-safe, and specific to the constraints.

> “the job I actually did”

Also good. Plain and direct.

> “before the pitch, not after”

Good. Simple, concrete, not inflated.

> “Build the lever, then hand it to the team.”

Good closer. Slightly slogan-like, but effective.

---

## 4. Weakest answer + one fix

### Weakest: **Why this approach?**

It is the most abstract and jargon-heavy of the four. The actual strategy was good, but the answer currently spends too much time on theory:

> “the product is really the relationship”

> “agentic engineering could compress that”

> “Build the lever once”

The page is strongest when it says what broke, what got built, and what changed. This answer should explain the operating constraint in plain language.

### Highest-leverage edit

Rewrite “Why this approach?” around the constraint: small/high-touch B2B team, repeatable handoffs, AI/automation as force multiplier.

Suggested replacement:

> **Why this approach?**  
> The constraint was simple: high-touch B2B work creates a lot of repeatable PM labor. Deal handoffs, client setup, course launches, research packaging, status updates — important work, but easy to lose in Slack and spreadsheets. I treated the repeatable parts as product surface area. If a task happened every week, I tried to turn it into a Claude Skill, a Salesforce-triggered workflow, or a cleaner intake path. The goal was not “AI for AI’s sake.” It was fewer dropped balls, faster launches, and less PM time spent copying information between systems.

That keeps the thesis but removes the AI-consultant smell.

### Strongest: **What would break?**

This is the strongest because it proves judgment. It does not just list accomplishments; it shows failure modes and mitigations. That is PM thinking.

However, it is too dense as a paragraph. I would format it as bullets and cut some implementation detail.

Example:

> **What would break?**  
> Three things could have quietly killed the work:
>
> - **Deal handoffs.** A closed deal still required seven manual steps across tools. I replaced that with a Salesforce-triggered pipeline that created the right tickets, emails, and notifications, saving about three hours per deal.  
> - **Weekly PM repetition.** The same internal tasks kept coming back. I shipped three Claude Skills with human-review gates, taking roughly six hours a week off the team.  
> - **Product-audit optimism.** Block Pro 2.0 could have sounded good in a deck and died in execution. I ran a pre-mortem that surfaced the real risks — engineering capacity and renewal cliffs — before the leadership pitch.

This is much easier to scan.

---

## 5. The buried lede

Yes. The buried lede is:

**He was an AI Product Manager inside a real B2B company who actually shipped AI/automation into production workflows, with measurable time savings, instead of just writing AI strategy docs.**

That is the strongest hiring signal.

The page says this, but it slightly dilutes it by spreading attention across Claude Skills, RevOps, sponsored courses, Block Pro, and B2B philosophy. For an AI PM recruiter, the sharpest version is:

> “I shipped production AI and automation systems inside the operating core of an institutional B2B company: Claude Skills for recurring PM work, Salesforce-triggered RevOps workflows for deal handoffs, and launch automation for a new sponsored-course product.”

That is the differentiated story.

Second buried lede: **the Salesforce Closed Won trigger.** That is a very concrete PM/operator signal. It says he understands the messy middle between sales, product, ops, client delivery, and automation. In B2B PM hiring, that may be more valuable than “Claude Skills” alone.

Third: **human-review gates.** This is underused. For AI PM roles, “I built AI tools with human-review gates” is a strong safety/reliability signal. It shows he was not just prompting; he was designing operational controls.

I would make that more visible:

> “The AI work was not autonomous theater. The Claude Skills had human-review gates because the output touched real internal workflows.”

That is credible and mature.

Overall: strong page. The main edit is to remove abstract AI language and let the concrete operating work carry the story.

### ~google/gemini-pro-latest

Here is my direct critique of the portfolio page, evaluated strictly against your dual goals of high scannability and strong, credible AI-PM positioning.

**1. Outsider comprehension**
Based solely on "What is this?," this person reads as a highly technical, execution-focused internal PM (or RevOps/Growth PM) who builds internal AI and automation tools to accelerate team velocity. 
*Does it read like a resume bullet?* Yes. The second sentence ("In about six months I shipped... built a... and drove...") is literally three standard resume bullets strung together with commas. It functions fine, but it violates the premise of not reading like a resume.

**2. Credibility / overclaim**
*   **The Overclaim:** *"The job I actually did was ship production software, not just write specs for it."* You must rephrase this. To a technical hiring manager or SWE, configuring 11 Zapier workflows and writing 3 Claude Skills is not "shipping production software" (which implies pushing code to the core product's codebase). Calling it that will make technical recruiters roll their eyes. Position it truthfully: you build automated operating systems, AI tooling, and internal agents. That is highly valuable without stretching the definition of the term.
*   **The Good Numbers:** The specific numbers (*7 steps, 11 Zapier workflows, 10 intake forms, 11-risk pre-mortem*) are the best part of the page. They absolutely help. They are un-sexy, highly believable, and prove you actually did the work rather than just conceptualizing it. 
*   **The Resume-Cliché:** *"Drove The Block's first sponsored-courses revenue vertical from PRD to launch."* "Drove" is pure resume-speak. 

**3. Voice / AI-tells**
*   **Most Human:** *"Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud."* This is excellent. It sounds like a confident, battle-tested professional giving it to me straight. *"Three places the work could have quietly fallen apart, and what I did about each"* is also a superb, human framing.
*   **AI-Tells / Resume-Speak:** *"The wager was simple. Build the lever once, and one PM covers ground that used to need more hands."* and *"What I'm keeping from it: the PM who automates their own repetitive work scales, and the one who hoards it becomes the bottleneck."* These read like ChatGPT summarizing a LinkedIn thought-leadership post. They are platitudes, not evidence of your specific skill.

**4. Weakest answer + one fix**
*   **The Weakest:** "What did I learn?" It tells the recruiter absolutely nothing about your hard skills; it just repeats the thesis of the prior three sections (automation = good). 
*   **The Fix:** Swap the philosophical platitude for a hard, unexpected lesson about deploying AI/automation in a real B2B enterprise. For example: Did you learn that team adoption of Claude Skills requires more UX thinking than the prompt itself? Did a Zapier breakage teach you something about error-handling in RevOps? Give a specific product-execution learning. 
*   **The Strongest:** "What would break?" The content here is outstanding. Highlighting an "11-risk pre-mortem that surfaced the engineering-capacity and renewal-cliff problems" proves immense product maturity. *Note: this section is currently a wall of text. Break the three risks into tight bullet points so the recruiter actually reads them.*

**5. The buried lede**
You are applying for **AI Product Manager** roles, yet the clearest, most detailed explanation of your work centers on Zapier and Salesforce (standard RevOps). You mention "three Claude Skills," but wholly bury what they actually did, how you built them, or what specific "PM chores" they solved. 

The strongest AI-PM hiring signal isn't that you like AI; it's that you successfully identified an operational bottleneck, designed an LLM solution to fix it, engineered the prompts/skills, built human-in-the-loop review gates (which you mention briefly but don't explain), and got your team to actually use it. Spend less time explaining the Zapier pipeline and more time detailing exactly what those Claude Skills are and the AI-specific challenges you navigated to deploy them.

### x-ai/grok-4.20

**1. Outsider comprehension.**  
A busy recruiter would read this as: "He's an AI-savvy PM who actually shipped production software (three Claude Skills, heavy RevOps automation, and a sponsored-courses revenue line) in a 6-month stint at a crypto research firm instead of just writing docs." It mostly avoids generic resume-speak, but still feels a bit like a polished bullet list.

**2. Credibility / overclaim.**  
Nothing is outright unbelievable given the short tenure, but several specifics flirt with padding:  
- "eleven Zapier workflows, ten intake forms" — reads like résumé decoration. The exact counts feel suspiciously neat.  
- "an eleven-risk pre-mortem" — same issue; the parallel numbering to the Zapier count smells contrived.  
- "about three hours back per deal" and "roughly six hours a week off the team" — these are the weakest because they're presented as precise outcomes without any source or baseline.  
- "drove The Block's first sponsored-courses revenue vertical from PRD to launch" is the closest thing to overclaim; it implies he single-handedly created a new revenue line when the reality (per your grounding) was more scoped (Polymarket × Campus). "Drove" is classic résumé inflation.

The numbers help specificity but currently hurt credibility because they feel stacked for effect rather than naturally emergent.

**3. Voice / AI-tells.**  
Resume-speak / generic-AI lines:  
- "drove The Block's first sponsored-courses revenue vertical"  
- "ship production software, not just write specs for it" (the "not X but Y" construction is very common in AI-generated portfolio copy)  
- "the wager was simple. Build the lever once..." (this whole paragraph has a slightly too-clever, blog-post tone)  
- Stacked parallel structure in "What would break?" feels manufactured.  

Most human-sounding passage: the last two sentences of "What did I learn?" and the redaction note at the end of "What is this?" Those feel like the author actually speaking.

**4. Weakest answer + one fix. Strongest.**  
**Weakest:** "What would break?" — it is the most résumé-like, turns risks into humblebrags, and the 7/11/11/3/6 numeric spray is the peak of padding.  

**One highest-leverage edit:** Cut the specific counts entirely. Replace with one concrete, believable example per risk. Turn it into real risk mitigation instead of retrospective victory laps.  

**Strongest:** "Why this approach?" — it is the clearest articulation of his actual thesis as an AI PM and feels closest to the author's real voice.

**5. The buried lede.**  
The strongest, most differentiated AI-PM hiring signal here is almost completely wasted: he **shipped three production Claude Skills that automated parts of his own PM job** and cut ~6 hrs/week of repetitive work for the team. That is catnip for AI PM roles. Right now it is buried under Zapier trivia and revenue-vertical claims.  

The second buried signal is that he wrote an x402/agent-economy strategy memo and co-authored a serious product audit (9-platform benchmark + risk pre-mortem) that went to leadership. Either of those would be more impressive to a sophisticated hiring manager than "eleven Zapier workflows."

**Overall diagnosis:** The page is directionally strong but currently suffers from "résumé poisoning." It tries too hard to quantify everything, which makes the real differentiators (shipping real agentic tools that ate his own PM workload, thinking at the agent-economy/strategy layer) feel smaller. Cut the parallel numeric flexing, trust the reader more, and lead harder with the Claude Skills + "I built tools that replaced parts of my own job" angle. That is the authentic, high-signal story an AI PM hiring manager wants in ~30 seconds of reading.

## Cross-rankings

### Judge: anthropic/claude-opus-4.7

- **Order:** A > B > C
- **Reasoning:** Response A is the most thorough and actionable: it quotes specific lines, offers concrete rewrites for each problem, identifies multiple buried ledes (including the sharp 'human-review gates' AI-safety signal), and gives the author copy-paste-ready alternatives. Response B is tight and lands several sharp punches (notably the excellent challenge to 'ship production software' as overclaim that neither other reviewer caught, and the strong critique of 'What did I learn?'), but is less comprehensive and offers fewer concrete fixes. Response C has good instincts—especially flagging the suspicious numeric parallelism and the x402 memo as a buried lede—but mislabels 'What would break?' as the weakest (it's arguably the strongest for showing PM judgment) and provides less actionable guidance overall.

### Judge: openai/gpt-5.5

- **Order:** A > B > C
- **Reasoning:** Response A is the strongest: it is specific, balanced, well-grounded in the portfolio goals, and identifies both the real differentiator—production Claude Skills with review gates—and the underused x402/agent-economy memo without overcorrecting. Response B is also strong and practical, especially on the buried Claude Skills story and the weak “What did I learn?” section, though its claim that Zapier/Claude Skills should not be called production software is a bit too categorical. Response C has useful instincts about leading with Claude Skills, but it over-penalizes the concrete numbers, misidentifies “What would break?” as weakest despite it being the most substantive section, and is less nuanced overall.

### Judge: ~google/gemini-pro-latest

- **Order:** A > B > C
- **Reasoning:** Response A is the strongest because it perfectly balances direct, incisive critique with deep adherence to the prompt, correctly identifying the missing strategy memo as a buried lede and offering a highly targeted edit. Response B provides excellent, actionable rewrites and nuanced analysis of the tone, though it misses the memo in the buried lede section. Response C is appropriately blunt and catches the memo, but offers the flawed advice of cutting all specific numbers entirely, which would actively harm a PM's portfolio.

### Judge: x-ai/grok-4.20

- **Order:** A > B > C
- **Reasoning:** Response A ranks first for its precise alignment with the prompt's goals: it delivers the strongest, most specific outsider summary, flags the exact credibility risks (e.g., "drove...from PRD to launch", 11-risk padding), quotes voice issues accurately, identifies the buried lede with sharp AI-PM insight (Claude Skills + x402 memo), and proposes concrete high-leverage fixes. Response B is second: it is thorough and constructive with good rewrite examples and scannability suggestions, but occasionally softens criticism and introduces minor inaccuracies (e.g., treating sponsored-courses as fully shipped). Response C is weakest: its outsider summary is off (over-emphasizing "highly technical/RevOps"), it misjudges "ship production software" as overclaim when the author's explicit positioning is to highlight it, and it is slightly less insightful on the buried lede.

## Chairman synthesis

_Chairman model: `anthropic/claude-opus-4.7`_

# Final Critique: The Block project page

The four council members converge on more than they disagree on. Below is the synthesis, with credit to the model that best surfaced each point. Where the council split, I'll mark it.

---

## 1. Outsider comprehension — *converged*

All four read this as: **an AI-fluent B2B Product Manager who shipped internal AI tools and RevOps automation at an institutional crypto firm, plus launched a new revenue line.** That's a good outcome — the specifics (Claude Skills, Salesforce Closed Won, Zapier, sponsored courses) keep it out of generic-PM territory.

**High-confidence weakness:** The second sentence of "What is this?" is three resume bullets strung together with commas (Gemini was bluntest on this; Opus and GPT both noted the same density problem). A recruiter will retain "automation + AI tools" and lose the audit and the revenue vertical.

**Sharpest framing of the problem (Opus):** the most important AI-PM signal — *three production Claude Skills* — is buried mid-sentence next to "against a Q2 OKR," which reads more like a Jira ticket than a headline.

---

## 2. Credibility / overclaim

**Convergent flags (all four models):**

- **"drove The Block's first sponsored-courses revenue vertical from PRD to launch"** — universally called out. "Drove" is resume-cliché; "from PRD to launch" overstates what the grounding (PRD v1→v3, Polymarket × Campus) supports. Grok was sharpest: this implies a solo new revenue line when reality was more scoped.
- **The numbers help, but the parallel precision (7 / 11 / 10 / 11 / ~6 / ~3) starts to feel stacked.** Opus and Grok flagged the "eleven-risk pre-mortem" as the count most likely to read as padding. GPT proposed the right fix: keep *one* load-bearing number per claim, drop the parts list.

**Divergent flag — worth the author's attention:**

- **Gemini** challenged "ship production software, not just write specs for it" as an overclaim — argued that to a technical hiring manager, Zapier + Claude Skills isn't "production software" in the SWE sense, and the phrase will get eye-rolls.
- **Opus, GPT, and Grok** read it more charitably as positioning copy that works (though Opus called it "slightly defensive" and Grok flagged the "not X but Y" construction as an AI-tell).

**My read:** Gemini has the stronger argument for a *technical* hiring manager; the others are right for a *recruiter*. The safer rewrite is GPT's: *"The differentiator was that I shipped the internal tools too"* — keeps the positioning, drops the SWE-baiting verb.

**Two more lines worth softening (Opus):**
- "co-authored the Block Pro 2.0 product audit pitched to leadership" — "pitched" is doing too much work. Did it ship? Get funded? Say so.
- "against a Q2 OKR" — corporate filler; the Skills are the interesting thing.

---

## 3. Voice / AI-tells

**Convergent: the best lines on the page (keep these).** Three of four models independently quoted:
- *"Most institutional B2B receipts get redacted before they ship, so this page keeps to what I can say out loud."* — every model called this the strongest sentence.
- *"sailed through on enthusiasm and died on capacity"* (Opus)
- *"before the pitch, not after"* (GPT)
- The "three places the work could have quietly fallen apart" framing (Gemini)

**Convergent AI-tells to cut or rewrite:**
- **"drove ... from PRD to launch"** (all four)
- **"agentic engineering could compress that"** — GPT was sharpest here: this is the biggest jargon risk on the page; sounds trend-chasing even though it's technically accurate.
- **The two closing aphorisms** in "What did I learn?" — *"the PM who automates... becomes the bottleneck"* and *"Build the lever, then hand it to the team."* Opus called this the most LinkedIn-thought-leader passage; Gemini called it ChatGPT-summarizing-a-thought-leadership-post. Two aphorisms back-to-back in the shortest answer is the issue.
- **"Handoff multiplication" / "Pitching past real blockers"** (GPT) — invented-sounding labels.

---

## 4. Weakest answer + strongest

**Council split — and this is the most important disagreement to resolve:**

- **Opus, GPT, Gemini:** Weakest is **"What did I learn?"** Strongest is **"What would break?"**
- **Grok (outlier):** Weakest is **"What would break?"** (calls it résumé-like with humblebrag risks). Strongest is **"Why this approach?"**

**My judgment: the 3-to-1 majority is correct.** "What would break?" demonstrates PM judgment (failure modes + mitigations + a real pre-mortem) — that's the most differentiated content on the page. Grok's critique that it's numerically over-stacked is real, but it's a *formatting* problem, not a content problem. GPT's bulleted rewrite solves it.

**Weakest = "What did I learn?"** It's the shortest answer, repeats the thesis of the prior three sections, and ends on stacked aphorisms.

**Highest-leverage fix (Opus's was the most concrete):** Replace the second half with one specific thing the author changed his mind about. Opus's example is worth quoting nearly verbatim:

> *"I came in assuming the Skills were the product; they weren't. The pipeline that turned a Salesforce close into eleven downstream actions did more for the team than any single skill, because it removed a handoff humans hated. I'd build the connective tissue first next time."*

Gemini's alternative — a hard, unexpected lesson about *deploying AI in B2B* (e.g., team adoption of Claude Skills requires more UX than the prompt itself) — would land even harder for AI-PM recruiters. Either direction is stronger than the current aphorisms.

**Strongest = "What would break?"** — but reformat as three bullets per GPT's rewrite. The wall-of-text format is hiding the strongest content on the page.

---

## 5. The buried lede — *high convergence, with one addition*

**All four models independently identified the same buried lede:** the strongest AI-PM hiring signal is that **he shipped three production Claude Skills with human-review gates into a real institutional B2B workflow** — at a moment when most PMs claiming "AI experience" mean they prompt ChatGPT.

**Three models (Opus, GPT, Grok) also surfaced a second buried lede the page omits entirely:** the **x402 / agent-economy strategy memo.** Opus framed this best: *"AI PM who shipped agentic tooling into a B2B workflow and was trusted to write the company's agent-economy strategy — at six months in"* is a sharper hiring story than the current "PM who ships software."

**GPT added a third underused signal worth surfacing:** the **human-review gates** themselves. *"The AI work was not autonomous theater. The Claude Skills had human-review gates because the output touched real internal workflows."* For AI-PM roles in 2025, this is a maturity signal (eval, oversight, deployment discipline) that most candidates can't credibly claim.

---

## Recommended edit priority

If the author makes only three changes, in this order:

1. **Add the x402 memo to "What is this?"** — even one redacted clause: *"an internal strategy memo on agent-economy payment rails (x402)."* This is the single highest-leverage change because it costs nothing and unlocks the strongest positioning.

2. **Rewrite "What did I learn?"** Replace the two closing aphorisms with one specific thing he changed his mind about — ideally about deploying AI in B2B, not about automation-as-philosophy.

3. **Bullet-format "What would break?"** and cut one of the three implementation numbers in the first bullet (keep "11 Zapier workflows," drop "10 intake forms, a central database" from the main copy). Also reword the pre-mortem line to *"surfaced engineering-capacity and renewal-cliff problems"* without the "eleven-risk" count.

Secondary: replace "drove ... from PRD to launch" with "took the Polymarket × Campus sponsored-course product from PRD v1 to launch" (GPT) if Polymarket is nameable; soften "ship production software, not just write specs" to "the differentiator was that I shipped the internal tools too" (GPT, addressing Gemini's overclaim concern); cut "against a Q2 OKR" and "agentic engineering."

The page is directionally strong. The diagnosis the council converged on (Grok phrased it best): it suffers from mild **résumé poisoning** — the numbers and parallel structures are working slightly too hard, which makes the genuinely rare signals (shipped Claude Skills with review gates, wrote the agent-economy memo) feel smaller than they are.
