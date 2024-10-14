---
sidebar_position: 2
title: From a Procedural Perspective
---
My background was originally in C/C++, Java, and Objective-C. I later turned to JavaScript/TypeScript and HTMl/CSS, and have dabbled quite a bit in Rust and Go. That is to say, I'm steeped in the procedural &mdash; but... I almost always have tried to leverage functional coding when it was available, like in JS and Rust.

## The Trick is in the Types

Learning to read and understand type signature is key. You have to be able to wrap your head around things like this:
```haskell
-- in ghci
:t fmap
fmap :: Functor f => (a -> b) -> f a -> f b
```
