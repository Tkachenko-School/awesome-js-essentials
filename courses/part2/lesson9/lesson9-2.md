
## Promises, Async Functions and Chaining

We make Promise to people to complete a task. Right !! 
Same thing happens in Javascript. 
Javascript promise to complete/execute a function successfully but sometimes it does and sometimes it does not ie. It  fails !!  

So, a promise in JavaScript is  basically an object for a given task that takes 1 callback function 
(generally an asynchronous function like `fetch()`or other networking etc …) as an argument with a **resolve** and **reject** parameters. 

Chaining is used to make use of this response object and execute it 
in the chain of sequences once, it is being fetched from an async function. 

See it in the code for better understanding.

```
// creating a promise ... 
const callback_function = (resolve,reject) => {
    if(True){       
        resolve('everything worked');
    } else {
        reject(Error('nothing worked'));
    }
};

const promise = new Promise(callback_function); 

// chaining method ...
callbackmethod_for_success = (result) => console.log(result);
callbackmethod_for_error   = (error)  => console.log(error);
promise.then(callbackmethod_for_success, callbackmethod_for_error);

// Remember fetch method for accessing the api's itself is a promise so u can write like ... 
const url = 'www.google.com/v1/some_api_call'; // FYI .. this is not a real api ...  
fetch(url).then(callbackmethod_for_success, callback_method_for_error);

// or you can do something like -- 
fetch(url).then(callbackmethod_for_success).catch(callback_method_for_error)

// async function similar to above but in a different way .. 
async (url) => { 
    try { 
        const response = await fetch(url); 
        console.log(await response.text());
    } catch (err){
        console.log('fetch failed', err);
    }
};
```



## Rest and Spread operators [ 3 dots ( … ) ]

Rest parameter collects all remaining elements into an array. 
Whereas, Spread operator allows iterables ( **arrays** / **objects** / **strings** ) to be expanded into single `argument/element`.

```
// rest operator 
const arr = [1,2,3,4,5];
const sum = (...args) => {
    let total_sum=0; 
    for (let arr_items of args){
        total_sum+=arr_items;
    } return total_sum;
} 
sum(...arr) // output 15

// spread operator  
const extended_arr = [...arr,6,7,8,9,10];
console.log(extended_arr); // output [1,2,3,4,5,6,7,8,9,10]
```

**Interesting Fact:** 
Everything in JavaScript is an object - ie. (Data type , functions and  classes) 
and the way to use one object with another to complete a task is something which makes the Javascript (as a language) interesting and powerful. 
