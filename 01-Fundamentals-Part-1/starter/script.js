/*
let js = 'amazing';

console.log(40 + 8 + 23 - 10);

console.log('Jonas');
console.log(23);

let firstName = "Matilda";
let first = 'jonas'

// Test Comment
console.log(firstName);
console.log(firstName);
console.log(firstName);

myFirstJob = 'Programmer';
myCurrentJob = "Teacher ";


true;
let javascriptIsFun = true;
console.log(javascriptIsFun);

// console.log(typeof true);
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "John");

javascriptIsFun = "YES!";

console.log(typeof javascriptIsFun);

let year;
console.log(year);
console.log(typeof year);

year = 1991;

console.log(year);
console.log(typeof year);

console.log();


let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990;

// const job;

var job = "programmer";
job = "teacher";

lastName = "Schmedtmann";
console.log(lastName);



//Arithmetic operators

const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2020;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3

const firstName = "John";
const lastName = "Gardiner";
console.log(firstName + " " + lastName);

let x = 10 + 5
x += 10; // x = x + 10
x *= 4
x++;
x--;
x--;
console.log(x);

//Comparison operators
console.log(ageJonas > ageSarah); // >, <, >=, <=

console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);




const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2020;

console.log(now - 1991 > now - 2018);

// console.log(25 - 10 - 5);

let x, y;
x = y = 25 - 10 - 5;

console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah);




//17 - Strings and Literals
const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!";

console.log(jonas);

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);

console.log(`test string`)

console.log("string with \n\
multiple \n\
lines")

console.log(`String
m,ultiopl
lines`)


//18 - Taking Decisions: If/else statements
const age = 15;

if (age >= 18) {
    console.log(`Sarah can start driving license😊🤦‍♀️😎`)
} else {
    console.log(`Too yung boi👏👏👏`)
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years.`)
}

const birthYear = 1991;
let century;

if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}

console.log(century);



//20 - Type Conversion and Coercion
// Type Conversion
const inputYear = '1991';
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number(`jonas`));
console.log(typeof NaN);

console.log(String(23), 23);

//Type coercion
console.log(`I am ` + 23 + ` years old`)
console.log(`23` - `10` - 3);
console.log(`23` / `2`);
console.log(`23` > `18`);

let n = `1` + 1;
n = n - 1;
console.log(n)


//21 - Truthy and Falsy Values
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(`Jonas`));
console.log(Boolean({}));

const money = 0;

if (money) {
    console.log(`Don't spend it all`)
} else {
    console.log(`you should get a job`)
}

let height = 0;

if (height) {
    console.log(`Yay height defined`)
} else {
    console.log(`AHHHHHH`)
}

//22 - Equality Operators: == vs. ===
const age = '18';

if (age === 18) console.log(`You just became an adult (strict)`);

if (age == 18) console.log(`You just became an adult (loose)`);

const favorite = Number(prompt(`What is your favorite number?`));
console.log(favorite);
console.log(typeof favorite);

if (favorite === 23) {
    console.log(`Cool! 23 is an amazing number`)
} else if (favorite === 7) {
    console.log(`7 is also a cool number`)
} else if (favorite === 9) {
    console.log(`Grrrrrrr`)
} else {
    console.log(`Number is not 23 or 7 or 9`)
}

if (favorite !== 23) console.log(`Why not 23?`)



//24 - Logical Operators
const hasDriversLicense = true;
const hasGoodVision = true;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

// const shouldDrive = hasDriversLicense && hasGoodVision;

// if (hasDriversLicense && hasGoodVision) {
//     console.log(`able to drive`)
// } else {
//     console.log(`someone else should drive`)
// }

const isTired = false;

console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
    console.log(`able to drive`)
} else {
    console.log(`someone else should drive`)
}



//26 - The Switch Statement

const day = `monday`;

switch (day) {
    case `monday`: //day ===`monday`
        console.log(`Plan course structure`);
        console.log(`Go to coding meetup`);
        break;
    case `tuesday`:
        console.log(`prepare theory videos`):
        break;
    case `wednesday`:
    case `thursday`:
        console.log(`Write code examples`);
        break;
    case `friday`:
        console.log(`Record videos`);
        break;
    case `saturday`:
    case `sunday`:
        console.log(`enjoy the weekend 🤑`)
        break;
    default:
        console.log(`not a valid day`)
        break;
}



//27 - Statements and Expressions
if (23 > 10) {
    const str = `23 is bigger`;
}

*/

//28 - The Conditional (Ternary) Operator
const age = 23;
// age >= 18 ? console.log(`I like to drink wine 😀`) : console.log(`I like to drink water dddddddd`)

const drink = age >= 18 ? `wine` : `water`;

console.log(drink)

let drink2;
if (age >= 18) {
    drink2 = `wine`
} else {
    drink2 = `water`
}

console.log(drink2)

console.log(`I like to drink ${age >= 18 ? `wine` : `water`}`)