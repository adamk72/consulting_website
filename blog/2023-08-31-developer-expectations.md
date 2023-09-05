---
title: What I Expect of Developers 
authors: akecskes
tags: [software development, project management, communication, work style]
---
# What I Expect of Developers
I’ve written this document because, over the past few years, I have encountered one too many situations with developers not living up to their own expectations.

As a developer myself with a couple of decades of experience under my belt, I’ve seen a lot of examples of how code can go wrong and how painful it can be to fix them when the PM comes along with a new feature request or important bug fix. As a project manager I’ve had to deal with the consequences of those poor coding decisions, spending an inordinate amount of time and social and political capital trying to smooth things over when a client gets upset because we went over time and budget.

<!-- truncate -->
You can read this as a Google Doc [here](https://docs.google.com/document/d/1Zk_1ZYAQmJP4XaTYYlvV8LS4hwGvyv2C96C_Vs7wD7c/edit?usp=sharing).

### Too much lost time
And why do a lot of projects go over time and budget? Because, inevitably, as I have found, the software was written at a junior level, despite claims by those same developers as being “senior” or “strong intermediate” or whatever title gives them a boost to their ego or salary.

Can you tell I’ve done all that? Point is, you’re probably not as senior (or even intermediate) as you think and the way you write code and interact with the project is a risk factor I’d like to greatly reduce.

### To the real seniors
If you truly are “senior” (which is a term I don’t like to use, since it’s bloated and ill-defined… let’s say high-performing contributors instead), then you’ll understand these problems. Hopefully, your team doesn’t have these sorts of issues because they can rely on you to be their local mentor, improving their output under your careful watch.

### Keeping it simple
I’m not going over the nitty-gritty here. This document is about raising awareness of how I like to interact with developers. I would like to start with one definition that I expect everyone I work with to follow:


> **pro·​fes·​sion·​al**<br/>
_adjective_<br/>
  Behavior that exhibits the qualities of being trained or technically skilled; having the characteristic of being aware of the contextual backdrop as well as immediate and future needs of people, places, and systems and exhibiting courteousness, conscientiousness, and consistency in serving those needs.

Okay, with that out of the way, let’s start with the easy thing, getting communications right:

## Communications
- I’d rather know about your concerns earlier, rather than later. If you’re over your head, feel free to let me or the dev lead know what’s up.
- In Slack (or whatever instant messaging tool we’re using), keep topics in the same thread, not in the different channels (way more on the topic of using IM [here](https://kecskes.net/Truly%20Professional%20Instant%20Messaging%20(with%20Slack!).pdf))
- Tasks, issues, tickets — whatever we call them — aren’t sourced in the IM tool; they’re sourced in the PM tool (Jira, Monday, etc. ). So, don’t update the status in the IM, update them in the PM tool. Less IM’ing, more updating tasks.
- Minimize your DMs to me or anyone else. If you have a question, regardless of how awkward you think it might be to ask, ask it to the development public channel. We’re here to help you, not chastise you (and believe me, I’ve made plenty of dumb mistakes in my time).
- If you’re in front of the client or customer for any reason, always err on the side of caution. Don’t spout out something unless you’ve gotten previous approval from me or the lead (and that can occur if I or the lead are leading the conversation by example).
## Software Development
 This section will generate a lot of debate, even from the high performers. The essence of what I’m going to share boils down to two points:

- Any code should be easy to read and easy to change for other developers on the team, not just yourself.
- The client will change their mind. This is inevitable and can occur at any time. The code has to support this point by being fast to set up, reasonably flexible, easily configurable, nominally updatable, and ready to demonstrate at any time.

### Basics
- Code should be DRY. This literally has been the biggest cause of most of my projects’ problems over the past few years.
  - Don’t copy and paste code; if you had to write it twice, there’s a decent chance you’ll have to write it a third time… or more.
  - Get out of the habit of copy-and-pasting because it’s a crutch; you need to think outside the file.
  - At some point in a project, you’ll spend more time hunting down errors in your cascading load of copy-and-paste, non-DRY code than you will writing new features or quickly fixing bugs. Just remove that risk entirely.
  - I go over the deeper consequences in this long-form document: [The Curse of Copy-and-Paste Code](https://docs.google.com/document/d/1DBTcmixSCl099-lpDCkitNlcGk8K0uFoNtgnhLPE4-Y/edit?usp=sharing).
- Don’t ignore the details of the design document.
  - It doesn’t have to be pixel-perfect, but it has to be very close.
  - UI devs: Figma and other similar tools give you the CSS code, so use it.
- No warnings or errors for lint, the browser, interpreter, or compiler before committing/merging (without explanation).
- Use a code spelling check extension. You’ll avoid a ton of basic mistakes and improve your debugging because you won’t miss that one misspelled variable. 
- No hard coded, “magic” values.
  - Pull client/customer text out of the code and add it as a part of an I18N file, even if it’s only for a single language.
  - Create config files for things like maximums, minimums, colors, and other things that the client might change their mind on.
  - Don’t make these (or any) files monolithic.
- Files less than 200 lines (without a good reason for going higher).
- CSS is a programming language; treat it as such.
- Idiomatic code is preferred; if you don’t know a language’s idioms, learn them.
- No zombie code; no commented-out code. If you’re not using it, don’t crowd the file by leaving it in.
- More files and folders are better than a single long file.
- Standardize formatting; use Prettier (or the formatter of the team’s choice).
- Keep [SOLID](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) and [CUPID](https://dannorth.net/2022/02/10/cupid-for-joyful-coding/) design principles in mind when developing.
- Be consistent in how you name things. Follow your team’s general lead if you’re not sure.
- Be wary of deeply nested files or long files (usually the two are the same). Break files up into reusable component parts.

### Intermediate
- Double-check the data. This is the second most painful point that I keep encountering on projects, where there’s been a typo or a missed change in a data structure or the data itself.
- Actually be as detail-oriented as you claim on your resume; look at the rest of the code and understand the impact of your code changes on the rest of the code, your teammates, and how it will show up to the client. 
- Learn how to think in abstractions rather than in literals, i.e., figure out how to use generics if the language supports them.
- Even if you don’t write tests, at least think about how you would test your code, were you to write test code.
- Follow the practice of limiting your deeply nested `if` statements. Switches are just fancy `if` statements, so consider why you’re using them before you do. Likely there’s a more functional way or a specific code pattern that will do the trick better.
- Lots of `if` statement code does not a good state machine make; use a proper library.
- Learn your frameworks, tools, libraries, and packages. Leverage all of the amazing work other smart people have already done so you don’t have to do the work yourself.
- Type your code, e.g., use TypeScript and not JavaScript. I know types can be annoying, but they will save you a ton of time in the long run.
- For TypeScript in particular:
  - Don’t use the `any` type. Do everything you can to avoid it.
  - Learn how to use interfaces, types, unions, intersections, and type narrowing. The rest will follow.
- Don’t overuse the `?` operator. Understand your data, rather than relying on the code as a catch-all for your ignorance.
### Advanced
- Learn good programming design patterns; there are a ton, but Proxy, Provider, Observer, and Factory are some good examples. Always be looking for patterns.
- If you’ve been doing procedural programming for a long time, learn functional programming. Most modern languages are multi-modal so you can practice any number of programming paradigms.
- Avoid setting things to `null`. Study Rust for the how, and look up the “billion dollar mistake” for why.
- Learn to use `git` for more than just committing, pulling, and pushing. It’s super-useful as a development tool in its own right. But for `git` usage in general:
- Be conscientious of your commit messages; other people read them.
- Commit small, commit often.
- Set your CI/CD systems up so that issues are auto-closed when the merge happens so you don’t have to remember to do it manually. It saves everyone a lot of time not asking, “Hey, did you really get to this?” 
- 
There’s way more I could write on this topic; but other, better, developers have already done so. Go out and read books and Internet articles on coding best practices and then implement those practices. Teach others while you’re at it. Experiment — Even feel free to experiment with new ideas in an ongoing project. As long as it’s vetted by the team or the wider development community, it’s probably better than the overly rudimentary copy-and-post code you’ve been doing.
## Final Expectations
Ultimately, regardless of your programming skill level, what I expect from developers is professionalism. No coder does development in true isolation; if you’re on a paid project, you need to step up and make coding a profession, not a hobby. 
### Juniors
I expect junior developers to be constantly communicating their small accomplishments. I expect them to write trivial code; I expect them to be learning all the time. But I (or the dev lead) want to hear about what is being learned, almost daily.

### Contributors
For higher-performing contributors, I expect a high degree of autonomy, lateral thinking, and a holistic approach to development; that is, you don’t have to think outside of the box, but you do have to think outside of the file. You should be making systems that make everyone’s life easier. Ideally, you have these systems ready to go at the start of the project.

I also expect nearly daily updates, especially inside the task you’re working on. You and I don’t even have to talk about anything as long as I see that tasks are legitimately being updated with useful commentary and details. 
### Leads and specialists
For the highest-performing developers, I expect you to be taking care of business. You’re anticipating and resolving potential client needs without external guidance and ensuring that the code quality is flexible and free of defects. You’re also making sure the junior developers aren’t copy-and-pasting us into a corner we can’t get out of.
### Living up to YOUR own expectations
What I’ve been disappointed with over the past several years, is that folks don’t seem to be living up to their own expectations. I’ve had to have too many serious conversations with “intermediate” and “senior” developers where I pull up their code and show them how to fix their own code bases — and I’m just the project manager. 

I want you to be better than that. I try to cultivate a no-blame space on my projects. We all make mistakes, and that’s okay. What’s not okay is writing code that causes a growing set of problems as more features are added. Code should become more stable as it ages, not less, but poor coding practices lead to buggy situations.

If you consider yourself to have moved beyond the realm of junior, then prove it. Write code that other developers find a pleasure to engage with. Even better, write code that works so well, that no one has to to engage it at all, except at the interfaces. 

Okay, that’s enough. I’m just the project manager with a lot of opinions. If you want to learn more about my perspective on things, check out:


- [You’re Not a Senior Developer](https://docs.google.com/document/d/1IGglqNEzHWLYTV5JY5F6zZ-pKB6fYNWP7LSD49BmDv8/edit?usp=sharing)
- [The Perpetual Junior Developer Trap](https://docs.google.com/document/d/1Dgn6UXkyh9Pj1Qjh2QGhv8HaRe6SfQQjw3ab1TqzUv4/edit?usp=sharing)
