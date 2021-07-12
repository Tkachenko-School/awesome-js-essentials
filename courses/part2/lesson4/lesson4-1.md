# Why I’m Excited for JavaScript Class Private Fields: A Case Study



Classes are nothing new in programming, but their implementation in JavaScript is, well, weird. For anyone used to classes in other languages, you might think of them as blueprints from which new instances are copied. 

Additionally, you might think that these classes would offer public, private, and protected instance properties. 

In JavaScript, neither of these is true: new instances of objects have a prototypal inheritance relationship with their parents and there is no such thing as private or protected properties. 

Today, I am going to dive into the latter point a bit further.

## Why Private Fields in a JavaScript Class?

I started thinking about the issue of class instance privacy because I was creating a class-based data validation module (think form or JSON data validation). 

The idea is that you would be able to create a new validator instance whenever you had something new to validate (i.e., if you had two different forms on your website you might create one validator for each). 

The public API code to accomplish this might look as follows:

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

Ah, beautiful. The`validationRules` array and the `addRule` function are now private as they should be. 
**But this fails!** 

Why? Because there is only one `validationRules` array ever created, meaning all Validator instances created will be adding validation rules to the same array. 

This will be chaos when it comes time to validate an object — all validation rules from all instances of the Validator class will be applied!
