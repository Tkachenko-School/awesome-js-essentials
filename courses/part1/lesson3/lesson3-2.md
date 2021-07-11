
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
