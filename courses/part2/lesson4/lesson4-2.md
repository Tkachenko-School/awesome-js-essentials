
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
