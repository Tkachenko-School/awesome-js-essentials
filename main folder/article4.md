# Pure functions in JavaScript

This week, I decided to take on the task of [learning](<https://hackernoon.com/tagged/learning>) a new [JavaScript](<https://hackernoon.com/tagged/javascript>) library called React. One of the interesting things that I found in learning React is its use of functional programming and more importantly it’s use of pure functions.

So what are pure functions and as a software engineer why should I care? Pure functions are important because pure functions are easier to reason through and are more testable. Being testable is important because when you write a function you want to know what your result is going to be every time you give it an input.

Pure functions have two characteristics that are important.

* Pure functions when they are given the same input they will always return the same result.

* When you write a pure function, the function does not modify variables that are outside of their scope.

What are some examples of some pure functions? Let’s look at a couple.

```
function subtract (a, b) {
  return a - b;
} function multiply (a, b) {
  return a * b;
}
```

While these functions are simple, these two are pure functions and will always return the same result given the same input. i.e

```
subtract(6, 5);  // 1
multiply(10, 4) // 40
```

The subtract function will alway return 1 if the inputs are always 6 and 5 in that order and the multiply function will always return 40 given that the inputs are 10 and 40. With pure functions there are no side effects.

Now let’s look at two native JavaScript methods .slice() and .splice(). The .slice() method is a pure function and the .splice method is not as it does not return the same results every time.

```
var cohorts = ["elevens", "twelves", "thirteens"];
 cohorts.slice(0,1) // "elevens"
 cohorts.slice(0,1) // "elevens"
 cohorts.slice(0,1) // "elevens" cohorts.splice(0,1) //["elevens"]
 cohorts.splice(0,1) //["twelves"]
 cohorts.splice(0,1) //["thirteens"]
```

As you can see when you invoke the .slice method with the same arguments, it is predictable and testable because it always will return the same result. When you invoke the .splice method with the same arguments you will not get the same results each time as is therefore not a pure function.