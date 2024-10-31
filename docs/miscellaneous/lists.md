---
sidebar_position: 5
title: Regarding Lists
---
:::warning
Remember, lists are _not_ arrays like in JavaScript or the like. They are homogenous and represented as linked lists behinds the scenes.

See [WTF: Working with Lists](https://whatthefunctional.wordpress.com/2018/04/17/working-with-lists/) for some common list functions.
:::

## Haskell Lists are Linked Lists

The real form of a `[1, 2, 3, 4]` is `1 : 2 : 3 : 4 : []` where `:` is the symbol for the `cons` (of "constructor") function.

:::tip
It's important to remember that a list ends in `[]`! It becomes a natural assumption for pattern matching.
:::

## Lists as Contexts

Lists are not just containers for a specific type (though they often are). They are also _contexts_, meaning they can be mapped over just like one can map over `Maybe`. In case of lists, however, because of the multiple item nature of their construction, you can apply functions in single stroke, using Monad operators.

Contrast with with procedural approaches to lists (or arrays or other iterable object), where you have to apply a `for` loop or use a specific `map` (not to be confused with `fmap` in Haskell) in order to extract the values and evaluate the context.

In Haskell, effectively you can treat a "list" as a single object of whatever the list is of (the key is understanding how the Monad operation `return` works with context, in conjunction with `>>=`). This is an example of Haskell's ability to handle nondeterministic types. <Lozenge t="todo"/>

## List Comprehensions

:::note
List comprehensions are a specialized application of monads! <Lozenge t="adv"/>
:::

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

## Pattern Matching on Lists

```haskell
case someList of
    []       -> "Empty list"           -- Matches: []
    [x]      -> "One element"          -- Matches: [1] or [2] etc
    [x,y]    -> "Two elements"         -- Matches: [1,2] or [3,4] etc
    _        -> "Everything else"      -- Matches any other case

-- assume a list of `Persons` with an `age` field:
case filter (\p -> age p > 32) people of
    []      -> "No one over 32"
    [p]     -> "One person over 32: " ++ name p
    ps      -> "Multiple people over 32: " ++ show (length ps)
```

### Using `find` instead of `filter`

Using `find` on a list returns a Maybe, so applying a case statement looks like this:

```haskell
case find (\p -> age p > 32) people of
    Nothing -> "No one over 32"
    Just p  -> "Found person over 32: " ++ name p
```