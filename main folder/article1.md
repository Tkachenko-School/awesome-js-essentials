# You Might Not Need that Recursive Function in JavaScript

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder/images/article1-folder/1fIdovfxwYhOh9jFSse2ZKw.png)

**Edit:** I have been getting quite a bit of feedback interpreting this article to mean that recursive functions are bad and iterative methods are always better. This couldn’t be further from what I believe — This article simply aims to discuss iteration as an alternative tool!

In programming, we’re often faced with situations where the answer appears to require solving the same problem an indeterminate number of times. When we encounter a problem like this, we tend to reach for recursion — often accomplished by creating a function that calls itself as many times as necessary. Recursion is extremely important in programming and many problems can only be solved by using it. That being said, recursion can be slower, fill up the call stack, and can be conceptually trickier.

In this post, I will explore an example of a problem that seems to lend itself to a recursive solution, but can in fact be solved more efficiently through an understanding of JavaScript object references. The motivation for this post example came from an excellent [StackOverflow](<https://stackoverflow.com/a/18018037/6525724>) answer that I have adapted.

### The Problem

In this problem, we are attempting to build a hierarchical object tree structure based on a flat array of objects. We do not know ahead of time how deep the tree will be, but we know that each node can only have one parent and can have any number of children. A visualization of an example tree we can work with is as follows:

![](https://github.com/ChickenKyiv/awesome-js-essentials/blob/master/main%20folder/images/article1-folder/3nhao37bBEfHA9RTQ0WNVWfXPD02-g1632b8.png)

*(Example Tree Structure)*

As mentioned, the data we receive to build this tree example is a flattened array in the following format. Each element represents one node of the tree and can be the child of only one parent node. Node 8 has no parent, so we can see in the array below that the object for `id` 8 has a `parentId` equal to `null`.

```
const flat = [
  { id: 1, parentId: 3 },
  { id: 3, parentId: 8 },
  { id: 4, parentId: 6 },
  { id: 6, parentId: 3 },
  { id: 7, parentId: 6 },
  { id: 8, parentId: null },
  { id: 10, parentId: 8 }, 
  { id: 13, parentId: 14 },
  { id: 14, parentId: 10 }
]
```

The final structure we need to rearrange this flat array into is as follows:

```
[
  { 
    id: 8,
    children: [
      { 
        id: 3, 
        children: [
          { 
            id: 1, 
            children: [] 
          }, 
          { 
            id: 6, 
            children: [ 
              { id: 4, children: [] }, 
              { id: 7, children: [] } 
            ]
          }
        ] 
      },
      { 
        id: 10, 
        children: [ 
          { 
            id: 14, 
            children: [
              { id: 13, children: [] }
            ] 
          }
        ]
      }
    ]
  }
]
```
## The Solution
Your first inkling in this scenario might be to reach for recursion: we’re given a tree of indeterminate length. We imagine we might have to create a function that populates a node’s children. Then, we recursively call that function until the tree is fully populated and (i.e., no more child nodes are found).

While this would probably work, there is a better way!

We can simply iterate through the array and assign each object to the `children`array of its parent object. This may not make intuitive sense, but consider this logic:

Object `3` is assigned to the `children`array of object `8`

Object `6` is assigned to the `children` array of object `3`

The Object `3` that was assigned to the `children` array of object `8` is really just a *reference* to Object `3` in memory… meaning its `children` array will have the Object `6` reference.

This logic extends to the entire array, meaning we just need to go through the array once to build out our tree!

Here is a potential non-recursive solution based on this idea:

```
const flat = [
  { id: 1, parentId: 3 },
  { id: 3, parentId: 8 },
  { id: 4, parentId: 6 },
  { id: 6, parentId: 3 },
  { id: 7, parentId: 6 },
  { id: 8, parentId: null },
  { id: 10, parentId: 8 }, 
  { id: 13, parentId: 14 },
  { id: 14, parentId: 10 }
]

// Create root for top-level node(s)
const root = [];

flat.forEach(node => {
  // No parentId means top level
  if (!node.parentId) return root.push(node);
  
  // Insert node as child of parent in flat array
  const parentIndex = flat.findIndex(el => el.id === node.parentId);
  if (!flat[parentIndex].children) {
    return flat[parentIndex].children = [node];
  }
  
  flat[parentIndex].children.push(node);
});

console.log(root);
```

Nice and simple, and we only iterate through the array once!

There is one bonus optimization I would like to make: the `findIndex` function we use each time through the loop isn’t a big deal for the small example tree, but this could actually get expensive if we’re working with a large tree. Let’s create an object to cache found parent locations.

```
// Create root for top-level node(s)
const root = [];
// Cache found parent index
const map = {};

flat.forEach(node => {
  // No parentId means top level
  if (!node.parentId) return root.push(node);
  
  // Insert node as child of parent in flat array
  let parentIndex = map[node.parentId];
  if (typeof parentIndex !== "number") {
    parentIndex = flat.findIndex(el => el.id === node.parentId);
    map[node.parentId] = parentIndex;
  }
  
  if (!flat[parentIndex].children) {
    return flat[parentIndex].children = [node];
  }
  
  flat[parentIndex].children.push(node);
});

console.log(root);
```
Success! We have accomplished our tree build without implementing a recursive function.