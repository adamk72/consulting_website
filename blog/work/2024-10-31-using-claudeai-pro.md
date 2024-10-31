---
title: Observations of Claude AI Pro
authors: akecskes
tags: [AI, haskell, coding]
---

I’ve gone ahead and paid for Claude AI Pro and have been experimenting with it. I thought I’d share some interesting tidbits over the past couple of weeks I've been using it.

<!-- truncate -->

## First, Messaging

With Pro, Claude will occasionally tell me that I should start a new chat in order to save on messages — interesting because it demonstrates insight into the deeper world of how LLMs work. So far, I’ve taken its advice and even been proactive with creating new chats, and haven’t hit the daily “5x above the free version” limit.

Before Pro, I could barely go an hour before I'd hit the limit. I was worried I'd that Pro wouldn't be sufficient for a full day's worth of work, but so far, so good.

## Pair Programming

I’m using Claude as a pair programming service and it has greatly helped accelerate my learning of Haskell and the progress of my little text-adventure program I’m writing. AI isn’t without its quirks, but then again, neither are the very humans I’d be sharing my time with anyway. :laughing:

## Learning Haskell

Since I’m learning Haskell, it’s fascinating to watch how it handles teaching. Haskell may have 30+ years of history, but good, consistent, and up-to-date documentation isn’t one of the side effects of that long history, especially considering its academic roots.
Usually, Claude does a good job at giving answers to my questions, but I notice a few quirks:

1. It sometimes will go way overboard with providing solutions, providing long samples with very advanced concepts. I have to tell it to provide more simple answers, which, of course, it is more than capable of doing. What’s interesting here is how Claude normally defaults to step-by-step instructions, but will suddenly make a leap of logic to higher-order complexity. While I’m sure my question style has something to do with it, I wonder how much is the LLM itself, given the solution space from Haskell documentation on the Internet. It only knows what it’s been taught and there’s a dearth of intermediate-level information on Haskell out there.

2. Haskell can be “indent neurotic” (it’s like Python in what way), and Claude will quite often mess up indenting that the compiler will catch. Obviously, it can’t run code to test itself, but I find in these cases sometimes I have to tip-toe around certain areas to generate the proper code (or find other solutions). There are a few other language-specific things that throw it off, which indicates to me how the AI is, well, pulling tokens out of thin air, and by “thin air,” I mean a generalized neural network. :brain:

3. And in the same vein, since Claude can’t run code, it also occasionally just gives wrong answers. Close, but still very wrong. Not surprising, of course, but what it does demonstrate is an interesting limitation of  LLMs. You would think that, given a well-defined spec, parsable code, and well-organized (if not well-written for humans) package docs, the LLM would be a lot smarter in the domain of software development. But, of course, again, LLMs don’t work so specifically unless targeted in such a way, and I suspect Claude (and probably most other LLMs) isn’t.

I’ve noticed a few other things too, but the point here isn’t to disparage the system. Now that I’ve worked a bit more with it, I’m actually that much more impressed with the capabilities of AIs like Claude, especially in the realm of software development. For not being targeted at Haskell, it does way better at describing how things work than most of the human-written books and articles I’ve read on the matter.

## Recommend or No?

To no one's surprise, yes I'd recommend upgrading to Pro. Based on my conversations with other people (I have a friend whose company is paying for him to try multiple LLM systems for example), it seems like any of the AI services would be great to pay for. However, the exercise of figuring out which is best is left to the reader. :book:
