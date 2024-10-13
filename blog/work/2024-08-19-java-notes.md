---
title: Line by Line Java 
authors: akecskes
tags: [java, coding]
---
I'm writing the code out of [Crafting Interpreters](https://craftinginterpreters.com/) and since it's been such a long time since I wrote Java, I'm creating this living document to help me remember some of the more specific details and quirks of the language. Depending on when you read this, it may be less complete than I'd like, but I post it here in any case to help those who might run across it.

_Last updated: Aug 22, 2024_

<!-- truncate -->

## Remembering the Cons
I'm reminded that:
- You have to nest packages deep in folders like "com/mylastname/myfirstname".
- The whole `private final` shebang is annoying to keep typing out.

## Line by Line Java
```java
public class Lox { /* [...] */ }
//⬆️ class can be accessed by other classes
//     ⬆️ class object container
```

```java
final TokenType type;
//⬆️ final => constant value; initialized in constructor, a method with the same name as the class
```

```java
class Token {
//⬆️  having neither 'private' or `public` indicates the class can only be accessed inside of the package.
  final TokenType type;
  //i             ⬆️ a class attribute, defined during construction with the "this" keyword
   Token(TokenType type) {
   //⬆️ constructor, called like a method with "new": new Token(EOF);
    this.type = type;
   //⬆️ need to use 'this' to reference the instantiated object's class attributes.
  }
}
```
_Some [rules][1] on nesting classes_

```java
new Token(EOF, "", null, line)
//⬆️ "new" makes a call the a class' constructor, in this case for the class named "Token"
```


```java
  static boolean hadError = false;
//⬆️ variable exists as part of class, not as part of instantiation
//        ⬆️  <type> <name> = <value>;
```

```java
  public static void main(String[] args) throws IOException { 
//⬆️ method can be accessed by other classes
//              ⬆️ doesn't return anything
//                    ⬆️ "main" is what is called if the class is called directly
//                        ⬆️ parameter list
//                                       ⬆️ return value; in this case an exception
```

```java
for (;;) { /* [...] */ } 
//  ⬆️ how while loops are done
``` 

```java
    return type + " " + lexeme + " " + literal;
    //          ⬆️ concat with + 
```

```java
case ' ':
case '\r':
case '\t':
break;
// Cases fall through until they hit `break`.
```

```java
import static com.craftinginterpreters.lox.TokenType.*;
//     ⬆️ allows direct access to the imported members of the class (so you don't have to type the package name)
//                                          ⬆️ class name
//                                                   ⬆️ pull in all accessible members.
//                                                      Will throw an error if there is ambiguity between classes.
```

```java
abstract class Expr {
  interface Visitor<R> {
    R visitBinaryExpr(Binary expr);
  }
}

class Interpreter implements Expr.Visitor<Object> { /* [...] */ }
//                ⬆️ indicates a there is an interface to be used (a list of methods, effectively)
//                   This can be a comma separated list to indicate multiple interface implementations.
//                          ⬆️ abstract class name
//                                ⬆️ interface name 
//                                        ⬆️ generic 

```

```java
@Override
  public Object visitLiteralExpr(Expr.Literal expr) {
    return expr.value;
  }
```

```java
  private static final Map<String, TokenType> keywords;
  static { keywords = new HashMap<>(); keywords.put("and", AND); /* [...] */ }
//      ⬆️ You can initialize a list of semicolon separated items in between a pair of braces
```

# Libraries
```java
import java.io.InputStreamReader;
    InputStreamReader input = new InputStreamReader(System.in);
    // ⬆️ pull in IO from command line 
import java.io.BufferedReader;
    BufferedReader reader = new BufferedReader(input);
    String line = reader.readLine();
    // ⬆️ read the IO 
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
```

## Java Parts

### Misc

It appears if you explicitly add an import for a class in a file that is in the same package, that will dominate any calls in the body of the class with the import. I had this problem when there was an inner "static class Return (val1, val2)" that was imported explicitly, but with a new "class Return (val1)" (only one argument and in a separate file), Intellisense was stuck on trying to call (and fail to match) the static version of the class.

### Classes

Classes are made up of members which are variables and methods, qualified by the private/final/static keywords to determine visibility. A constructor of the same name as the class is used to instantiate to a specific instance using the "new" function.

#### Constructors

There can be multiple constructors, each with a different call signature. If a constructor has a parameter list, any parameters that have the same name as a class variable need to be prepended with the "this" keyword.

```java
public class MyClass {
    private int number = 0;
    private String string = "hey"
    public MyClass() {
    }

    public MyClass(int theNumber, String string) {
        number = theNumber;
        this.string = string;
    }
}
```
_More on constructors [here](https://jenkov.com/tutorials/java/constructors.html)._

[1]: https://docs.oracle.com/javase/tutorial/java/javaOO/nested.html
