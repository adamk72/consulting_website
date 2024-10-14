---
sidebar_position: 2
title: The Trick is in the Types
---

## Signatures are important 🔑

Learning to read and understand type signatures is key. You have to be able to wrap your head around things like this:

```haskell
-- fmap has a constraint, two inputs, and one output:
λ> :t fmap
fmap :: Functor f => (a -> b) -> f a -> f b
--      └───┬───┘    └───┬──┘    └┬┘    └┬┘
--          │            │        │      └─ Functor of type `b` (the result)
--          │            │        └─ Functor of type `a`
--          │            └─ A function that transforms type `a` to type `b`
--          └─ Functor constraint: `f` has to be a functor
```

This should look familiar. `fmap` just applies a change to container (like a list) that holds something of one type and then outputs another container of the same form, but with different contents (that may or may not be of the same type as the original container).

:::info
Haskell is _parametrically polymorphic_. All of these `a`s and `b`s and `f`s and the host of other letters you'll see going forward simply mean that functions labeled as such will work with _any_ types. It sounds daunting until you realize how limiting it makes function design, which is a good thing.
:::

The first thing to take away is that Haskell isn't playing around with being functional, compared to functional-adjacent languages like JavaScript. If a function doesn't receive all the arguments (`(a->b)` and `f a` in this example), you end up with a partial function. This is where currying comes into play, and I'll address that specifically at a later time.

Essentially, you don't pass in parameters per se; it's more like you build up functions until it gives you a non-functional response, like an `Int` or `[Char]` or a more complex structure.

### Trailing Types

As long as the thing you're feeding into a function matches what it wants, you're pretty much good to go (with some constraints).

I found this tibit from [LYAH](https://learnyouahaskell.com/higher-order-functions#curried-functions) helpful to keep in mind, _emphasis_ mine:

> Simply speaking, if we call a function with too few parameters, we get back a _partially applied function_, meaning a function that _takes as many parameters as we left out_.

You'll see what I mean when we get to dissecting the custom `revMap` function in a moment.

Let's follow this chain:

```haskell
λ> :t fmap            -- Repeating this for convenience's sake.
fmap :: Functor f => (a -> b) -> f a -> f b

λ> :t reverse
reverse :: [a] -> [a] -- Matches `fmap`'s first argument, `(a -> b)`.
                      -- It just happens to be that `reverse` doesn't change the type.
                      -- (type a == type b in this case).

λ> :i []              -- Notice the `:i` for `:info`, instead of `:t` for `:type`.
type List :: * -> *
data List a = [] | a : [a]
-- skip lots of stuff --
instance Functor []   -- This is enough to say that a list will fit in with `f a`.
                      -- (Recall the `Functor f =>` constraint from the signature).

λ> fmap reverse ["abc", "def", "ghi"] -- Normal execution; apply `reverse` to list of `Strings`.
["cba","fed","ihg"]                   -- Get back a transformed list of `Strings`.

λ> revMap = fmap reverse              -- Assigning only a partial application.
λ> :t revMap
revMap :: Functor f => f [a] -> f [a] -- Now `reverse` is part of `revMap`, so
                                      -- we just need to apply the final `f a`
                                      -- which will also result in an `f a`

λ> revMap ["abc", "def", "ghi"]       -- Which we see here. A list is of type
["cba","fed","ihg"]                   -- `f [a]` and the use of `reverse`
                                      -- means we'll get an output of `f [a]` as well.
```

### Breaking down `fmap` first

There's a lot of back and forth with the letters. Are `f a` or `f [a]` or `f b` all the same? In this context, yes, they are the same for all intents and purposes.

:::note
All of this letter flip-flopping and combining is _exactly_ where types get tricky. It'll just seem like symbolism gone wild until you're used to it.
:::



`fmap`'s first slot of `(a -> b)` is a function slot (you can tell by the parentheses). This means can receive any function that takes some form of "foo" and after manipulation, returns a another "bar." Type "foo" can be anything: integers, lists, complex topographies and type "bar" can likewise be anything, even the same thing as "foo."

`reverse` happens to fit the bill. Specifically, it takes a list of some content type and spits out another list of the same content type. You know it's all list because of the brackets: `[a] -> [a]`. But as far as `fmap` is concerned, it's all `a -> a`.

The second slot of `fmap` is `f a`. `f` was type constrained to be a functor and it's being applied to type `a`. It just happens to be that Haskell lists are also instances of the `Functor` class, so it satisfies `f a`.

What's worth noting here is that the `a` from the function parameter `(a -> b)` is the same as the `a` from `f a`. In our example, `f a` was a list of `String`s and `reverse` returns a list of `String`s.

All of this means that, in this particular example, `a` and `b` are the same type, so the output from `fmap` of type `f b` happens to be a list of `String`s. 

:::tip
It helps if you do substitutions to temporarily wrap your head around things:
You could write:

`reverse :: [x] -> [x]`, in which case:

`(a -> b)` can be replaced by `([x] -> [x])` and reflect onto `fmap` as:

`fmap :: Functor f => ([x] -> [x]) -> f [x] -> f [x]` 🍻
:::

### Looking at `revMap`
The new `revMap` is just `fmap`, but with one argument already applied. While it looks like `revMap`'s input is `f [a]` and not the more general `f a` from `fmap`, re-read the note above: `f a` is the same `f [a]` as far as this situation is concerned. And `revMap`'s output, which also happens to be `f [a]` match neatly with `fmap`'s output, labeled as `f b`. A closer look:

```haskell
fmap :: Functor f => (a -> b) -> f a -> f b -- Acts on a functor, returns a functor.
--                   └┬─────┘    └┬┘    └┬┘
--        `reverse` ──┘  ┌────────┘      │
--                       │        ┌──────┘
--                     ┌─┴─┐    ┌─┴─┐
revMap :: Functor f => f [a] -> f [a]       -- Acts on a list, returns a list.
                                            -- Recall, lists are functors.
```
It doesn't matter that the output of one isn't _exactly_ the same as the other. What's important is the _shape_ of the types. `f [a]` is the same shape `f b` &mdash; both are types of a functor applied to something.

## Types are tricky

The general concept is relatively easy to grasp: just like with procedural languages, a Haskell function expects that its input parameters will be of a specific type or format, as it were.

The hard part is juggling all of the different letters, meanings, and abstractions. A lot of code will replace function arguments with more explicit naming conventions, but when you're looking at the high level concepts, which is where all the power is, it can seem like alphabet soup.

