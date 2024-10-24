---
sidebar_position: 99
draft: true
---

:::danger
Generated by AI
:::

# Comparing `$` to `.`

In Haskell, both the `$` operator and the `.` (function composition) operator are used to simplify function application, but they behave differently and play different roles in code structure. Let's explain the difference between them and why you can't eta-reduce when using `$` in this context.

### `$` (Function Application Operator)

- **Type**: `($) :: (a -> b) -> a -> b`
- `$` is used to **apply** a function to an argument, but with lower precedence than normal function application. It's mostly used to avoid parentheses in expressions.

For example:

```haskell
f $ g x  -- is equivalent to f (g x)
```

This makes `$` a convenient way to reduce parentheses when applying a function to the result of another function.

In your original code:

```haskell
displayHelp t = void $ Cmd.parse (T.unpack $ T.intercalate "\n" t)
```

Here, `$` is applying `void` to the result of `Cmd.parse (T.unpack (T.intercalate "\n" t))`. It's a way to avoid having to write:

```haskell
displayHelp t = void (Cmd.parse (T.unpack (T.intercalate "\n" t)))
```

### `.` (Function Composition Operator)

- **Type**: `(.) :: (b -> c) -> (a -> b) -> a -> c`
- `.` is used to **compose** two functions, meaning it creates a new function that represents the composition of two functions.

For example:

```haskell
(f . g) x  -- is equivalent to f (g x)
```

This is useful for chaining functions together without needing explicit arguments.

### The Key Difference in This Context

- **`$` is about function application**. It says: "Apply the function on the left to the expression on the right."
- **`.` is about function composition**. It says: "Create a new function by composing the function on the left with the function on the right."

### Why You Can't Eta-Reduce with `$`

In your original code with `$`:

```haskell
displayHelp t = void $ Cmd.parse (T.unpack $ T.intercalate "\n" t)
```

- The `$` is an operator that applies `void` to the result of `Cmd.parse ...`, but the argument `t` is already being passed down through the expression.
- You can't eta-reduce because `$` is not composing functions; it's applying them. The argument `t` is part of that application and can't be removed.

### Why You Can Eta-Reduce with `.`

In the eta-reduced version with `.`:

```haskell
displayHelp = void . Cmd.parse . T.unpack . T.intercalate "\n"
```

- Here, you're **composing** functions. The functions `T.intercalate "\n"`, `T.unpack`, `Cmd.parse`, and `void` are composed together to form a new function that takes an argument `t`.
- Since the argument `t` is only passed along through these composed functions, you can eta-reduce it. The composed function itself will take `t` when applied.

### Summary:

- **`$`** is used for **applying** functions, and the argument (`t` in your case) is explicitly applied at the end of the function. Thus, it cannot be eta-reduced.
- **`.`** is used for **composing** functions, and because function composition builds a new function that takes an argument, you can eta-reduce it, effectively removing the explicit argument and making the function more concise.
