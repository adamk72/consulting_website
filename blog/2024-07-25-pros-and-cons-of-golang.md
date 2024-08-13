---
title: Pros and Cons of GoLang 
authors: akecskes
tags: [golang, go, coding]
draft: true
---

First, let's start with a "how to" sort of thing... basically so I can reinforce the Go patterns in my head:

# Line by Line Go:

```go
input := "5;" // same as ↦ var input = "5;", but only inside of functions
//    ⬆ `:=` is same as var
```

```go
func New(input string) *Lexer {
//⬆ func keyword
//    ⬆ function name ("New", nothing special, just the example here).
//        ⬆ argument list, comma separated. Type ("string") follows the argument name, rather than leads.
//                     ⬆ explicit return (otherwise inferred). In this case, a pointer to a Lexer struct.
```

```go
type Lexer struct {
	input        string
  // [...]
}

l := &Lexer{input: input}
//  ⬆ Since this an address request on a struct, it allocates memory for it.
//       Recall, Go has a garbage collector. `l` is a `var l *Lexer` in this case.
```

```go
func TestIntegerLiteralExpression(t *testing.T)
//    ⬆ "Test<functionName"> - capitalized
//                                ⬆ argument list; `testing` is a package,
//                                    T is capitalized, meaning public access from package,
//                                    `*` is a pointer to the `T` struct (pass by reference)
//                                    testing package is listed under 'import()'.
```

```go
literal, ok := stmt.Expression.(*ast.IntegerLiteral)
// ⬆ functions can output tuples; in this case, `ok` is a validator boolean to check success/failure
//    Note that there may be underlying process/function that is returning the `ok`, such as a `map`.

name, age := "Mark", 57
//            ⬆ a more explicit example 
```

```go
type IntegerLiteral struct {
	Token token.Token
	Value int64
}

func (il *IntegerLiteral) TokenLiteral() string { return il.Token.Literal }
// ⬆ func keyword like normal, but...
//    ⬆ instead of the function name, a pointer to the struct type; this creates a subtype function.
//                        ⬆ function name, capitalized to indicate public access.
//                                        ⬆ return type
```
_Interesting article on subtyping in Go [here][4]._

```go
lit := &ast.IntegerLiteral{Token: p.curToken}
//⬆ `lit` is `var lit *ast.IntegerLiteral
//     ⬆ `&` reference creates pointer to the struct and allocates memory
//                         ⬆ Anonymous assignment of the field(s) ↦ `field curToken token.Token` 
```

```go
prefixTest := []struct{
		input			string
		operator	string
		integerValue int64
	}{
// ⬆ Double {}{} brace pattern to define and then initialize an anonymous struct
		{"!5;", "!", 5},
		{"-15;", "-", 15},
	}
```
_More on anonymous structs [here][1]._

```go
for _, tt := range prefixTests { /* [...] */ }
//⬆ for to start the loop
// ⬆`_` says index variable is not going to be used; `_` is just a place holder.
//    ⬆ `tt` is variable name for the element through each loop.
//            ⬆ range keyword works on arrays/slices from index 0 to end of array.
//                ⬆ prefixTests is an array of structs in this case.
//                   With two elements, the indexes would be simply 0 and 1, if being used and assigned. 
```

```go
integ, ok := il.(*ast.IntegerLiteral)
//              ⬆ Need the () in order to get the dereference pointer information since it's part of dot operation. 
```

```go
if p, ok := precedences[p.curToken.Type]; ok { return p }
// ⬆ `if` conditions don't need parentheses.
//                                      ⬆ the `;` is like in C-type for-loops; here, this means check on a result.
//                                         In this case, if the `ok` bool is true, execute the block. 
```

```go
switch node := node.(type) { /* [...] */ }
//                  ⬆ this is a type switch; each of cases are explicit types to be matched. 
//                     It's special form of a type assertion.
```

```go
value := right.(*object.Integer).Value
//              ⬆ a type assertion to object
//                               ⬆ which apparently can be further evaluated.
```
_More on type assertion [here][6]_

```go
switch {
	case operator == "==": return nativeBoolToBooleanObject(left == right)
//     ⬆ the case keyword support expression evaluations
```

```go
max := int64(len(arrayObject.Elements) - 1)
//     ⬆ type cast by using <type>(<thing to type cast>) 

```


# Pros
- I like the methods; it reminds me of Rust with how you can extend a struct with functions. Not sure how I feel about the syntax of them yet, but it's a language paradigm I can really get behind.
- I like that that functions return errors or ok types as part of tuple thing (something like destructuring in modern JS).
- So far, the general developer experience has been solid. The install was trivial, VSCode integrations are serviceable, and the module system is far less onerous than JS or Rust(though not without its flaws).
- Enums are just const lists? Works for me. I like the 'iota' concept as far as I've seen it, but wonder if it could be semantically more elegant.


# Cons
- Very petty, but I don't like that's called "Go." I have the same problem with C, C#, F# and other short named languages (at least Ada forms a unique word!). "Go" has to be converted to "GoLang" (or is it "Golang?") in order to do Google searches, so why bother? I think the search algos and AI make this a lot easier/less problematic that it was in the past (I can search for "C" specific things much better than I recall long ago), so this is completely a petty argument and also why it's first on this list. 😄
- There is no ternary operator. Sad. 😞
- Everywhere I look, it seems, when learning about when to use pointers or pass-by-value, people say to to benchmark the performance. I get that you shouldn't blindly believe the complier, but it seems a lot to leave so much doubt in a developer's mind... if they make the "wrong" choice, then what? Refactor? Maybe it's an experience thing, I don't know.
- Not sure I'm a big fan of the logic of using C-like pointers along with garbage collection. What's the point, no pun intended? I get performance issues and all that, but if you're going to go through the act of making a new language, I'd think you'd want to do better than following the same flaws that the original language had (which I'll address later).
- `defer` (and `panic` and `recover`) seem nifty on the surface, but I have flashbacks of `goto` (which to be fair, had been maligned for a long time). It's dangerous if one doesn't know how to use it properly. Things like this are part of the "shoot yourself in the foot" type of programming which modern languages have worked so hard to get rid of.
- It has a notion of 'nil', which just is dumb. See the "trillion dollar mistake."
- Likewise, on the surface, the default for variable seem reasonable. I have no problem with 'false' and the empty string being defaults for booleans and strings respectively, but `0` for numbers seems misdirected. I see that if Go was inspired by C why that would be a logical default, but after years of programming in C/C++, I can't tell you how many times I bumped into the lack of clarity having `0` as a default has been. Is it zero because it was initialized that way, or it it zero because it was changed to that value? Too many young programmers won't think of that and thus won't program defensively for it. Better to have a it be `nil` (which I have my own problems with).
- The pointer discussion [here][2] bothers me because it is one example of a growing list of places where syntactical conveniences are made that could easily be confused when skimming code. The symbology of `*` and `&` help guide reader in what is going on; allowing them be optional for inference reasons adds ambiguity. I'd prefer to assume that everything is pass by reference and can be modified without the use of symbology, but if you want to only send a copy for whatever reason, then you'd have to explicitly mark it in someway so readers know whats going on (or vice versa).
- Apparently you can't break modules up into folders? In the interpreter project, the files sizes were getting very large, so I broke the files up, which was easy enough to do, but now I'm trading monolithic files for poorly arranged modules because I can't use folders. Well, I guess I can, but it means creating new modules, which changes the namespace of the primary module and considering how simple the module system is overall (compared to JS or Rust), it's very disappointing that they didn't go the extra mile. _[ed: it almost feels like this language was put together by C or C++ developers who glanced at other languages, but never used them in production. Of course, I haven't used Go in production, so I might be missing something.]

## Dark Code Patterns
This pattern keeps coming up a lot:
```go
value, err := strconv.ParseInt(p.curToken.Literal, 0, 64)
	if err != nil {
    // [...]
  }
```
While I like the tuple thing (where `ok` or `err` seem to be pretty typical as the second output), I don't like having to keep checking with a conditional like this. It adds two extra lines of code; maybe a specialized ternary would have been better (need to see more code to see if there's a pattern). As noted elsewhere, Go has reasonable defaults like '0', 'false', and '""', but I wonder if those defaults also are the heart of this problem, since you need to check specifically for a `nil` and not a falsy value (so can't use `if !err...`). Maybe? Is this just a limit of procedural programming forever? Again, if you're writing a new language, why wouldn't you sugar this sort of rote syntax? 

I discovered a YouTube video about the pros and cons of Go and the fellow noticed the same thing; the mass amount of "if err !=nill" clauses sprinkled throughout the code.

This structure results in braces at the same level:
```go
		&Builtin{Fn: func(args ...Object) Object {
			// [...]
		},
		},
```

If you try to separate the `&Builtin` expression, you get a syntax error, since the it's an initializing construction: `&<name>{<fields>}`.


# Not sure how I feel about X
- I wonder about helper functions like `make`. It feels tacked on, as if a consequence of having to deal with `nil`. See [this article on make][5] for a comparison with `new`.
- Not sure I like the overall syntax; I chalk this up to simply being more familiar with other languages, but somewhere in my heart, it feels _wrong_, like it wasn't really thought out. I've worked with strange languages before like Elixir or Objective-C and even those seemed to have their own internal logic that I could get understand. I'll have to give this some time.
  - For example, putting the imports into "()" just looks weird to me; I'm used to "[]" denoting lists of things, and even in Go, that's how arrays are defined (with "[]"), so why go with parens? I suppose if you look at the imports as arguments like with a function, they make sense, but then were are the commas, at least? I'd rather have some other indicator, especially if the formatter is going to put them on separate lines anyway.
  - Putting types _after_ the variable is interesting, but not customary; most other languages<sup>[citation needed]</sup> don't do that (do they?). I'm not against this; I just hope there's a reason for it. 
	-The `switch` and `case` keywords are formatted at the same level with no indentation.
- Kinda like the return system for _ifs_ when applied to maps... was awkward to figure out, but think I get it now.
- Don't like (so far) the requirement of having an exported function need a capital letter. I can see _some_ value in it, but until I see how it actually pans out, I reserve judgement. It's like enforcing snake_case, camelCase, PascalCase, ALL_CAPS and the like for various parts of the code to show what something is. On one hand, it does makes sense, as long as it's consistently enforced (and to Go's credit, this requirement is as far as I know). On the other hand, not everyone agrees with that. This is a question of how opinionated you want your language or framework. At the time of this writing, I don't see other similar syntactical requirements and the fact that it seems like one off bothers me because I wonder how much of an afterthought it might have been. Useful, but an afterthought, to me, makes for potential problems in the future. It's not like Go was written in a few days like JS was... I just prefer some thought go into whatever language I'm using. It may be a brilliant idea... but was there an opportunity to expand on that idea to be used consistently in other parts of the language? I like it when I see patterns in a language (helps with hints of what else might be useful!), but one offs, like this feels like, don't appeal to me.
  - Extending on this thought after more coding: it doesn't feel good to access public methods through a `lowercase.Capitalcase` sort of format. The lower case package name is too much of a variable for me; if maybe instead of a '.', there was a `::` or other indicator that I was accessing a package element,then maybe it'd be okay. But I keep seeing a '.' and thinking I'm accessing a field or member of a local variable. Then when (at least in the book) it gets assigned ("renamed" like with `program := &ast.Program{}`) to another variable, it's a bit better, but I'm having trouble with it. Definitely an example of "old habits die hard."
- Oof: [Interface values with nil underlying values][3] . It says: "in Go it is common to write methods that gracefully handle being called with a nil receiver" — Oh, c'mon! All languages with `nil/null` have to gracefully handle it if the coder is being smart about it. Go isn't special in this regard. It's just as bad as JS or Java, C, or C++ for that matter. This should be caught at compile time; if someone tries to use a `nil` interface, don't let it happen in runtime. Maybe there's an polymorphic reason for doing this, I dunno. It just seems like a lame justification to put into a tutorial like that.  


[1]: https://blog.boot.dev/golang/anonymous-structs-golang/
[2]: https://go.dev/tour/methods/6
[3]: https://go.dev/tour/methods/12
[4]: https://journal.stuffwithstuff.com/2023/10/19/does-go-have-subtyping/
[5]: https://www.codingexplorations.com/blog/understanding-the-make-function-in-go
[6]: https://yourbasic.org/golang/type-assertion-switch/