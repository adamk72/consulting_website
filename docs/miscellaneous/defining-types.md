---
sidebar_position: 1
---
# Defining Types

You create _new_ data types with `data` or `newtype`<Lozenge t="todo"/>.

```haskell
data Choice = Rock | Paper | Scissor | Spock | Lizard 
-- where Choice can be be one of the following instances.
data Address = NoAddress | WithAddress String String String Int -- perhaps for  Address, City, State, Zip
-- better for `String String String Int` to replaced by other, properly named types; see below.
```

You can combine as well:

```haskell
data Name = Name FirstName LastName
--    |      |
--    |      +--- data constructor; does not have to be the same as the type, but it does return the type
--    |           thus, :type => Name :: FirstName -> LastName -> Name
--    |                          ^^^ constructor                  ^^^ data type returned
--    +---------- type constructor; can accept a parameterized argument,
--                e.g., `data Box a = Box a`
```

An interesting demonstration of recursive types:
_From [What the Functional](https://whatthefunctional.wordpress.com/2018/03/01/the-type-language/)._

```haskell
data PizzaTopping = Mushroom | BellPepper | Salami | Anchovy | Pepperoni
data Pizza = PizzaBaseAndSauce | WithTopping PizzaTopping Pizza
-- which gives you:
PizzaBaseAndSauce --a valid Pizza
WithTopping Salami PizzaBaseAndSauce -- also valid
WithTopping Mushroom (WithTopping Anchovy PizzaBaseAndSauce) -- still valid
--                    ----------- ------- -----------------
--                     |           |       |
--                     |           |       +------- type of Pizza; needed as the base type for the recursion
--                     |           +--------------- type of PizzaTopping
--                     +--------------------------- type of parameterized Pizza
```

Other examples:

```haskell
-- Enumeration
data Colors = Red | Green | Blue
-- Tree
data BinaryTree a = EmptyNode | TreeNode a (BinaryTree a) (BinaryTree a)
-- TreeMap
data TreeMap k v = TreeMapEmpty | TreeMapNode k v (TreeMap k v) (TreeMap k v)
```

More examples, this time from _[Haskell for Dilettantes](https://www.youtube.com/watch?v=qy0AO0tWFOU)_

```haskell
data = DayOfWeek = Mon | Tues | Wed | Thur | Fri | Sat | Sun
  deriving (Show, Eq)
data = Activity = Work | Play deriving (Show, Eq)

schedule :: DayOfWeek -> Activity -- type annotation

-- Pattern version
schedule = if (day == Mon) then Work else Play
-- or
schedule _ = Play -- for any day
-- or
schedule Sun = Play
schedule Sat = Play
schedule _ = Work -- evaluates in order from top to bottom

-- Guard version
schedule day -- note: no `=` here
  | (day == Sat || day == Sun) = Play -- can't do this in the above pattern
  | otherwise = Work

-- if/then/else version
schedule day = if (day == Sat || day == Sun)
               then Play
               else Work
```

#### Type Classes

<Lozenge t="todo"/>

Type classes are effectively any group of types that behave the same way; they have same operation and types associated.
