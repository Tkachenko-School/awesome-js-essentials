<!-- Output copied to clipboard! -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.477 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β30
* Thu Jul 15 2021 01:06:27 GMT-0700 (PDT)
* Source doc: Untitled document

WARNING:
You have 3 H1 headings. You may want to use the "H1 -> H2" option to demote all headings by one level.

----->


<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 1; ALERTS: 0.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p>
<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>


Here is a list of most common array methods in JavaScript.


```
// Mutating
push()      // Insert an element at the end
pop()       // Remove an element from the end
unshift()   // Inserts an element in the beginning
shift()     // Remove first element
// Iterating
forEach()   // Iterates an array
filter()    // Iterates an array and result is filtered array
map()       // Iterates an array and result is new array
reduce()    // "Reduces" the array into single value (accumulator)
// Others
slice()     // Returns desired elements in a new array
concat()    // Append one or more arrays with given array
```



# 
        Mutating Methods


        There are many array methods that **mutate** the array. Mutating an array means that the resulting array will take a different form from before similar to English definition of mutation. So let’s take a look at some of the most common ones:


## 
        push()


```
        const array = [1, 2, 3, 4]
        array.push(10) // 5 (push returns the length of the new array)
        // array = [1, 2, 3, 4, 10]
```



        **<code>push</code></strong> method will insert the element passed at the end of the array and return the length of the new array.


## 
        pop()


```
        const array = [1, 2, 3 , 4]
        array.pop() // 4 (pop returns the element removed)
        // array = [1, 2, 3]
```



        **<code>pop</code></strong> method will remove the last element in the array and return that element.


## 
        unshift()


```
        const array = [1, 2, 3, 4]
        array.unshift(9, 10) // 6 (unshift returns the length of new array)
        // array = [9, 10, 1, 2, 3, 4]
```



        **<code>unshift</code> </strong>method will add the elements passed at the beginning of the array preserving the order and return the length of the new array.


        **<code>Note</code></strong>: You can pass in as many elements as you like to the function.


## 
        shift()


```
        const array = [1, 2, 3, 4]
        array.shift() // 1(shift returns the removed element)
        // array = [2, 3, 4]
```



        **<code>shift</code> </strong>method will remove the first element array and return the removed element.


# 
        Iterating Methods


        Iterating methods are very powerful because iterating through an array is one of the most common instructions that we want to execute. So let’s take a look at some of them:


## 
        forEach()


```
        const array = [1, 2, 3, 4]
        array.forEach((elemnt, index) => {
          console.log(`Element ${element} at index ${index}`)
        }
```



        **<code>forEach</code> </strong>method will call the function provided once for each element in the array preserving the order. This function provided can take in 3 different arguments: <code>element</code>, <code>index</code>, <code>array</code>. Be sure that the order in which you pass these parameters follow the order.


## 
        filter()


```
        const array = [1, 2, 3, 4]
        const filteredArray = array.filter(element => element%2)
        // array = [1, 2, 3, 4]
        // filteredArray = [1, 3]
```



        **<code>filter</code></strong> method will return a brand new array with elements that returned <code>true<em> </em></code>from the function provided. Notice that in the example above, the function passed into the filter method returns <code>true</code> if element is odd which is why you see that <code>filteredArray</code> is <code>[1, 3]</code>.


        **<code>Note</code></strong>: filter method doesn’t mutate the original array. It will create a new array.


## 
        map()


```
        const array = [1, 2, 3, 4]
        const mapArray = array.map(element => element * 2)
        // array = [1, 2, 3, 4]
        // mapArray = [2, 4, 6, 8]
```



        **<code>map</code></strong> method will create a new array of elements where each element is a value returned from the function provided. The example above shows the function provided doubling each element. Hence, <code>mapArray</code> is <code>[2, 4, 6, 8]</code>.


        `Note`: just like filter method, map will not mutate the original array because it will create a new array.


## 
        reduce()


```
        const array = [1, 2, 3, 4]
        const result = array.reduce((accumulator, current) => (
          accumulator + current
        ), 10)
        // array = [1, 2, 3, 4]
        // result = 20
```



        **<code>reduce</code></strong> method will take in <code>reducer</code> function and initial value as arguments. The <code>reducer</code> function can take up to 4 arguments: <code>accumulator</code>, <code>element</code>, <code>index</code>, and <code>array</code>. The reducer function will be executed for each iteration and the returned value of each iteration will be used for the next iteration.


        `Note`: reduce method returns a single value not an array.


# 
        Others


        Lastly, there’re couple of more methods that are super important to know and very common in JavaScript codebase.


## 
        slice()


```
        const array = [1, 2, 3, 4]
        const slicedArray = array.slice(0, 2)
        // array = [1, 2, 3, 4]
        // slicedArray = [1, 2]
```



        **<code>slice</code></strong> method will create a new array with elements from the index range passed in. In the example above, we specify the start index (0) and the end index (2) which gives us a new array <code>[1, 2]</code>. Also, notice that the original array isn’t mutated.


        `Note`: End index is `exclusive` which means that the element at that end index isn’t included in the new array.


## 
        concat()


```
        const array = [1, 2, 3, 4]
        const concatArray = array.concat([5, 6, 7, 8])
        // array = [1, 2, 3, 4]
        // concatArray = [1, 2, 3, 4, 5, 6, 7, 8]
```



        **<code>concat</code></strong> method will create a new array containing all the elements in the original array followed by the each of the arrays that are passed in. This method will not mutate the original array.


        `Note`: You can pass in more than one array as arguments.
