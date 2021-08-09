/* very simple example of pure functions */

// param x and y only


function sum(x, y){
    return x + y;
}

// no matter how many times i will call this functions/method - an output will remain the same. always.

sum(1, 1); // => 2
sum(1, 1); // => 2
sum(1, 1); // => 2
sum(1, 1); // => 2
sum(1, 1); // => 2
sum(1, 1); // => 2

sum(2, 1); // => 3
sum(2, 1); // => 3
sum(2, 1); // => 3
sum(2, 1); // => 3

// sum function is a pure function.

Math.random(); // => new value
Math.random(); // => new value
Math.random(); // => new value

// Math.random is not pure at all.

Date.toLocaleString(); // => current date, same value
Date.toLocaleString(); // => current date, same value
Date.toLocaleString(); // => current date, same value


setTimeout(() => {
    Date.toLocaleString();
}, 5000);

// toLocaleString isn't pure at all too. Because it change it value in a few seconds.



console.log('Hello everyone');
console.log('Hello everyone');
console.log('Hello everyone');
console.log('Hello everyone');

// console.log not pure too :( i'm sad.