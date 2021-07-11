

## Map on array

“Map, filter, reduce. Repeat.” - did you hear it before?


These three are the core of data transformation in functional programming. 
So they should be safe to use in pure functions.

As it turns out, in JavaScript nothing is set in stone. Or should I say in *prototype*?

```
doubleD([1]) // -> [2] 

Array.prototype.map = function() {
  return [3]
} 

doubleD([1]) // -> [3]
```

Wait. That is surely not allowed. This is wrong.

It might be wrong, it might be stupid. 
The truth is, I just called the function *doubleD* twice with the same argument and received different values. 
*No matter what happened in between.*

All we do is reassigning variables between the function calls. 
As we did before.

Therefore, *doubleD* is not pure.

## Multiplication is pure

However dynamic, in JavaScript one cannot override 
built-in operators like in [some languages](<https://stackoverflow.com/a/9745356/1517783>).

Also, *n* is a local variable living only in that function's scope. No way to change it from outside.

Or is it?

No, it really is not possible. You must think low of JavaScript if you got your hopes up 😄

But I gave myself away when I wrote that none of the four functions is pure. 
There's another trick up my sleeve.


While I cannot change the operation nor the argument after it's passed, 
I have a freedom of choosing what to pass.
Numbers, strings, booleans, objects…

Objects? What use can they have? A number multiplied by an object is, eh, is… like in '2 * {}', is… *NaN*. 

(Go check it out in the console.) (As I did.)

That doesn't help, though. 
If only there was a way to make the runtime convert the object to a number when multiplied.

## toString for numbers

If an object appears in a string context, like concatenation with a string, 
the engine will run *toString* function of the object and use the result. 


If it's not implemented, it will fallback to known *'[object Object]'* produced by *Object.prototype.toString* method.

While less used, JavaScript also calls *valueOf* method of an object 
hen it expects a number (or a boolean, or a function). 


What's left is to make this function return different value each time it is invoked.

```
var o = {
  valueOf: Math.random
} 
doubleA(o) // -> 1.7709942335937932 
doubleA(o) // -> 1.2600863386367704
```

[Run this in JS Bin.](<http://jsbin.com/lojupas/edit?js,console>)


Uff, yes. The function was called twice with the exactly same (by any comparing mean) argument, 
the second time it returned a different value than the first time. 

It is not pure.



*Note: The previous version of this article used @@toPrimitive or, more verbose,* Symbol.toPrimitive.
*As [Alexandre Morgaut](<https://medium.com/@amorgaut>) pointed out,* valueOf *is sufficient and supported since the first version of JavaScript. If you don't know @@toPrimitive, you still might want to [check it out](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive>).*




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
