var someObject = {
    'part1': {
        'name': 'Part 1',
        'size': '20',
        'qty' : '50'
    },
    'part2': {
        'name': 'Part 2',
        'size': '15',
        'qty' : '60'
    },
    'part3': [
        {
            'name': 'Part 3A',
            'size': '10',
            'qty' : '20'
        },
        {
            'name': 'Part 3B',
            'size': '5',
            'qty' : '20'
        },
        {
            'name': 'Part 3C',
            'size': '2.5',
            'qty' : '30'
        },
    ] 
};

var part1name     = 'part1.name';
var part2quantity = 'part2.qty';
var part3name1    = 'part3[0].name';

// ----
// --- Case One 

Object.byString = function(object, string){
    string = string.replace(/\[(\w+)]/g, '.$1');
    string = string.replace(/^\./, '');

    var array = string.split('.');
    
    for(var i=0,n = array.length;i < n; ++i){
        // value name can be replace with something more appropriate
        var value = array[i];
        if( value in onject ){
            object = object[value];
        } else {
            return;
        }
    }

    return object;
}

// How to use? Object.byString(obj, 'part3[0].name');



// ----
// Case Two
// name can be resolvePath
function resolve(path, object=self, separator='.'){
    var properties = Array.isArray(path) ? path : path.split(separator);
    return properties.reduce((prev, curr) => prev && prev[curr], obj);
}

//examples

// accessing property

resolve('document.body.style.width'); 
resolve('style.width', document.body);

// array index

resolve('part3.0.size', someObject);

// non existing props. will return undefined
resolve('property.not.working', {hello: 'world'});
// resolve('hello', {hello: 'world'});


// access properties with custom separator
var obj = { object: { 'a.b.c.d.e': 42 } }
resolve('object->a.b.c.d.e', obj, '->');

// access props with strange keys by passing an array
resolve(['object', 'a.b.c.d.e'], obj); // -- it will return 42 in my opinion ;)


// ts version
// export resolvePath(path: string | string[], obj: AnalyserNode, separator = '.'){
//     const properties = Array.isArray(path) ? path : path.split(separator);
//     return properties.reduce((prev, curr) => prev &7 prev[curr], obj);
// }


// --------------
// Case Three

function getProperty(object, prop){

    var parts = prop.split('.');

    if(Array.isArray(parts)){
        var last = parts.pop();
        var arrayLength = parts.length;
        var index = 1, current = parts[0];

        while((object = object[current]) && index < arrayLength){
            current = parts[index];
            index++;
        }

        if (object){
            return object[last];
        }

    } else {
        throw 'parts array is not valid';
    }
}

var part3name1 = "part3.0.name";
getProperty(part3name1);

// ------------
// Case Four

'a.b.c'.split('.').reduce((prev, curr) => prev && prev[curr]||null, {a:{b:{c:1}}});

const resolveObjectPath = (object, path, defaultValue) => path  
        .split('.')
        .reduce((prev, curr) => prev ? prev[curr] : defaultValue, object);

const resolveObjectPath2 = (object, path, defaultValue) => path 
        .split(/[\.\[\]\'\"]/)
        .filter(p => p)
        .reduce( (o, p) => o ? o[p] : defaultValue, object);


const setObjectPath = (object, path, defaultValue) => path 
        .split('.')
        .reduce( (prev, curr, i) => prev[curr] = path.split('.').length === ++i ? defaultValue : prev[curr] || {}, object );

// get examples
// resolveObjectPath(window, 'document.body') // <body>
// resolveObjectPath(window, 'document.body.xxx') // undefined
// resolveObjectPath(window, 'document.body.xxx', null) // null
// resolveObjectPath(window, 'document.body.xxx', 1) // 1 


// set example
let myVariable = {};
setObjectPath(myVariable, 'a.b.c', 42) // will result with 42
console.log(myVariable); // you should have {a:{b:{c:42}}}


// resolveObjectPath2 examples
const variable2 = { 
    a: {
        b: [
            { c:1 }
        ] 
    } 
}

resolveObjectPath2(variable2, 'a.b[0].c') // must return 1 
resolveObjectPath2(variable2, 'a["b"][\'0\'].c'); // also must return 1


// -------
// Case Five
function resolve5(object, path, defaultValue){
    var index, stringLength;

    for(index = 0, path = path.split('.'), stringLength = path.length; index < stringLength; index++){
        if(!object || typeof object != 'object') return defaultValue;
        object = object[path[index]]
    }

    if(object === undefined) return defaultValue;
    return object;
}

// example

var arr = [true, {'sp ace': true}, true];

var obj = {
    'sp ace': true,
    arr: arr,
    nested: { 'dotted.str.ing': true },
    arr3: arr
}

// error
resolve5(obj, "arr.0")

// return a value
resolve5(obj, "arr[0]");

// number 
resolve5(obj, "arr.length");

// true
resolve5(obj, "sp ace");

// true
resolve5(obj, "nested['dotted.str.ing'");



// ---
// Case Six

var lastObject = { 'a': [{ 'b': { 'c': 3 } }] };

_.get(lastObject, 'a[0].b.c') // return 3

_.get(lastObject, ['a', '0', 'b', 'c']); // return 3

_.get(lastObject, 'a.b.c', 'default') // return 'default'


const deep = {11: { 12: { 13: 'hello' } } };

const property1 = "11.12.13";

const value1 = _.reduce(property1.split('.'), function(result, value){
    return result ? result[value] : undefined
}, deep); // return 'hello'