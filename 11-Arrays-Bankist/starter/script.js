'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? `deposit` : `withdrawal`;

    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__value">${mov}</div>
  </div>
  `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(move => move > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} EUR`;

  const out = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0)
  );

  labelSumOut.textContent = `${out} EUR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} EUR`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(` `)
      .map(name => name[0])
      .join(``);
  });
};

createUsernames(accounts);

// Event handler
let currentAccount;

btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(` `)[0]
    }`;
    // Display movements
    containerApp.style.opacity = 100;
    displayMovements(currentAccount.movements);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    // Display balance
    calcDisplayBalance(currentAccount.movements);

    // Display summary
    calcDisplaySummary(currentAccount);
  }
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Simple Array Methods
/*
let arr = [`a`, `b`, `c`, `d`, `e`];

// SLICE
console.log(`Slice`);
console.log(...arr.slice(2));
console.log(...arr.slice(2, 4));
console.log(...arr.slice(-2));
console.log(...arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());

// SPLICE
console.log(`Splice`);
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// REVERSE
arr = [`a`, `b`, `c`, `d`, `e`];
const arr2 = [`j`, `i`, `h`, `g`, `f`];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);

// JOIN
console.log(letters.join(' - '));

////////////////////////////////////////////
// Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    }
  }
  console.log(`\n---- FOREACH ----`);
  
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
  });
  
  // 0: function(200)
  // 1: function(450)...
  
  
  ////////////////////////////////////////////
  // ForEach with Maps and Sets
  // Map
  const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
  ]);
  
  currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
  });
  
  // Set
  const currenciesUnique = new Set([`USD`, `GBP`, `USD`, `EUR`, `EUR`]);
  console.log(currenciesUnique);
  currenciesUnique.forEach(function (value, _, map) {
    console.log(`${value}: ${value}`);
  });
  
*/

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

// Data Set 1
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = dogsJulia.slice();
  dogsJuliaCopy.splice(0, 1);
  dogsJuliaCopy.splice(-2);
  // console.log(dogsJuliaCopy);
  const allDogs = dogsJuliaCopy.concat(dogsKate);
  console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    console.log(
      `Dog number ${i + 1} is ${
        dog >= 3 ? `an adult and is ${dog} years old` : `still a puppy`
      }`
      );
    });
  };
  
  let dogsJulia = [3, 5, 2, 12, 7];
  let dogsKate = [4, 1, 15, 8, 3];
  
  checkDogs(dogsJulia, dogsKate);
  
  dogsJulia = [9, 16, 6, 8, 3];
  dogsKate = [10, 5, 6, 1, 4];
  
  checkDogs(dogsJulia, dogsKate);
  
  
  ////////////////////////////////////////////
  // The Map Method
  
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  
  const eurToUsd = 1.1;
  
  /* Standard Function
  const movementsUSD = movements.map(function (mov) {
    return mov * eurToUsd;
  });
  
  
  // Mini-challenge - with Arrow Function
  const movementsUSD = movements.map(mov => mov * eurToUsd);
  
  console.log(movements);
  console.log(movementsUSD);
  
  // Using for-of loop instead...
  const movementsUSDfor = [];
  
  for (const mov of movements) {
    movementsUSDfor.push(mov * eurToUsd);
  }
  
  console.log(movementsUSDfor);
  
  
  // FOR REFERENCE
  movements.forEach(function (mov, i, arr) {
    if (mov > 0) {
      console.log(`Movement ${i + 1}: You deposited ${mov}`);
    } else {
      console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    }
  })
  
  // Different method
  const movementDescriptions = movements.map((mov, i) => {
    return `Movement ${i + 1}: You ${
      mov > 0 ? `deposited` : `withdrew`
    } ${Math.abs(mov)}`;
  });
  
  console.log(movementDescriptions);
  

////////////////////////////////////////////
// The Filter Method

// Filter
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

const depositsFor = [];

// For Each loop
for (const mov of movements) {
  if (mov > 0) depositsFor.push(mov);
}

// MINI CHALLENGE - Make an array of the withdrawals
const withdrawals = movements.filter(mov => mov < 0);

console.log(movements);
console.log(deposits);
console.log(depositsFor);
console.log(withdrawals);

////////////////////////////////////////////
// The Reduce Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

// Accumulator is like a snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iterationn ${i}: ${acc}`);
//   return acc + cur;
// }, 0);

const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
const maximum = movements.reduce(
  (max, cur) => (max > cur ? max : cur),
  movements[0]
);

console.log(maximum);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

// --- My version ---
// Spread out
const calcAverageHumanAge = function (ages) {
  // Calculate Dog Age in Human Years
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);

  // Filter out dogs that are not 18 in human years
  const adultDogs = humanAges.filter(age => age >= 18);
  console.log(adultDogs);

  // Calculate average human age of all "adult" dogs
  return adultDogs.reduce((acc, cur) => acc + cur, 0) / adultDogs.length;
};

let dogs = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanAge(dogs));
dogs = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(dogs));

// Condensed Version
const calcAverageHumanAgeCondensed = ages =>
  // Calculate Dog Age in Human Years
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce(
      (acc, cur, i, arr) =>
        i === arr.length - 1 ? (acc + cur) / (i + 1) : acc + cur,
      0
    );

dogs = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanAgeCondensed(dogs));
dogs = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAgeCondensed(dogs));

// --- His Solution ---

const calcAverageHumanAgeJ = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  const adults = humanAges.filter(age => age >= 18);
  console.log(humanAges);
  console.log(adults);
  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  // Another way to average
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return average;
};

dogs = [5, 2, 4, 1, 15, 8, 3];
calcAverageHumanAgeJ(dogs);
console.log(calcAverageHumanAgeJ(dogs));

////////////////////////////////////////////
// The Magic of Chaining Methods

const eurToUsd = 1.1;

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

const calcAverageHumanAge = ages =>
  // Calculate Dog Age in Human Years
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

let dogs = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanAge(dogs));
dogs = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(dogs));


////////////////////////////////////////////
// The find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === `Jessica Davis`);
console.log(account);

// Mini-Challenge - Implement the above as a forEach loop
let accountForEach;
accounts.forEach(function (account) {
  if (account.owner === `Jessica Davis`) {
    accountForEach = account;
  }
});
*/
