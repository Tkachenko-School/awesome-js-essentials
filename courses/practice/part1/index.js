var response = {
    data: [
        {
            users: [1, 2, 3],
            subData: [{},{},{}]
        },
        {
            users: [4, 5, 6],
            subData: [{},{},{}]
        }
    ]
}

var users = response.data.map(o => o.users);

const userCollection = [].concat(...users);

console.log(userCollection);

// -----


var response2 = {
    data: [
        {
            users: [1, 2, 3],
            subData: [{},{},{}]
        },
        {
            users: [4, 5, 6],
            subData: [{},{},{}]
        }
    ]
}

var users2 = response2.data.map(o => o.users).flat();
// var users2 = response.data.flatMap(o => o.users);


console.log(users2);

//-------------------

var response3 = {
    data: [
        {
            users: [1, 2, 3],
            subData: [{},{},{}]
        },
        {
            users: [4, 5, 6],
            subData: [{},{},{}]
        }
    ]
}


//var users3 = response.data.reduce((accumulator, obj) => [...accumulator, ...obj.users], []);

//console.log(users3);


var users4 = [];

for (let v of response3.data){
    users4.push(...v.users);
}

console.log(users4);