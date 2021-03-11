'use strict';
/*
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

Person.hey = function () {
  console.log(`Hey there`);
  console.log(this);
};

Person.hey();

*/
/*

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
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀

// My solution
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`The ${this.make} is now going ${this.speed} km/h.`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`The ${this.make} is now going ${this.speed} km/h.`);
};

const car1 = new Car(`BMW`, 120);
const car2 = new Car(`Mercedes`, 95);

car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.brake();
car1.brake();

car2.accelerate();
car2.accelerate();
car2.accelerate();
car2.brake();
car2.brake();
*/

/*
////////////////////////////////////////////
// ES6 Classes

// Class Expression
// const PersonCl = class {}

// Class Declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(` `)) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log(`Hey there`);
    console.log(this);
  }
}

const jessica = new PersonCl(`Jessica Davis`, 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

jessica.greet();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

const walter = new PersonCl(`Walter White`, 1965);
console.log(walter);

PersonCl.hey();

////////////////////////////////////////////
// Setters and Getters

const account = {
  owner: `jonas`,
  movemements: [200, 530, 120, 300],

  get latest() {
    return this.movemements.slice(-1).pop();
  },

  set latest(mov) {
    this.movemements.push(mov);
  },
};

console.log(account.latest);

account.latest = 60;

console.log(account.movemements);

////////////////////////////////////////////
// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = `Steven`;
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init(`Sarah`, 1979);
sarah.calcAge();

////////////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`The ${this.make} is now going ${this.speed} km/h.`);
  }

  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} is now going ${this.speed} km/h.`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car = new CarCl(`Ford`, 120);

car.accelerate();
car.accelerate();
car.accelerate();
car.brake();
console.log(car.speedUS);
car.speedUS = 0;
car.accelerate();
console.log(car.speedUS);
car.speedUS = 100;
console.log(car.speed);

*/

////////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking Prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student(`Mike`, 2020, `Computer Science`);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor);
