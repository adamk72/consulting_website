---
title: A Discussion of DORA Metrics
authors: akecskes
tags: [coding, project management, metrics]
---
There’s no silver-bullet metric (or set of metrics) at the individual level that doesn’t either require extensive context or can’t be gamed by the developers, or worse, might be misused by the upper-echelon, looking for excuses to “clean house.”
<!--truncate-->
When it comes to individual software developer metrics, I have yet to see anything that actually works for all parties involved: the individual, the team, or the organization. 

Teams, as a whole, can be measured in a fairly straightforward way. Did they get the product out on time and under budget and is the customer happy with the results?

Of course, no one wants to wait till the end of the project to figure that out. So what is a team to do? 

Use the results from Google’s DevOps Research and Assessment (DORA) program, which has been ongoing for over six years now: [https://dora.dev/](https://dora.dev/).

## DORA

There are four key metrics in DORA:

- ✅ **Lead Time for Changes** — How quickly your devs get their work into production.
- ✅ **Deployment Frequency** — How often you get the product out the door.
- ✅ **Change Failure Rate** — How often does deployment cause problems?
- ✅ **Time to Restore Services** — How quickly your system recovers from failure.

Let's take a look at each of these, but with a twist to make them more software friendly in general.

### Lead Time

Lead time is about how quickly coders can get code from their workspaces to being integrated into a production release. Importantly, it’s not about the speed of an individual coder; a product feature may require contributions from many people before it’s submitted for deployment (or at least considered fully functional).

Lead time reflects a combination of how effective the team is while using their technologies. It’s possible they are moving as fast as humanly possible, but something else is holding them back. Maybe the design doc is incomplete; perhaps the developers are overly cautious or unsure of themselves; maybe the test infrastructure requires several manual steps to set up and run. Any number of things can impact the lead time.

In short, this is how fast developers can create quality code.

### Deployment Frequency

Deployment frequency is the next step up from lead time; it’s about how quickly the project deploys production-grade software for the customer to see and use. Importantly, it’s about the quality of the code being deployed, checked via automated testing. Deploying buggy code to the customer is counterproductive, after all.

Deployment frequency can reveal other potential problems. If tests are passing regularly, maybe something else is going wrong. Is the product defined well enough that there is reasonable work to be done within the expected release time frame? Is project management preventing the release on purpose? Is there a dependency or obstruction from another part of the organization?

In short, this is how fast quality code can be presented to the customer.

### Failure Rate

Failure rate is how often, at some level, the software breaks. Ideally, developers are writing tests, checking for corner cases, and being relatively thorough with their work.

However, code can't always be perfect, especially if one is trying not to negatively impact the lead time; there's always a risk that poor code (or some other factor) will get injected into the main code base and cause problems.

The failure rate question doesn't just ask, "how often?" but it also asks "where and when did it occur?" If bad code is caught late in the game &mdash; by the customer being the worst case scenario &mdash; then there's a big problem; if it's frequent and systematic, it's time to take a hard look at the downstream processes.

### Time to Recovery

Problems are inevitable; the question becomes how quickly does the team recover from those failures? How quickly are problems debugged, solved, and then redeployed?

This particular metric demonstrates the robustness (or weakness) of a team's continuous delivery system. If tests are running properly, then a team can rest assured that whatever fixes are made don't necessarily impact the rest of the system (or if they do, then they highlight, perhaps, too tight coupling or other systemic problem).

## Observations

What I like about the DORA metrics is their overall simplicity. Instead of measuring the capacity of individuals, you're measuring the capability of the entire system. It's been long known that metrics like "lines of code" are meaningless in software as are things like individual commits or PRs. 

Instead, you need a set of metrics that create a solid foundation that, should complications arise, your team can strike out from and ask relevant, process-improving, questions. Can we improve deployment or compile times? Why is it that this chunk of code seems to keep failing during tests? What tests are we missing? Do we need redundancies? And so much more.

### Not Playing the Blame Game

Notice DORA isn't about individual contributions; it's about the system as a whole, the team. Does this mean that DORA can't determine an individual's contribution to a project? Well, yes and no

Yes (it can't), because it's hard to judge a developer's capacity relative to the team. It may be possible that someone doesn't submit a lot of code, but the code they do submit is rock-solid and also critical to the project. That person might be a specialist of sorts, for example.

But no (it can), because consider that example. Relying on one specialist who slows down the release process indicates that maybe the team needs a broader breadth of experience on the team. One person, no matter how good, can hold up an entire project on their own. Software, with rare exception, is a team exercise.

The "problem" with DORA is that it doesn't satisfy that management itch to have individual metrics that make it easier or more justified to let someone go. "Not enough lines of code, so off with their heads!" is hardly a good way to manage a team.

That's not to say there isn't legitimate concern about code quality coming from the fingertips of the developers. I've seen my fair share of copy-and-paste code &mdash; one sure sign of poor quality code for example &mdash; but it was rectified by instruction and mentoring.

Such code, should it make it into production, would quickly show up if the DORA metrics were followed. DORA effectively, as the example implies, throws a fine mesh net over the activity of software development and can quickly show where problems might arise. That's what makes it so powerful.

_[Side note to managers: You need to allow for time for instruction; don't get in an uproar when deployments do actually slow down because the lead developer had to take time to help a junior dev out. That's called progress and should encouraged!]_


## More than Numbers

Software development is an ever evolving process. One does not simply walk into a project and expect to have a standard graph showing the state of things. Each team is unique. Each project is unique.

The key to understanding DORA is that it's an active process; it's not just numbers that are counted and assigned a "Over X is good and under Y is bad" label. It's about recognizing a problem in the moment (or over a short period of time), categorizing, and then following through with solutions; then looking to see how the DORA metrics did or did not improve afterwards.

## Fin

It's my point of view that most metrics that are thrown out there fail because they focus on the wrong thing (usually at the expense of the individual contributor and also often the quality of the product). But DORA seems to have the correct perspective. Figure out how long it takes to get features onto the main branch, then figure out how long it takes to get into the customer's hands. If there are failures (hopefully caught before the customer sees them), then how often does that happen and how quickly do you recover?

Two pairs of questions with profound implications to improving the quality of your software. Give it a shot.
