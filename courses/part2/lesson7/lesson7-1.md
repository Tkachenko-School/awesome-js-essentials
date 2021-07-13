# Seeing Javascript Objects as Functions Changed How I Code

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
