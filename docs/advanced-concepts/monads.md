---
sidebar_position: 2
---
# Monads, Applicatives, and Functors

## The Relationships

The quick way to look at the relation between these three objects is:

`Functor -> Applicative -> Monad` &mdash; The lower ones build to make the higher ones, acting on complex data types, where we want to perform some action or evaluation on the internal values of a the complex data type.

:::tip
Applied to the contents of "wrapped" types, Functors change _values_, Applicatives change _functionality_, and Monads change _context_. <Lozenge t="maxim"/>
:::

```haskell
-- Abridged :info results:
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

:::note
1. `<$>` is the infix version of `fmap`. This makes Functor match up with `<*>` and `>>=` in examples later.
2. `pure` is the more generalized version of `return`. For this article, the two are equivalent.

:::

## Maybe Some Examples

`Maybe` is all three of the major above types:

```haskell
-- Functor example => Operator applied to a single wrapped type
λ> (*2) <$> Just 3              -- Apply *2 to content of Just 3
Just 6                          -- Retain result in Maybe type
--λ (*) <$> Just 3             -- Fails; missing an second value to multiply
                                -- "??? * 3" doesn't make sense

-- Applicative example => Operator applied between two wrapped types
λ> (*) <$> Just 4 <*> Just 3    -- Map (*) over 4 and apply to 3
Just 12                         -- Retain result in Maybe type
--λ (*2) <$> Just 2 <*> Just 3  -- Fails; extra operand unnecessary
                                -- "4 *2 3" doesn't make sense.
λ> Just (+3) <*> Just 4         -- Another example
Just 7

-- Monadic example => Operator applied through wrapped type contexts
-- First, we need context:
stringTooLong :: String -> Int -> Maybe Int
stringTooLong s n
  | n > length s  = Just (n + 1) -- if n is larger than string length, increment n
  | otherwise     = Nothing

λ> return 5 >>= stringTooLong "foo" >>= stringTooLong "bar" >>= stringTooLong "fooBar"
Just 8      --  ^^^ Just 6              ^^^ Just 7              ^^^ Just 8

λ> return 3 >>= stringTooLong "foo" >>= stringTooLong "bar" >>= stringTooLong "fooBar"
Nothing     --  ^^^ Just 4              ^^^ Just 5              ^^^ 5 < 6, Nothing

-- Regarding returns: `return 5` evaluates to `Just 5` to get the context started;
-- this is done by inference since the following >>= expects a Maybe.
```

The key is remember what the `>>=` operator does: `(>>=) :: f a -> (a -> f b) -> f b`. It takes a functor, "extracts" the value, then convert it to another type of functor. In the above example, the result types are all the same, but they could be different:

```haskell
smallIntToString :: Int -> Maybe String
smallIntToString n
  | n <= 9    = Just (show n)       -- only "valid" if n is small
  | otherwise = Nothing

λ> return 5 >>= stringTooLong "foo" >>= smallIntToString
Just "6"     -- ^^^ Just 6              ^^^ 7 <= 9, so show String, "6"

λ> return 9 >>= stringTooLong "foo" >>= smallIntToString
Nothing      -- ^^^ Just 10             ^^^ 10 > 9, so Nothing
``` 

Recall that `stringTooLong` of a string is a partial function. This means `>>==` can extract the resulting _number_ and pass it to `smallIntToString`.

```haskell
λ> :t stringTooLong "foo"
stringTooLong "foo" :: Int -> Maybe Int
```

It's worth talking about the "strange" (to a procedural programmer) syntax of the first applicative example. It's more obvious if we convert from `Maybe` context to a `List` context:
```haskell
-- instead of:
(*) <$> Just 4 <*> Just 3
--λ Just 12

-- consider:
(*) <$> [4] <*> [3]
--λ [12]
```

Both `[]` and `Just` contain values that we want to get it, then apply some function to. Expressing by breaking the first example down:

```haskell
λ> (*) <$> Just 4 <*> Just 3
Just 12

λ> applyMultBy4 = (*) <$> Just 4
λ> :t applyMultBy4
applyMultBy4 :: Num a => Maybe (a -> a) -- This is a wrapped `(*) :: a -> a -> a`

λ> applyMultBy4 <*> Just 3
Just 12
```
`Maybe` and `Either` and other similar wrapper types are like `List`s in this regard. You can map over them, and in this particular example, what you're mapping is one or more partial functions (via `<$>`) that can then be applied to a new wrapped type (via `<*>`).

:::note
<Lozenge t="wip"/>
The takeaway for `<*>` is that as a subclass of Functor, it makes use of `fmap` itself when you define it. `<*>` essentially "cascades" the `fmap` over the subsequent sequence of functions, which is why you often see a sequence of applicative functions start like this:
```haskell
(++) <$> foo <*> bar <*> baz -- assume foo, bar, and baz are all wrapped types.
```
The `(++)` is applied to the foo, and then that wrapped result is `fmap`ed over bar and baz.

<Lozenge t="warn"/> Whether or not `<*>` can be chained like this depends on the types and function.
:::


## More on Monads

> Monads are prisons for side-effects ~~[WhatTheFunctional](https://whatthefunctional.wordpress.com/2018/03/04/modeling-generalized-behaviors-and-imprisoning-side-effects/)

### Requirements of a Monad

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

### The Monad Laws <Lozenge t="law" p/>

1. **Right Identity**: `return a >>= f` === `f a`. Return creates a monad on value `a` and when bound to a function, that function will be applied to `a`.
2. **Left Identity**: `m >>= return` === `m`. Given a monad context `m`, when bound to a return, will result in the same monad context.
3. **Associativity**: `(m >>= f) >>= g` === `m >>= (\x -> f x >>= g)`. A monad context `m` that is first bound to a function `f` and then bound to another function `g` is the as if `m` were bound to a lambda applied to `f` which is bound directly to `g`.