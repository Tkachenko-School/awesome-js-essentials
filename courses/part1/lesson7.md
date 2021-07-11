# Quick tips for reducing the cognitive load of your code


Here are five tips that will help you have a a simple mental [framework](https://hackernoon.com/tagged/framework) that can be used with any language or library and which will lead to good quality code by default. 
Keep them in mind and writing good code should be a breeze.

## 1. Forget about your personal style
 You read some article which blows your mind with new tricks. 
 Now you are going to write clever code and all your peers will be impressed.

The problem is that people just want to fix their bugs and move on. Your clever trick is often nothing more than a distraction. 
When people have to digest your piece of code, their “mental stack” fills up and it is hard to make progress.


![xxx](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder/images/article7-folder/0BmUAcc8xCAtx7a_R.png?raw=true)

Don’t personalize your work in ways that would require explanations

**Don’t code “your way”. Just follow the coding standards.** 
This stuff is already figured out. Make your code predictable and easy to read by coding the way people expect.

## 2. Modularize relentlessly

Complex code can often be clarified through modularization, and there are more ways to do this than just creating more functions. 
Storing the result of long conditionals into a variable or two is a great way to modularize without the overhead of a function call. This will even allow you to compose them into larger conditionals, or to reuse the result somewhere else.

**The approach when breaking a problem down should be to have each section as focused as possible, affecting only local state, without mixing in irrelevant issues, and without side-effects if at all possible.**
[Programming](<https://hackernoon.com/tagged/programming>) languages and libraries often come with their issues, and abstracting them away can help your code mind its own business. 

The [Single Responsibility Principle](<http://code.tutsplus.com/tutorials/solid-part-1-the-single-responsibility-principle--net-36074>) is another example of how focused and localized code leads to good design.

![xxx](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder/images/article7-folder/0aqtxRjY6ONXTCvUu.png?raw=true)

I like taking advantage of variable names to document and compartmentalize logic

TDD, beside coming with its own benefits when done right, has been forcing people to apply certain principles which were previously not as popular. Stateless code was dismissed as slow and unnecessary (see: most old C/C++ code), and now everyone is talking about pure functions. Even if you don’t do TDD, you should learn the principles that drive it. Working under new paradigms will turn you into a resilient developer.

## 3. Write code that your IDE will understand

Your computer and your tools can have as much of a hard time dealing with your code as you, and there is some correlation between the number
 of preprocessors and mutations you have to apply and how convoluted the code is.

Let’s set aside the possible benefits of those additional build tools for a moment. 
Chances are that they require you to use domain-specific languages such as custom templating, or complex and dynamic data structures such as hash tables. 

Your IDE generally isn’t going to be good at handling this stuff, and locating relevant pieces of code will become harder.

**Avoid using language extensions and libraries that do not play well with your IDE.** 

The impact they will have on your productivity will far outweigh the small benefit of easier configuration or saving a few keystrokes with more terse syntax.

![xxx](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder/images/article7-folder/01hwYqzlsaq0ckuv7.png?raw=true)

Using ServiceLocator is an example of design that leads to poor integration with most IDEs

**Another way to keep the “integrated” part of your IDE relevant is to avoid magic code.** 

Most languages will provide ways for you to write more dynamic code. Abusing these features such as by using magic strings, magic array indexes and custom template language features will lead to a more disconnected codebase. 

Generally any features which only a human will know the meaning of will lead you down this road, and it’s a hard road to come back from, because if your IDE doesn’t understand the code, any refactoring features it has are going to be useless when you want to move to a more static architecture.

## 4. Build a clear and predictable architecture

Work towards having a predictable architecture. Your teammates will find it easier to locate things, and this will greatly reduce the time it takes them to get something done.

 **Once you’ve agreed on an overall architectural structure for your project, make it obvious where the main elements are located.** 
 Using MVC? Place models, views and controllers in their own folders, not three folders deep or spread across several different places.

I talked about modularization. There can also be excessive modularization, which will usually make code harder to locate. Your IDE might help some, but often you will be torn between having your IDE ignore a vendor/library folder due to it having too much irrelevant code, or having it indexed and dealing with the problem manually. It’s a lose-lose situation. 

Try to use fewer libraries by choosing the ones that cover as many of your needs as possible.

Libraries and tooling can also be a barrier for new developers. I recently built a project using EcmaScript 7 (babel), only to later realize that our junior dev was getting stuck trying to figure out what it all meant. 

Huge toll on the team’s productivity. I underestimated how overwhelming that can be to someone just starting out. 
Don’t use tools that are still too hard to get a grip on. 
Wait for a better time.

![xxx](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder/images/article7-folder/0ozIrZIpq8KeFtFTg.png?raw=true)

Actual code from a makefile I wrote. Junior devs can’t handle overuse of new tech

## 5. Use informative and contextual names

If you’ve made it this far, I have good news: this is probably the most important part. Choosing good names is known to be one of the larger issues in software development. Build tools are unlikely to be going to improve on this, and the reason is that computers can’t really know the reasoning behind a solution. 

**You have to document the why. Relevant and contextual variable and function names are a great way to do this.** 
Names that convey purpose will even reduce the need for documentation.

Using prefixes in names is a great way to add meaning to them. It’s a practice that used to be popular, and I think misuse is the reason it hasn’t kept up.

Prefix systems like [hungarian notation](<http://www.joelonsoftware.com/articles/Wrong.html>) were initially meant to add meaning, 
but with time they ended up being used in less contextual ways, such as just to add type information.

![xxx](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main-folder/images/article7-folder/0XJXOdTzOFt3npMJy.png?raw=true)

Fluent interfaces have been abused often in recent times

Finally there is always something to be said about keeping a low cyclomatic complexity. What this means is to keep the number of conditional branches as low as possible. Each additional branch will not only add indentation and hurt readability, but will more importantly increase the number of things you have to keep track of.