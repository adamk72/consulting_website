---
title: Learning Haskell From Scratch
authors: akecskes
tags: [coding, haskell]
draft: true
---

<head>
  <meta name="description" content="Learning Haskell from Scratch, a Procedural Programmer's Perspective"/>
  <meta charSet="utf-8" />
</head>

Join me as I try to figure out how Haskell works. Even though I have principally worked in procedural or OOP languages like C/C++, Java, and JavaScript/TypeScript, I've always tried to lean into what little I know of functional programming wherever I can. Haskell is a different beast, though. It is functional _all the way down_, not just an additional language feature  (like in JS).

This is my first attempt in a long time to learn a new language effectively from scratch &mdash; I recently learned Go for instance, but that was so familiar to me that it took almost know time. All of my mental models took very little effort to adjust.

This is my attempt at organizing my thoughts and ideas on Haskell... read on to see what I've found.

{/* truncate */}


:::warning
This is quite the mess, since I created it free form. I'm in the process of pulling it apart and organizing it in a new dedicated section of the website: [Learning Haskell from Scratch](http://localhost:3000/docs/).

This article will start to shrink as I move things around, while the main document grows. It's the circle of life. 🦁
:::


## Getting Started

As a language that has been around for over 30 years, the documentation and developer experience thus far doesn't remotely compare to to the likes of modern languages like Go or Rust. Things aren't caveman level, but there is a lot of inconsistency in the content and no central core place (that isn't also excruciatingly slow, Hoogle).

So if you're just getting started like me, be ready for things to be a bit difficult a first.

## Early Learning Notes

_This section mainly follows these links: [Wikibooks Haskell](https://en.m.wikibooks.org/wiki/Haskell) and this: [Graham Hutton on YouTube](https://www.youtube.com/playlist?list=PLF1Z-APd9zK7usPMx3LGMZEHrECUGodd3)._

Where I remember in code snippets, `--λ` implies the response to a command line call.

### General Concepts

Variable order does not matter, since assignment is immutable. Thus:

```haskell
y = x * 2
x = 3
```

is the same as

```haskell
x = 3
y = x * 2
```

Functions don't need parentheses like most C-like languages:

```haskell
area r = pi * r ^ 2
areaRect l w = l * w -- for multiple parameters, no need for commas
quadruple x = double (double x) -- functions within functions
areaRect l w = l * w
areaSquare s = areaRect s s
```

Though you will need parentheses if using a prefix operator like `-` in order to ensure the compiler doesn't think you're trying to subtract from the function (rather than passing a negative value).

```haskell
add (-1)
-- as opposed to `add -1` which the compiler will see as `add - 1`
```

`if/then/else` is an expression.

While there is a `not` boolean negation operator, Haskell allows for alternate operator implementations. This appears to be very common:

```haskell
not (5 * 2 == 10)
x /= y = not (x == y) -- `/=` is now the same as the `not` operator
```

### ghci

Probably the most important thing is to get used to using `:t` like crazy inside of the ghci:

```haskell
:t map
--λ map :: (a -> b) -> [a] -> [b]
```

In the couple of dozen of hours I've poured into Haskell, the "get to know your types" trope has held up remarkably well.

## Libraries

### General Haskell Libraries

_Awareness of how Haskell breaks itself into pieces and packages as well as modules I've encountered along the way._

- Prelude: core; only one that loads automatically
- Data.List: list manipulation
- [Cassava](https://hackage.haskell.org/package/cassava): csv manipulation.
- aeson
- containers
- transformers

### Rio

Apparently this [rio](https://tech.fpcomplete.com/haskell/library/rio/) is a useful library, as the _FPComplete_ use it to start the demo app. I see `rio` installed as part of the `.cabal` file (which acts like the main project file, I'm gathering... or there is a `project.yaml` file too? Not sure.).

### Lens _(Advanced)_

People talk about this a lot: [Ekmett Lens](https://github.com/ekmett/lens) which "provides families of lenses, isomorphisms, folds, traversals, getters and setters."

## Creating an App in Haskell

_or, just trying to get something, anything, to run that is more sophisticated than a simple `.hs` script._

### General observations

#### Stack and Cabal

- `stack` appears to be the equivalent of `npx`.
- `cabal` appears to be the equivalent of `npm`.

But this is not an exact match, as each does more than either npm or npx and interact differently; how, exactly, is yet to be determined.

What I'm not clear on with Stack is how is used. In particular, I had already installed `gchi` but I keep getting told now that I've installed/become aware of Stack that I should run some variation of `stack ghci` instead. Why? — Because it picks up the package info if run in a project folder.

#### Stack Install Links

- [The Haskell Tool Stack](https://docs.haskellstack.org/en/stable/install_and_upgrade/) &mdash; Purely just Stack
- [FP Complete Haskell](https://tech.fpcomplete.com/haskell/get-started/) &mdash; Stack and more.

### Non-Trivial Tutorials/Demos

_Links found from other pages._

- [Justin Huffman Compression](https://blog.jle.im/entry/streaming-huffman-compression-in-haskell-part-1-trees.html) &mdash; Haven't tried yet.
- [Chris Allen Haskell](https://howistart.org/posts/haskell/1/) &mdash; From 2014!
  Completed and consider mildly advanced; a lot of concepts he glossed over (on purpose), but it gav me some interesting insights.
- [Stackbuilders Shortener Web Tutorial](https://www.stackbuilders.com/blog/getting-started-with-haskell-projects-using-scotty/) &mdash; Best so far.


## Deeper Learning

_a.k.a., thinking out loud till I get what this all means_

### Semigroups

The semigroup operator `<>`

- used for joining strings? `"My" <> " " <> "name?"`.
- How does it differ from `++`?
- You can use it on lists?

There is some sort of relation with Monads/Monoids.

```haskell
:info Monoid -- Apparently this preceded Semigroups in Haskell so looks weird
type Monoid :: * -> Constraint
class Semigroup a => Monoid a where
  mempty :: a             -- identity
  mappend :: a -> a -> a  -- <> from Semigroup, or comparable to ++ for lists
  mconcat :: [a] -> a     -- derived: `foldr mappend mempty`
```

### GHCI Commands

The useful ones so far (for development):

- :type, :t &mdash; show the type of `<expr>`; ":t +d" shows a simplified version (`a` to `Int` for example).
- :info, :i &mdash; display information about the given names
- :browse &mdash; display the names defined by module
- :kind, :k &mdash; show the kind of `<type>`

also, [GHCI User Guide](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html)






## Things I want to follow up on later

_From [Wiwinwlh](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#function-composition)_

- [Debugger](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#debugger)
- [Pragmas](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#pragmas)
- [Error Handling](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#error-handling)
- [Testing](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#testing)
- [Generalized Algebraic Date Types](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#gadts), a.k.a.: GADTs.
- Why are [Records](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#records) broken?
- Review [Naming Conventions](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#name-conventions)
- For _much_ later, [Metaprogramming](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#metaprogramming)

- _Wiwinwlh_ suggests these are probably sufficient to start a major project:
  - text
  - containers
  - unordered-containers
  - mtl
  - transformers
  - vector
  - filepath
  - directory
  - process
  - bytestring
  - optparse-applicative
  - unix
  - aeson
- Use `text` or `bytestring` instead of [String](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#string).
- [Applicatives](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#applicatives)
  - Also at [Typeclassopedia](https://wiki.haskell.org/Typeclassopedia#Laws_2)
  - What I gather is Functor : Computation :: Application : Functions. Functors map computations and applicators map function ("lifting" them).
- [Monads](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#monads), of course.

### Elaborate on later

#### Topics

- Laziness, thunks, and co-recursions
- Monoids and Semigroups (and their relation)
- Equational Reasoning
- Monad transformers
- Type holes and undefined
- `return` and `pure` &mdash; "lifts" a value into IO context
- `>>` and `*>` &mdash; sequence two IO operations
- GHC Extensions, e.g., [`RecordWildCards`](https://ghc.gitlab.haskell.org/ghc/doc/users_guide/exts/record_wildcards.html)
- Language Pragmas
- [Applicatives](https://hackage.haskell.org/package/base-4.20.0.1/docs/Control-Applicative.html)
- `=<<` &mdash; the join (or "reverse bind") operator.

#### Concepts I keep seeing

- Monad/Monoid
- Functor
- Applicative/Lifting
- Traversal

#### Functions

- `cycle`
- `intercalate`
- `null`
- `mempty`

### Encountered Language Extensions

- LambdaCase &mdash; replace `\a -> case a of` with just `\case`.
- ScopedTypeVariables
- Type Applications
- DerivingStrategies
- OverloadedStrings
- RecordWildCards
- DefaultSignatures
- KindSignatures
- InstanceSigs
- BangPatterns

Also, `Minimal` compared to `Language` extensions.

### What is/are?

- referential transparency
