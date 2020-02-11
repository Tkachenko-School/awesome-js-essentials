# JavaScript Essentials (Concepts + Code) Frontend Development For Beginners

![img](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article9-folder/id45u32ek.png.jfif)

JavaScript was is and will always be  the first language of choice for developing front-end of any web  application. We all know it. 

No matter what framework you choose (React or Angular `{I prefer react though}`) you would always need to know few JavaScript concepts and methods to make your life a lot easier. 

In this post I will be writing about

\1.  JavaScript Arrays and Array Methods 

\2. Promises, Async Functions & Chaining 

\3.  Rest and Spread Operators

There are some other concepts like Closures , generators , proxies and  destructuring etc … but I personally believe that if you master the  above 3 concepts, 40 % of your job as a front-end developer is done  (provided you know how JavaScript and V8 Engine works).

So without wasting time let’s get started.

## Arrays and its methods

Arrays are no strange data structures to any programmer but the fact that it provides native methods like `map()``filter()``reduce()` and `sort()`to operate on them is something that makes it interesting . 

Lets look at arrays with the help of a coding example. 

```
function square(x){return x*x};
square(9)  // output 81 

// dynamic javascript function 
let square_of_number = function square(x){return x*x};
square_of_number(7)  // output 49
 
//  another way of writing it using arrow functions ... 
let square = (x)=> x*x
square(5)  // output 25

let greater = (x,y) => {if(x>y){ return console.log(`${x} is greater`);}return console.log(`${y} is greater`);}
greater(5,7); // output 7 is greater

// arrays and array methods  ... 
const arr = [1,2,3,4,5];
const square = (x)=> x*x; // function to find square 
const even = (x)=> x%2==0; // function to find number being even
const callback_function = (accumulater,currentvalue)=>{return accumulater + currentvalue;}
const starting_value = 0;

// array methods 
arr.map(square)     // output's new array as [1,4,9,16,25]
arr.filter(even);  // output [false, true, false, true, false]
arr.reduce(callback_function,starting_value) // output 15
```

The code is pretty much self  explanatory. So i will skip the explanation part of the above code. But  if you still feel something is missing or wrong , do ping me on twitter. 

## Promises, Async Functions and Chaining

We make Promise to people to complete a task. Right !! Same thing happens  in Javascript. Javascript promise to complete/execute a function  successfully but sometimes it does and sometimes it does not ie. It  fails !!  

So, a promise in JavaScript is  basically an object for a given task that takes 1 callback function  (generally an asynchronous function like `fetch()`or other networking etc …) as an argument with a **resolve** and **reject** parameters. 

Chaining is used to make use of this response object and execute it in the chain of sequences once, it is being fetched from an async function. 

See it in the code for better understanding.

```
// creating a promise ... 
const callback_function = (resolve,reject)=>{if(True){resolve('everything worked');}else{reject(Error('nothing worked'));}};
const promise = new Promise(callback_function); 

// chaining method ...
callbackmethod_for_success = (result)=> console.log(result);
callbackmethod_for_error = (error)=> console.log(error);
promise.then(callbackmethod_for_success,callbackmethod_for_error);

// Remember fetch method for accessing the api's itself is a promise so u can write like ... 
const url = 'www.google.com/v1/some_api_call'; // FYI .. this is not a real api ...  
fetch(url).then(callbackmethod_for_success,callback_method_for_error);

// or you can do something like -- 
fetch(url).then(callbackmethod_for_success).catch(callback_method_for_error)

// async function similar to above but in a different way .. 
async (url) => { try { const response = await fetch(url); console.log(await response.text());} catch (err){console.log('fetch failed', err);}};
```

If you are looking to fetch data from an API, feel free to check out my other post about [API](https://hackernoon.com/working-with-apis-concepts-code-ew5n334c4). 

## Rest and Spread operators [ 3 dots ( … ) ]

Rest parameter collects all remaining elements into an array. whereas , Spread operator allows iterables ( **arrays** / **objects** / **strings** ) to be expanded into single `argument/element`.

```
// rest operator 
const arr = [1,2,3,4,5];
const sum = (...args) => {let total_sum=0; for (let arr_items of args){total_sum+=arr_items;} return total_sum;} 
sum(...arr) // output 15

// spread operater  
const extended_arr = [...arr,6,7,8,9,10];
console.log(extended_arr); // output [1,2,3,4,5,6,7,8,9,10]
```

**Interesting Fact:** Everything in JavaScript is an object - ie. (Data type , functions and  classes) and the way to use one object with another to complete a task  is something which makes the Javascript (as a language) interesting and  powerful. 

That's it for this story. 