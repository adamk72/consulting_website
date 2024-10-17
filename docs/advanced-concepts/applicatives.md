---
title: Applicatives 
sidebar_position: 99 
draft: true
---


```haskell
-- From GPWH
GHCi> (6+) <$> Just 5
Just 11
GHCi> pure (6+) <*> Just 5
Just 11
```
_From GPWH:_
> You can use pure to put a function into the context of Applicative.

Which explains why this works:
```haskell
hello :: IO String
hello = pure "Hello World"
```

Because the interpreter knows the context is `IO String`.