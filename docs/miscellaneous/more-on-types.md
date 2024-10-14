# More on Types

Elaborating on the fact that partial function evaluations are a thing:

```haskell
map (* 2) [5,6] -- (* 2) is a partial function
--λ [10,12]

{- alternatively, using a lambda -}
map (\x -> 2 * x) [5,6]
--λ [10,12]

-- Another type of partial
makeList n = [0..n]
makeList 3
--λ [0,1,2,3]
```


A `typeclass` is a group of types. In this case, `Num` is a `typeclass` representing both integers and floating point values:

```haskell
(+) :: (Num a) => a -> a -> a
```

:::info
While some number types are polymorphic, meaning the complier will infer if it needs to convert from an Integer to a Double, `Int` specifically is not polymorphic:

> In Haskell, if you define a function with an `Int` argument, it will never be converted to an `Integer` or `Double`, unless you explicitly use a function like `fromIntegral`.
:::