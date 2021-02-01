// Remember, we're gonna use strict mode in all scripts now!
'use strict';

/*
const x = '23';
if (x === 23) console.log(23);

const calcAge = (birthYear) => 2037 - birthYear;

console.log(`Hello`);
*/

const temperatures = [3, -2, -6, -1, `error`, 9, 13, 17, 15, 14, 9, 5];
const temperatures2 = [3, -2, -6, -1, 9, 13, 17, 15, 14, 9, 5];

/*
1) Understand problem
- what is temp amplitude? Answer: difference etween highst and lowest temp
- How to compute max and min temperatures?
What's a sensor error? And what to do?

2) Breaking up into sub-problems
- How to ignore erros?
- Find max value in temp array
- Find min value in temp array
- Subtract min from max (amplitude) and return it


const calcTempAmplitude = function (temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== `number`) continue;

    if (curTemp > max) max = curTemp;

    if (curTemp < min) min = curTemp;
  }
  console.log(max);
  console.log(min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

//Problem 2 - Function should now receive two arrays of temperatures

// 1) Understand the problem
// -With 2 arrays, should we implement functionality twice? NO. Just merge the two arrays
// 2) Breaking into sub-problems
// - Merge 2 arrays
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  let max = temps[0];
  let min = temps[0];
  for (let i = 1; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== `number`) continue;

    if (curTemp > max) max = curTemp;

    if (curTemp < min) min = curTemp;
  }
  console.log(max);
  console.log(min);
  return max - min;
};

const amplitudeNew = calcTempAmplitude(temperatures, temperatures2);
console.log(amplitudeNew);



const measureKelvin = function () {
  const measurement = {
    type: `temp`,
    unit: `celsius`,
    // value: Number(prompt(`Degree celsius`)),
    value: 10,
  };
  //   console.warn(`Warning`);
  //   console.error(`Error`);
  const kelvin = measurement.value + 273;
  return kelvin;
};

console.log(measureKelvin());

const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);

  let max = 0;
  let min = 0;

  for (let i = 1; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== `number`) continue;

    // debugger;
    if (curTemp > max) max = curTemp;

    if (curTemp < min) min = curTemp;
  }
  console.log(max);
  console.log(min);
  return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
console.log(amplitudeBug);
*/

/*
Coding Challenge #1
Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!

Test data:
§ Data 1: [17, 21, 23]
§ Data 2: [12, 5, -5, 0, 4]

*/

/*
- Make function
- for loop
- use for loop to tap into array. Use iterator variable to tell how many days
- will have to account for array counter being off by one (0-base)
*/

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let x = `... `;
  for (let i = 0; i < arr.length; i++) {
    x += `${arr[i]}°C in ${i + 1} days ... `;
  }
  console.log(x);
};

printForecast(data1);
printForecast(data2);
