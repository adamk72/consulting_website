# Encountered Errors

_Put here only if there wasn't an immediate and evident solution after a quick search._

### _Could not load module ‘Data.ByteString.Lazy’_

**Problem(s)**

From trying the [Chris Allen 2014 Tutorial](https://howistart.org/posts/haskell/1/), with regards to the imports.

First, I had to update the `.cabal` file; this was in the tutorial, but didn't solve the red wiggles in VS Code. A variety of other settings changes didn't do anything. It wasn't until I deleted the `.stack-work` folder re-ran `stack build` that the wiggly lines finally resolved.

Had a similar problem with [Stackbuilders](https://www.stackbuilders.com/blog/getting-started-with-haskell-projects-using-scotty/) Scotty project with `import Text.Blaze.Html.Renderer.Text`, but harder to resolve. I thought adding:

```haskell
{-# LANGUAGE OverloadedStrings #-}
```

would do the trick (I missed it originally) since that seems to deal with the `Text` package, but that didn't do anything.

Update: sometimes the Haskell Language Server gets confused and so the squiggly lines don't automatically clear up. An `hie.yaml` file will help: [https://haskell-language-server.readthedocs.io/en/stable/configuration.html](https://haskell-language-server.readthedocs.io/en/stable/configuration.html)

**Solution**

What finally fixed it was restarting the extension host.

### Hidden packages

If there is a warning about a hidden package, add that package to the build-depends section of the respective .cabal file.

### _Could not find module ‘Data.Csv’_

From trying the [Chris Allen 2014 Tutorial](https://howistart.org/posts/haskell/1/), with regards to the trying things in `stack ghci`

Just `:quit` and relaunch with `stack ghci`. It looks like it hotloads, but apparently not well enough, or I'm using the wrong commands.

### _Not in scope: data constructor ‘Optional’_

Probably means you're calling on the type constructor, not the data constructor:

```haskell
data Optional a = Full a | Empty
mapOptional :: (a -> b) -> Optional a -> Optional b
mapOptional _ Empty = Empty
-- generates error
mapOptional f (Optional a) = Optional(f a)
-- s/b
mapOptional f (Full a) = Full(f a)
```

### Installation Woes

Tried following [https://peerdh.com/blogs/programming-insights/building-a-haskell-based-web-application](https://peerdh.com/blogs/programming-insights/building-a-haskell-based-web-application) but right off the bat encountered a problem with `cabal` while installing [yesod](https://www.yesodweb.com/page/quickstart). The yesod quick start indicated using `stack` instead which seemed to do the trick (and took a while).

Had to add the `~/.local/bin` file to .zshrc.

Then gave up on that and started from scratch with [_FPComplete_](https://tech.fpcomplete.com/haskell/get-started/osx/) which is nice process, except the page needs to updated because this script is wrong:

```haskell
#!/usr/bin/env stack
-- stack --resolver lts-13.7 script

main :: IO ()
main = putStrLn "Hello World"
```

I worked when I replaced `lts-13.7` with `lts-22.28`, which I'm not even sure is the latest, since I got it from some other site as I was trying to figure things out. _[ed: latest is [22.35](https://www.stackage.org/lts-22.35) or `stack ls snapshots --lts remote`]_

