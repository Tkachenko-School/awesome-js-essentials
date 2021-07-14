# JavaScript Essentials (Concepts + Code) Frontend Development For Beginners

JavaScript was is and will always be  the first language of choice for 
developing front-end of any web application. We all know it. 

No matter what framework you choose (React or Angular `{I prefer react though}`) 
you would always need to know few JavaScript concepts and methods to make your life a lot easier. 

I plan to talk today about: 

1.  JavaScript Arrays and Array Methods 

2. Promises, Async Functions & Chaining 

3.  Rest and Spread Operators

There are some other concepts like Closures, generators, proxies and  destructuring etc … 
but I personally believe that if you master the above 3 concepts, 
40 % of your job as a front-end developer is done (provided you know how JavaScript and V8 Engine works).

So without wasting time let’s get started.

## Arrays and its methods

Arrays are no strange data structures to any programmer but the fact that 
it provides native methods like `map()``filter()``reduce()` and `sort()` to operate on them is something that makes it interesting . 

Lets look at arrays with the help of a coding example. 

```
function square(x){ return x*x };
square(9)  // output 81 

// dynamic javascript function 
let square_of_number = function square(x){ return x*x };
square_of_number(7)  // output 49
 
//  another way of writing it using arrow functions ... 
let square = (x) => x*x
square(5)  // output 25

let greater = (x,y) => { 
    if( x>y ){ 
        return console.log(`${x} is greater`);
    }
    
    return console.log(`${y} is greater`);
}

greater(5,7); // output 7 is greater

// arrays and array methods  ... 
const arr = [1,2,3,4,5];
const square = (x) => x*x;   // function to find square 
const even = (x) => x%2==0;  // function to find number being even
const callback_function = (accumulater,currentvalue) => { return accumulater + currentvalue; }
const starting_value = 0;

// array methods 
arr.map(square)     // output's new array as [1,4,9,16,25]
arr.filter(even);   // output [false, true, false, true, false]
arr.reduce(callback_function,starting_value) // output 15
```

The code is pretty much self explanatory. 



