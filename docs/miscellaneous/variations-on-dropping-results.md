---
title: TBD
sidebar_position: 99
draft: true
---

:::warning
From Claude.ai
:::

## Comparing two different ways of managing the return

### Question

This version worked:

```haskell
displayHelp' :: Text -> IO ()
displayHelp' t = do
    let s = T.unpack t
    _ <- Cmd.parse s
    return ()
```

but this version did not:

```haskell
displayHelp'' :: Text -> IO ()
displayHelp'' t = Cmd.parse $ T.unpack t >> return ()
```

Why?

### Personal Notes

This wasn't working either:

```haskell
Cmd.parse $ T.unpack t >> return ()
-- until Claude told me about the precedence:
(Cmd.parse $ T.unpack t) >> return () -- which does work
```

### Response

That's an interesting observation. Let's analyze both versions to understand why one worked and the other didn't.


First, let's look at the type signatures:

1. Working version:
```haskell
displayHelp' :: Text -> IO ()
displayHelp' t = do
    let s = T.unpack t
    _ <- Cmd.parse s
    return ()
```

2. Non-working version:
```haskell
displayHelp'' :: Text -> IO ()
displayHelp'' t = Cmd.parse $ T.unpack t >> return ()
```

The key difference here is in how the functions are composed and how the result of `Cmd.parse` is handled.

In the working version:
1. You unpack the `Text` to a `String`.
2. You apply `Cmd.parse` to this `String`.
3. You use the `<-` operator in do notation, which binds the result but discards it with the `_` pattern.
4. You then `return ()`.

In the non-working version:
1. You're trying to compose `Cmd.parse` with `T.unpack` using `$`, and then sequence this with `return ()` using `>>`.

The issue with the non-working version is likely related to precedence and how the functions are being applied. Let's break it down:

```haskell
Cmd.parse $ T.unpack t >> return ()
```

This is actually being interpreted as:

```haskell
(Cmd.parse $ T.unpack t) >> return ()
```

The `$` operator has lower precedence than `>>`, so `Cmd.parse` is being applied to `T.unpack t`, and then the result of that is being sequenced with `return ()`.

To fix the non-working version, you could use parentheses to enforce the correct order of operations:

```haskell
displayHelp'' :: Text -> IO ()
displayHelp'' t = (Cmd.parse $ T.unpack t) >> return ()
```

Or, you could use the `void` function from `Control.Monad` for a cleaner solution:

```haskell
import Control.Monad (void)

displayHelp'' :: Text -> IO ()
displayHelp'' t = void $ Cmd.parse $ T.unpack t
```

The reason your first version worked is that the do notation explicitly sequences the operations and handles the binding of the result from `Cmd.parse` correctly.

In general, when dealing with complex compositions of functions, especially when mixing different operators like `$` and `>>`, it's often clearer and less error-prone to use do notation or to use parentheses to make the order of operations explicit.

Would you like me to elaborate on any part of this explanation or provide more examples of how to correctly compose these operations?