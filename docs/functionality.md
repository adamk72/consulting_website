---
sidebar_position: 2
title: Haskell is Functional 
---

# Haskell is Functional. _Very_ Functional.

Type signatures look like this:

```haskell
-- `xor` is a function that takes in two Bools and returns another Bool.
xor :: Bool -> Bool -> Bool
xor p q = (p || q) && not (p && q)
```

The first thing to take away is that Haskell isn't playing around with being functional, compared to functional-adjacent languages like JavaScript. If a function doesn't receive all the arguments, you end up with a partial function. This is where currying comes into play, and I'll address that specifically at a later time.

Essentially, you don't pass in parameters per se; it's more like you build up functions until it gives you a non-functional response, like a `Bool` or an `Int` or a `[Char]` (a.k.a., a `String`) or a an even more complex structure.

:::tip
The `->` operator is right-associative. You can re-write the signature to represent `xor` more precisely by:

`xor :: Bool -> (Bool -> Bool)`  which can be read as:

> `xor` is a function that takes a `Bool` and returns a function, `(Bool -> Bool)`. This new function takes a Bool and returns a Bool itself.

This little fact of right-associativity has _major_ consequences later on. 
:::



I found this tibit from [LYAH](https://learnyouahaskell.com/higher-order-functions#curried-functions) helpful to keep in mind, _emphasis_ mine:

> Simply speaking, if we call a function with too few parameters, we get back a _partially applied function_, meaning a function that _takes as many parameters as we left out_.