'use strict';

////////////////////////////////////////////
// Constructor Functions and the New Operator
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
};

const jonas = new Person(`jonas`, 1991);

console.log(jonas);

// 1. New empty object is created
// 2. Function is called, this = {} (new empty object)
// 3. Newly created object {} is linked to prototype
// 4. Object created in beginning is automatically returned {}

const matilda = new Person(`Matilda`, 2017);
const jack = new Person(`Jack`, 1975);

console.log(matilda, jack);

console.log(jonas instanceof Person);

////////////////////////////////////////////
// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));

// false
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = `Homo Sapiens`;
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty(`firstName`)); //true
console.log(jonas.hasOwnProperty(`species`)); //false

////////////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 2, 3, 4, 4, 5, 3];
console.log(arr.__proto__); //Array object

console.log(arr.__proto__ === Array.prototype); //true
console.log(arr.__proto__.__proto__); // Object

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector(`h1`);
console.dir(h1);
console.dir(x => x + 1);
