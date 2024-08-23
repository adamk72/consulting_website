---
title: Learning About Interpreters and Compilers 
authors: akecskes
tags: [coding, languages, compilers, interpreters]
---

A lot of this comes from either [_Crafting Interpreters_][3] (CI) or [_Writing An Interpreter in Go_][4] (WIG) (which includes the compiler book).

# General Notes and Definitions

A lexical grammar is _regular_ because, in part, it is a non-nested, deterministic grammar. Regular grammars are not flexible enough to write a full programming language (as least as far as we're used to), so we need to use what is called a _context-free grammar_ (CFG).

CFGs have an alphabet of strings and letters [weakly defined] that form valid lexemes that can be used to build expressions. The chart from [CI][1] helps:


| Terminology	                     |	Lexical grammar |	Syntactic grammar |
|----------------------------------|------------------|-------------------|
| The “alphabet” is . . .	→        | Characters       | Tokens            |
| A “string” is . . .	→            | Lexeme or token  |	Expression        |
| It’s implemented by the . . .	→  | Scanner          |	Parser            |

Rules (_productions_) generate (_produce_) strings (_derivations_) from the alphabet. A rule consists of a _head_ that is the name of the rule and a _body_ that describes what the rule can produce, usually a list of _symbols_. Symbols are of two types: _terminal_ and _nonterminal_. Terminal symbols are basically the atomic parts of the syntax; they are final, whereas a nonterminal symbol is the name of a rule, and thus can produce another symbol, so on and so forth until a terminal symbol is hit.

 Context-free grammars are ambiguous in that there are arbitrary choices that can be made. We can see this in the derivations of a nonterminal to a terminal where there may be more than one options that fits the criteria. In a programming language, there would be some externalized logic by which choice is made, but as far as the syntax is concerned, the choice is arbitrary. This is evident in the mathematical expression `5 + 2 * 3`; syntax does not infer any precedence, so we do not necessarily know how to disambiguate the expression without other information outside the grammar.

Using [BNF][2] syntax to describe these concepts, we get:

```
 <symbol> ::= __expression__ | __expression__
 ^^^ is a nonterminal
          ^^^ says to replace the left with the right
              ^^^ is one more terminal and nonterminals 
                             ^^^ is a separator for choices of expressions
```

(there are other, more common forms of BNF, such as EBNF, which are easier to create and read)

## Abstract Syntax Tree

A _parse tree_ would be a data structure that takes in _all_ of the symbols, regardless of utility to the end product, whereas an _abstract syntax tree_ elides (i.e., ignores) the rules that are not necessary in the later phases of evaluation.

## Recursive Descent 

Recursive descent is a top-down parsing technique where you start with the top level symbols and work your way down through the tree. A top level symbol is (possibly) a nonterminal expression that derives other, lower down expressions which in turn lead to terminal expressions at some point. 

We make use of a precedence hierarchy that flows in reverse to the symbols. High level symbols are of lower precedence because they (might) contain expressions of progressively higher precedence. In WIG, the author cites the origin of a 1973 paper on the topic by Vaughan Pratt; as such, it's known as a "Pratt parser." 

In effect, nonterminals are broken down by their respective rules, while terminals indicate that code is called to execute the specific action required for the token, which is consumed.

## Scope, Environment, and Shadowing 

_Scope_ is the change of context (typically within {}) where the variables may have the same name as those of another scope, but which differ in terms of assignment. _Environment_ is the machine implementation of scope. In most modern languages, the goal is to preserve the context of the variables between changes in scope, as needed.

_Shadowing_: When a local variable is occluded by a variable of the same name upon entering a new scope block. Global variables can be created that are not occluded and accessible regardless of scope.

# Building the Interpreter

So far (as this is a work in progress), we've created the _lexer_ first, which breaks down the ASCII character source code into various _tokens_ that have meaning. Generalized, these are things like:

- Literals: numbers, strings, booleans, truth-objects like nil, true, false.
- Operations: unaries like "!" and binaries like "+".
- Groupings: usually something between bracketing syntax: "[]", "()", "{}"
- Expressions: a combination of the above that generates (after a full evaluation, at least), a literal.
- Functions
- Builtin (functions)
- Statements

There are multiple ways to parse code; in the case of WIG, it is forward looking recursion, creating an AST object, partially filling it, then going back to the switch statement and precedence is passed and adjusted on the fly. In CI, it's a backward looking hierarchical recursion; the AST is created, but it assumes that each layer will progress to the a specific next precedence later, that is: quality to comparison; comparison to summation, summation to product, product to literal (or something close to that); it consumes the current token and backs up to see what the previous one needs to have happen.

Overall, the effect is the same; it's just that in one, there is more state machine like ordering where precedence is checked and changed as needed, where in the other, you can see a distinct hierarchy in the code; the precedence is built into the structure of the code directly.

## Monkey and JLox Environments

Environments are a "binding space" which are created so that things like variable assignments and function calls can be named and as needed recalled in different contexts as things shift around on the stack.

In Monkey, the environment ....

In JLox, the environment is created as a member of an Interpreter instance and is LoxCallable, meaning it has an interface that requires at least an `arity()` method. Functions also make use of the environment; each LoxFunction is also LoxCallable and adds a new Environment member on instantiation.

When a JLox function is called, it creates an Environment that takes in the call arguments for later use. This allows for recursion as each function call gets its own Environment _[ed: good encapsulation practice]_. Because the way the project was written, the author decided to make use of a first-pass _resolver_ to go over the AST before sending it to the interpreter in order to fix some holes in the initial closure logic. This is also useful for doing _semantic analysis_, that is, checking that the code is doing what is intended or proscribed, such as not having return statements at the global level.

[1]: https://craftinginterpreters.com/representing-code.html
[2]: https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form
[3]: https://craftinginterpreters.com/
[4]: https://interpreterbook.com/
