# Pattern Matching


## Guards
Guards use the `|` operator (and leading spaces):

```haskell
absolute x
    | x < 0     = -x
    | otherwise = x -- `otherwise` is its own catch-all case: `otherwise = True`
```
Guards can replace if/then/else statements.

<Lozenge t="rule"/> Importantly, guards are not the same as pattern matches. Pattern matches can destructure data types; guards cannot. Pattern matches bind identifiers inside their scope; guards do not.

### Pattern Matching

Then there is the concept of piece-wise definitions, where you define results by directly restating the function name. This is pattern matching:

```haskell
{- assign points based on placement in a contest, for example ◊-}
pts :: Int -> Int -- the type signature
pts 1 = 10
pts 2 = 6
pts 3 = 4
pts _ = 0 -- `_` is the wildcard or "whatever" pattern
```

and you can mix and match with other concepts like guards:

```haskell
pts :: Int -> Int
pts 1 = 10
pts 2 = 6
pts x
    | x <= 6    = 7 - x
    | otherwise = 0
```

Alternative to the "normal" pattern matching, you can use `case` matching:

```haskell
pts :: Int -> Int
pts p = case p of 1 -> 10
                  2 -> 6
                  3 -> 4
                  _ -> 0
```

`case` often acts as an intermediary step for local pattern matching. It is not the same as a case condition in a typical `switch` statement. They can also match on expressions:

```haskell
-- ... type and other patterns...
filter p (x:xs) = 
  case p x of                 -- note the indentations
    False -> filter p xs      -- don't include the current x
    True -> x : filter p xs   -- keep the current x
```
<Lozenge t="note"/> For boolean type evaluations, you can replace the `case` with an `if/then/else` expression as well, or use guards/otherwise. Also, `case` matches can be used outside of function definitions.

<Lozenge t="lemma" /> From a question I asked in [r/haskell](https://www.reddit.com/r/haskell/comments/1fwclxw/learning_haskell_trying_to_refactor_from_function/), it's worth noting that destructuring is the equivalent of a `case` statement:

```haskell
greet (AdventureOptions a) = putStrLn $ "You chose: '" ++ a ++ "'."
-- is the same as:
greet x = case x of
            AdventureOptions a -> putStrLn $ "You chose: '" ++ a ++ "'."
-- which leads to:
greet = \x -> case x of
                AdventureOptions a -> putStrLn $ "You chose: '" ++ a ++ "'."
-- and then the IDE suggests this:
greet = (\(AdventureOptions a) -> putStrLn $ "You chose: '" ++ a ++ "'.")
```

`greet (AdventureOptions a)` is sugar for the `case` expression.

As-Patterns take the form of `var@pattern`:

```haskell
contrivedMap :: ([a] -> a -> b) -> [a] -> [b]
contrivedMap f [] = []

-- as-pattern
contrivedMap f list@(x:xs) = f list x : contrivedMap f xs -- "list" is now the name of "(x:xs)"

-- normal
contrivedMap f (x:xs) = f (x:xs) x : contrivedMap f xs
```

#### Regarding Pattern Matching with Tuples and Lists (the `(:)` operator)

The tuple-like form (`()`) also can be used as a pattern matching mechanism when matching lists and in other places. For lists, use the "cons" operator (`:`) instead of a comma to represent the contents of the list to be matched (because functions have the highest precedence). Convention is to use 'x' and 'xs' to show the first and "rest" (like in JS) elements:

```haskell
head             :: [a] -> a
head (x:_)       =  x
head []          =  error "Prelude.head: empty list"

tail             :: [a] -> [a]
tail (_:xs)      =  xs
tail []          =  error "Prelude.tail: empty list"
```

Note that we're not using the `[]` syntax (e.g., we don't use '[x:xs]'), but rather `(x:xs)` to match the elements of the list.

Patterns can be nested:

```haskell
sumEveryTwo :: [Integer] -> [Integer]
sumEveryTwo (x:y:zs) = (x + y) : sumEveryTwo zs -- (x:(y:zs)) would work too.
```