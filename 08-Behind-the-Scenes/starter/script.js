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
*/

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
