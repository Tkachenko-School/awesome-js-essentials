
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

## new hope?

So, in the end I have a module that works well but sacrifices some property and method privacy. It’s not ideal, but it works within the confines of what JavaScript offers today.

But… there’s hope yet for privacy in our JavaScript classes! Apparently I’m not the only one who thinks JavaScript classes could use private properties. 

The ECMAScript Technical Committee 39 is [considering private class fields](<https://github.com/tc39/proposal-class-fields>) as I type! 

Soon, we’ll be able to designate private fields in our classes simply by prefixing them with the # symbol. 

I, for one, am really excited and I hope you are too.