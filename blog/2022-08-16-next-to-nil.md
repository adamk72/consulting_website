---
title: Next to Nil 
authors: akecskes
tags: [communication, best practices]
---

Remember, if someone tells you that the chances of something happening are "next to nil" or "almost impossible" or even "highly unlikely," then the chances are **still non-zero**. 

> Next to nil isn't zero.

This axiom is clue that something is at risk and you should pay attention to it. It's not statistics that we should worry about it. It's our assumptions.

<!--truncate-->

Years ago, a developer left some let's say, *unflattering* comments about Apple (as in the company, not the fruit) in the release notes of our product; release notes managed to get past QA without that comment being caught and into the hands of the client.

This client happened to be a very large user of MacBooks and was unsurprisingly upset, threatening to cancel their substantial subscription contract with us. The sales team managed to talk the client to stay with our software solution. The developer &mdash; the *lead* developer, by the way &mdash; was admonished and take off the project for his unprofessionalism, but there was still a lot of trust and reputational damage done that we had to continue to overcome for a few more years until the product was sunset.

The point of the story was that the developer assumed he could get away with putting snarky comments into the code and that either 1) the client wouldn't read the notes or 2) at the very least, QA would catch it. The fact was, there was a better than zero chance of either of those things happening, yet he still did it.

And this is more than just a story of don't be rude; it's a warning about making assumptions in general. Just because something isn't likely to happen doesn't mean it won't happen, yet I have seen time and time again over the years employees making comments in code, release notes, "internal" emails, CRMs, and instant messaging that if seen by a client (or just their own boss), could set off any number of calamities, the least of which is someone getting fired.

This goes beyond communication &mdash; developers make assumptions in about their own code or the code of others all the time which easily lead to run-time crashes, poor performance, and hard-to-refactor code bases.

The solution for these issues is easy. Keep your professional hat on at work all of the time. 

When it comes to communication, think like a business leader, not like a whiner. Ask yourself if you had your own business, would this be what I want to the client to see or hear? Even comments made in jest ~~can~~ will be interpreted in a fashion you didn't expect.

When it comes to development, think about your colleagues, those who might inherit your code, and your future self and make sure that your code is DRY, comments are helpful, and your assumptions are checked. Learn more, assume less.

To some, these might seem like silly issues in the grand scheme of doing business, but the best business will eliminate even the most trivial chances of something going wrong if they can. The best businesses check their assumptions.