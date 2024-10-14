# Extra Considerations
_or, things I find helpful when I remember them._

## Foldr and Foldl

- `foldr` is the constructor replacement function. Uses the [incremental pattern](https://www.youtube.com/watch?v=J_4BKCDeukA&list=PLD8gywOEY4HauPWPfH0pJPIYUWqi0Gg10&index=23). <Lozenge t="lemma"/>
- `foldl` is the for loop. Can be implemented in terms of `foldr`. Uses the [accumulator pattern](https://www.youtube.com/watch?v=wJgRsvtarmE&list=PLD8gywOEY4HauPWPfH0pJPIYUWqi0Gg10&index=24).

## Sections

<Lozenge t="note"/> Sections are the partial application of an operator.

```haskell
map (+1) [1..5]
--    |
--    +--- adding one of the two parameters to the operator leaves it open.
--         This is the same as (\x -> x + 1)
--         Could also be (1+) since (\x -> 1 + x) is the same as (\x -> x + 1)
--         by commutativity.
--λ [2,3,4,5,6]
```

<Lozenge t="warn"/> Keep in mind the commutativity of the operator! (e.g., `(2^)` and `(^2)` are not the same.)

```haskell
-- A non-commutative example.
(2^) -- left section => (^) 2 => \x -> 2 ^ x
(^2) -- right section) => flip (^) 2 => \x -> x ^ 2

λ> (^2) <$> [3,5]
[9,25]

λ> (2^) <$> [3,5]
[8,32]
```



### Fixity and Precedence

Passing an argument to a function has higher precedence than passing to an operator.

Infix operators have a "fixity" which determines how they favor precedence. `<>` has right fixity so something like `"My name is" <> name <> "."` is seen by the compiler as `"My name is" <> (name <> ".")`.


