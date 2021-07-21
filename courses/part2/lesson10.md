```
const myObject = {
   "a":"a",
   "b":{
      "c":"c",
      "d":{
         "e":"e",
         "f":{
            "g":"g",
            "h":{
               "i":"i"
            }
         }
      }
   }
};    
console.log(myObject);
```

usually output looks, like
```
{ a: 'a', b: { c: 'c', d: { e: 'e', f: [Object] } } }
```
but what if i want to see the content of property of `f`

---

### lets deep dive


To get the desired output for the example in the question, use [console.dir()](https://nodejs.org/api/console.html#console_console_dir_obj_options):
```
console.dir(myObject, { depth: null }); // `depth: null` ensures unlimited recursion
```
Why not `util.inspect()`? Because it’s already at the heart of diagnostic output: `console.log()` and `console.dir()` as well as the Node.js REPL **use util.inspect() _implicitly_**. It’s generally **_not_ necessary to require('util')** and call `util.inspect()` directly.

Details below.



---




### **[console.log()](https://nodejs.org/api/console.html#console_console_log_data_args)** (and its alias, [console.info()](https://nodejs.org/api/console.html#console_console_info_data_args)):

#### **If the 1st argument is NOT a format string**: [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options) is automatically applied to every argument:
* `o = { one: 1, two: 'deux', foo: function(){} }; console.log(o, [1,2,3]) // ->  '{ one: 1, two: 'deux', foo: [Function] } [ 1, 2, 3 ]'`
* Note that you **cannot pass options** through `util.inspect()` in this case, which implies 2 notable limitations:
    * Structural **depth** of the output is **limited to _2_ levels** (the default).
        * Since you cannot change this with `console.log()`, you must instead use `console.dir()`: **console.dir(myObject, { depth: null } prints with _unlimited_ depth**; see below.
    * You can’t turn syntax coloring on.
            
#### **If the 1st argument IS a format string**
(see below): uses [util.format()](https://nodejs.org/api/util.html#util_util_format_format_args) to print the remaining arguments based on the format string (see below); e.g.:

* `o = { one: 1, two: 'deux', foo: function(){} }; console.log('o as JSON: %j', o) // ->  'o as JSON: {"one":1,"two":"deux"}'`
* Note:
    * There is NO placeholder for representing _objects_ `util.inspect()`-style.
    * JSON generated with %j is NOT pretty-printed.

### **[console.dir()](https://nodejs.org/api/console.html#console_console_dir_obj_options)**:

* **Accepts only _1_ argument to inspect**, and always applies [util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options) – essentially, a wrapper for util.inspect() without options by default; e.g.:
        * `o = { one: 1, two: 'deux', foo: function(){} }; console.dir(o); // Effectively the same as console.log(o) in this case.`
    * **Node.js v0.11.14+**: The optional 2nd argument specifies **options for util.inspect()** – see below; e.g.:
        * `console.dir({ one: 1, two: 'deux'}, { colors: true }); // Node 0.11+: Prints object representation with syntax coloring.`
        
### **The REPL(read–eval–print loop)**: **implicitly prints any expression's return value with util.inspect() _with_ syntax coloring**; 
i.e., just typing a variable's name and hitting Enter will print an inspected version of its value; e.g.:
* `o = { one: 1, two: 'deux', foo: function(){} }  // The REPL echoes the object definition with syntax coloring.`


---


**[util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options) automatically pretty-prints _object_ and _array_ representations**, but produces **_multiline_ output only when needed**.



* The pretty-printing behavior can be controlled by the `compact` property in the optional `options` argument; `false` uses multi-line output `unconditionally`, whereas true disables pretty-printing altogether; it can also be set to a `number` (the default is `3`) to control the conditional multi-line behavior – see more at  https://nodejs.org/api/util.html#util_util_inspect_object_options.
* By default, output is wrapped [at around 60 characters](https://github.com/nodejs/node/blob/master/lib/util.js#L815), regardless of whether the output is sent to a file or a terminal. In practice, since _line breaks only happen at property boundaries_, you will often end up with shorter lines, but they can also be longer (e.g., with long property values).
* In v6.3.0+ you can use the `breakLength` option to override the 60-character limit; if you set it to `Infinity`, everything is output on a _single_ line.

**If you want more control over pretty-printing, consider using [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) with a 3rd argument**, but note the following:



* _Fails_ with objects that have _circular references_, such as `module` in the global context.
* _Methods_ (functions) will by design NOT be included.
* You can't opt into showing hidden (non-enumerable) properties.
* Example call:
    * `JSON.stringify({ one: 1, two: 'deux', three: true}, undefined, 2); // creates a pretty-printed multiline JSON representation indented with 2 spaces`



---


**[util.inspect()](https://nodejs.org/api/util.html#util_util_inspect_object_options) options object** (2nd argument):

An optional _options_ object may be passed that alters certain aspects of the formatted string; _some_ of the properties supported are:



* `showHidden`
    * if true, then the object's non-enumerable properties [those designated not to show up when you use `for keys in obj` or `Object.keys(obj)`] will be shown too. Defaults to `false`.
* `depth`
    * tells inspect how many times to recurse while formatting the object. This is useful for inspecting large complicated objects. Defaults to 2. To make it recurse indefinitely, pass `null`.
* `colors`
    * if true, then the output will be styled with ANSI color codes. Defaults to `false`. Colors are customizable 
* `customInspect`
    * if `false`, then custom `inspect()` functions defined on the objects being inspected won't be called. Defaults to `true`.

---

**[util.format()](https://nodejs.org/api/util.html#util_util_format_format_args) format-string placeholders** (1st argument)

_Some_ of the supported placeholders are:


* `%s` – String.
* `%d` – Number (both integer and float).
* `%j` – JSON.
* `%%` – single percent sign (‘%’). This does not consume an argument.


---


### short answer :) 

You need to use `util.inspect()`:
```
const util = require('util')

console.log(util.inspect(myObject, {showHidden: false, depth: null}))

// alternative shortcut
console.log(util.inspect(myObject, false, null, true /* enable colors */))
```

Outputs
```
{ a: 'a',  b: { c: 'c', d: { e: 'e', f: { g: 'g', h: { i: 'i' } } } } }
```
for more details go to docs: http://nodejs.org/api/util.html#util_util_inspect_object_options
