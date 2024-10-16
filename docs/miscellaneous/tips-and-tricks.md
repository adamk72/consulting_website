# Patterns, Memes, and Maxims

<head>
  <meta name="description" content="Tips and tricks around Haskell, including things like holes and hole-driven development and the difference between putStrLn, show, and print."/>
  <meta charSet="utf-8" />
</head>

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

## Show, PutStrLn, Print 

- `show` is of class `Show` and usually is implemented to display a quoted string representation of arbitrary data (not always human-readable). 
- `putStrLn` is the direct display of a type `String` to `IO`.
- `print` is the `IO` implementation of `show`.
- `print = putStrLn . show`

```haskell
λ> :t print
print :: Show a => a -> IO ()   -- converts Show implementations to IO

λ> :t putStrLn
putStrLn :: String -> IO ()     -- converts type String to IO

λ> :t show
show :: Show a => a -> String   -- converts type `a` to String
```

Demonstration:

```haskell
-- `show` is the underlying expression of data, as a quoted string.
λ> show [1,2]         -- List implements the Show class
"[1,2]"               -- notice the quotes

λ> show "string"
"\"string\""

-- `putStrLn` only works on `String` types and displays
-- the information without quotes.
λ> putStrLn [1,2]
--λ Errors out!       -- because [1,2] isn't a String type

λ> putStrLn "string"
string

-- `print` is more literal and human-readable.
λ> print [1,2]
[1,2]                 -- no quotes

λ> print "string"
"string"
```
