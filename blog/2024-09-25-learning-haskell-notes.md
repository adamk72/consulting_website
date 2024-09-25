---
title: Learning Haskell
authors: akecskes
tags: [coding, haskell]
draft: true
---

## Early Notes

_Mainly following this: https://en.m.wikibooks.org/wiki/Haskell, but also some other sites._ 

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

Though you will need them if using a prefix operator like `-` in order to ensure the compiler doesn't think you're trying to subtract from the function (rather than passing a negative value).

Where clauses allow you to define sub-function (of sorts);

```haskell
heron a b c = sqrt (s * (s - a) * (s - b) * (s - c))
    where -- important to note that there are 4 spaces here (and below)
    s = (a + b + c) / 2
```

The `let` binding allows for local declarations:

```haskell
roots a b c =
    let sdisc = sqrt (b * b - 4 * a * c)
    in  ((-b + sdisc) / (2 * a),
         (-b - sdisc) / (2 * a))
```

Use parentheses to turn an infix operator into a prefix. These are equivalent:

```haskell
4 + 9 == 13
(==) (4 + 9) 13
{- and both evaluate to `true` -}
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

Then there is the concept of piece-wise definitions, where you define results by directly restating the function name. This is pattern matching: 

```haskell
{- assign points based on placement in a contest, for example ◊-}
pts :: Int -> Int -- the type signature
pts 1 = 10
pts 2 = 6
pts 3 = 4
pts _ = 0 -- `_` is the wildcard or "whatever" pattern
```

and you can mix and match:

```haskell
pts :: Int -> Int
pts 1 = 10
pts 2 = 6
pts x
    | x <= 6    = 7 - x
    | otherwise = 0

```

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

As-Patterns take the form of `var@pattern`:

```haskell
contrivedMap :: ([a] -> a -> b) -> [a] -> [b]
contrivedMap f [] = []

{- as-pattern -}
contrivedMap f list@(x:xs) = f list x : contrivedMap f xs -- "list" is now the name of "(x:xs)"

{- normal -}
contrivedMap f (x:xs) = f (x:xs) x : contrivedMap f xs 
```

`if/then/else` is an expression.

### List Comprehensions

List comprehensions are syntactic sugar for many things, such as for the `filter :: (a -> Bool) -> [a] -> [a]` function: 

```haskell
{- Helper function -}
isEven :: Int -> Bool 
isEven n = (mod n 2) == 0

{- Normal form -}
retainEven = filter isEven 

{- LE form -}
retainEven es = [n | n <- es, isEven n]
```

LEs can go even further, acting as both filter and map, among other things:

```haskell
{- Do multiple checks -}
retainLargeEvens :: [Int] -> [Int]
retainLargeEvens es = [n | n <- es, isEven n, n > 100]

{- Subtract one from the filter result -}
evensMinusOne es = [n - 1 | n <- es, isEven n]

{- Using the range operator -}
[x*2 | x <- [1..10]] -- [2,4,6,8,10,12,14,16,18,20]

{- Pattern match -}
firstForEvenSeconds :: [(Int, Int)] -> [Int]j
firstForEvenSeconds ps = [x | (x, y) <- ps, isEven y]
firstForEvenSeconds ps = [fst p | p <- ps, isEven (snd p)] -- the more verbose form
```

### Regarding Pattern Matching with Tuples and Lists (the `(:)` operator)

Tuples can be used to as a pattern matching mechanism when matching lists. Use the "cons" operator (`:`) instead of a comma to represent the contents of the list to be matched (because functions have the highest precedence). Convention is to use 'x' and 'xs' to show the first and "rest" (like in JS) elements:

```haskell
head             :: [a] -> a
head (x:_)       =  x
head []          =  error "Prelude.head: empty list"

tail             :: [a] -> [a]
tail (_:xs)      =  xs
tail []          =  error "Prelude.tail: empty list"
```

Note that we're not using the `[]` syntax (e.g., we don't use '[x:xs]'), but rather `(x:xs)` to match the elements of the list.

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
## Libraries

- Prelude: core; only one that loads automatically
- Data.List: list manipulation

