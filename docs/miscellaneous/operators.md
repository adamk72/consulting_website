# Operators of Interest

<Lozenge t="todo"/>

The `.` function for composition:

```haskell
f x = x + 3
square x = x ^ 2

{- could be done this way -}
squareOfF x = square (f x)
fOfSquare x = f (square x)

-- or this way
squareOfF x = (square . f) x
fOfSquare x = (f . square) x
```

Futhermore, as functions, you can do this:

```haskell
squareOfF x = (square . f) x
-- is
squareOfF = square . f -- just drop the `x` from both sides!
```


## Dots '&' Dollars

The "dot" operator is actually function composition, used for chaining functions:

```haskell
example :: [Integer] -> [Integer]
example =
    sort
  . filter (<100) -- note the spaces (both leading and following)
  . map (*10)
```

\_The `.` operator gets explored more under [Pointfree Programming](#pointfree-programming).

The `$` operator is use for function application. It takes the right side of the operator and applies it to the left side which helps with nested functions:

```haskell
foo $ bar $ baz bin
-- is the same as
foo (bar (baz bin))
```

`$` has the lowest possible precedence for any infix operator:

```haskell
:info ($)
--λ ($) :: (a -> b) -> a -> b 	-- Defined in ‘GHC.Base’
--λ infixr 0 $                  -- which tells us it has 0 precedence
```

You can look at the `$` as an open parenthesis with an implicit close at the end of the expression:

```haskell
last $ take 10 [1..]
-- is the same as
last (take 10 [1..])
```

The `&` does the reverse of `$`:

```haskell
bin & baz & bar & foo
-- is the same as
foo $ bar $ baz bin
```

Comparisons between all three (from _Wiwinwhlh_):

```haskell
ex1 = f1 . f2 . f3 . f4 $ input -- with ($)
ex1 = input & f1 . f2 . f3 . f4 -- with (&)
ex1 = (f1 . f2 . f3 . f4) input -- with explicit parens
```


### Odd Bits

`<$>` is a synonym for `fmap`:

```haskell
(*2) <$> [1,2,3]
-- [2,4,6]

even <$> (2,2)
-- (2,True)
```

Use parentheses to turn an infix operator into a prefix. These are equivalent:

```haskell
4 + 9 == 13
(==) (4 + 9) 13
--λ True
```

Likewise, you can turn a function "prefix" into an infix using backticks:

```haskell
div 100 9
-- can be replaced by
100 `div` 9
```

`</>` is the file separator operator:

```haskell
"/directory" </> "file.ext" == "/directory/file.ext"
```

