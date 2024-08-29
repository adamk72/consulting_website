---
title: Learning Bytecode 
authors: akecskes
tags: [coding, c]
draft: true
---

The books [_Writing An Interpreter in Go_](https://interpreterbook.com/)[_Writing A Compiler in Go_](https://compilerbook.com/) went over a lot about bytecode info, writing it (obviously in Go). [_Crafting Interpreters_](https://craftinginterpreters.com/) does the same thing in C. This article will be a mix of info between the two.
<!-- truncate -->

## Bytecode in General

Bytecode is an internal representation of the lexed/parse code of a language; it's one way of translating a code language into something that a machine can read; in particular the definition of "machine" is left up in the air, as it could be, and often is, virtual in nature.

The point is to write something that multiple platforms can translate into machine instructions for the bare metal level (or another interpreter; doesn't have to be hardware that the code runs on).

Bytecode is more dense in comparison to an Abstract Syntax Tree but plays a similar role, and is usually much faster in execution.

## Opcodes & Operands

An opcode is an instruction type; it may or may not have an operand that provides more information about what to do or data to work with. The opcode is usually 1 byte and the operands can be 0 or more bytes; the total instruction length is the sum of the opcode and operands.





[1]: https://interpreterbook.com/
[2]: https://compilerbook.com/
[3]: https://craftinginterpreters.com/
