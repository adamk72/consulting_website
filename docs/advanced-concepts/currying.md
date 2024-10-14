---
sidebar_position: 8
---
# Currying

<Lozenge t="todo"/>

The `->` is a right associative, so `Int -> Int -> Int -> Int` is the same as `Int -> (Int -> (Int -> Int))`.

<Lozenge t="rule"/> This gives us the "lambda distribution rule":

```haskell
add :: Int -> Int -> Int
add x y = x + y
{- means -}
add :: Int -> (Int -> Int)
add = \x -> (\y -> x + y) -- where `\` is the keyboard symbol for the lambda symbol.
```

A function that has all of its expected arguments is _saturated_ and can evaluate to a non-function value. Otherwise it's considered _partially applied_. <Lozenge t="lemma"/>