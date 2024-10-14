# Lambdas

Anonymous functions, lambdas, take the form of:

```haskell
(\x -> x + 1)
(\x y -> x + y)
```
_Note the skinny RH arrow `->`._

You can think of general functions of the form `buildRobot arms legs torso = (arms, legs, torso)` as a series of lambda functions.

<Lozenge t="tip"/> This is useful to recall when building functions that take functions as a parameter.

```haskell
buildRobotLambda = (\arms ->
                      \legs ->
                        \torso -> (arms, legs, torso))
-- which implies:
(((buildRobot "strong arms") "skinny legs") "long torso")
-- and
buildRobotLambda "strong arms" "skinny legs" "long torso"
```