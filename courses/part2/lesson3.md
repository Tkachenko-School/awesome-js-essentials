# How To Use The Spread Operator on a Function

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article3-folder/0d2rn33cu.png?raw=true)

You can’t officially do it, but you can write a function that does virtually the same thing. Let’s see how and maybe why you should.
But first, have you ever found yourself in this situation?

```
const result = f(x)

if(result === undefined) {
  g(x)
}
```

You wanted to call a function with an input when another function returned undefined for that same input. The above works, but wouldn’t it be nice if we had something more generalized?

If we were using objects this could be nicely done with a spread operator.

```
const combinedObj = {...gObj, ...fObj}
```
😍 Doesn’t that look prettier? When I call `combinedObj[x]` it will return `fObj[x]` unless `fObj`is `undefined` for `x`. In that case, `gObj[x]` would be returned. But what’s really nice is I can do it for any number of objects.

```
const combinedObj = {...gObj, ...fObj, ...hObj, ...iObj, ...jObj}
```

So how could we define a function that could spread other functions similarly to how `…` spreads objects?

## Specs

Okay so `spread` should be able to take two functions, `f` and `g`

```
const fObj = {a: 1, b: 2}
const gObj = {b: 3, c: 4}

const f = (x) => fObj[x]
const g = (x) => gObj[x]

spread(f, g)
```

and return a function that would first call `g` with an input and only if `g` returns `undefined` it will call `f`.

```
const combined = spread(f, g)

['a', 'b', 'c'].map(i => combined(i)) // => [1, 3, 4]
```

We can define the two function spread like this.

```
const spread = (f, g) => g(x) !== undefined ? g(x) : f(x)
```

If we want to spread more than two functions we can modify spread to take a list of functions.


but before we started, let's refresh our mind with a syntax of reduce method
(it's executing a reducer function on each element of the array, resulting in asingle output value).

reducer funtion can take four arguments: Accumulator, Current Value, Current Index and Source Array.

```
reduce((accumulator, currentValue) => { ... } )
reduce((accumulator, currentValue, index) => { ... } )
reduce((accumulator, currentValue, index, array) => { ... } )
reduce((accumulator, currentValue, index, array) => { ... }, initialValue)
```

```
const spread = fns => 
  fns.reduce((a, f) =>  x => f(x) !== undefined ? f(x) : a(x))

spread([f, g, h, i, j])
```

## Why? Cuz we’re Lazy…

Well, by itself it’s just a generification that follows a common javascript concept (‘spread’). If you understand how spread works with objects you will understand how spread works with functions. Takes a little less brain work than figuring out what the if statement that we started with was doing. It’s the same reason we use `map` and `reduce`. There are many ways to achieve what `map`and `reduce` do without using them, but if we use them our code becomes much easier to follow at first glance.

Additionally, spread allows us to [wrap objects in functions for the benefit of lazy evaluation](<https://medium.com/@anirudheka/seeing-javascript-objects-as-functions-totally-changed-the-way-i-see-mapping-over-an-object-d8b834e1d0f9>) without sacrificing the ability to spread. In other words we can lazily spread as and when we need the output.

For example imagine we wanted a single value for a key in an object that was created by spreading two other objects.

```
const fObj = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8}
const gObj = {a: 100, c: 99, e: 88, g: 777}

const combined = {...fObj, ...gObj }
combined['d']
```

Then we would have to produce a fully new object combined with all new values even though we only needed the value for a single key, `'d'`. With our function spread, we can avoid creating a new object.

```
const f = x => fObj[x]
const g = x => gObj[x]

const combined = spread([f, g])
combined('d')
```

Since what spread is actually building is a logical flow of ternaries and functions, when we ask for the value of a single key it executes the logic to get the value for only that key without worrying about getting the other values. and it also a great for performance of your code. if we need to spread more often, we could save time and more intermediary objects. with only current realization.

Finally since spread produces a function, we also get all the goodness of working with functions like function composition! Here is our spread definition again:

```
const spread = (...fns) => 
    fns.reduce((a, f) => x => {
        const v = f(x) 
        return v !== undefined ? v : a(x)
    })

spread(f, g, h, i, j)
```

*There are a two slight differences between this definition and the one we saw earlier. 1. This one avoids the re-execution of `f(x)` if the return value is not `undefined`.*
*2. We are spreading the input array, which allows an end user to call `spread(f, g)` without needing to put the function into the array.*

Try it out and let me know what you think! 😄