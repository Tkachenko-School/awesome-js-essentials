https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically


# **[How can I merge properties of two JavaScript objects dynamically?]()**

I need to be able to merge two (very simple) JavaScript objects at runtime. 

For example I'd like to:
```
var obj1 = { food: 'pizza', car: 'ford' } 

var obj2 = { animal: 'dog' } 

obj1.merge(obj2); 

//obj1 now has three properties: food, car, and animal
```

---

**ECMAScript 2018 Standard Method**

You would use [object spread](https://github.com/tc39/proposal-object-rest-spread):
```
let merged = {...obj1, ...obj2};
```
`merged` is now the union of `obj1` and `obj2`. Properties in `obj2` will overwrite those in `obj1.

```
/** There's no limit to the number of objects you can merge.

 *  Later properties overwrite earlier properties with the same name. */
 
const allRules = {...obj1, ...obj2, ...obj3};
```

if you want more details, you can do to MDN documentation - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
If you're using babel you'll need the [babel-plugin-transform-object-rest-spread] plugin for it to work.

**ECMAScript 2015 (ES6) Standard Method**

```
/* For the case in question, you would do: */

Object.assign(obj1, obj2);

/** There's no limit to the number of objects you can merge.

 *  All objects get merged into the first object. 

 *  Only the object in the first argument is mutated and returned.

 *  Later properties overwrite earlier properties with the same name. */

const allRules = Object.assign({}, obj1, obj2, obj3, etc);

```

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign


---


**Method for ES5 and Earlier**

```
for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
```
Note that this will simply add all attributes of `obj2` to `obj1` which might not be what you want if you still want to use the unmodified `obj1`.

If you're using a framework that craps all over your prototypes then you have to get fancier with checks like `hasOwnProperty`, but that code will work for 99% of cases.

Example function:
```
/**

 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1

 * @param obj1

 * @param obj2

 * @returns obj3 a new object based on obj1 and obj2

 */

function merge_options(obj1,obj2){

    var obj3 = {};

    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }

    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

    return obj3;

}
```

BUT...

This doesn't work if objects have same name attributes, and you would also want to merge the attributes.

This only does a shallow copy/merge. Has the potential to clobber a lot of elements.

---

which shows how to merge "one level down". That is, it merges values of duplicate keys (instead of overwriting first value with second value), but does not recurse further than that. 

Here's a function that's a bit more generic. It propagates through the object and will merge into a declared variable.
```
const posts = {
  '2018-05-11': {
    posts: 2  
  },  
  '2018-05-12': {    
    posts: 5  
  }
};

const notes = {  
  '2018-05-11': {
    notes: 1  
  },  
  '2018-05-12': {
    notes: 3  
  }
};

function objCombine(obj, variable) {

  for (let key of Object.keys(obj)) {

    if (!variable[key]) variable[key] = {};

    for (let innerKey of Object.keys(obj[key]))

      variable[key][innerKey] = obj[key][innerKey];

  }

}

let combined = {};

objCombine(posts, combined);

objCombine(notes, combined);

console.log(combined)
```
----

Code for recursive merge . The code does not use Object.prototype :)

```
/*

* Recursively merge properties of two objects 

*/

function MergeRecursive(obj1, obj2) {

  for (var p in obj2) {

    try {

      // Property in destination object set; update its value.

      if ( obj2[p].constructor==Object ) {

        obj1[p] = MergeRecursive(obj1[p], obj2[p]);

      } else {

        obj1[p] = obj2[p];

      }

    } catch(e) {

      // Property in destination object not set; create it and set its value.

      obj1[p] = obj2[p];

    }

  }

  return obj1;

}
```

## An example
```
o1 = {  a : 1,

        b : 2,

        c : {

          ca : 1,

          cb : 2,

          cc : {

            cca : 100,

            ccb : 200 } } };
            

o2 = {  a : 10,

        c : {

          ca : 10,

          cb : 20, 

          cc : {

            cca : 101,

            ccb : 202 } } };
            

o3 = MergeRecursive(o1, o2);

```
**Produces object o3 like**
```
o3 = {  a : 10,

        b : 2,

        c : {

          ca : 10,

          cb : 20,

          cc : { 

            cca : 101,

            ccb : 202 } } };
```
Nice, but I would make a deepcopy of the objects first. This way o1 would be modified too, as objects are passed by reference.



---
```
var merge = function() {

    var obj = {},

        i = 0,

        il = arguments.length,

        key;

    for (; i &lt; il; i++) {

        for (key in arguments[i]) {

            if (arguments[i].hasOwnProperty(key)) {

                obj[key] = arguments[i][key];

            }

        }

    }

    return obj;

};
```
Some example usages:
```
var t1 = {

    key1: 1,

    key2: "test",

    key3: [5, 2, 76, 21]

};

var t2 = {

    key1: {

        ik1: "hello",

        ik2: "world",

        ik3: 3

    }

};

var t3 = {

    key2: 3,

    key3: {

        t1: 1,

        t2: 2,

        t3: {

            a1: 1,

            a2: 3,

            a4: [21, 3, 42, "asd"]

        }

    }

};

console.log(merge(t1, t2));

console.log(merge(t1, t3));

console.log(merge(t2, t3));

console.log(merge(t1, t2, t3));

console.log(merge({}, t1, { key1: 1 }));
```
---

Just by the way, what you're all doing is overwriting properties, not merging...

This is how JavaScript objects area really merged: Only keys in the to object which are not objects themselves will be overwritten by from. Everything else will be **_really merged_**. Of course you can change this behaviour to not overwrite anything which exists like only if to[n] is undefined, etc...:
```
var realMerge = function (to, from) {

    for (n in from) {

        if (typeof to[n] != 'object') {

            to[n] = from[n];

        } else if (typeof from[n] == 'object') {

            to[n] = realMerge(to[n], from[n]);

        }

    }

    return to;

};
```
Usage:
```
var merged = realMerge(obj1, obj2);
```
----



1. Supports deep merge
2. Does not mutate arguments
3. Takes any number of arguments
4. Does not extend the object prototype

Does not depend on another library



1. Includes check for hasOwnProperty
2. Is short :)

/*

    Recursively merge properties and return new object

    obj1 &lt;- obj2 [ &lt;- ... ]

*/
```
function merge () {

    var dst = {}

        ,src

        ,p

        ,args = [].splice.call(arguments, 0)

    ;

    while (args.length > 0) {

        src = args.splice(0, 1)[0];

        if (toString.call(src) == '[object Object]') {

            for (p in src) {

                if (src.hasOwnProperty(p)) {

                    if (toString.call(src[p]) == '[object Object]') {

                        dst[p] = merge(dst[p] || {}, src[p]);

                    } else {

                        dst[p] = src[p];

                    }

                }

            }

        }

    }

   return dst;

}
```
Example:
```
a = {

    "p1": "p1a",

    "p2": [

        "a",

        "b",

        "c"

    ],

    "p3": true,

    "p5": null,

    "p6": {

        "p61": "p61a",

        "p62": "p62a",

        "p63": [

            "aa",

            "bb",

            "cc"

        ],

        "p64": {

            "p641": "p641a"

        }

    }

};

b = {

    "p1": "p1b",

    "p2": [

        "d",

        "e",

        "f"

    ],

    "p3": false,

    "p4": true,

    "p6": {

        "p61": "p61b",

        "p64": {

            "p642": "p642b"

        }

    }

};

c = {

    "p1": "p1c",

    "p3": null,

    "p6": {

        "p62": "p62c",

        "p64": {

            "p643": "p641c"

        }

    }

};

d = merge(a, b, c);

/*

    d = {

        "p1": "p1c",

        "p2": [

            "d",

            "e",

            "f"

        ],

        "p3": null,

        "p5": null,

        "p6": {

            "p61": "p61b",

            "p62": "p62c",

            "p63": [

                "aa",

                "bb",

                "cc"

            ],

            "p64": {

                "p641": "p641a",

                "p642": "p642b",

                "p643": "p641c"

            }

        },

        "p4": true

    };
```
*/


    5

You should use lodash's [defaultsDeep](https://lodash.com/docs#defaultsDeep)
```
_.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } }); // → { 'user': { 'name': 'barney', 'age': 36 } }
```
