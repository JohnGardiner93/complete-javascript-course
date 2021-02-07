'use strict';
/*

function calcAge(birthYear) {
    const age = 2037 - birthYear;
    //   console.log(firstName);
    
    function printAge() {
        let output = `${firstName} is ${age}, born in ${birthYear}`;
        console.log(output);
        
        if (birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            //Creating New variable with same name as outer scope's variable
            const firstName = `Steven`;
            
            //Reassigning outer scope's variable
            output = `NEW OUTPUT!`;
            
            const str = `Oh, and you're and a millenial, ${firstName}`;
            console.log(str);
            
            // console.log(str); - block-scoped, doesn't work
            // console.log(millenial); - var variables are function-scoped, not block-scoped
            function add(a, b) {
                return a + b;
            }
        }
        console.log(output);
    }
    printAge();
    //   add(2, 3); functions are block scoped as well. This is only true for STRICT mode
    return age;
}

const firstName = `John`;
calcAge(1991);
console.log(firstName);

//Hoisting

//Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = `John`;
let job = `teacher`;
const year = 1991;

//Functions
console.log(addDecl(2, 2));
// console.log(addExpr(2, 2));
// console.log(addArrow(2, 2));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log(`all products deleted!`);
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);


//The this keyword

// Function
// console.log(this);
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  // console.log(this);
};

// calcAge(1991);

//Arrow Function
const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  // console.log(this);
};

// calcAgeArrow(2015);

//Object
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

//Method Borrowing
matilda.calcAge = jonas.calcAge;
matilda.calcAge();

const f = jonas.calcAge;

f();


// Regular Functions vs Arrow Functions

// var firstName = `matilda`;

const jonas = {
  firstName: `Jonas`,
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
    
    // Solution 1
    // const self = this;
    // const isMillenial = function () {
      //   console.log(self);
      //   console.log(self.year >= 1981 && self.year <= 1996);
      // };
      // isMillenial();
      
      // Solution 2
      const self = this;
      const isMillenial = () => {
        console.log(this);
        console.log(this.year >= 1981 && this.year <= 1996);
      };
      isMillenial();
    },
    
    greet: () => {
      console.log(`Hey ${this.firstName}`);
      console.log(this);
    },
  };
  
  jonas.greet();
  jonas.calcAge();
  
  // Arguments keyword
  const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
  };
  
  addExpr(2, 5);
  addExpr(2, 5, 8, 12);
  
  var addArrow = (a, b) => {
    console.log(arguments);
    return a + b;
  };
  
  addArrow(2, 5, 8);
  
  
  // Primitives vs Objects (Primitive vs. Reference Types)
  
  let age = 30;
  
  let oldAge = age;
  
  age = 31;
  
  console.log(age);
  console.log(oldAge);
  
  const me = {
    name: `Jonas`,
    age: 30,
  };
  
  const friend = me;
  
  friend.age = 27;
  console.log(`Friend`, friend);
  console.log(`Jonas`, me);
  
  */

// Primitives vs. Objects in Practice

let lastName = `Williams`;

let oldLastName = lastName;

lastName = `Davis`;

console.log(lastName);
console.log(oldLastName);

const jessica = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 28,
};

const marriedJessica = jessica;

marriedJessica.lastName = `Davis`;
console.log(`Before Marriage: `, jessica);
console.log(`AFter Marriage`, marriedJessica);

// marriedJessica = {}; DOES NOT WORK since variable is a const

//Copying objects (Shallow copies)
const jessica2 = {
  firstName: `Jessica`,
  lastName: `Williams`,
  age: 28,
  family: [`Alice`, `Bob`],
};

const jessicaCopy = Object.assign({}, jessica2);

jessicaCopy.lastName = `Davis`;

jessicaCopy.family.push(`Mary`);
jessicaCopy.family.push(`John`);

console.log(jessica2);
console.log(jessicaCopy);
