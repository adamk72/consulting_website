# Coding Patterns, Memes, and Maxims

## Triggers

These are patterns that I seen in code that should, I hope, remind me to take particular actions.

- In HDD, `(a -> b) -> b` should indicate a lambda. Don't forget that the input can be a function, and if it is, you can take that input and have it act on another variable, i.e., `(\f -> f a)`.
- `(\_ -> a)` is `const a`
- With `withFile`, this `(\h -> hGetContents h >>= putStr)` can go to this: `(hGetContents Control.Monad.>=> putStr)`

### Hole-Driven Development (HDD )

One thing you can do in code is replace unknowns with a "hole" which is either a lone underscore, `_`, or a name starting with the underscore, e.g., `_cons`, `_nils`, `_1`, `_2`.

This is useful because you can infer a lot of type information, possibly even direct solutions simply be loading the file in `ghci` (assuming you have all the proper types in scope and packages loaded needed for your file).

Doing this will generate a response that starts with something like, "Found hole: \_ :: Optional (List a);" the message will elaborate further, including relevant bindings.

Another tip is to use "undefined" as a placeholder.

Very useful stuff.

## Debugging Placeholders 

Use `error` acts as placeholder:

```haskell
fooBar :: Int -> Int
fooBar x = error "fooBar: not implemented!"
```

And the same with `undefined` if you're not ready to fill in a space:

```haskell
barFoo :: Char -> String
barFoo x = undefined 
```