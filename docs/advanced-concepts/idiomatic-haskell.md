---
sidebar_position: 4
---
# Idiomatic Haskell

What I'm picking up is that idiomatic Haskell is exemplified through the use of its built-in functions. Consider looking for an existing function and combining it as needed with other functions rather than trying to use operators (which you'll need to do, yes, but focus on functions first; it is a functional language after all).

_Though I'm reminded any Haskell is good Haskell; let the compiler do the work of making things efficient_

```haskell
-- this
last xs = head (reverse xs)
-- not this
last xs = xs !! (length xs - 1)
```

<Lozenge t="tip"/> _From [What to avoid](https://github.com/sdiehl/wiwinwlh/blob/master/tutorial.md#what-to-avoid) in the Prelude, due to historical changes._

- Prefer `fmap` over `map`.
- Avoid `String`.
- Use Foldable and Traversable instead of the Control.Monad, and Data.List versions of traversals.
- Avoid [_using or creating_] partial functions like `head` and `read` or use their total variants.
- Avoid exceptions, use ExceptT or Either instead.
- Avoid boolean blind functions.

Or, just pull the Prelude in explicitly and use what you need:

```haskell
import qualified Prelude as P
-- or, for example, to hide what might conflict.
import Prelude hiding (length)
```
