'use strict';

////////////////////////////////////////////
// Constructor Functions and the New Operator
const Person = function (firstName, birthYear) {
  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
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
