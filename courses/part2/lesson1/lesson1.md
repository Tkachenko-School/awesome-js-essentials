# Work with JavaScript arrays like a boss

## Know once and for all how to index, add and delete elements in arrays


The Array in [JavaScript](<https://hackernoon.com/tagged/javascript>) is a global object which contains a list of items.

It is similar to any variable, in that you can use it to hold any type of data. However, it has one important difference: it can hold *more than one item* of data at a time.

An array is **an ordered collection of values:** each value is called an **element**, and each element has a numeric position in the array, known as its **index**.

An element inside an array can be of any type, and *different elements of the same array can be of different types:* string, [boolean](<https://hackernoon.com/tagged/boolean>), even objects or other arrays. This means that it’s possible to create an array that has a string in the first position, a number in the second, an object in the third, and so on.

Arrays in Javascript are **zero-based,** which means that the index of the first element is 0. This is very important, because it means that there always will be an offset of one unit: the first element has an index of 0, the second element has an index of 1, and so on.

Here is a scheme of an array with different types of elements:

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article1-folder/1zpOOm4aaMZWeDwbmThrmBA.png)

Here at index 0 we find a string, at index 1 an integer, at index 2 a boolean, and at index 3 another array. This comes in very handy when you need to store collections of data in one place; now let’s see how to create and work with arrays.

## Declare an array

Arrays can be very useful since **you can store as many items of data in an array as you want** (within the limits of the language, which is 2^(32) elements).

So how do you create an array ? You need to declare a variable with the var keyword, but the syntax to define the values of the array is very specific : you have to tell Javascript that you want it to be an array.

To do so, you have two choices : the array literal [] or the new keyword.

## Short syntax : with the array literal notation []

The array literal notation is simply a comma-separated list of array elements within square brackets.

```
var myArray = [ "Jack", "Sawyer", "John", "Desmond" ];
```

The content of the array is defined between the opening and the closing brackets, and each value is separated by a comma.

Values are introduced in the same way as simple variables, meaning for example that strings must be declared between quotation marks.

To define a new empty array you just have to use empty brackets :

```
var myArray = [];
```

## Long syntax : with the Array() constructor

```
var lostArray = new Array("Jack", "Sawyer", "John", "Desmond" );
var twinPeaksArray = new Array("Laura", 2, ["Bob", "Leland", "Dale"]);
```

The *new* keyword of this syntax asks Javascript to define a new Array, whose items are passed as parameters.

If you know in advance how many elements the array will contain, you can pass the count as a parameter to the constructor, and the array will automatically be created with that number of slots for elements (each element will be initialized with the value undefined) :

```
var myArray = new Array(80);
```

This will create an empty array with 80 slots initialized with the value undefined.

To define a new empty array with no particular number of items you can just initialize a new array with no parameters :

```
var myArray = new Array();
```

## Access elements of an array

The index value of each element allows you to refer to each piece of data inside your array : you can access it using the [] operator :

```
var myArray = ["Jack", "Sawyer", "John", "Desmond"];
console.log(myArray[0]); // Prints “Jack”
console.log(myArray[3]); // Prints “Desmond”
```

Remember that the index values start at 0, not 1. This means that array indexes start at 0 and go up to the number of elements, minus 1. So, our array of four elements has indexes from 0 to 3.

As we saw, arrays can have several dimensions, which means that an array element can contain an array, whose elements can contain arrays, etc. So how do I access these arrays inside arrays, or multidimensional arrays ?

Let’s take the example of an array representing a family, where the children of the family are contained in their own array inside the main array :

```
var familyArray = ["Marge", "Homer", ["Bart", "Lisa", "Maggie"]];
```

We could represent this array like this :

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article1-folder/1rGnhZrNi9bJvnlvr_L1-sg.png)

If I want to access the value “Lisa”, how will I manage to to that ?

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder2/images/article1-folder/13DMsgphGNF46jtrxiKCDCA.png)

We can visualize the position of “Lisa” here in orange : at index 1 inside the nested array, itself positioned at index 2 of the main array :

To access the “Lisa” value, I will then write :

```
var lisa = familyArray[2][1];
console.log(lisa); // Prints "Lisa"
```

This can go on almost indefinitely, and allow us to store very well organized collections of data nested inside one another, that will be accessible via their indexes.

## Add items to an array
## Adding an index

We saw that you can access every element in in array by calling its corresponding index. This also allows us to add (or modify) elements by declaring for example :

```
var myArray = [ "Kate", "Sun"];
myArray[2] = "Juliet";
console.log(myArray); // Prints "Kate, Sun, Juliet"
```
Here I simply added an element at index 2 of the array, which didn’t exist before but now contains the value “Juliet”.

What happens if I declare an element at a given index and there are no elements in-between ? The array will create all the elements and initialize those that don’t have a value with undefined:

```
var myArray = ["Kate", "Sun"];
myArray[5] = "Juliet";
console.log(myArray.length); // Prints "6"
console.log(myArray); // Prints ["Kate", "Sun", undefined, undefined, undefined, "Juliet"]
```

You can find the length of an array by using the Array property called length: here we can see that the array has now six elements, and the three elements that have not been assigned a value are undefined.

## The push() method

The push() method allows to add one or several items to an array. The push() method can receive an unlimited number of parameters, and each parameter represents an item to add at the end of the array.

```
var myArray = [ "Kate", "Sun"];
myArray.push("Juliet"); // Adds "Juliet" at the end of the array
myArray.push("Libby", "Shannon");// Adds "Libby" and "Shannon" at the end of the array.
console.log(myaArray); // Prints ["Kate", "Sun", "Juliet", "Libby", "Shannon"]
```

## The unshift() method

The unshift() method works like push(), except that the items are added at the beginning of the array.

```
var myArray = [ "Kate", "Sun"];
myArray.unshift("Juliet"); // Adds "Juliet" at the beginning of the array
myArray.unshift("Libby", "Shannon");// Adds "Libby" and "Shannon" at the beginning of the array.
console.log(myaArray); // Prints ["Libby", "Shannon", "Juliet", "Kate", "Sun"]
```

## Suppress items from an array

The pop() and shift() methods

They respectively remove the last and first element from the array :

```
var myArray = ["Jack", "Sawyer", "John", "Desmond", "Kate"];
myArray.pop(); // Removes "Kate"
myArray.shift(); // Removes "Jack"
console.log(myArray); // Prints ["Sawyer", "John", "Desmond"]
```

## The splice() method

The splice() method allows us to add/remove items to/from an array, and to specifically indicate the index of the elements that have to be added /removed.

In the following example, splice adds two elements starting at index 2 (the third element):

```
var fruitArray = ["apple", "peach", "orange", "lemon" ,"lime", "cherry"]; 
fruitArray.splice(2, 0, "melon", "banana");
console.log(fruitArray); // Prints ["apple", "peach", "melon", "banana", "orange", "lemon", "lime", "cherry"]
```
* The first parameter is the index : it specifies at what position of the array to add/remove items. Here we chose the index 2 (with the value “orange”).
* The second parameter is number of items to be removed. Here we set it to 0, so no items will be removed.
* The following optional parameters are the new item(s) to be added to the array. Here we want to add “melon” and “banana” starting at index 2.
To remove only one element at index 2 (“orange”) for example, I would have to write :

```
var fruitArray = ["apple", "peach", "orange", "lemon" ,"lime", "cherry"]; 
fruitArray.splice(2,1);
console.log(fruitArray); // Prints ["apple", "peach", "lemon", "lime", "cherry"]
```

Check out also the slice() method for another way to remove items from an array, but that will this time return a new array instead of modifying the original.
