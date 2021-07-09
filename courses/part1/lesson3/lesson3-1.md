# Pure functions and JavaScript

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder/images/article3-folder/1ngrcIKRhCQUL9TbCW9IB2A.jpeg)


Today I have an interesting question to discuss: how to decide if function is pure in JavaScript. 
The whole concept of pureness seems to be blurry in such a dynamic language. 
The following examples show we might need to redefine the term ‘pure function’, or — at least–be very careful when we decide on it.

## What is a pure function

If you are new to this term, let's explore it a little bit. 


Wikipedia defines a pure function like this:

1) The function always evaluates to the same result value given the same argument value(s). 
   It cannot depend on any hidden state or value, and it cannot depend on any I/O.

2) Evaluation of the result does not cause any semantically observable side effect or output, 
   such as mutation of mutable objects or output to I/O devices.

---

Alvin Alexander in his book, "Becoming Functional" defining it as: 

1) A pure function depends only on (a) its declared input parameters and (b) its algorithm to produce its result. 
   A pure function has no “back doors,” which means:
- Its result can’t depend on reading any hidden value outside of the function scope, such as another field in the same class or global variables.
- It cannot modify any hidden fields outside of the function scope, such as other mutable fields in the same class or global variables.
- It cannot depend on any external I/O. It can’t rely on input from files, databases, web services, UIs, etc; it can’t produce output, such as writing to a file, database, or web service, writing to a screen, etc.
  
2) A pure function does not modify its input parameters.

---

To sum up, a function is called pure if it satisfies the two conditions:

> 1) The function returns exactly the same result every time it’s called with the same set of arguments.
> 2) Evaluation of the function does not modify some state outside its 
> scope nor has an observable interaction with the outside world besides returning a value. (No side effects.)

Sometimes, a third condition is added: ‘Relies on no external mutable state.’ 
This, in fact, is redundant as such dependency on mutable variable would inevitably 
lead to breaking the first condition, too.

## Which of these is pure

Here I wrote four example functions. 
Before proceeding, please review them and decide, on your own, which is pure and which is impure.


```
// A: Simple multiplication
function doubleA(n) {
  return n * 2
}

// B: With a variable
var two = 2
function doubleB(n) {
  return n * two
}

// C: With a helper function
function getTwo() {
  return 2
}
function doubleC(n) {
  return n * getTwo()
}

// D: Mapping an array
function doubleD(arr) {
  return arr.map(n => n * 2)
}
```

Done? Great, let's compare.

When I asked around, the vast majority answered that function *doubleB* is the only impure, 
functions *doubleA, doubleC,* and *doubleD* are pure.

So let's go through the conditions. The latter one is oblivious; there are no side effects.

The first one, is more interesting. When called with the same arguments all of them 
return the same value (using [toEqual](<https://facebook.github.io/jest/docs/expect.html#toequalvalue>) to support arrays):

```
expect( doubleA(1) ).toEqual( doubleA(1) )
expect( doubleB(1) ).toEqual( doubleB(1) )
expect( doubleC(1) ).toEqual( doubleC(1) )
expect( doubleD([1]) ).toEqual( doubleD([1]) )
```

Right? Right?

Weeeell, written like this yes. However, what about this piece of code? 

```
doubleB(1) // -> 2
two = 3
doubleB(1) // -> 3

```

This is valid. I ran the function twice with the same argument and received different value. That makes it impure. No matter what happened in between.

That made me think. If this is the proof, what about the others? Will they hold if I try hard enough? As you guess, no, they don't. In fact, I now say:

> None of the four functions is pure.

## Functions are first-class

In JavaScript functions are first-class, meaning they are a value of a variable, that can be passed, returned, and–yes–reassigned. If I can change the variable *two*, I can do the following:

```
doubleC(1) // -> 2 getTwo = function() { return 3 } doubleC(1) // -> 3
```

It is important to emphasise that this does not differ to what was done above. 
Just instead of holding a number, the variable holds a function.

