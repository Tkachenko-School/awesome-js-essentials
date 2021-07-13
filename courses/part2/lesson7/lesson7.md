# Seeing Javascript Objects as Functions Changed How I Code

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article7-folder/brainblowingup.png?raw=true) 

So you probably know that functions are objects in javascript (if not go up the prototype chain of a function to find out). 

But recently, I noticed that javascript objects can be treated like functions. 
Which leads to some pretty cool implications!

## Functions

According to wikipedia:

> [A **function** is originally the idealization of how a varying quantity depends on another quantity. For example, the position of a planet is a function of the time.](<https://en.wikipedia.org/wiki/Function_%28mathematics%29#Definition>)

Given an input (time) you can determine an output (position of the planet). 

Let’s look at a simple function:

```
const square = (x) => x ** 2;
```

Here we have a function that given some inputs will produce some outputs:

```
square(1); //=> 1
square(2); //=> 4 
square(3); //=> 9
```

This pairing of inputs and outputs are called a function’s domain and co-domain, respectively.

We could draw them out like this:

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-3i232o5.png?raw=true)

That may already look like a key value pair to you, which is what a javascript object is. 

In fact we could just as well define an object that will have the same behavior.

```
const square = {1: 1, 2: 4, 3: 9};

square[1]; //=> 1
square[2]; //=> 4
square[3]; //=> 9
```

The only visible difference is we replaced the `()` with `[]`.

Of course that’s not the only difference. 
The function implementation can produce the squared value for any number input, 
while the object implementation will produce `undefined` for anything except `1`, `2`, and `3`.

Still, we can see the square object as function, but with a different codomain from the `square()` function:

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-v7aa32y9.png?raw=true) 

According to wikipedia’s mathematical definition, it is perfectly fine for a function to produce the same output given different input, but the reverse is not true. 

That is, a function cannot take in the same input and produce different outputs. 

When we speak of pure function in functional programming this is what we mean.

Of course nothing here is new or revelational to anyone who stayed awake in grade school math class,
 but for me programming in the wild is how I discover the genius of simple math truths 
 I was too bored to care about as a kid. 
 
We should really re-think how we teach math in schools, but I digress...

Anyway, if the line between object and function is so blurry, which one should we use?








## Choosing between an Object and a Function

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-bndc32lc.png?raw=true)

Functions can be thought of as a succinct way of defining a Dictionary. 

If it’s possible to establish governing logic to get the right outputs for given inputs, then it’s better to go with a function.

Imagine maintaining an object with every number as a key and the square of every number as a value.

That would be a lot of lines of code! Whereas with a function it would simply be one line:`const square = (x) => x ** 2.`

## But when should we use an object?

* Well, first obviously if there is no governing formula to get the value from a key, you have no choice, but to go with an object.
  
   For example if we have
   `const person = {name: "Ada Lovelace", profession: 'Old School Engineer'} ,` we can’t derive the name, and profession values from the keys with any common logic.

* Performance. If the computation in a function is highly complex the time spent running it might overtake just storing the result of that function in an object. Take fibonacci for example. 
  
In [this comparison](<https://jsperf.com/learning-javascript-objects-are-functions-code-sample/1>) we can see running a recursive fibonacci function with the input as 8 is much slower than getting it from a predefined object. (Yes, we could have used a loop, but that’s besides the point…)
  

In fact we could get the best of both worlds by building an object within our function that stores the input as the key and output as the value; so that the second time the function is run instead of doing the computation, it can simply get the value from the object.

*This technique is called memoization and works with pure functions. [Checkout this article for an example.](<https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e>)*

But we still haven’t gotten to the cool part yet!

## Map on an Object

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-svl432v3.png)

Have you ever wanted to call map on an object; just as you can on an array (e.g. `[1, 2].map(n => n + 1)`)? 

How would that map be defined?

Before we get to that we need to understand what makes something mappable.

 In native Javascript only lists support it, but in Haskell any data type that is a *functor will* support the map functionality.

What is a functor? 

Often a functor is described as a box that contains a value. 

For example, `[1, 2]` contains number values that we can operate on through the map function.

In Haskell the type signature would look like this: 

```map :: (a -> b) -> [a] -> [b]
map :: (a -> b) -> [a] -> [b]
```

For those who aren’t familiar with Haskell type signatures, this roughly says that map will take as arguments:

* `(a -> b):` a function that takes an input `a` and produces `b`
* `[a]` : a list of `a` ‘s

and returns `[b]`: a list of `b` 's.

## Kinda fits for Javascript, na?

If we want the Javascript object to be a functor, 
we have to first decide what value we will be operating on in the structure. 

Let’s assume the values we want to map over are, well, the values of the object.

For example, let’s say we have an object representing Jay Z’s age:

```
const jayZDetails = { 
age: 48,
demeanorAge: 78 
}
```

We wanted to map over with the function `stringifyNumber()`like so:
```
mapObj(stringifyNumber, jayZDetails) 
//=> { age: 'forty eight', demeanorAge: 'seventy eight' }
```

We could define `mapObj` like so:
```
function mapObj(fn, obj) {
  var keys = Object.keys(obj)
  var newObj = {}

  for(var i = 0; i < keys.length; i++) {
    newObj[keys[i]] = fn(obj[keys[i]]);
  }
  return newObj
}
```

*We are getting all the keys as a list and looping though them, inserting each key into a new object with result of calling the function with the old value, and returning the new object.*
One thing to note here is each time we call our `mapObj` we loop through the entire list of key-values and produce a new object. 

So if we did 2 `mapObj` 's:

```
const jayZDetails = { age: 48, demeanorAge: 78 };

const intermediateResult = mapObj(stringifyNumber, jayZDetails);
// => { age: 'forty eight', demeanorAge: 'seventy eight' }

const finalResult = mapObj(addAgeSuffix, intermediateResult));
// => { age: 'forty eight years old', demeanorAge: 'seventy eight years old' }

result['demeanorAge'] //=> 'seventy eight years old';
```

We would loop twice through all the keys producing two objects: first, `{ age: ‘forty eight’, demeanorAge: ‘seventy eight’ };` and then `{ age: ‘forty eight years old’, demeanorAge: ‘seventy eight years old’ }`.

We do all this work just so we can get one value from the object, `result[‘demeanorAge’]`. 
Is there a better way to do this? Well if objects are functions, maybe we could call map on a function instead?










## Map on a Function

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-fpsd32fm.png?raw=true)

To understand how we could map over a function it’s useful to look at the generalized definition of map in Haskell:

```
fmap :: Functor f => (a -> b) -> f a -> f b
```

*The ‘f’ in fmap stands for functor.*

This is saying map will take as arguments:

* `(a -> b)`: `a` function that takes an input `a` and produces `b` 
* `f a` : `a` functor containing `a`.

and return`f b` : the same kind of functor containing the new values. When you call map on an array, you’ll get back an array. 
When you call map on an object, you’ll get back an object.

Just as we did with objects, we need to decide what is the value a function ‘contains’. 
Well, if we look at a function as `(input -> output)` we could think of the output as the value the function contains. 
A little weird (or mind blowing), but let’s go with it.

Ok, so if we replace `f` in the type signature above with a function that we’ll represent as `(x -> a)`, it would look something like this:

```
fmap :: Functor f => (a -> b) -> (x -> a) -> (x -> b)
```

Huh?! Let’s break it down. The arguments are:

* `(a -> b)`: `a` function that takes an input `a` and produces `b` 
  
* `f a` : a functor that happens to be a function, which contains `a`.
  
* And what does it return? Well we said when you call map on a functor you produce the same type of functor with new values. 
  map on an array you  get an array. So if you call map on a function, you get…a function! 
  And  not just any function, but one with the same containing context, which  in this case is `(x ->`, a function that takes in the same input as the initial functor to make `(x -> b)`.

So if we had map for functions it could work like this:

```
const add2 = x => x + 2;
const myFunctor = x => x - 2;
const inTheEndItDoesentEvenMatter = mapFn(add2, myFunctor);
inTheEndItDoesentEvenMatter(5) //=> 5
```

This took me a while to grasp; so definitely read it again. 
(Also let me know in the comments if something is unclear.)

Okay, so here’s a way we could define `mapFn`:

```
function mapFn(fn, functor) {
  return x => fn(functor(x));
}
```

Let’s compare this to `mapObj` in our Jay Z example.

Here is the `mapObj` implementation again:

```
const jayZDetails = { age: 52, demeanorAge: 78 };

const intermediateResult = mapObj(stringifyNumber, jayZDetails);
// => { age: 'forty eight', demeanorAge: 'seventy eight' }

const finalResult = mapObj(addAgeSuffix, intermediateResult));
// => { age: 'forty eight years old', demeanorAge: 'seventy eight years old' }

result['demeanorAge'] //=> 'seventy eight years old';
```

And here’s `mapFn` :

```
const jayZDetailsFn = (k) => jayZDetails[k];

const intermediateResult = mapFn(stringifyNumber, jayZDetailsFn);
//=> x => stringifyNumber(jayZDetailsFn(x))

const result = mapFn(addAgeSuffix,intermediateResult);
//=> x => addAgeSuffix(stringifyNumber(jayZDetailsFn(x)))

result('demeanorAge') //=> 'seventy eight years old';
```

Looks fairly similar, the only thing we had to do is wrap our object in a function: `const jayZDetailsFn = (k) => jayZDetails[k]` , 
but are there any benefits?

Well, the issue with our `mapObj` approach is even before we used result 
we had to iterate twice over the list and build two new objects. 
Even though we finally only needed one value `result['demeanorAge']` 
we applied `stringifyNumber`  and `addAgeSuffix`  on all of the values. 
That’s a lot of extra effort.


In contrast, all `mapFn` does is returns a function that basically glues together the functions it’s given. 
When the result is made no list of keys are looped over, and no objects are created. 
In fact, even when `result('demeanorAge')`  is called there is no looping or object creation!


It just passes `'demeanorAge'` as an input into a pipeline of functions which begins 
with querying the initial object for just the value we are interested in. 
Then each function performs a subsequent transformation on the value of `jayZDetails['demeanorAge']`.

If you know a little bit about functional programming, 
you might have realized this is function composition. 
So yes, to map on a function is to compose a function. 

Which means if you wrap an object in a function you can use it
in function composition or any other fun function tricks, you know.

*As of writing , libraries like [ramda](https://ramdajs.com/docs/#compose) offer compose if you want to try it out!*


## Take Away

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-yn1na32ok.png?raw=true)

*Just in case you are using these images as coding example, they probably won’t work. Mostly because my brain drawing is not native to javascript. Also the compose available in libraries do not usually add compose to the function prototype. The above would look more like `compose(k => {mind: ‘blown’}[k], yourself)`.*

The next time you see a javascript object remember, it can be seen as two things:

* A function
* An array of inputs that can be retrieved from `Object.keys()

Ask yourself, how am I using this object? Can I treat it as a function?

In practice, treating an object as a function is simply wrapping it like so

```
const myFunction = (k) => myObject[k];
```

Then just explore!