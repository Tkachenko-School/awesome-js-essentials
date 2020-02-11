# Why I’m Excited for JavaScript Class Private Fields: A Case Study

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder2/images/article4-folder/1D6m90Bq8o80AIHAtoDST9w.jpeg)

Classes are nothing new in programming, but their implementation in JavaScript is, well, weird. For anyone used to classes in other languages, you might think of them as blueprints from which new instances are copied. Additionally, you might think that these classes would offer public, private, and protected instance properties. In JavaScript, neither of these is true: new instances of objects have a prototypal inheritance relationship with their parents and there is no such thing as private or protected properties. In this article, I am going to dive into the latter point a bit further.

## Why Private Fields in a JavaScript Class?

I started thinking about the issue of class instance privacy because I was creating a class-based data validation module (think form or JSON data validation). The idea is that you would be able to create a new validator instance whenever you had something new to validate (i.e., if you had two different forms on your website you might create one validator for each). The public API code to accomplish this might look as follows:

```
// A validator for your email form
let emailValidator = new Validator();

emailValidator
  .prop('email')
  .mustBeValidEmail();

let emailResult = emailValidator.validate(emailForm);

// A separaete validator for your signup form
let signUpValidator = new Validator();

signUpValidator
  .prop('email')
  .mustBeValidEmail();

signUpValidator
  .prop('password')
  .minLength(8);

let signUpResult = signUpValidator.validate(signUpForm);
```

Looks great, right? Sure, why not. So as I was designing the actual validator module to make this vision come to fruition, I quickly realized I wanted to have some methods available within the module but not exposed in the public API. Namely, it became obvious to me that calling one of the rule-adding methods (e.g., `mustBeValidEmail` or `minLength`) should reference a private method called `addRule` 
that would add the rule to a private array of rules called `validationRules`.

>I quickly realized I wanted to have some methods available within the module but not exposed in the public API.

It’s not that there’s anything super secret about the `addRule` method or the `validationRules` array, but moreso that there is no need to call/view them outside of the class, so why expose them and potentially cause errors?

## Trying and Failing to Achieve Property Privacy
The title of this section is totally a spoiler alert: I tried several ways but ultimately failed to (satisfactorily) achieve property privacy. In this section, I’ll show you the ways I tried and why they just don’t cut it.

**Attempt 1: Use an IIFE to create variables to which only the class has access.** 

An Immediately Invoked Function Expression (IIFE) is a great way to create a closure and essentially provide some statefulness within that closure. A notional example of how this would work is as follows:

```
const Validator = (function() {

  let validationRules = [];
  
  function addRule(rule) {
    validationRules.push(rule);
  };
  
  function Validator() {};
  
  Validator.prototype.mustBeValidEmail = function() {
    let rule = 'some logic';
    addRule(rule);
  }
    
  return Validator;
})();

module.exports = Validator;
```

Ah, beautiful. The`validationRules` array and the `addRule` function are now private as they should be. **But this fails!** Why? Because there is only one `validationRules` array ever created, meaning all Validator instances created will be adding validation rules to the same array. This will be chaos when it comes time to validate an object — all validation rules from all instances of the Validator class will be applied!

**Attempt 2: Create new variables in the constructor function**

This is an interesting approach that I found on StackOverflow. And it actually works, kind of. Sort of. Let’s take a look.

```
const Validator = function() {

  let validationRules = [];
  
  function addRule(rule) {
    validationRules.push(rule);
  };

  this.prototype.mustBeValidEmail = function() {
    let rule = 'some logic';
    addRule(rule);
  }

};

module.exports = Validator;
```

What’s going on here? Well, every time we create a new instance of the Validator class (i.e., using new `Validator()`), a new `validationRules` array and `addRule` function are created. Since the constructor function is creating a closure, `this.prototype.mustBeValidEmail` has access to these scoped properties. So this will actually work! **But this fails!** Why? Because creating new prototypal properties when every new instance is created is inefficient and simply wrong from an object oriented programming perspective.

**Attempt 3: Just make the darn properties public**

So this works, but it definitely doesn’t achieve privacy. I did, however, settle on using this method: unlike the others, it’s not hacky. It simply requires making sure these methods and properties are not documented as usable in whatever API documentation is generated and, of course, some tolerance for people running into errors because they decided to mess with these properties anyways (we all know how developers are).

```
let Validator = function() {
  // Please don't access this directly
  this.validationRules = [];
};
 
// No need to use this directly
Validator.prototype.addRule = function(rule) {
  this.validationRules.push(rule);
};

Validator.prototype.mustBeValidEmail = function() {
  let rule = 'some logic';
  this.addRule(rule);
}

module.exports = Validator;
```

Again, it’s readable, not hacky, and works.

Conclusion and A New Hope.

So, in the end I have a module that works well but sacrifices some property and method privacy. It’s not ideal, but it works within the confines of what JavaScript offers today.

But… there’s hope yet for privacy in our JavaScript classes! Apparently I’m not the only one who thinks JavaScript classes could use private properties. The ECMAScript Technical Committee 39 is [considering private class fields](<https://github.com/tc39/proposal-class-fields>) as I type! Soon, we’ll be able to designate private fields in our classes simply by prefixing them with the # symbol. I, for one, am really excited and I hope you are too.