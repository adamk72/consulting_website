---
title: How I might write my own language 
authors: akecskes
tags: [coding, languages, compilers, interpreters]
draft: true 
---

As I write the code for an interpreter (from _Writing an Interpreter in Go_), it's got me thinking how I might make my own language. I have lots of opinions on various languages, so what would I do differently?

# What I like in languages
## Not sure where it first came from, but like it:
- Assume immutability first. 
- Pure functions (though maybe a little flex might be nice)
- First class functions
## JavaScript/TypesScript
- Using consts instead of hard-values (most langs). That way you only have to change things in one place and in TypeScript, it can check for misspellings and the like.
## Rust
- Extensible structs with methods. Same as in Go.

# What I don't like in languages
- Garbage collectors — this is solely because I like having a lot more control, but that leads to the next thing:
- _Not_ having a garbage collector. Memory management is a pain in the ass. The complier should be smarter about it that; I like how Rust manages it, but sometimes, it's overly complicated.
- `if` and `switch` statements... at least deeply nested or long versions of it. See _How I code_

# How I code
As a procedural programmer by education, I get why it's so popular, but over the years, I've learned to love declarative and functional type languages. A few things I do that I think run counter to traditional programming:

## Ifs and Switches
Any time I see a nested `if`, I wonder if there's a way I can turn it into a key:value pair object (or an array).

I find the code more manageable and easier to upgrade. It separates the logic from the state choices. This is only doable in a meaningful way in a language that has first-order functions, otherwise you can't separate things into the key:value pairs. Similar with `switch`. 

One reason I find this more useful is that I'm trying to limit the amount of repeated code; for instance in the _Writing an Interpreter in Go_ project, there are long lists of the same code:
```go
  //[...]
	case '{':
		tok = newToken(token.LBRACE, l.ch)
	case '}':
		tok = newToken(token.RBRACE, l.ch)
  //[...]
```
where all this changing is the `token` element. Why repeat all of that? Just give the language a list key:values (`['{':"LBRACE"]` for example) to build the switch. The compiler can figure out how to optimize it. 


# Returns

[This](https://craftinginterpreters.com/functions.html#return-statements) (from CI) talks about how returns often work; in the case of JLox, functions return 'nil' if there is no return.

But I like the idea of a monad return that says something like "no return" and which there is syntactical sugar allowing you to essentially ignore it if you want. This assumes this new language allows for side effects, because otherwise why would you call a function that didn't return at least something? Maybe that's how you know it's side-effect function... otherwise you'd be checking for a value. 

# Random Ideas
- _Go_ puts it's type after the variable, where others do it in front; would it make since to change what a type means depending on whether it's put before or after its variable, the way adjectives function in Spanish?
- I like how a lot of the "i18n" libraries separate text from the code. There's gotta be away to systemize this.


## Redundancy 
Funny how many times I've met people who, for instance, prefer using `let` over `const` in JS because it's two less letters, but won't bat an eye at the massive amount of redundant code that show up when writing up enums and structs. This has become obvious in my current work with Go, where I'm doing things like this:
```go

// Set up the const list:
const (
	OpConstant Opcode = iota
	OpAdd
	OpPop
	OpSub
	OpMul
)

// Replicate the exact words, including case-type, twice more. Plus, repeat the same essential structure over and over again.
var definitions = map[Opcode]*Definition{
	OpConstant:      {"OpConstant", []int{2}},
	OpAdd:           {"OpAdd", []int{}},
	OpPop:           {"OpPop", []int{}},
	OpSub:           {"OpSub", []int{}},
	OpMul:           {"OpMul", []int{}},
}
```
It's especially weird when we've been living a world where pattern matching tools like RegEx have been around for ages. Ideally, this should happen all at once, where one feeds into the other/. The `definitions` have an obvious pattern, with a couple of exceptions. It should be easy to derive all of that code in a more succinct manner.