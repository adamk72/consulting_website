---
sidebar_position: 1
---
# Pointfree Programming

_Or, how to to understand function composition with examples from [haskell.org](https://wiki.haskell.org/Pointfree)._

```haskell
sum' xs = foldr (+) 0 xs -- normal
-- vs
sum = foldr (+) 0        -- pointfree; more compact, more idiomatic
```

<Lozenge t="warn"/> The dropping of variables like this can throw you off! In the second example, it almost looks like `foldr` is missing its final argument.

Let's elaborate, because this burns my brain once the (`.`) gets involved for functional programming.

Mathematically speaking, we're just "canceling" `xs` from both sides of the equation. This is simple enough to understand and the key is remembering that the `sum` function still takes a parameter; the need for one didn't go away. You still have to provide it something to work on, since it's still a function:

```haskell
λ> sum [5, 6]
11
```

A slightly more complex example from [haskell.org](https://wiki.haskell.org/Pointfree):

```haskell
-- setup for to versions of `mem`; one point-wise, the other point-free 
mem, mem' :: Eq a => a -> [a] -> Bool
-- helper function
any :: Foldable t => (a -> Bool) -> t a -> Bool -- `any` checks for existence in an array or the like.

mem x lst = any (== x) lst
mem'      = any . (==)

λ> mem' 4 [3, 5]
False
```

So here, you still need an `x` and a `lst`, right? So what order does it get passed into? How does `x` get pulled into the context of `(==)`? Let's expand `mem'` and notice something:

```haskell
-- This doesn't work:
any . (==) 4 [4, 5] -- (==) doesn't take two arguments
-- but this does:
(any . (==)) 4 [4, 5]
```

Think of `(any . (==))` as `\x -> any (== x)` which takes one argument (recall our 'sum' conversation above). This "new" anonymous function (look at the `any` type again) then takes the array (which is Foldable, to be more explicit). To break it down again:

```haskell
(any . (==)) 4 [4, 5]
(\x -> any (== x)) 4 [4, 5]
any (== 4) [4, 5]
--λ True
```

The point (pun intended) of all this is that you have to keep two things in mind:

1. Pointfree programming is essentially reducing (η-reduction) the number of parameters _seen_ but those parameters are still _needed_. They just become implicit based on context.
2. The function composition operator, (`.`) anonymizes the functions to: `(.) f g = \a -> f (g a)`, as we saw with the `mem'` example. This implies that parameter order and type are important to keep track of.

:::warning
Pointfree isn't the end-all be all; in small chunks it makes for more concise code and is idiomatic, but taken too far, it might lead to difficult to comprehend and possibly challenging to refactor code bases. It's okay to be explicit with variables if it makes things more readable.
:::

An even more elaborate example, where we're trying to sum up total years of experience for a subset of employees:

```haskell
checkForEmployee l n = n `elem` l -- We can't drop the l, because it's in the
                                  -- wrong order in the variables list (l n).

employeeExperienceInfo = [("Alice", 10), ("Bob", 2), ("Charlie", 12)]

employeeTotalExperience l =
  foldr (+) 0 . map snd . filter (l . fst) -- We'll dissect this below.

employeeTotalExperience (checkForEmployee ["Alice", "Charlie"]) employeeExperienceInfo
--λ 22
```

Working from right to left:

1. `employeeExperienceInfo` is going to be the value for the `filter`
2. The `checkForEmployee` bit has to be in parentheses so that it can be passed fully as the `l` argument to `filter`.
3. Using the `(.) f g = \a -> f (g a)` rule we get:
   - `\n -> checkForEmployee l (fst n)`; note `n` stands for `name`, but it's tuple in the list we're going to ultimately be filtering over.
   - `\n -> (fst n) 'elem' l`, where `l` is the subset list of employees.
4. Thus, the `filter` can now act on the `employeeExperienceInfo` list; each tuple that comes in is applied to `fst` and then qualified by `checkForEmployee`, leaving us with a subset list of tuples (just for Alice and Charlie in this example).
5. If we call steps 1-4 simply `f`, we are left with `foldr (+) 0 . map snd . f`.
6. Focusing on `map snd . f` we get `map (\l -> snd f(l))`. `f(l)` is our resulting list, and `snd` is what `map` will apply to that list, so it's simply normal mapping exercise where the second element (years of experience) will be pulled off.
7. The finally result of the years list will then be applied to the `foldr (+) 0` which simply sums everything up. `0` is the accumulator in this case.