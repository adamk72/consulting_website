---
sidebar_position: 5
title: Regarding Lists
---
:::warning
Remember, lists are _not_ arrays like in JavaScript or the like. They are homogenous and represented as linked lists behinds the scenes.

See [WTF: Working with Lists](https://whatthefunctional.wordpress.com/2018/04/17/working-with-lists/) for some common list functions.
:::

## List Comprehensions

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
