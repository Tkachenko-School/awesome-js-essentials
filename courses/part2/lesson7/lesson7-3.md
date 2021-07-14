
## Map on a Function

To understand how we could map over a function it’s useful to look at the generalized definition of map in Haskell:

```
fmap :: Functor f => (a -> b) -> f a -> f b
```

*The ‘f’ in fmap stands for functor.*

This is saying map will take as arguments:

* `(a -> b)`: `a` function that takes an input `a` and produces `b` 
* `f a` : `a` functor containing `a`.

and return `f b` : the same kind of functor containing the new values. When you call map on an array, you’ll get back an array. 
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
// => { age: 'fifty two', demeanorAge: 'seventy eight' }

const finalResult = mapObj(addAgeSuffix, intermediateResult));
// => { age: 'fifty two years old', demeanorAge: 'seventy eight years old' }

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

The next time you see a javascript object remember, it can be seen as two things:

* A function
* An array of inputs that can be retrieved from `Object.keys()

Ask yourself, how am I using this object? Can I treat it as a function?

In practice, treating an object as a function is simply wrapping it like so

```
const myFunction = (k) => myObject[k];
```

Then just explore!