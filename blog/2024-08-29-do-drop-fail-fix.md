---
title: Do, Drop, Fail, Fix Metrics
authors: akecskes
tags: [coding, project management, metrics, engineering]
---

I was looking over the DORA metrics, trying to think of a mnemonic for the four options that would roll of the tongue a little more easily than "Lead Time," "Deployment Frequency," "Failure Rate," and "Time to Recover." I mean, "DORA" itself isn't even helpful, since it stands for _DevOps Research and Assessment_, which is the name of the project, not a acronym for the metrics. 

<!-- truncate -->

I'm going to go with this simple dual alteration:

- ✅ **Do**: Do the work. How long to do X? What is keeping us from doing Y?
- ✅ **Drop**: Drop the code to the customer/client. How quickly can we deploy?
- ✅ **Fail**: Count how often deployments fail. Where are the failures occurring? Why?
- ✅ **Fix**: Fix the fails. How long does it takes us?

I think this greatly simplifies things. The DORA metrics themselves are fairly open-ended; this set of word choices simply act as a trigger to remember the more specific metrics.

If you want to see more details on DORA, check out my [earlier post](/blog/2024/08/25/dora-metrics) on the topic. I also like Atlassian's take on the matter, [here](https://www.atlassian.com/devops/frameworks/dora-metrics). And remember, DevOps isn't a separate team from software development. It _is_ software development.

