---
title: Program Lifespan 
authors: akecskes
tags: [sdlc, best practices, clients]
---

From: [Lex Fridman's John Carmack Interview](https://youtu.be/RfWGJS7rckk?t=163)

<blockquote>It's not the writing of the program initially, it's the whole lifespan of the program.</blockquote>

No software project worth putting into production is ever truly static. Even a hypothetically bug-free application upon initial release has to change as it gets used in the real world. Users provide feedback so the UX has to change; the product owner or client of the application wants to tweak something; a new platform comes out for it to be deployed to; the app is so popular that it needs to be scaled up &mdash; any number of circumstances will force a change in software at some point during its lifetime.

<!--truncate-->

Carmack's comments should remind us of two things:

1. The person (or people) who initially wrote the code may not be the same person who has to update the code later on.
2. As such, meaningful software should be built with easy maintenance (and easy refactorability) in mind, regardless of who touches the code after initial release.

## Client Assumptions

Experienced developers may take these items as obvious, but the client often does not. Clients _assume_ that the code will be perfect (enough) the first time around. Even if the product is an MVP and the client knows that not all of the features will be in there, they will assume it is a "perfect" MVP. Sure, feature X isn't in the MVP, but we knew that already as part of the plan. _BUT_, now we can dive into adding feature X perfectly, with no problems, along with all the other features that we left out of the MVP, right?

No. Devs know this, but clients do not. Clients think the development cycle is _additive_ and fail to see the cyclic and often reactionary parts of software development. This "additive-thinking" (despite the hype and marketing around models like Agile and Lean) is the bane of software development &mdash; non-developers do not understand that code does not iterate at the feature or user testing level, but at the very root level. One does not simply "add" to code. Every single day, a developer has to juggle a thousand different factors and then share their results meaningfully with the rest of the team, the project manager, the product owner, and other stakeholders. Preliminary assumptions had to have been made at the beginning of the project and those assumptions will change over time as both the developers and the stakeholders see the evolving work become exposed.

Little does the naive client know, but one small feature tweak, paired with planning that did not take that tweak into account can cause a host of code rewriting, testing, Slack conversations, possibly, worst of all... meetings. (I jest; some meetings are good, especially those set up to clarify and move the project forward quickly.)

Back to Carmack's statement. One does not write code in the vacuum of a well polished product description guide or detailed statement of work. A well run project keeps the ever evolving nature of development in mind and builds the software with the future in mind. A future where even developers who didn't start the project can easily update the code to the changing needs of the client and their product &mdash; while this might add considerable time to a project, in the long run, it saves a time and considerable money when developers don't have to re-engineer or debug bad code.
