---
title: Learning Haskell
authors: akecskes
tags: [coding, haskell]
unlisted: true
---

My exploration with trying to learn Haskell. While an older language, it's not exactly consistent in terms of support availability. Many of the most recent pages date back to 2017 or 2018; even with documents dated recently (as of late 2023 or early 2024), information is incomplete at best.

So this is my attempt at organizing what I'm finding on Haskell... read on to see what I've found.

Definitely a WIP; last updated Sept 29, 2024

<!-- truncate -->

## Early Learning Notes

_Details on Haskell in general, from the perspective of an imperative developer with background in mathematics and some basic familiarity with functional programming. Mainly following this: [Wikibooks Haskell](https://en.m.wikibooks.org/wiki/Haskell) and this: [Graham Hutton on YouTube](https://www.youtube.com/playlist?list=PLF1Z-APd9zK7usPMx3LGMZEHrECUGodd3)._

### General Concepts

Remember, lists are _not_ arrays like in JavaScript or the like.

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
-- as apposed to `add -`
```


While there is a `not` boolean negation operator, Haskell allows for alternate operator implementations. This appears to be very common:

```haskell
not (5 * 2 == 10)
x /= y = not (x == y) -- `/=` is now the same as the `not` operator
```

Guards use the `|` operator (and 4 leading spaces):

```haskell
absolute x
    | x < 0     = -x
    | otherwise = x -- `otherwise` is its own catch-all case: `otherwise = True`
```

Guards can replace if/then/else statements.

Type signatures look like this:

```haskell
xor :: Bool -> Bool -> Bool
xor p q = (p || q) && not (p && q)
```

They are sometimes necessary if there is a reason the complier cannot infer the signature itself and useful for documentation in general.

A `typeclass` is a group of types. In this case, `Num` is a `typeclass` representing both integers and floating point values:

```haskell
(+) :: (Num a) => a -> a -> a
```

The fat arrow (`=>`) is an implication or constraint about the value of `a`. It has to be of typeclass Num.

Interesting. While some number types are polymorphic, meaning the complier will infer if it needs to convert from an Integer to a Double, `Int` specifically is not polymorphic:

> In Haskell, if you define a function with an `Int` argument, it will never be converted to an `Integer` or `Double`, unless you explicitly use a function like `fromIntegral`.

The `.` function for composition:

```haskell
f x = x + 3
square x = x ^ 2

{- could be done this way -}
squareOfF x = square (f x)
fOfSquare x = f (square x)

{- or this way -}
squareOfF x = (square . f) x
fOfSquare x = (f . square) x
```

Futhermore, as functions, you can do this:

```haskell
squareOfF x = (square . f) x
{- is -}
squareOfF = square . f -- just drop the `x` from both sides!
```

`if/then/else` is an expression.

Partial function evaluations are a thing:

```haskell
map (* 2) [5,6] -- (* 2) is a partial function
-- [10,12]

{- alternatively, using a lambda -}
map (\x -> 2 * x) [5,6]
-- [10,12]

-- Another type of partial
makeList n = [0..n]
-- makeList 3 => [0,1,2,3]
```

### Where and Let

Where clauses allow you to define sub-function (of sorts);

```haskell
heron a b c = sqrt (s * (s - a) * (s - b) * (s - c))
    where -- important to note that there are 4 spaces here (and below)
    s = (a + b + c) / 2
```

_though this [Wikibooks page](https://en.wikibooks.org/wiki/Haskell/Indentation) gives a way better explanation._

The `let` binding allows for local declarations:

```haskell
roots a b c =
    let sdisc = sqrt (b * b - 4 * a * c)
    in  ((-b + sdisc) / (2 * a),
         (-b - sdisc) / (2 * a))
```

_`let/in` has a lot more to it than this, as one might expect._

Comparing `where` and `let`:

```haskell
f = x+y where x=1; y=1 -- where is _not_ an expression and stays at the top level.

f = let x = 1; y = 2 in (x+y) -- let is an expression 
```

### List Comprehensions

List comprehensions are syntactic sugar for many things, such as for the `filter :: (a -> Bool) -> [a] -> [a]` function:

```haskell
{- Helper function -}
isEven :: Int -> Bool
isEven n = (mod n 2) == 0

{- Normal form -}
retainEven = filter isEven

{- LC form -}
retainEven es = [n | n <- es, isEven n]
```

LCs can go even further, acting as both filter and map, among other things:

```haskell
{- Do multiple checks -}
retainLargeEvens :: [Int] -> [Int]
retainLargeEvens es = [n | n <- es, isEven n, n > 100]

{- Subtract one from the filter result -}
evensMinusOne es = [n - 1 | n <- es, isEven n]

{- Using the range operator -}
[x*2 | x <- [1..10]] -- [2,4,6,8,10,12,14,16,18,20]

{- Pattern match; see Pattern Matching for more -}
firstForEvenSeconds :: [(Int, Int)] -> [Int]j
firstForEvenSeconds ps = [x | (x, y) <- ps, isEven y]
firstForEvenSeconds ps = [fst p | p <- ps, isEven (snd p)] -- the more verbose form
```

You can have multiple generators, and order matters (you can think of them like nested loops):

```haskell
[(x,y) | y <- [4,5], x <- [1,2,3]] -- [(1,4), (2,4), (3,4), (1,5)...]
-- generates different results from
[(x,y) | x <- [1,2,3], y <- [4,5]] -- [(1,4), (1,5), (2,4), (2,5)...]
```

Generators can be dependent on a previous one.

### Pattern Matching

Then there is the concept of piece-wise definitions, where you define results by directly restating the function name. This is pattern matching:

```haskell
{- assign points based on placement in a contest, for example ◊-}
pts :: Int -> Int -- the type signature
pts 1 = 10
pts 2 = 6
pts 3 = 4
pts _ = 0 -- `_` is the wildcard or "whatever" pattern
```

and you can mix and match with other concepts like guards:

```haskell
pts :: Int -> Int
pts 1 = 10
pts 2 = 6
pts x
    | x <= 6    = 7 - x
    | otherwise = 0
```

Alternative to the "normal" pattern matching, you can use case matching:

```haskell
pts :: Int -> Int
pts p = case p of 1 -> 10
                  2 -> 6
                  3 -> 4
                  _ -> 0
```

Case matches can be used outside of function definitions.

As-Patterns take the form of `var@pattern`:

```haskell
contrivedMap :: ([a] -> a -> b) -> [a] -> [b]
contrivedMap f [] = []

{- as-pattern -}
contrivedMap f list@(x:xs) = f list x : contrivedMap f xs -- "list" is now the name of "(x:xs)"

{- normal -}
contrivedMap f (x:xs) = f (x:xs) x : contrivedMap f xs
```

#### Regarding Pattern Matching with Tuples and Lists (the `(:)` operator)

The tuple-like form (`()`) also can be used as a pattern matching mechanism when matching lists and in other places. For lists, use the "cons" operator (`:`) instead of a comma to represent the contents of the list to be matched (because functions have the highest precedence). Convention is to use 'x' and 'xs' to show the first and "rest" (like in JS) elements:

```haskell
head             :: [a] -> a
head (x:_)       =  x
head []          =  error "Prelude.head: empty list"

tail             :: [a] -> [a]
tail (_:xs)      =  xs
tail []          =  error "Prelude.tail: empty list"
```

Note that we're not using the `[]` syntax (e.g., we don't use '[x:xs]'), but rather `(x:xs)` to match the elements of the list.

Patterns can be nested:

```haskell
sumEveryTwo :: [Integer] -> [Integer]
sumEveryTwo (x:y:zs) = (x + y) : sumEveryTwo zs -- (x:(y:zs)) would work too.
```

# Dots '&' Dollars


The "dot" operator is actually function composition, used for chaining functions:

```haskell
example :: [Integer] -> [Integer]
example =
    sort
  . filter (<100) -- note the spaces (both leading and following)
  . map (*10)
```

The `$` operator is use for function application. It takes the right side of the operator and applies it to the left side which helps with nested functions:

```haskell
foo $ bar $ baz bin
-- is the same as 
foo (bar (baz bin))
```

You can look at the `$` as an open parenthesis with an implicit close at the end of the expression:


```haskell
last $ take 10 [1..]
-- is the same as
last (take 10 [1..])
```

The `&` does the reverse of `$`:

```haskell
bin & baz & bar & foo
-- is the same as
foo $ bar $ baz bin
```

Comparisons between all three (from _Wiwinwhlh_):

```haskell
ex1 = f1 . f2 . f3 . f4 $ input -- with ($)
ex1 = input & f1 . f2 . f3 . f4 -- with (&)
ex1 = (f1 . f2 . f3 . f4) input -- with explicit parens
```
### Odd Bits

`<$>` is a synonym for `fmap`:

```haskell
(*2) <$> [1,2,3]
-- [2,4,6] 

even <$> (2,2)
-- (2,True)
```

Use parentheses to turn an infix operator into a prefix. These are equivalent:

```haskell
4 + 9 == 13
(==) (4 + 9) 13
{- and both evaluate to `true` -}
```

Likewise, you can turn a function "prefix" into an infix using backticks:

```haskell
div 100 9
-- can be replaced by
100 `div` 9
```

### Currying

The `->` is a right associative, so `Int -> Int -> Int -> Int` is the same as `Int -> (Int -> (Int -> Int))`.

```haskell
add :: Int -> Int -> Int
add x y = x + y
{- means -}
add :: Int -> (Int -> Int)
add = \x -> (\y -> x + y) -- where `\` is the keyboard symbol for the lambda symbol.
```

## Idiomatic Haskell

What I'm picking up is that idiomatic Haskell is exemplified through the use of its built-in functions. Consider looking for an existing function and combining it as needed with other functions rather than trying to use operators (which you'll need to do, yes, but focus on functions first; it is a functional language after all).

_Though I'm reminded any Haskell is good Haskell; let the compiler do the work of making things efficient_

```haskell
{- This -}
last xs = head (reverse xs)
{- Not this -}
last xs = xs !! (length xs - 1)
```

Prefer `fmap` over `map`, apparently _[citation](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#what-to-avoid)_.

### Pointfree Programming

_From [Pointfree](https://wiki.haskell.org/Pointfree)_

```haskell
sum' xs = foldr (+) 0 xs -- normal
{- vs -}
sum = foldr (+) 0        -- pointfree; more compact, more idiomatic
```

### Wholemeal Programming

_From [UPenn](https://www.seas.upenn.edu/~cis1940/spring13/lectures/01-intro.html)_

> A quote from Ralf Hinze: “Functional languages excel at wholemeal programming, a term coined by Geraint Jones. Wholemeal programming means to think big: work with an entire list, rather than a sequence of elements; develop a solution space, rather than an individual solution; imagine a graph, rather than a single path. The wholemeal approach often offers new insights or provides new perspectives on a given problem. It is nicely complemented by the idea of projective programming: first solve a more general problem, then extract the interesting bits and pieces by transforming the general program into more specialised [sic] ones.”

Also from _UPenn_:

> Haskell also has triples, quadruples, … but you should never use them. As we’ll see, there are much better ways to package three or more pieces of information together.

Is this idiomatic?

## Libraries

### General Haskell Libraries

_Awareness of how Haskell breaks itself into pieces and packages as well as modules I've encountered along the way._

- Prelude: core; only one that loads automatically
- Data.List: list manipulation
- [Cassava](https://hackage.haskell.org/package/cassava): csv manipulation.

### Rio

Apparently this [rio](https://tech.fpcomplete.com/haskell/library/rio/) is a useful library, as the _FPComplete_ use it to start the demo app. I see `rio` installed as part of the `.cabal` file (which acts like the main project file, I'm gathering... or there is a `project.yaml` file too? Not sure.).

### Lens _(Advanced)_

People talk about this a lot: [Ekmett Lens](https://github.com/ekmett/lens) which "provides families of lenses, isomorphisms, folds, traversals, getters and setters."

## Creating a Web App in Haskell

_or, just trying to get something, anything, to run that is more sophisticated than a simple `.hs` script._

### General observations

#### Stack and Cabal

- `stack` appears to be the equivalent of `npx`.
- `cabal` appears to be the equivalent of `npm`.

But this is not an exact match, as each does more than either npm or npx and interact differently; how, exactly, is yet to be determined.

What I'm not clear on with Stack is how is used. In particular, I had already installed `gchi` but I keep getting told now that I've installed/become aware of Stack that I should run some variation of `stack ghci` instead. Why? — Because it picks up the package info if run in a project folder.

**Stack Install Links**

- [The Haskell Tool Stack](https://docs.haskellstack.org/en/stable/install_and_upgrade/) &mdash; Purely just Stack
- [FP Complete Haskell](https://tech.fpcomplete.com/haskell/get-started/) &mdash; Stack and more.

### Non-Trivial Tutorials/Demos

_Links found from other pages._

- [Justin Huffman Compression](https://blog.jle.im/entry/streaming-huffman-compression-in-haskell-part-1-trees.html) &mdash; Haven't tried yet.
- [Chris Allen Haskell](https://howistart.org/posts/haskell/1/) &mdash; From 2014!
  Completed and consider mildly advanced; a lot of concepts he glossed over (on purpose), but it gav me some interesting insights.
- [Stackbuilders Shortener Web Tutorial](https://www.stackbuilders.com/blog/getting-started-with-haskell-projects-using-scotty/) &mdash; Best so far.

### Installation Woes

Tried following [https://peerdh.com/blogs/programming-insights/building-a-haskell-based-web-application](https://peerdh.com/blogs/programming-insights/building-a-haskell-based-web-application) but right off the bat encountered a problem with `cabal` while installing [yesod](https://www.yesodweb.com/page/quickstart). The yesod quick start indicated using `stack` instead which seemed to do the trick (and took a while).

Had to add the `~/.local/bin` file to .zshrc.

Then gave up on that and started from scratch with [_FPComplete_](https://tech.fpcomplete.com/haskell/get-started/osx/) which is nice process, except the page needs to updated because this script is wrong:

```haskell
#!/usr/bin/env stack
-- stack --resolver lts-13.7 script

main :: IO ()
main = putStrLn "Hello World"
```

I worked when I replaced `lts-13.7` with `lts-22.28`, which I'm not even sure is the latest, since I got it from some other site as I was trying to figure things out. _[ed: latest is [22.35](https://www.stackage.org/lts-22.35) or `stack ls snapshots --lts remote`]_

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
- [What to avoid](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#what-to-avoid) in the Prelude, due to historical changes. _Wiwinwlh_ suggests these are probably sufficient to start a major project:
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
- [Monads](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#monads), of course. 

## Encountered Errors

_Put here only if there wasn't an immediate and evident solution after a quick search._

### _Could not load module ‘Data.ByteString.Lazy’_

**Problem(s)**

From trying the [Chris Allen 2014 Tutorial](https://howistart.org/posts/haskell/1/), with regards to the imports.

First, I had to update the `.cabal` file; this was in the tutorial, but didn't solve the red wiggles in VS Code. A variety of other settings changes didn't do anything. It wasn't until I deleted the `.stack-work` folder re-ran `stack build` that the wiggly lines finally resolved.

Had a similar problem with [Stackbuilders](https://www.stackbuilders.com/blog/getting-started-with-haskell-projects-using-scotty/) Scotty project with `import Text.Blaze.Html.Renderer.Text`, but harder to resolve. I thought adding:

```haskell
{-# LANGUAGE OverloadedStrings #-}
```

would do the trick (I missed it originally) since that seems to deal with the `Text` package, but that didn't do anything.

**Solution**

What finally fixed it was restarting the extension host.

### Hidden packages

If there is a warning about a hidden package, add that package to the build-depends section of the respective .cabal file.

### _Could not find module ‘Data.Csv’_

From trying the [Chris Allen 2014 Tutorial](https://howistart.org/posts/haskell/1/), with regards to the trying things in `stack ghci`

Just `:quit` and relaunch with `stack ghci`. It looks like it hotloads, but apparently not well enough, or I'm using the wrong commands.
