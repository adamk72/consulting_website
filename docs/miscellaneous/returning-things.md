# "Returning" Things

Haskell functions always return _something_ even if that something is a _nothing_. <Lozenge t="maxim"/> 

From a procedural point of view, Haskell "returns" something in three ways:

1. The result of function expression; the last thing expressed is what is returned for consumption or further evaluation. <Lozenge t="tbd"/>
2. The result of a `return` or `pure` from a Monad. <Lozenge t="tbd"/>
3. Returning a response to the outside world, often as a unit type: `()`. <Lozenge t="tbd"/>
