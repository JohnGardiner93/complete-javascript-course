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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} EUR`;
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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

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

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.blur();
  inputTransferAmount.value = inputTransferTo.value = ``;
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  // Update UI
  updateUI(currentAccount);
});

btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if (user === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // Delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = ``;
});

let sorted = false;

btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
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

////////////////////////////////////////////
// Some and Every

console.log(movements);

// EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate Callback
const deposit = mov => mov > 0;

console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

////////////////////////////////////////////
// Flat and FlatMap

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov);
// console.log(overallBalance);

const overallBalance = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overallBalance);


////////////////////////////////////////////
// Sorting Arrays

// Strings
const owners = [`Jonas`, `Zach`, `Adam`, `Martha`];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);
// console.log(movements.sort()); // doesn't work properly for numbers w/o parameters

// Return < 0, A, B (keep order)
// Return > 0 B, A (switch order)
// ascending order
movements.sort((a, b) => a - b);

console.log(movements);

// descending order
movements.sort((a, b) => b - a);
console.log(movements);

////////////////////////////////////////////
// More Ways of Creating and Filling Arrays

// By hand
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7); //creates new array with 7 empty elements
console.log(x);
// console.log(x.map(() => 5));

x.fill(1);
x.fill(1, 3);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// --- Mini-Challenge - 100 Random dice roll challenge ---
const diceRolls = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 7)
);
// console.log(diceRolls);

// c

labelBalance.addEventListener(`click`, function () {
  const movementsUI = Array.from(
    document.querySelectorAll(`.movements__value`),
    el => Number(el.textContent.replace('EUR', ''))
  );
  console.log(movementsUI);

  // Another way

  const movementsUI2 = [...document.querySelectorAll(`movements__value`)];
});

////////////////////////////////////////////
// Array Methods Practice

// 1. Calculate how much has been deposited in the bank
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
console.log(bankDepositSum);

// 2. Calculate how many deposits there have been in the bank with at least 1000 dollars

// Method 1 - flatMap + filter + length
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;
// console.log(numDeposits1000);

// Method 2 - Reduce method
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1000);

let a = 10;
console.log(++a);
console.log(a);

// 3. Create a new object instead of just a number or a string using reduce.
// Create an object which contains a sum of the deposits and of the withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? `deposits` : `withdrawals`] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4. Create function to convert any string to a titlecase (all letters capitalized except some) Example: This Is a Nice Title
// My solution
const titleCase = function (str) {
  const exceptions = [`a`, `an`, `the`, `but`, `or`, `on`, `in`, `with`];

  const newStr = str
    .toLowerCase()
    .split(` `)
    .map(cur =>
      exceptions.includes(cur)
        ? cur
        : cur[0].toUpperCase() + cur.slice(1, cur.length + 1)
    )
    .join(` `);

  return newStr;
};

console.log(titleCase(`This is a nice title`));
console.log(titleCase(`This is an UGLY title`));

// His solution
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = [`a`, `an`, `the`, `but`, `and`, `or`, `on`, `in`, `with`];

  const titleCase = title
    .toLowerCase()
    .split(` `)
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(` `);
  return capitalize(titleCase);
};
console.log(convertTitleCase(`This is a nice title`));
console.log(convertTitleCase(`this is a LONG title but not too long`));
console.log(convertTitleCase(`and here is another title with an EXAMPLE`));

// ---- Challenge - Re-create challenges 1-3 using arrays and only reduce method ----
// Reduce-Only methods
// 1. Amount of deposits
const bankDepositSumReduceOnly = accounts.reduce(
  (acc, cur) =>
    (acc += cur.movements.reduce(
      (acc, cur) => (cur >= 0 ? (acc += cur) : acc),
      0
    )),
  0
);
console.log(bankDepositSumReduceOnly);

// 2. Count deposits
const numDeposits1000_2 = accounts.reduce(
  (acc, cur) =>
    (acc += cur.movements.reduce((acc, cur) => (cur >= 1000 ? ++acc : acc), 0)),
  0
);

console.log(numDeposits1000_2);

// 3. Add deposits, withdrawals

const { deposits: deposits2, withdrawals: withdrawals2 } = accounts.reduce(
  (bigSums, cur) => {
    const sums = cur.movements.reduce(
      (sums, cur) => {
        sums[cur > 0 ? `deposits` : `withdrawals`] += cur;
        return sums;
      },
      { deposits: 0, withdrawals: 0 }
    );
    bigSums.deposits += sums.deposits;
    bigSums.withdrawals += sums.withdrawals;
    return bigSums;
  },
  { deposits: 0, withdrawals: 0 }
);

console.log(deposits2, withdrawals2);
*/

////////////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

GOOD LUCK 😀

TEST DATA:
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// My solution

// 1.
const calcFoodPortion = function (dogs) {
  dogs.forEach(
    dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
  );
};

calcFoodPortion(dogs);
console.log(dogs);

// 2.
const findDogByOwner = (dogs, name) =>
  dogs
    .map(dog => dog.owners)
    .reduce((result, owner, i) => (owner.includes(name) ? i : result), -1);

const sarahDog = findDogByOwner(dogs, `Sarah`);

console.log(
  `Sarah's dog eats too ${
    sarahDog.curFood > sarahDog.recommendedFood ? `much` : `little`
  }!`
);

// 3.
const { ownersEatTooMuch, ownersEatTooLittle } = dogs.reduce(
  (acc, dog) => {
    acc[
      dog.curFood > dog.recommendedFood
        ? `ownersEatTooMuch`
        : `ownersEatTooLittle`
    ].push(...dog.owners);
    return acc;
  },
  { ownersEatTooMuch: [], ownersEatTooLittle: [] }
);

console.log(ownersEatTooLittle, ownersEatTooMuch);

// 4.
console.log(`${ownersEatTooLittle.join(` and `)}'s dogs eat too little!`);
console.log(`${ownersEatTooMuch.join(` and `)}'s dogs eat too much!`);

// 5.
console.log(
  `There are ${
    dogs.some(dogs => dogs.curFood === dogs.recommendedFood) ? `some` : `no`
  } dogs eating exactly the right amount`
);

// 6.
console.log(
  dogs.some(
    dogs =>
      dogs.curFood < dogs.recommendedFood * 1.1 &&
      dogs.curFood > dogs.recommendedFood * 0.9
  )
);

// 7.
const okayDogs = dogs.filter(
  dog =>
    dog.curFood < dog.recommendedFood * 1.1 &&
    dog.curFood > dog.recommendedFood * 0.9
);
console.log(okayDogs);

// 8.
const dogsCopy = dogs.slice();
console.log(dogsCopy);

dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsCopy);

// ----- His solution -----
console.log(`His Solutions`);
// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);

// 2.
const dogSarah = dogs.find(dog => dog.owners.includes(`Sarah`));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recommendedFood ? `much` : `too little`
  }`
);

// 3.
const ownersEatTooMuch2 = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch2);

const ownersEatTooLittle2 = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle2);

// 4.
console.log(`${ownersEatTooMuch2.join(` and `)}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle2.join(` and `)}'s dogs eat too litte!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.

const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(dog => checkEatingOkay(dog)));

// 7.
console.log(dogs.filter(dog => checkEatingOkay(dog)));

// 8.
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(dogsSorted);
