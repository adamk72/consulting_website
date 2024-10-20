---
draft: true
title: Useful Functions
---
## For Strings & Text
```haskell
-- Prelude
words :: String -> [String]
unwords :: [String] -> String

-- Data.Text
pack :: String -> Text
unpack :: Text -> String

splitOn :: Text -> Text -> [Text]
intercalate :: Text -> [Text] -> Text

-- Both
Prelude.lines :: String -> [String]
Data.Text.lines :: Text -> [Text]

Prelude.unlines :: [String] -> String
Data.Text.unlines :: [Text] -> Text
```

## For Lists

```haskell
zip :: [a] -> [b] -> [(a, b)]
cycle :: [a] -> [a]           -- repeats the list
```
## For Applicatives
<Lozenge t="adv"/>

```haskell
liftA :: Applicative f => (a -> b) -> f a -> f b              -- same as fmap, but restricted on type

liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c -- like fmap, but apply to two-argument functions

(<**>) :: Applicative f => f a -> f (a -> b) -> f b           -- <explain later>
```
## For Monads
<Lozenge t="adv"/>

```haskell
-- Control.Monad
guard :: GHC.Base.Alternative f => Bool -> f ()             -- takes place of filter within a monadic context.
--                └─────────┴── subclass of Applicative

mapM :: (Foldable t, Monad m) => (a -> m b) -> t a -> m ()  -- map elements to monad action
forM :: (Foldable t, Monad m) => t a -> (a -> m b) -> m ()  -- flip of mapM
-- and same, but drops results
mapM_ :: (Foldable t, Monad m) => (a -> m b) -> t a -> m ()
forM_ :: (Foldable t, Monad m) => t a -> (a -> m b) -> m () -- flip of mapM_

liftM :: Monad m => (a -> b) -> m a -> m b                  -- fmap

sequence :: Monad m => [m a] -> m [a]                       -- <explain later>

(=<<) :: Monad m => (a -> m b) -> m a -> m b                -- >== with reversed arguments (for convenience)

(>=>) :: Monad m => (a -> m b) -> (b -> m c) -> a -> m c    -- "function composition"

```

## For Foldables
<Lozenge t="wip"/>

```haskell
foldr :: (a -> b -> b) -> b -> t a -> b
foldl :: (b -> a -> b) -> b -> t a -> b
foldMap :: Monoid m => (a -> m) -> t a -> m
```
