# IO Basics

:::note
IO is often touted as a form of Monad, which is true, but not a complete picture.
:::

IO defines a context for input/output; code that interacts outside the core of the program will be wrapped in an IO type ("action") of some sort. There are various semantics for interaction with the IO type (`<-`, `do`, `>>`, `let`, `return`, `>>=`, and so on, though they are not _unique_ to IO, just very common. Monads use them as well [and IO is a of typeclass Monad]).

These interactions ensure that the core purity is maintained in a predictable way. One must unwrap input and wrap output in order to engage the IO context.

Some basis interactions:

```haskell
-- IO actions
putStrLn :: String -> IO () -- does not return a value, per se, but an action to be engaged.
getLine :: IO String         -- takes in an IO action that can cough up a string.
```

Apps that have IO have a `main :: IO()` starter function. This means the main function has to evaluate to an IO() at some point, or it is invalid.

`let` gives you access to IO action pulled via `a <- getLine` for example.

## Do

`do` is effectively a sugared up monad system for combining, often, IO computations.

This:

```haskell
getInput = do
  putStrLn "Please enter your name:"
  name <- getLine
  putStrLn ("Hello, " ++ name ++ ", how are you?")
```

can be converted to this:

```haskell
getInput = putStrLn "Please enter your name:" >> getLine >>= \name -> putStrLn ("Hello, " ++ name ++ ", how are you?")
```

where `>>` means (casually speaking), "and then" or "pass through" and `>>=` means "bind this lambda, '\name' to 'getLine' when when all is said and done, pass it on 'putStrLn'". Sorta. These operators help you compose, for example, I/O functions together.

A more concise example from [Do Considered Harmful](https://wiki.haskell.org/Do_notation_considered_harmful):

```haskell
do
  text <- readFile "foo"
  writeFile "bar" text
-- becomes this, which has an η-reduction quality to it:
readFile "foo" >>= writeFile "bar"
```

**Notes**

- `putStrLn` is of type `putStrLn :: String -> IO ()`. We don't care about the `IO ()` so we can safely apply `>>` to move onto the next action.
- `getLine` is of type `getLine :: IO String` and IO is a monoid that results in a String. It's only a "recipe" a this point (due to Haskell's lazy nature), but we're going to want the info from it. So, we bind it with `>>=` to a lambda.
- When the IO finally resolves (i.e., the user hits enter), the lambda is executed. This works because `putStrLn` takes a String (from the user) that results in the `IO ()` monoid fitting the expectation of the bind signature: `(>>=) :: m a -> (a -> m b) -> m b`.

#### The Left Arrow Problem (in a Do)

_From [Wikibook](https://en.wikibooks.org/wiki/Haskell/Simple_input_and_output)_

This does _not_ work:

```haskell
do name <- getLine
  loudName <- makeLoud name
-- where
makeLoud :: String -> String
```

Why not? Because `makeLoud` isn't an IO type, and the `<-` is attempting to bind a plain String from `makeLoud` to something that should be an `IO String`. To fix, within the `do`, use `let`:

```haskell
main =
 do name <- getLine
    let loudName = makeLoud name
    putStrLn ("Hello " ++ loudName ++ "!")

-- or possibly `return`:
main =
 do name <- getLine
    loudName <- return (makeLoud name) -- but this gives the wrong impression; non-idiomatic
    putStrLn ("Hello " ++ loudName ++ "!")

-- or don't use the `do` at all:
main = getLine >>= \name -> putStrLn ("Hello " ++ makeLoud name ++ "!")
```
