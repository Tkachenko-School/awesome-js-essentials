# 8 Essential Tips To Make Your JavaScript Code Perform Faster

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article6-folder/photo-1506719040632-7d586470c936.jfif)

JavaScript has ranked as the most popular language in the world by the [StackOverflow survey](<https://insights.stackoverflow.com/survey/2019#technology>) for the seventh year in a row. With the rising popularity of JavaScript, it is clear that it is the most used language for coding frontend applications. It is interesting to note that visitors to websites, lose interest or leave your website if the content doesn’t load within two seconds. The two seconds benchmark is hard to keep up with and that means you need to optimize your JavaScript code for better performance. In this blog post, we will learn some quick tips that you can follow to keep you JavaScript code concise and improve the overall performance of your application. Alright, let’s dive in.

## Tip 1: Minimize accessing the DOM
Accessing the [DOM (Document Object Model)](<https://www.w3.org/TR/WD-DOM/introduction.html>) directly comes with a cost. If your application happens to access the DOM elements many times, you can instead access it once and use it as a local variable. Remember that, if you remove this value from the DOM, then the variable needs to be set to null, to prevent memory leaks.

**React and Vue make use of Virtual DOM**

In modern web libraries like React and Vue, they simplify the DOM access and instead use what is called the Virtual DOM. React and Vue provide great performance with the use of Virtual DOM over the real DOM. And developers don’t need to worry about what happens behind the scene with the DOM access in React or Vue.

If you are using plain JavaScript, then make sure that you minimize access to the DOM as much as you can.

## Tip 2: Remove unused code and dependencies

This tip is applicable across any programming language. Removing unused code and dependencies, will ensure that your code compiles faster and performs faster. If you come across features that the users are never using, it would be a good time to deprecate all the code related to that feature. Using analytics can provide insight on how users are using your app. If there are features that are absolutely never touched, you can always discuss with your team and retire these features. This will ensure that your web app loads faster.

We also tend to add a ton of dependency packages to our projects. Make it a point to ensure that you do not have any unwanted dependencies in your project. Also don’t add dependencies to third parties, if you are able to natively code them without additional dependencies.

A clean and concise package will ensure that your website loads faster, and has an improved overall performance.

## Tip 3: Call APIs Asynchronously

Using async code for features like API calls, drastically increases the performance of your JavaScript code. With async code, instead of blocking the single thread that JavaScript has, the async events are pushed to a queue that fires up after all the other code executes. Always use asynchronous APIs in your code.

## Tip 4: Avoid using Global Variables

A standard advice that you will hear from your peers who have been coding in JavaScript for a while, is to avoid the use of global variables as much as possible. The reason behind this is that, it takes longer for the JavaScript engine at runtime to search for variables that exist in the global scope. Another reason to avoid global variables is to avoid collision of variable names. In javascript, all of the code shares a single global namespace. When there are many global variables in your code, it can result in collisions between various scripts on the same page.

In the example below, *name* is a global variable, and has a global scope. It can be used anywhere.

```
  var name = "Adhithi Ravichandran";
  // can access name
  function myFunction>(){
  // can access name
  }
```

This can be re-written to have a local scope instead. We can re-write the code and define the variable within the function. Now the  scope of the *name* variable is within the function only.

```
function myFunction(){
  var name = "Adhithi Ravichandran";
  // can access name
}
```

Always try to use variables in local scope and avoid writing global variables, unless absolutely necessary. You can use JavaScript *let* and *const* that have local scope over JavaScript *var.*

## Tip 5: Profile Your Code and Remove Memory Leaks

Memory leaks are performance killers. Memory leaks use up more and more memory, and eventually take up all of the available memory space and crash your app sometimes. To improve your JavaScript performance, ensure that your code is free of memory leaks. This is a common problem that we have all faced as developers. You can track down your memory leaks, using Chrome Dev Tools. The performance tab can provide you insight into any memory leaks. Watch out for any leaks in your code regularly.

## Tip 6: Utilize the power of Caching

Caching your files in the browser will drastically improve the performance of your app and speed up the loading time of the website. The browser will use the locally cached copy for any web pages that are loaded after the initial load, instead of going back and forth and fetching it from the network. This provides a seamless experience to the users.

JavaScript service workers can be used to cache files that can be used while the user is offline. This is an essential piece in creating a [Progressive Web App (PWA)](<https://developers.google.com/web/progressive-web-apps/>). Users will still be able to access the site while they are offline with the use of the cached files.

**Lighthouse tool** 

[Lighthouse](<https://developers.google.com/web/tools/lighthouse/>)  is an [open-source](<https://github.com/GoogleChrome/lighthouse>), automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. This tools is very helpful to run audits on your website, and also indicates if your website qualifies as a Progressive Web App (PWA), based on its capacity to handle offline rendering.

You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. You give Lighthouse a URL to audit, it runs a series of audits against the page, and then it generates a report on how well the page did. From there, use the failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important, as well as how to fix it.

## Tip 7: Minify your code

[Minification](<https://en.wikipedia.org/wiki/Minification_(programming)>) of JavaScript code is a common practice that you will find across any development team. It refers to the removal of any unwanted or cumbersome elements from the JavaScript source. The minification process removes things like comments, whitespaces, shortening variable and function names etc..

You can minify your code with build tools like [Google Closure compiler](<https://github.com/google/closure-compiler-js>) or online tools like [JS Compress](<https://jscompress.com/>), [JS minifier](<https://javascript-minifier.com/>) and so on.

This makes a significant improvement to your JavaScript code performance, so don’t forget this step.

## Tip 8: Be cautious with Loops

This tip is applicable to all programming languages, especially in JavaScript. When we use lots of loops or nested loops, it impacts the browser. Something to keep in mind, is to keep as much as possible outside the loop, and do only the required operations inside the loop. The less your loop does, the faster the JavaScript code is. Make sure to avoid unnecessary nesting of loops as well in this regard.

If you are looking to learn JavaScript in depth, I highly recommend Mosh’s JavaScript courses. The link to all of the courses are below:

[**JavaScript Basics for Beginners**](<https://skl.sh/2MRAOM1>)

[**Object-Oriented Programming in JavaScript**](<https://skl.sh/32WOYRz>)

[**The Complete Node JS Course**](<https://skl.sh/34GzIJ3>)

## Resources and Further Reading

Performance is extremely important and helps keep your users engaged and happy. There are plenty of other performance considerations that you can make to optimize your JavaScript.

Resources to boost JavaScript Performance:

* https://github.com/davidmarkclements/v8-perf
* https://riptutorial.com/javascript/topic/1640/performance-tips
* https://dev.opera.com/articles/efficient-javascript/