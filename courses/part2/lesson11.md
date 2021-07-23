


```


# Basics of how to use console.log()
```


Using console.log() for JavaScript debugging is the most common practice among developers. But, there is more...

The console object provides access to the browser’s debugging console. The specifics of how it works vary from browser to browser, but there is a de facto set of features that are typically provided.


## **#The most common Console methods:**

console.log() – For general output of logging information.

console. info() – Informative logging of information.

console.debug() – Outputs a message to the console with the log level debug.

console.warn() – Outputs a warning message.

console.error() – Outputs an error message.




https://cdn.hackernoon.com/images/ckqxl-3-upt-00260-as-6-hqytc-6-nu.jpg
![alt_text](images/image1.png "image_tooltip")



## **#Custom CSS styles for a console.log()**

The console.log output can be styled in DevTools using the CSS format specifier.





https://cdn.hackernoon.com/images/ckqxl-3-upu-00270-as-612-u-850-il.jpg
![alt_text](images/image2.png "image_tooltip")



## **#String substitutions**

When passing a string to one of the console object’s methods that accept a string (such as log()), you may use these substitution strings:

%s – string

%i or %d – integer

%o or %0 – object

%f – float




https://cdn.hackernoon.com/images/ckqxl-3-upv-00280-as-6-a-9-wg-0-cmd.jpg
![alt_text](images/image3.png "image_tooltip")



## **#console.assert()**

Log a message and stack trace to console if the first argument is false.





https://cdn.hackernoon.com/images/ckqxl-3-upv-00290-as-61-ncvbabf.jpg
![alt_text](images/image4.png "image_tooltip")



## **#console.clear()**

Clear the console.





https://cdn.hackernoon.com/images/ckqxl-3-upw-002-a-0-as-62-xuidtxu.jpg
![alt_text](images/image5.png "image_tooltip")



## **#console.count()**

Log the number of times this line has been called with the given label.





https://cdn.hackernoon.com/images/ckqxl-3-upx-002-b-0-as-61-eo-70-cmq.jpg
![alt_text](images/image6.png "image_tooltip")



## **#console.dir()**

Displays an interactive list of the properties of the specified JavaScript object.





https://cdn.hackernoon.com/images/ckqxl-3-upy-002-c-0-as-6-eyjaayxq.jpg
![alt_text](images/image7.png "image_tooltip")



## **#console.group() and console.groupEnd()**

Creates a new inline group, indenting all following output by another level. To move back out a level, call groupEnd().





https://cdn.hackernoon.com/images/ckqxl-3-upz-002-d-0-as-6-eulvbsji.jpg
![alt_text](images/image8.png "image_tooltip")



## **#HTML elements in the console**





https://cdn.hackernoon.com/images/ckqxl-3-upz-002-e-0-as-6-ex-2-yh-2-me.jpg
![alt_text](images/image9.png "image_tooltip")



## **#console.memory**

The memory property can be used to check out the heap size status

Note: memory is a property and not a method.





https://cdn.hackernoon.com/images/ckqxl-3-uq-0002-f-0-as-6-fyuxh-0-g-2.jpg
![alt_text](images/image10.png "image_tooltip")



## **#console.table()**

Displays tabular data as a table.





https://cdn.hackernoon.com/images/ckqxl-3-uq-1002-g-0-as-62-ejd-4-s-0-r.jpg
![alt_text](images/image11.png "image_tooltip")



## **#console.time() and console.timeEnd()**

console.time() – Starts a timer with a name specified as an input parameter. Up to 10,000 simultaneous timers can run on a given page.console.timeEnd() – Stops the specified timer and logs the elapsed time in seconds since it started.





https://cdn.hackernoon.com/images/ckqxl-3-uq-4002-h-0-as-643-a-1-d-0-bc.jpg
![alt_text](images/image12.png "image_tooltip")



## **#console.trace()**

Outputs a stack trace.





https://cdn.hackernoon.com/images/ckqxl-3-uq-4002-i-0-as-615-apelir.jpg
![alt_text](images/image13.png "image_tooltip")



