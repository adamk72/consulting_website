# Monads, Applicatives, and Functors

## The Relationships

The quick way to look at the relation between these three objects is:

`Functor -> Applicative -> Monad` &mdash; The lower ones build to make the higher ones.

:::tip
Functors change _values_, Applicatives change the _functionality_, and Monads change _context_.
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
1. `<$>` can replace `fmap`. This makes Functor match up with `<*>` and `>>=` in examples later.
2. `pure` is the more generalized version of `return`. For this article, the two are equivalent.

:::

## Maybe Some Examples

`Maybe` is all three of the major above types:

```haskell
-- Functor example => Operator applied to a single wrapped type
λ> (*2) <$> Just 3              -- Apply *2 to content of Just 3
Just 6                          -- Retain result in Maybe type
--λ  (*) <$> Just 3             -- Fails; missing an second value to multiply
                                -- "??? * 3" doesn't make sense

-- Applicative example => Operator applied between two wrapped types
λ> (*) <$> Just 4 <*> Just 3    -- Multiply the contents of Just 2 to contents of Just 3
Just 12                         -- Retain result in Maybe type
--λ (*2) <$> Just 2 <*> Just 3  -- Fails; extra operand unnecessary
                                -- "4 *2 3" doesn't make sense.
λ> Just (+3) <*> Just 4         -- Another example
Just 7

-- Monadic example => Operator applied through wrapped type contexts
-- First, we need context: 
shortString :: String -> Int -> Maybe Int
shortString s n
  | n > length s  = Just (n + 1) -- if n is larger than string, increment n
  | otherwise     = Nothing

λ> return 5 >>= shortString "foo" >>= shortString "bar" >>= shortString "fooBar"
Just 8      --  ^^^ Just 6            ^^^ Just 7            ^^^ Just 8
λ> return 3 >>= shortString "foo" >>= shortString "bar" >>= shortString "fooBar"
Nothing     --  ^^^ Just 4            ^^^ Just 5            ^^^ 5 < 6, Nothing

-- Regarding returns: `return 5` evaluates to `Just 5` to get the context started;
-- this is done by inference since the following >>= expects a Maybe.
```



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