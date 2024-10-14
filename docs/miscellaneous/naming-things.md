---
sidebar_position: 7
---
# Naming Things

Generally speaking, name variables and parameters however you see fit, leaning towards the normal convention that descriptive variables are generally better for readability. The counter argument is that overly-specific names constrain the possible range of uses of a function, so generic, usually single letter, names are often used.

See the list:

## Parameter and variable conventions

Some basics. If you want full details on naming conventions, check out [Kowainik](https://kowainik.github.io/posts/naming-conventions).

| Symbol    | Use |
| -------- | ------- |
| a, b, c... | normal placeholders for arbitrary types    |
| [a] | a list containing objects of type `a`; note: `b` = `[a]` implies `b` is also list that contains objects of type `a` |
| e | error types |
| f | for Functors or Applicatives     |
| f, g, h... | for function variables; which `f` is depends on context |
| i, j, k, n... | for counters |
| k | for Kinds |
| l | list variables |
| m    | for Monads, Semigroups, Monoids   |
| p, q | predicate, something that returns a or is of type Bool |
| t | for Foldables or Traversables |
| (x:xs), (y:ys) | for list patterns, where `x` is the head of the list and `xs` is the tail |

Note on list patterns, often the head/tail variables will match the type of the list. That is, if the list is of type `[b]`, then you'll see that the pattern match is `(b:bs)`. 

