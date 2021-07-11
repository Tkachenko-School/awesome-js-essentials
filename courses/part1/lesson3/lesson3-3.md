

## What is a pure function, again

I know, I am being scrupulous, evil, and I use some dirty tricks. 
We use pure functions to gain confidence over the code. 

To be sure the code does what it should. Anytime, under any circumstances.


**I want all of the four functions to be pure** if I decide to. Yes, that includes functions like *doubleB*. 
What if that variable (*two* in our case) is not supposed to be changed, it's a mathematical constant e, pi, or [phi](<https://en.wikipedia.org/wiki/Golden_ratio>)? 
That should be pure.


I want to be able to trust built-in functions. What kind of programs can I create if 
I assume anything in *Array.prototype* or *Object.prototype* can change?

Extremely basic ones; nobody would ever want to use them.

As a result of this small, fun exercise I believe **we need a new definition of what we consider a pure function in JavaScript.** 

Unfortunately, I see no way this could be limited only to technical terms.


In some way, it must take into account the intended use of the code. 
A function can be considered pure in one project and impure in another. 
And it is OK. As long as the program works.


As long as the developers have confidence.

*Do you have an idea for the definition? 
How do you decide a function is pure? 
Is there something I missed? Did you learn something?*


## Remarks

There are *some* ways to protect against some of the tricks used above.

Overwriting a free variable like *two* or *getTwo* can be avoided by encapsulating the whole block into a function.
Either using [IIFE](<https://en.wikipedia.org/wiki/Immediately-invoked_function_expression>) or modules:


```
var doubleB = (function () {
  var two = 2  return function (n) {
    return n * two
  }
})()
```

A better approach would be to use [const](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const>) introduced in ES2015:


```
const two = 2
const doubleB = (n) => n * two
```

Preventing abuse of *valueOf* or *@@toPrimitive* is also possible, yet cumbersome. 

For example like this:

```
function doubleA(n) {
  if (typeof n !== 'number') return NaN  return n * 2
}
```

One could get around the trick with changing the *Array.prototype* only by avoiding such functions 
and falling back to *for (for … of)* loops.


That is ugly, impractical, and potentially impossible. 
Abstracting these or using a library has drawbacks on its own.


Don't forget that to make a function truly pure, one would need to combine all of those anti-tricks together. 

Imagine how `doubleD`, now that elegant, would look like, how long it would be, and how it would hurt the readability.
