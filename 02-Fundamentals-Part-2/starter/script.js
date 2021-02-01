'use strict';
/*
// 32 - Activiting Strict Mode
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;

if (hasDriversLicense) console.log(`I can drive 😀😀`);

// const interface = `Audio`;
// const private = 534;


//33 - Functions

function logger() {
    console.log(`My name is John`);
}

//calling / running / invoking function
logger();
logger();

function fruitProcessor(apples, oranges) {
    // console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// console.log(fruitProcessor(5, 0))

const orangeJuice = fruitProcessor(2, 4);
console.log(orangeJuice);




//34 - Function Declarations vs. Expressions

const age1 = calcAge1(1991);
console.log(age1)

//Function Declaration
function calcAge1(birthYear) {
    return 2037 - birthYear;
}

//Function Expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);

console.log(age1, age2)


//35 - Arrow Functions

//Arrow Function
const calcAge3 = birthYear => 2037 - birthYear;

const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years.`;
}

console.log(yearsUntilRetirement(1991, `BeanBoi`));
console.log(yearsUntilRetirement(1980, `BeanMan`));



//36 - Functions Calling Other Functions

function cutFruitPieces(fruit) {
    return fruit * 4;
}


function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);
    // console.log(apples, oranges);
    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces.`;
    return juice;
}

console.log(fruitProcessor(2, 3));



const calcAge = function (birthYear) {
    return 2037 - birthYear;
}


//37 - Reviewing Functions
function yearsUntilRetirement(birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age
    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement;

    } else {
        console.log(`${firstName} is already retired 😴😴`);
        return -1;
    }
}

console.log(yearsUntilRetirement(1991, `Beans`))
console.log(yearsUntilRetirement(1970, `Mike`))



const friend1 = `Michael`;
const friend2 = `Stephen`;
const friend3 = `Peter`;

const friends = [`Michael`, `Steven`, `Peter`]

console.log(friends);

const y = new Array(1991, 1984, 2008, 2020);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = `Jay`;

console.log(friends[2]);

const firstName = `Jonas`
const jonas = [firstName, `Beanboy`, 2037 - 1991, `teacher`, friends]

console.log(jonas)
console.log(jonas.length)

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const years = [1990, 1967, 2002, 2010, 2018];

const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);

console.log(age1);
console.log(age2);
console.log(age3);

const ages = [calcAge(years[0]), calcAge(years[1]), calcAge(years[2])]

console.log(ages)


//Add Elements
const friends = [`Michael`, `Steven`, `Peter`]
const newLength = friends.push(`Jay`);
console.log(friends);
console.log(newLength);

friends.unshift(`John`);
console.log(friends);

//Remove elements
friends.pop();
const popped = friends.pop();
console.log(friends);
console.log(popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf(`Steven`));
console.log(friends.indexOf(`Bob`));

friends.push(23)
console.log(friends.includes(`Steven`));
console.log(friends.includes(`Bob`));
console.log(friends.includes(23));

if (friends.includes(`Steven`)) {
    console.log(`You have a friend called Steven`)
}



//Introdution to Ojects
const jonas = {
    firstName: `Jonas`,
    lastName: `Schmedtmann`,
    age: 2037 - 1991,
    job: `teacher`,
    friends: [`Michael`, `Peter`, `Steve`]
};

//43 - Dot vs Bracket Notation

const jonas = {
    firstName: `Jonas`,
    lastName: `Schmedtmann`,
    age: 2037 - 1991,
    job: `teacher`,
    friends: [`Michael`, `Peter`, `Steve`]
};

console.log(jonas);

console.log(jonas.lastName);
console.log(jonas[`lastName`]);

const nameKey = `Name`;

console.log(jonas[`first` + nameKey]);
console.log(jonas[`last` + nameKey]);

const interestedin = prompt(`What do you want to know about Jonas? Choose between firstName, lastName, age, job, and friends`);


if (jonas[interestedin]) {
    console.log(jonas[interestedin]);
} else {
    console.log(`Wrong request`)
}

jonas.location = `Portugal`;
jonas[`twitter`] = `@jonasschmedtmann`
console.log(jonas)

//Challenge
//Jonas has 3 friends, and his best friend is called Michael.

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`)



//44 - Object Methods

const jonas = {
    firstName: `Jonas`,
    lastName: `Schmedtmann`,
    birthYear: 1991,
    job: `teacher`,
    friends: [`Michael`, `Peter`, `Steve`],
    hasDriversLicense: true,

    // calcAge: function (birthYear) {
    //     return 2037 - birthYear;
    // }

    // calcAge: function () {
    //     // console.log(this)
    //     return 2037 - this.birthYear
    // }

    calcAge: function () {
        // console.log(this)
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()} year old ${this.job} and he has ${this.hasDriversLicense ? `a` : `no`} driver's license`
    }

};

// console.log(jonas.calcAge(1991));
console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);

//Challenge
//"Jonas is a 46 year old teacher and he has a/no driver's license."
console.log(jonas.getSummary())



//46 - Iteration: The for Loop

//for loop keeps running while condition is true
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 😶`)
}

//47 - Looping Arrays, Breaking and Continuing
const jonas = [
    `Jonas`,
    `Beanboy`,
    2037 - 1991,
    `teacher`,
    [`Michael`, `Peter`, `Steven`],
    true
];

const types = [];

for (let i = 0; i < jonas.length; i++) {
    //Reading from jonas array
    console.log(jonas[i], typeof jonas[i]);

    //Filling types array
    // types[i] = typeof jonas[i];
    types.push(typeof jonas[i])
}
console.log(types)

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}

console.log(ages)

console.log(`-----only strings -----`)
// continue and break
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] !== `string`) continue;
    console.log(jonas[i], typeof jonas[i]);
}

console.log(`---- BREAK WITH NUMBER -----`)
// continue and break
for (let i = 0; i < jonas.length; i++) {
    if (typeof jonas[i] === `number`) break;
    console.log(jonas[i], typeof jonas[i]);
}


//48 - Looping Backwards and Loops in Loops
const jonas = [
    `Jonas`,
    `Beanboy`,
    2037 - 1991,
    `teacher`,
    [`Michael`, `Peter`, `Steven`],
];

for (let i = jonas.length - 1; i >= 0; i--) {
    console.log(jonas[i]);
}

for (let exercise = 1; exercise <= 3; exercise++) {
    console.log(`--- STARTING EXERCISE ${exercise} ---`);
    for (let rep = 1; rep <= 5; rep++) {
        console.log(`Exercise ${exercise}: Lifting weight repitition ${rep}`);
    }
}
*/

//49 - The while Loop

// for (let rep = 1; rep <= 10; rep++) {
//     console.log(`Lifting weights repetition ${rep} 😶`)
// }

let rep = 1;

while (rep <= 10) {
    console.log(`Lifting weights repetition ${rep} 😶`)
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1
console.log(dice)

while (dice !== 6) {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(`You rolled a ${dice}`);
}