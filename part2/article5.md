# Practical Functional Programming

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article5-folder/photo-1550439062-609e1531270e.jfif)

*The following is reformatted from a presentation I gave at LinkedIn last year. The presentation attempted to explain functional programming without using concepts like “monads” or “immutability” or “side effects”. Instead it focuses on how thinking about **composition** can make you a better programmer, regardless of what language you use.*

40 years ago, on October 17th, 1977, the Turing Award was presented to John Backus for his contribution to the design of high-level programming systems, most notably the Fortran programming language. All Turing Award winners are given the opportunity to present a lecture on a topic of their choice during the year in which they receive the award. As the creator of the Fortran programming language, one may have expected Backus to lecture on the benefits of Fortran and future developments in the language. Instead, he gave a lecture entitled [Can programming be liberated from the Von Neumann style?](<https://www.cs.ucf.edu/~dcm/Teaching/COT4810-Fall%202012/Literature/Backus.pdf>) in which he criticized some of the mainstream languages of the day, including Fortran, for their shortcomings. He also proposed an alternative: a **functional style of programming.**

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article5-folder/3nhao37bBEfHA9RTQ0WNVWfXPD02-zy6324c.jfif)

The lecture contrasts conventional programs and their “inability to effectively use powerful **combining** forms” with functional programs which are “founded on the use of **combining** forms.” Functional programming has received renewed interest in the past several years due to the rise of highly scalable and parallel computing. But the main benefit of functional programming is one that can be realized regardless of if your program is going to be parallelized or not: functional programming is better at **composition.**

Composition is the ability to assemble complex behavior by aggregating simple pieces. In computer science classes much emphasis is put on abstraction: taking a large problem and splitting it up into tractable pieces. Less emphasis is put on the reverse: once you have the small pieces implemented then how do you connect them together. It seems that some functions and systems are easy to connect together whereas others are much messier. But we need to take a step back and ask: what properties of these functions and systems make them easy to compose? What properties make them hard to compose? After you’ve read through enough code the pattern starts to emerge, and this pattern is the key to understanding functional programming.

Let’s start by looking at a function that composes really well:

```
String addFooter(String message) {
  return message.concat(" - Sent from LinkedIn");
}
```

We can easily compose that with another function without needing to make any changes to our original code:

```
boolean validMessage(String message) {
  return characterCount(addFooter(message)) <= 140;
}
```

That’s great, we took a small piece of functionality and composed it together to make something bigger. Users of the `validMessage` function don’t even need to be aware of the fact that that function was built from a smaller one; that is abstracted away as an implementation detail.

Now let’s take a look at a function that doesn’t compose so well:

```
String firstWord(String message) {
  String[] words = message.split(' ');
  if (words.length > 0) {
    return words[0];
  } else {
    return null;
  }
}
```

And then try to compose it within another function:

```
// “Hello world” -> “HelloHello”
duplicate(firstWord(message));
```

Although simple at first glance, if we ran the above code with an empty message then we would hit the dreaded `NullPointerException`. One option would be to modify the duplicate function to handle the fact that its input can sometimes be `null`:

```
String duplicateBad(String word) {
  if (word == null) {
    return null;
  } else {
    return word.concat(word);
  }
}
```

Now we are able to use this function with the `firstWord` function from earlier and simply pass on the `null` value. But this is against the point of composition and abstraction. If you’re constantly having to go in and modify the component parts every time you want to make something bigger, then it’s not composable. Ideally you want functions to be like black boxes where the exact implementation details don’t matter.

>**Null objects do not compose well.**

Let’s take a look at an alternative implementation that uses the Java 8 `Optional` type (also called `Option`or `Maybe` in other languages):

```
Optional<String> firstWord(String message) {
  String[] words = message.split(' ');
  if (words.length > 0) {
    return Optional.of(words[0]);
  } else {
    return Optional.empty();
  }
}
```

Now we try to compose it with the unmodified `duplicate` function from earlier:

```
// "Hello World" -> Optional.of("HelloHello")
firstWord(input).map(this::duplicate)
```

It works! The optional takes care of the fact that `firstWord` sometimes doesn’t return a value. If `Optional.empty()` is returned from `firstWord` then the `.map` function will simply skip running the `duplicate` function. We were able to easily combine the functions without having to modify the internals of `duplicate`. Contrast this with the null case where we had to create the `duplicateBad` function. In other words: `null` objects do not compose well but `Optionals` do.

Functional programmers are *obsessed* with making things composable in this way. As a result, they have created a large toolbox filled with structures that make non-composable code composable. One of those tools is the Optional type for dealing with functions that only return a valid output *some of the time.* Let’s take a look at some of the other tools that have been created.

Asynchronous code is notoriously difficult to compose. Asynchronous functions typically accept “callbacks” which are run when the asynchronous part of the call is completed. For example, a function `getData` could make an HTTP call to a web service and then run a function on the returned data. But what if you want to make another HTTP call right after that? And then another? Doing this quickly leads you into a situation affectionately known as callback hell.

```
getData(function(a) {  
    getMoreData(a, function(b) {
        getMoreData(b, function(c) { 
            getMoreData(c, function(d) { 
                getMoreData(d, function(e) { 
                    // ...
                });
            });
        });
    });
});
```

In a larger web app for instance this leads to highly nested spaghetti code. It’s also not very composable. Imagine trying to separate out one of the `getMoreData` functions into its own method. Or imagine trying to add error handling to this nested function. The reason it’s not composable is because there are so many contextual requirements on each block of code: the innermost block needs access to the results from `a`, `b`, `c`, etc. etc.

>**Values are easier to compose together than functions**

Let’s look inside the functional programmer’s toolbox for an alternative: the `Promise`(sometimes called a `Future`in other languages). Here’s what the code looks like now:

```
getData()
  .then(getMoreData)
  .then(getMoreData)
  .then(getMoreData)
  .catch(errorHandler)
```

The `getData` functions now return a `Promise` *value* instead of accepting a callback function. Values are easier to compose together than functions because they don’t have the same preconditions that a callback would have. It’s now trivial to add error handling to the entire block due to the functionality that the `Promise` object gives us.

Another example of non-composable code that’s talked about less than asynchronous code are loops, or more generally, functions that return multiple values such as lists. Let’s take a look at an example:

```
// ["hello", "world"] -> ["hello!", "world!"]
List<String> addExcitement(List<String> words) {
  List<String> output = new LinkedList<>();
  for (int i = 0; i < words.size(); i++) {
    output.add(words.get(i) + “!”);
  }
  return output;
}

// ["hello", "world"] -> ["hello!!", "world!!"]
List<String> addMoreExcitement(List<String> words) {
  return addExcitement(addExcitement(words));
}
```

We’ve composed the function that adds a single exclamation point into one that adds two. This works, but it’s inefficient because it loops through the loop twice instead of just once. We could go back and modify the original function but as before this breaks the abstraction.

This is a bit of a contrived example but if you imagine the code scattered around across a larger codebase then it illustrates an important point: in large systems when you’re trying to break things into modules the operations on one piece of data won’t all live together. You have to make a choice between modularity or performance.

>**With imperative programming you can only get one of modularity or performance. With functional programming you can have both.**

The functional programmer’s answer to this (in Java 8 at least) is the `Stream`. A `Stream` is lazy by default which means it only loops through the data when it is absolutely necessary. In other words the function is “lazy”: it only starts doing work when asked for a result (The functional programming language Haskell is built around the concept of laziness).

Let’s rewrite the above example using a `Stream` instead:

```
String addExcitement(String word) {
  return word + "!";
}

list.toStream()
  .map(this::addExcitement)
  .map(this::addExcitement)
  .collect(Collectors.toList())
```

This will only loop around the list once and call the `addExcitement` function twice on each element. Again we need to imagine our code operating on the same piece of data across multiple parts of the application. Without a lazy structure like the `Stream`, trying to increase performance by consolidating all list traversals into one place would mean breaking apart existing functions. With a lazy object you can achieve both modularity and performance because the traversals are deferred until the end.

Now that we’ve seen some examples, let’s return to the task of figuring out what properties made some functions easier to compose than others. We have seen that things like null objects, callbacks, and loops do not compose well. On the other hand, optionals, promises, and streams do compose well. Why is that?

The answer is that the composable examples have a clean separation between **what** you want to do and **how** you actually do it.

In all these previous examples, there’s one thing in common. The functional way of doing things focuses on what you want the result to be. The iterative way of doing things focuses on how you actually get there, the implementation details. Turns out that stitching together iterative instructions on how to do things does not compose as well as high level descriptions of what should be done.

For example in the case of promises: the **what** in this case is making one HTTP call followed by another one. The **how** is irrelevant and abstracted away: maybe it uses thread pools, mutex locks, etc. but it doesn’t matter.

*Functional programming is separating **what** you want the result to be from **how** that result is achieved.*

Indeed, that’s my practical definition of functional programming. We want to have a clear separation of concerns in our programs. The “what you want” part is nice and composable and makes it easy to build larger things from smaller ones. The “how you do it” part is required at some point, but by separating it out we keep the stuff that’s not-so-compositional out of the way of the stuff that is more compositional.

We can see this in real world examples:

* Apache Spark’s API for performing computations on large data sets abstracts away the details of which machines will run it and where the data lives
* React.js describes a view and leaves the diffing of the DOM up to an efficient algorithm

Even if you’re not using a functional programming language, separating out the what and the how of your programs will make them more composable.