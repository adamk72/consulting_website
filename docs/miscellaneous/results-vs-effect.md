---
title: Results vs Effects
sidebar_position: 99
draft: true
---

There's a difference between the results of a function and the _effect_ of that function.

"But wait," you say, "Haskell doesn't have any side-effects."

You are right! Mostly. Don't forget the whole purpose of the IO type is to engage with the outside world, and thus, generate effects.

Every function in Haskell, in principle, returns a result of some sort. But it doesn't _have_ to in the case of monads [citation needed].

This is important in situations (typically IO) where you only want the side-effects to happen and you don't ultimately need the results of the function. Let the file be read or the the screen be written to; that's the effect you want. But the _result_? You can let that drop.

Functions that end in an `_`, such as `mapM_` do this for you.