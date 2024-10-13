---
title: Learning Haskell From Scratch
authors: akecskes
tags: [coding, haskell]
---

import {default as L} from '@site/src/components/Lozenge'

<head>
  <meta name="description" content="Learning Haskell from Scratch, a Procedural Programmer's Perspective"/>
  <meta charSet="utf-8" />
</head>

Join me as I try to figure out how Haskell works. Even though I have principally worked in procedural or OOP languages like C/C++, Java, and JavaScript/TypeScript, I've always tried to lean into what little I know of functional programming wherever I can. Haskell is a different beast, though. It is functional _all the way down_, not just an additional language feature  (like in JS).

This is my first attempt in a long time to learn a new language effectively from scratch &mdash; I recently learned Go for instance, but that was so familiar to me that it took almost know time. All of my mental models took very little effort to adjust.

This is my attempt at organizing my thoughts and ideas on Haskell... read on to see what I've found.

_Definitely a WIP; last updated Oct 7th, 2024._

{/* truncate */}

## Getting Started

As a language that has been around for over 30 years, the documentation and developer experience thus far doesn't remotely compare to to the likes of modern languages like Go or Rust. Things aren't caveman level, but there is a lot of inconsistency in the content and no central core place (that isn't also excruciatingly slow, Hoogle).

So if you're just getting started like me, be ready for things to be a bit difficult a first.

Update: So far, these two sources have been my favorite go tos when trying to recall something:
- [Haskell MOOC](https://haskell.mooc.fi/) &mdash; Short online course from the University of Helsinki
- [Well-Typed Intro to Haskell](https://www.youtube.com/watch?v=3blAsQDT0u8&list=PLD8gywOEY4HauPWPfH0pJPIYUWqi0Gg10) &mdash; YouTube video series by Andres Löh

## Early Learning Notes

_This section mainly follows these links: [Wikibooks Haskell](https://en.m.wikibooks.org/wiki/Haskell) and this: [Graham Hutton on YouTube](https://www.youtube.com/playlist?list=PLF1Z-APd9zK7usPMx3LGMZEHrECUGodd3)._

Where I remember in code snippets, `--λ` implies the response to a command line call.

### General Concepts

Remember, lists are _not_ arrays like in JavaScript or the like. See [WTF: Working with Lists](https://whatthefunctional.wordpress.com/2018/04/17/working-with-lists/) for some common list functions.

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

Anonymous functions, lambdas, take the form of:

```haskell
(\x -> x + 1)
(\x y -> x + y)
```

_Note the skinny RH arrow `->`._

You can think of general functions of the form `buildRobot arms legs torso = (arms, legs, torso)` as a series of lambda functions (see [Currying](#currying)).

<L t="tip"/> This is useful to recall when building functions that take functions as a parameter.

```haskell
buildRobotLambda = (\arms ->
                      \legs ->
                        \torso -> (arms, legs, torso))
-- which implies:
(((buildRobot "strong arms") "skinny legs") "long torso")
-- and
buildRobotLambda "strong arms" "skinny legs" "long torso"
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

<L t="rule"/> Importantly, guards are not the same as pattern matches. Pattern matches can destructure data types; guards cannot. Pattern matches bind identifiers inside their scope; guards do not.

Type signatures look like this:

```haskell
xor :: Bool -> Bool -> Bool
xor p q = (p || q) && not (p && q)
```

They are sometimes necessary if there is a reason the complier cannot infer the signature itself and useful for documentation in general.

<L t="note"/> For the procedural thinker, it's important to realize a type signature like `xor :: Bool -> Bool -> Bool` isn't "xor takes two booleans and returns a third boolean." It's more like "xor takes a boolean and returns a partial function which takes a boolean and that function finally returns a boolean." That is, `xor :: Bool -> (Bool -> Bool)` is a more precise representation. See [Fixity](#fixity-and-precedence).

<L t="warn"/> Haskell _does not_ retain type info at run time!

Elaborating on the fact that partial function evaluations are a thing:

```haskell
map (* 2) [5,6] -- (* 2) is a partial function
--λ [10,12]

{- alternatively, using a lambda -}
map (\x -> 2 * x) [5,6]
--λ [10,12]

-- Another type of partial
makeList n = [0..n]
makeList 3
--λ [0,1,2,3]
```

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

-- or this way
squareOfF x = (square . f) x
fOfSquare x = (f . square) x
```

Futhermore, as functions, you can do this:

```haskell
squareOfF x = (square . f) x
-- is
squareOfF = square . f -- just drop the `x` from both sides!
```

### ghci

Probably the most important thing is to get used to using `:t` like crazy inside of the ghci:

```haskell
:t map
--λ map :: (a -> b) -> [a] -> [b]
```

In the couple of dozen of hours I've poured into Haskell, the "get to know your types" trope has held up remarkably well.

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

Alternative to the "normal" pattern matching, you can use `case` matching:

```haskell
pts :: Int -> Int
pts p = case p of 1 -> 10
                  2 -> 6
                  3 -> 4
                  _ -> 0
```

`case` often acts as an intermediary step for local pattern matching. It is not the same as a case condition in a typical `switch` statement. They can also match on expressions:

```haskell
-- ... type and other patterns...
filter p (x:xs) = 
  case p x of                 -- note the indentations
    False -> filter p xs      -- don't include the current x
    True -> x : filter p xs   -- keep the current x
```
<L t="note"/> For boolean type evaluations, you can replace the `case` with an `if/then/else` expression as well, or use guards/otherwise. Also, `case` matches can be used outside of function definitions.

<L t="lemma" /> From a question I asked in [r/haskell](https://www.reddit.com/r/haskell/comments/1fwclxw/learning_haskell_trying_to_refactor_from_function/), it's worth noting that destructuring is the equivalent of a `case` statement:

```haskell
greet (AdventureOptions a) = putStrLn $ "You chose: '" ++ a ++ "'."
-- is the same as:
greet x = case x of
            AdventureOptions a -> putStrLn $ "You chose: '" ++ a ++ "'."
-- which leads to:
greet = \x -> case x of
                AdventureOptions a -> putStrLn $ "You chose: '" ++ a ++ "'."
-- and then the IDE suggests this:
greet = (\(AdventureOptions a) -> putStrLn $ "You chose: '" ++ a ++ "'.") 
                
```

`greet (AdventureOptions a)` is sugar for the `case` expression.

As-Patterns take the form of `var@pattern`:

```haskell
contrivedMap :: ([a] -> a -> b) -> [a] -> [b]
contrivedMap f [] = []

-- as-pattern
contrivedMap f list@(x:xs) = f list x : contrivedMap f xs -- "list" is now the name of "(x:xs)"

-- normal
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

### Dots '&' Dollars

The "dot" operator is actually function composition, used for chaining functions:

```haskell
example :: [Integer] -> [Integer]
example =
    sort
  . filter (<100) -- note the spaces (both leading and following)
  . map (*10)
```

\_The `.` operator gets explored more under [Pointfree Programming](#pointfree-programming).

The `$` operator is use for function application. It takes the right side of the operator and applies it to the left side which helps with nested functions:

```haskell
foo $ bar $ baz bin
-- is the same as
foo (bar (baz bin))
```

`$` has the lowest possible precedence for any infix operator:

```haskell
:info ($)
--λ ($) :: (a -> b) -> a -> b 	-- Defined in ‘GHC.Base’
--λ infixr 0 $                  -- which tells us it has 0 precedence
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
--λ True
```

Likewise, you can turn a function "prefix" into an infix using backticks:

```haskell
div 100 9
-- can be replaced by
100 `div` 9
```

`</>` is the file separator operator:

```haskell
"/directory" </> "file.ext" == "/directory/file.ext"
```

#### Common Variable Names

- x, y    &mdash; heads
- xs, ys  &mdash; tails
- f       &mdash; functions
- p       &mdash; predicates (functions that lead to Bool)
- t       &mdash; traversables (and something else?)



### Fixity and Precedence

Passing an argument to a function has higher precedence than passing to an operator.

Infix operators have a "fixity" which determines how they favor precedence. `<>` has right fixity so something like `"My name is" <> name <> "."` is seen by the compiler as `"My name is" <> (name <> ".")`.

### Currying

The `->` is a right associative, so `Int -> Int -> Int -> Int` is the same as `Int -> (Int -> (Int -> Int))`.

<L t="rule"/> This gives us the "lambda distribution rule":

```haskell
add :: Int -> Int -> Int
add x y = x + y
{- means -}
add :: Int -> (Int -> Int)
add = \x -> (\y -> x + y) -- where `\` is the keyboard symbol for the lambda symbol.
```

A function that has all of its expected arguments is _saturated_ and can evaluate to a non-function value. Otherwise it's considered _partially applied_. <L t="lemma"/>

`error` acts as placeholder:

```haskell
fooBar :: Int -> Int
fooBar x = error "fooBar: not implemented!"
```

## Idiomatic Haskell

What I'm picking up is that idiomatic Haskell is exemplified through the use of its built-in functions. Consider looking for an existing function and combining it as needed with other functions rather than trying to use operators (which you'll need to do, yes, but focus on functions first; it is a functional language after all).

_Though I'm reminded any Haskell is good Haskell; let the compiler do the work of making things efficient_

```haskell
-- this
last xs = head (reverse xs)
-- not this
last xs = xs !! (length xs - 1)
```

<L t="tip"/> _From [What to avoid](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#what-to-avoid) in the Prelude, due to historical changes._

- Prefer `fmap` over `map`.
- Avoid `String`.
- Use Foldable and Traversable instead of the Control.Monad, and Data.List versions of traversals.
- Avoid [_using or creating_] partial functions like `head` and `read` or use their total variants.
- Avoid exceptions, use ExceptT or Either instead.
- Avoid boolean blind functions.

Or, just pull the Prelude in explicitly and use what you need:

```haskell
import qualified Prelude as P
-- or, for example, to hide what might conflict.
import Prelude hiding (length)
```

### Pointfree Programming

_Or, how to to understand function composition with examples from [haskell.org](https://wiki.haskell.org/Pointfree). More also in [More Learning -> Composition](#composition-)._

```haskell
sum' xs = foldr (+) 0 xs -- normal
-- vs
sum = foldr (+) 0        -- pointfree; more compact, more idiomatic
```

<L t="warn"/> The dropping of variables like this can throw you off! In the second example, it almost looks like `foldr` is missing its final argument.

Let's elaborate, because this burns my brain once the (`.`) gets involved for functional programming.

Mathematically speaking, we're just "canceling" `xs` from both sides of the equation. This is simple enough to understand and the key is remembering that the `sum` function still takes a parameter; the need for one didn't go away. You still have to provide it something to work on, since it's still a function:

```haskell
sum [5, 6]
--λ 11
```

A slightly more complex example from [haskell.org](https://wiki.haskell.org/Pointfree):

```haskell
-- point-wise, and point-free member
mem, mem' :: Eq a => a -> [a] -> Bool
any :: Foldable t => (a -> Bool) -> t a -> Bool -- `any` checks for existence in an array or the like.

mem x lst = any (== x) lst
mem'      = any . (==)

mem' 4 [3, 5]
--λ False
```

So here, you still need an `x` and a `lst`, right? So what order does it get passed into? How does `x` get pulled into the context of `(==)`? Let's expand `mem'` and notice something:

```haskell
-- This doesn't work:
any . (==) 4 [4, 5] -- (==) doesn't take two arguments
-- but this does:
(any . (==)) 4 [4, 5]
```

Think of `(any . (==))` as `\x -> any (== x)` which takes one argument (recall our 'sum' conversation above). This "new" anonymous function (look at the `any` type again) then takes the array (which is Foldable, to be more explicit). To break it down again:

```haskell
(any . (==)) 4 [4, 5]
(\x -> any (== x)) 4 [4, 5]
any (== 4) [4, 5]
--λ True
```

The point (pun intended) of all this is that you have to keep two, possibly three, things in mind:

1. Pointfree programming is essentially reducing (η-reduction) the number of parameters _seen_ but those parameters are still _needed_. They just become implicit based on context.
2. The function composition operator, (`.`) anonymizes the functions to: `(.) f g = \a -> f (g a)`, as we saw with the `mem'` example. This implies that parameter order and type are important to keep track of.
3. Pointfree isn't the end-all be all; in small chunks it makes for more concise code and is idiomatic, but taken too far, it might lead to difficult to comprehend and possibly challenging to refactor code bases. It's okay to be explicit with variables if it makes things more readable.

And even more elaborate example, where we're trying to sum up total years of experience for a subset of employees:

```haskell
checkForEmployee l n =
  n `elem` l

employeeExperienceInfo = [("Alice", 10), ("Bob", 2), ("Charlie", 12)]

employeeTotalExperience l =
  foldr (+) 0 . map snd . filter (l . fst)

employeeTotalExperience (checkForEmployee ["Alice", "Charlie"]) employeeExperienceInfo
--λ 22
```

Working from right to left:

1. `employeeExperienceInfo` is going to be the value for the `filter`
2. The `checkForEmployee` bit has to be in parentheses so that it can be passed fully as the `l` argument to `filter`.
3. Using the `(.) f g = \a -> f (g a)` rule we get:
   - `\n -> checkForEmployee l (fst n)`; note `n` stands for `name`, but it's tuple in the list we're going to ultimately be filtering over.
   - `\n -> (fst n) 'elem' l`, where `l` is the subset list of employees.
4. Thus, the `filter` can now act on the `employeeExperienceInfo` list; each tuple that comes in is applied to `fst` and then qualified by `checkForEmployee`, leaving us with a subset list of tuples (just for Alice and Charlie in this example).
5. If we call steps 1-4 simply `f`, we are left with `foldr (+) 0 . map snd . f`.
6. Focusing on `map snd . f` we get `map (\l -> snd f(l))`. `f(l)` is our resulting list, and `snd` is what `map` will apply to that list, so it's simply normal mapping exercise where the second element (years of experience) will be pulled off.
7. The finally result of the years list will then be applied to the `foldr` which simply sums everything up.

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

### Monads, Applicative, and Functor Relationship

The quick way to look at the relation between these three objects is:

`Functor -> Applicative -> Monad` The lower ones build to make the higher ones.

Functors change _values_, Applicatives change the _functionality_, and Monads change _context_ (which I need to elaborate on).

```haskell
-- Functor
class Functor f where
  fmap :: (a -> b) -> f a -> f b

-- Applicative
class Functor f => Applicative f where
  pure :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b

-- Monad
class Applicative f => Monad f where
  (>>=) :: f a -> (a -> f b) -> f b
```

#### A Discussion of Maybe

Maybe is all three of the major above types:

- It's a Functor because you can map over it; if you have function `(a -> b)`, you can map over it to go from `Maybe a` to `Maybe b`
- It's an Applicative because <L t="tbd"/>
- It's an Monad because <L t="tbd"/>

### Monads

> Monads are prisons for side-effects ~~[WhatTheFunctional](https://whatthefunctional.wordpress.com/2018/03/04/modeling-generalized-behaviors-and-imprisoning-side-effects/)

Monads have two, optionally three, parts:

1. **Return**: The `return` function, which takes a thing and wraps it in a monadic _context_: `return :: a -> m a`.
2. **Bind**: The binding infix operator, `>>=`, which takes a monad and a function that converts the incoming monad contents into another monad _context_: `(>>=) :: m a -> (a -> m b) -> m b`.
3. **Then**: This auxiliary infix function, `>>`, takes a left and right monad and then yields the context of the right monad: `m a -> m b -> m b`. It works like so: `m >> k = m >>= \_ -> k`.

**Notes**

- A monadic context means that the a value is "brought into" the monad. `Maybe` takes the form of: `Maybe a = Nothing | Just a`, so `return a = Just a`; thus `a` is now part of the Maybe's context.
- The bind operator essentially says, given a monad and function, take the value of the monad and apply it to whatever context is appropriate, resulting in another context.
- Recall that a `data` type and its parts are all categorically the same. Thus in
  `Maybe a = Nothing | Just a`, `Nothing`, _and_ `Just` are boh `Maybe a` types, and are constructors.
- In most examples, `m a` and `m b` are monads of different contexts. That is, we're looking at two different monads applied to whatever types are appropriate: `m a` and `k b` (and then shorten those to just `m` and `k` for brevity's sake).

#### The Monad Laws <L t="law"/>

1. **Right Identity**: `return a >>= f` === `f a`. Return creates a monad on value `a` and when bound to a function, that function will be applied to `a`.
2. **Left Identity**: `m >>= return` === `m`. Given a monad context `m`, when bound to a return, will result in the same monad context.
3. **Associativity**: `(m >>= f) >>= g` === `m >>= (\x -> f x >>= g)`. A monad context `m` that is first bound to a function `f` and then bound to another function `g` is the as if `m` were bound to a lambda applied to `f` which is bound directly to `g`.

#### Do

`do` is effectively a sugared up monad system for combining, often, IO computations.

This:

```haskell
getInput = do
  putStrLn "Please enter your name:"
  name <- getLine
  putStrLn ("Hello, " ++ name ++ ", how are you?")
```

can be converted to this:

```haskell
getInput = putStrLn "Please enter your name:" >> getLine >>= \name -> putStrLn ("Hello, " ++ name ++ ", how are you?")
```

where `>>` means (casually speaking), "and then" or "pass through" and `>>=` means "bind this lambda, '\name' to 'getLine' when when all is said and done, pass it on 'putStrLn'". Sorta. These operators help you compose, for example, I/O functions together.

A more concise example from [Do Considered Harmful](https://wiki.haskell.org/Do_notation_considered_harmful):

```haskell
do
  text <- readFile "foo"
  writeFile "bar" text
-- becomes this, which has an η-reduction quality to it:
readFile "foo" >>= writeFile "bar"
```

**Notes**

- `putStrLn` is of type `putStrLn :: String -> IO ()`. We don't care about the `IO ()` so we can safely apply `>>` to move onto the next action.
- `getLine` is of type `getLine :: IO String` and IO is a monoid that results in a String. It's only a "recipe" a this point (due to Haskell's lazy nature), but we're going to want the info from it. So, we bind it with `>>=` to a lambda.
- When the IO finally resolves (i.e., the user hits enter), the lambda is executed. This works because `putStrLn` takes a String (from the user) that results in the `IO ()` monoid fitting the expectation of the bind signature: `(>>=) :: m a -> (a -> m b) -> m b`.

#### The Left Arrow Problem (in a Do)

_From [Wikibook](https://en.wikibooks.org/wiki/Haskell/Simple_input_and_output)_

This does _not_ work:

```haskell
do name <- getLine
  loudName <- makeLoud name
-- where
makeLoud :: String -> String
```

Why not? Because `makeLoud` isn't an IO type, and the `<-` is attempting to bind a plain String from `makeLoud` to something that should be an `IO String`. To fix, within the `do`, use `let`:

```haskell
main =
 do name <- getLine
    let loudName = makeLoud name
    putStrLn ("Hello " ++ loudName ++ "!")

-- or possibly `return`:
main =
 do name <- getLine
    loudName <- return (makeLoud name) -- but this gives the wrong impression; non-idiomatic
    putStrLn ("Hello " ++ loudName ++ "!")

-- or don't use the `do` at all:
main = getLine >>= \name -> putStrLn ("Hello " ++ makeLoud name ++ "!")
```

### Types

_Pulled from [Learn Haskell by building a blog generator](https://learn-haskell.blog/01-about.html)._

```haskell
newtype Html = Html String
-- |     |      |    |
-- |     |      |    +--- existing type; can only have one.
-- |     |      +-------- type name; must be capitalized
-- |     +--------------- constructor; not always the same as the type, but often; also capitalized
-- +--------------------- declaration
```

This defines an actual new type that can be distinguished by the complier whereas:

```haskell
type Title = String
```

is just an alias, so all `Title`s can be replaced by `String` and can't be explicitly checked. Often referred to as a _type synonym_.

Then there are new data types:

```haskell
data Choice = Rock | Paper | Scissor | Spock | Lizard 
-- where Choice can be be one of the following instances.
data Address = NoAddress | WithAddress String String String Int -- perhaps for  Address, City, State, Zip
-- better for `String String String Int` to replaced by other, properly named types; see below.
```

You can combine as well:

```haskell
data Name = Name FirstName LastName
--    |      |
--    |      +--- data constructor; does not have to be the same as the type, but it does return the type
--    |           thus, :type => Name :: FirstName -> LastName -> Name
--    |                          ^^^ constructor                  ^^^ data type returned
--    +---------- type constructor; can accept a parameterized argument,
--                e.g., `data Box a = Box a`
```

An interesting demonstration of recursive types:
_From [What the Functional](https://whatthefunctional.wordpress.com/2018/03/01/the-type-language/)._

```haskell
data PizzaTopping = Mushroom | BellPepper | Salami | Anchovy | Pepperoni
data Pizza = PizzaBaseAndSauce | WithTopping PizzaTopping Pizza
-- which gives you:
PizzaBaseAndSauce --a valid Pizza
WithTopping Salami PizzaBaseAndSauce -- also valid
WithTopping Mushroom (WithTopping Anchovy PizzaBaseAndSauce) -- still valid
--                    ----------- ------- -----------------
--                     |           |       |
--                     |           |       +------- type of Pizza; needed as the base type for the recursion
--                     |           +--------------- type of PizzaTopping
--                     +--------------------------- type of parameterized Pizza
```

Other examples:

```haskell
-- Enumeration
data Colors = Red | Green | Blue
-- Tree
data BinaryTree a = EmptyNode | TreeNode a (BinaryTree a) (BinaryTree a)
-- TreeMap
data TreeMap k v = TreeMapEmpty | TreeMapNode k v (TreeMap k v) (TreeMap k v)
```

More examples, this time from _[Haskell for Dilettantes](https://www.youtube.com/watch?v=qy0AO0tWFOU)_

```haskell
data = DayOfWeek = Mon | Tues | Wed | Thur | Fri | Sat | Sun
  deriving (Show, Eq)
data = Activity = Work | Play deriving (Show, Eq)

schedule :: DayOfWeek -> Activity -- type annotation

-- Pattern version
schedule = if (day == Mon) then Work else Play
-- or
schedule _ = Play -- for any day
-- or
schedule Sun = Play
schedule Sat = Play
schedule _ = Work -- evaluates in order from top to bottom

-- Guard version
schedule day -- note: no `=` here
  | (day == Sat || day == Sun) = Play -- can't do this in the above pattern
  | otherwise = Work

-- if/then/else version
schedule day = if (day == Sat || day == Sun)
               then Play
               else Work
```

#### Type Classes

Type classes are effectively any group of types that behave the same way; they have same operation and types associated.

## I/O

IO defines a context for input/output; code that interacts outside the core of the program will be wrapped in an IO type ("action") of some sort. There are various semantics for interaction with the IO type (`<-`, `do`, `>>`, `let`, `return`, `>>=`, and so on, though they are not _unique_ to IO, just very common. Monads use them as well [and IO is a of typeclass Monad]).

These interactions ensure that the core purity is maintained in a predictable way. One must unwrap input and wrap output in order to engage the IO context.

Some basis interactions:

```haskell
-- IO actions
putStrLn :: String -> IO () -- does not return a value, per se, but an action to be engaged.
getLine :: IO String         -- takes in an IO action that can cough up a string.
```

Apps that have IO have a `main :: IO()` starter function. This means the main function has to evaluate to an IO() at some point, or it is invalid.

`let` gives you access to IO action pulled via `a <- getLine` for example.

## More Learning

### Composition (`.`)

From a question I asked in [r/haskell](https://www.reddit.com/r/haskell/comments/1fwclxw/learning_haskell_trying_to_refactor_from_function/),

```haskell
data AdventureOptions = AdventureOptions {unOptions :: String}

-- unOptions        :: AdventureOptions -> String
-- pure             :: a -> IO a
-- pure . unOptions :: AdventureOptions -> IO String

main = parse >>= (pure . unOptions) >>= (\s -> putStrLn $ "You chose: '" ++ s ++ "'.")
-- or
main = parse >>= (\a -> putStrLn $ "You chose: '" ++ unOptions a ++ "'.")
```

Another look:

```haskell
(f . g) x = f (g x)
(f . g) = \x -> f (g x) -- the `x` gets "pulled" into the lambda
-- and you can η-reduce even further.
```

### Hole-Driven Development (HDD )

One thing you can do in code is replace unknowns with a "hole" which is either a lone underscore, `_`, or a name starting with the underscore, e.g., `_cons`, `_nils`, `_1`, `_2`.

This is useful because you can infer a lot of type information, possibly even direct solutions simply be loading the file in `ghci` (assuming you have all the proper types in scope and packages loaded needed for your file).

Doing this will generate a response that starts with something like, "Found hole: \_ :: Optional (List a);" the message will elaborate further, including relevant bindings.

Another tip is to use "undefined" as a placeholder.

Very useful stuff.

### Higher Order Functions

#### Partially Applied Functions

Well-stated from [LYAH](https://learnyouahaskell.com/higher-order-functions#curried-functions), _emphasis_ mine:

> Simply speaking, if we call a function with too few parameters, we get back a _partially applied function_, meaning a function that _takes as many parameters as we left out_.

#### Sections

<L t="note"/> Sections are the partial application of an operator.

```haskell
map (+1) [1..5]
--    |
--    +--- adding one of the two parameters to the operator leaves it open.
--         This is the same as (\x -> x + 1)
--λ [2,3,4,5,6]

-- From https://wiki.haskell.org/Section_of_an_infix_operator
(2^) -- (left section) is equivalent to (^) 2, or more verbosely \x -> 2 ^ x
(^2) -- (right section) is equivalent to flip (^) 2, or more verbosely \x -> x ^ 2
```
<L t="warn"/> Keep in mind the commutativity of the operator!

### GHCI Commands

The useful ones so far (for development):

- :type, :t &mdash; show the type of `<expr>`; ":t +d" shows a simplified version (`a` to `Int` for example).
- :info, :i &mdash; display information about the given names
- :browse &mdash; display the names defined by module
- :kind, :k &mdash; show the kind of `<type>`

also, [GHCI User Guide](https://downloads.haskell.org/ghc/latest/docs/users_guide/ghci.html)

## Coding Patterns, Memes, and Maxims

### General

- `foldr` is the constructor replacement function. Uses the [incremental pattern](https://www.youtube.com/watch?v=J_4BKCDeukA&list=PLD8gywOEY4HauPWPfH0pJPIYUWqi0Gg10&index=23) f<L t="essential"/>
- `foldl` is the for loop. Can be implemented in terms of `foldr`. Uses the [accumulator pattern](https://www.youtube.com/watch?v=wJgRsvtarmE&list=PLD8gywOEY4HauPWPfH0pJPIYUWqi0Gg10&index=24)
- `(\_ -> a)` is `const a`
- With `withFile`, this `(\h -> hGetContents h >>= putStr)` can go to this: `(hGetContents Control.Monad.>=> putStr)`

### Triggers

- In HDD, `(a -> b) -> b` should indicate a lambda. Don't forget that the input can be a function, and if it is, you can take that input and have it act on another variable, i.e., `(\f -> f a)`.

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
- Type [holes](#hole-driven-development) and undefined
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

- `η-reduction` or eta reduction and pointfree or tacit programming _[ed: getting a hang of this now]_
- fixity &mdash; some work started [here](#fixity-and-precedence)
- referential transparency

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

Update: sometimes the Haskell Language Server gets confused and so the squiggly lines don't automatically clear up. An `hie.yaml` file will help: [https://haskell-language-server.readthedocs.io/en/stable/configuration.html](https://haskell-language-server.readthedocs.io/en/stable/configuration.html)

**Solution**

What finally fixed it was restarting the extension host.

### Hidden packages

If there is a warning about a hidden package, add that package to the build-depends section of the respective .cabal file.

### _Could not find module ‘Data.Csv’_

From trying the [Chris Allen 2014 Tutorial](https://howistart.org/posts/haskell/1/), with regards to the trying things in `stack ghci`

Just `:quit` and relaunch with `stack ghci`. It looks like it hotloads, but apparently not well enough, or I'm using the wrong commands.

### _Not in scope: data constructor ‘Optional’_

Probably means you're calling on the type constructor, not the data constructor:

```haskell
data Optional a = Full a | Empty
mapOptional :: (a -> b) -> Optional a -> Optional b
mapOptional _ Empty = Empty
-- generates error
mapOptional f (Optional a) = Optional(f a)
-- s/b
mapOptional f (Full a) = Full(f a)
```
