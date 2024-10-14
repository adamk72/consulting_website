# Where and Let

<Lozenge t="todo"/>

Where clauses allow you to define sub-function (of sorts);

```haskell
heron a b c = sqrt (s * (s - a) * (s - b) * (s - c))
    where -- important to note that it's indented
    s = (a + b + c) / 2
```

_though this [Wikibooks page](https://en.wikibooks.org/wiki/Haskell/Indentation) gives a way better explanation._

The `let` binding allows for local declarations:

```haskell
roots a b c =
    let sdisc = sqrt (b * b - 4 * a * c)
    in  ((-b + sdisc) / (2 * a),
         (-b - sdisc) / (2 * a))
```

_`let/in` has a lot more to it than this, as one might expect._

Comparing `where` and `let`:

```haskell
f = x+y where x=1; y=1 -- where is _not_ an expression and stays at the top level.

f = let x = 1; y = 2 in (x+y) -- let is an expression
```
