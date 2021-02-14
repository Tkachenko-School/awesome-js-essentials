# JavaScript Map Function Explained: A Deep Dive

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder/images/article2-folder/bp2c32e0.jfif)

We are going to walk through the JavaScript map function, and I’ll explain how it works in a simple way. Later in the article, we will do a deep dive into some more advanced concepts regarding the map function and its uses.

## Map Function Syntax

[From Mozilla’s definition:](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map>)

```
let newArray = oldArray.map(function callback(currentValue, index, array) {
    // return element for new_array
}, thisArg)
```

The Array object’s *map* method takes a function definition as its first parameter (required). The function whose definition we pass in will have 3 arguments available to it and will be called for each element in the original array. Each return value that the function creates will be the elements for the new array.

A simple example would look like:

```
const oldArray = [1, 4, 9, 16];

function ourFunc(val, index, arr){
  return val * 2
}

const newArray = oldArray.map(ourFunc);

// newArray = [2, 8, 18, 32]
```

There is also an optional second parameter to the map function that we will go over later, a way to override ‘this‘.

## Syntactic Sugar

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder/images/article2-folder/akEBIg10DrPMiavDpnZxfHb098y2-sn23td4.jfif)

In the above example, in order to double each value in the original array, we only used the *val* argument. It is extremely common to only use the val argument in the map function. When this is the case, we can simplify our syntax, and even throw in some es6 arrow functions:

```
const oldArray = [1, 4, 9, 16];

const ourFunc = arr => arr * 2

const newArray = oldArray.map(ourFunc);

// newArray = [2, 8, 18, 32]
```

By only specifying only one argument in our function definition, the interpreter will only give our function the *val* parameter, which is okay if its the only thing we care about.

We can also use an anonymous function, which means defining the function in the map’s input instead of giving it a name. This keeps our code clean and readable (assuming we don’t need to reuse the callback function elsewhere)

```
const oldArray = [1, 4, 9, 16];

const newArray = oldArray.map(arr => arr * 2);

// newArray = [2, 8, 18, 32]
```
Success! We have accomplished our tree build without implementing a recursive function.

## Index Parameter
If you remember from earlier, the callback function definition has a second parameter, the index:

```
function callback(currentValue, index, array)
```

By using the index parameter we can do some more interesting calculations based on the position in the array:

```
const oldArray = [1, 4, 9, 16];

const newArray = oldArray.map((val, index) => {
  return val * index
});

// newArray = [0, 4, 18, 48]
```

## Array Parameter

The third and final parameter made available to our callback is a copy of the original array. This can be useful if we care about more than just the value or index that we are currently operating on. We can look forward or backward in the array and use other elements as part of our mapping:

```
const oldArray = [16, 9, 4, 1];

const newArray = oldArray.map((val, index, arr) => {
  let nextItem = index + 1 < arr.length ? arr[index + 1] : 0
  return val - nextItem;
});

// newArray = [7, 5, 3, 1]
```

## Overriding ‘This’

The map function has an often-overlooked optional second parameter. We can provide an object that will become ‘this’ within the scope of our callback.

```
let newArray = oldArray.map(callbackFunction, thisArg)
```

For example, maybe we have a callback that is used in other places in our code, and we want to reuse it, but we just need to change the environment it operates in:

```
const oldArray = [1, 4, 9, 16];

function ourFunc(val, index, arr){
  return val * this.windowSize
}

const newArray = oldArray.map(ourFunc, {windowSize: 10});

// newArray = [10, 40, 90, 169]
```

Now we can reuse that callback, but change its parameters by modifying ‘this’.