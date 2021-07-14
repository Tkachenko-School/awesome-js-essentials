## Choosing between an Object and a Function



Functions can be thought of as a succinct way of defining a Dictionary. 

If it’s possible to establish governing logic to get the right outputs for given inputs, then it’s better to go with a function.

Imagine maintaining an object with every number as a key and the square of every number as a value.

That would be a lot of lines of code! Whereas with a function it would simply be one line:`const square = (x) => x ** 2.`

## But when should we use an object?

* Well, first obviously if there is no governing formula to get the value from a key, you have no choice, but to go with an object.
  
   For example if we have
   `const person = {name: "Ada Lovelace", profession: 'Old School Engineer'} ,` we can’t derive the name, and profession values from the keys with any common logic.

* Performance. If the computation in a function is highly complex, the time spent running it, might overtake just storing the result of that function in an object. Fibonacci sequence can be an example for that(famous sequence goes: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, and so on)
  

In fact we could get the best of both worlds by building an object within our function that stores the input as the key and output as the value; so that the second time the function is run instead of doing the computation, it can simply get the value from the object.

*This technique is called memoization and works with pure functions.* We will address that later.

But we still haven’t gotten to the cool part yet!


## Map on an Object

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article7-folder/5jBZ0vOcmLboSeV67vHIMo9P6u63-svl432v3.png)

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
  age: 52,
  demeanorAge: 78 
}
```

We wanted to map over with the function `stringifyNumber()` like so:

```
mapObj(stringifyNumber, jayZDetails) 
//=> { age: 'fifty two', demeanorAge: 'seventy eight' }
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
const jayZDetails = { age: 52, demeanorAge: 78 };

const intermediateResult = mapObj(stringifyNumber, jayZDetails);
// => { age: 'fifty two', demeanorAge: 'seventy eight' }

const finalResult = mapObj(addAgeSuffix, intermediateResult));
// => { age: 'fifty two years old', demeanorAge: 'seventy eight years old' }

result['demeanorAge'] //=> 'seventy eight years old';
```

We would loop twice through all the keys producing two objects: first,
 `{ age: fifty two’, demeanorAge: ‘seventy eight’ };` 
 and then 
 `{ age: ‘fifty two years old’, demeanorAge: ‘seventy eight years old’ }`.

We do all this work just so we can get one value from the object, `result[‘demeanorAge’]`. 
Is there a better way to do this? 

Well if objects are functions, maybe we could call map on a function instead?

Let's figure out in in the next lesson.