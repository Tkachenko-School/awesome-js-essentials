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

  // create root for top-level node(s)

  const root = [];

  flat.forEach(node => {

    // case: no parentId means top level
    if (!node.parentId){
        return root.push(node);
    }

    // adding cache for parent indexes that we find at this point
    const map = {};


    //inserting a node as child of parent in a flat array
    // const parentIndex = flat.findIndex(element => element.id === node.parentId);

    // if (!flat[parentIndex].children){
    //     return flat[parentIndex].children = [node];
    // }

    // we inserting a node as child of parent in a flat array
    let parentIndex = map[node.parentId];

    if ( typeof parentIndex !== "number" ){
        parentIndex = flat.findIndex(element => element.id === node.parentId);
        map[node.parentId] = parentIndex;
    }

    if(!flat[parentIndex].children){
        return flat[parentIndex].children = [node];
    }



    flat[parentIndex].children.push(node);

  })

  console.log(root);