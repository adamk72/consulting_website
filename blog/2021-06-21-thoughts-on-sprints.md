---
title: Sprinting With Ease
authors: akecskes
tags: [software, agile, sprints, scrum, documentation, culture]
---

_(and yes, I know, this has very little to do with sprints directly)_

## We don't blame, we solve.

Easily the biggest hindrance to a successful project is in-fighting and finger-pointing. This isn't a game, nor is it life-or-death. It's a project. We're very smart people trying to solve some very complex problems.
Mistakes will be made. No one will die. Money, on the other hand, may be lost. Let's not let it get to that. Paychecks are nice.

<!--truncate-->

Our job is to mitigate the potential for mistakes to happen. Ever accidentally delete an in-production database? I have (and I'll tell the story some other time). Two things could have mitigated that (aside from my making a powerfully wrong assumption): 1) Limiting permissions or installing a 'safety catch' (i.e.: forcing function) in the UI and 2) Backups.
We need to think of criteria such as those that we can put in place today so that tomorrow will be less painful for us.

## How to Unstick in 1-1/2 Hours

Stuck on some code? Here's a heuristic to follow:

Rubber duck for half an hour; if you can't solve the problem, Slack someone on the project and ask them to pair program/look over your shoulder for one hour.

Still can't solve it?

If it can wait, bring it up at the next scrum. If not, Slack, text, or call the scrum master, project manager, or your lead (especially if it's an emergency or a critical issue). The problem may not have been solved, but you will be unstuck nonetheless.

## Smart Tasks and @-everyone

> The goal is for us to communicate often and effectively.

If you have concerns that can wait, add the details to the tasks. Bring it up at the scrum (but still document it!)

If you need help or more context, add details to the task and @-someone(s)
If there are more questions, Slack/Discord, or bring it up at the scrum.

## More Done, Less Perfect, Still Works

We all know this truism, "Perfect is the enemy of done." I get it, but there's a risk we need to manage with that thought process:

"Done" is useless if the result doesn't work, or causes future hassles.
When writing code, keep the near-term future in mind; how can you make what you are writing easy for other people to interface with and use?

This brings me to technical debt. Technical debt is okay in very limited doses, and when acknowledged for what it is: debt that will either need to be repaid, or written-off. Both have consequences.

## The More You Document the Less You Have to Explain (to a point)

There's an art to this. Write documentation too early, and it goes stale. You've wasted your time. Write it too late, or too long, or too boring, or make it incomplete and you'll be answering questions anyway.
Start with bullets.

> When in doubt, add caveats.

> WIP is only useful if it's actually a work in progress. Don't tease us like that.

**TL;DR** is fantastic if it's short enough to be read and still conveys meaning.

**Headers** help you organize and give your readers focus.

Robust documentation means not assuming what your reader knows. For consumer-grade docs (and this means API docs too) have someone dumb like me read it first. Find someone new to read it who has to literally go over each step — if they get stuck, you made an assumption. Correct it.
