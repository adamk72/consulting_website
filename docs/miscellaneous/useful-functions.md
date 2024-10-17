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

### For Monads
<Lozenge t="adv"/>
```haskell
-- Control.Monad
guard :: GHC.Base.Alternative f => Bool -> f () -- takes place of filter within a monadic context.
--                └─────────┴── subclass of Applicative
```