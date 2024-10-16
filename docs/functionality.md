---
sidebar_position: 3
title: Haskell is Functional 
---

# Haskell is Functional. _Very_ Functional.

The first thing to take away is that Haskell isn't playing around with being functional, compared to functional-adjacent languages like JavaScript. If a function doesn't receive all the arguments, you end up with a partial function. This is where currying comes into play, and I'll address that specifically at a later time, probably [here](http://localhost:3000/docs/advanced-concepts/currying).

You can see this notion of passing functionality in the ever present expression of type signatures. You will see them _everywhere_. Be suspicious of any code that doesn't have a signature nearby. <Lozenge t="maxim"/>

Type signatures look like this:

```haskell
-- `xor` is a function with two boolean arguments that evaluates to a boolean result. 
xor :: Bool -> Bool -> Bool           -- Definition (Type Signature)
xor p q = (p || q) && not (p && q)    -- Function declaration
--  │ │   └──────────────────────┴────── Result evaluates to type `Bool`
--  │ └─ Second parameter of type `Bool`
--  └─── First parameter of type `Bool`
```
<Lozenge t="note"/> Pay attention to the `=` operator. It's not assigning the result from the RHS to the LHS like in a procedural call &mdash; how would it assign a single boolean to the two variables, `p` and `q` anyway? Keep in mind this a function call, not an expression, and is saying that `p` and `q` are to be used for their respective values in the function.

From a procedural point of view, one might read `xor` as a function that takes two booleans and returns a third. That works, but it's not the complete story.

Essentially, you don't pass in parameters per se like in a C-type language; it's more like you build up functions until the final result is not another function, but rather a concrete type, like a `Bool` or an `Int` or a `[Char]` (a.k.a., a `String`) or an even more complex structure.

```haskell
λ> xor p q = (p || q) && not (p && q)
λ> xor' = xor True  -- `xor'` is a partial function, where `p` == `True`.
λ> xor' False       -- You can give it the second parameter `q` at anytime.
True
λ> xor' True
False
```

:::tip
The `->` operator is right-associative. You can re-write the signature to represent `xor` more precisely by:

`xor :: Bool -> (Bool -> Bool)`  which can be read as:

> `xor` is a function that takes a `Bool` and returns a function, `(Bool -> Bool)`. This new function takes a Bool and returns a Bool itself.

This little fact of right-associativity has _major_ consequences later on.
:::

I found this tibit from [LYAH](https://learnyouahaskell.com/higher-order-functions#curried-functions) helpful to keep in mind, _emphasis_ mine:

> Simply speaking, if we call a function with too few parameters, we get back a _partially applied function_, meaning a function that _takes as many parameters as we left out_.