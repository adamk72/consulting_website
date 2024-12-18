---
sidebar_position: 1
title: "Learning Haskell from Scratch"
---

## A Brief Intro

This is my attempt to organize my thoughts on Haskell as I learn it. But as someone who suffers from TL;DR syndrome, these docs are written with my own considerations in mind. A LOT can be skipped; most of the normal block text is just my own rationalization of how something works.

## How to Use

:::tip
If you're here to learn quickly or because you have ADHD as bad as mine, **feel free to skip** most of the fluff writing. The **juicy parts** are in callouts like this one, in the larger `code blocks`, lozenge tags that look like this: <Lozenge t="rule"/> and sometimes in the quotation blocks.
:::

I'll hit on most topics in Haskell eventually (as I learn them and as they make sense to me), but not in the order of most typical programming courses/lessons.

I will also assume you know the basics of programming and are familiar with tools like REPLs and high-level concepts like "types" and "classes" (the latter of which, to be clear, isn't the same as a class in Java or JavaScript, but more like trait/impl in Rust or interfaces in Go and TypeScript)

:::warning
Remember, I'm new to Haskell, so not everything will be addressed adequately, if at all. I don't know squat at the moment.
:::

## Legend of Symbols

### Lozenge Tags

The lozenges highlight specific moments in the text that I like to keep in mind.

#### Primary Tags
- <Lozenge t="rule"/> &mdash; A definition of how something works in Haskell.
- <Lozenge t="law"/> &mdash; Same as a rule, but declared more forcefully, usually by multiple sources.
- <Lozenge t="maxim"/> &mdash; A pithy reminder of a key point.
- <Lozenge t="note"/> &mdash; A short elaboration or highlight of recent text.
- <Lozenge t="adv"/> &mdash; An advanced topic that is interesting, but won't be expanded upon, a.k.a, "an exercise left to the reader to figure out." 

#### Admin Tags
_For my own use; if they show up on the site it's because I_ still _haven't gotten to making the adjustment yet._ 
- <Lozenge t="wip"/> &mdash; Something that is incomplete or needs confirmation regarding correctness.
- <Lozenge t="todo"/> &mdash; Something I will follow up on later, in greater depth.

### Command Line
Some place in code blocks, I'll use `λ` to represent the REPL.

- `>λ`&nbsp;&nbsp;&nbsp;&nbsp;&mdash; the REPL prompt itself. Text that follows on the next is the explicit reply.
- `--λ`&nbsp;&nbsp;&mdash; a response from the REPL.

Which gets used depends on context and what is in focus for the lesson:

```haskell
λ> 1 + 1
2

2 + 2
--λ  4
```