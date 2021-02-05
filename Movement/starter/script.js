'use strict';

// Selecting elements

const diceEl = document.getElementById(`dice`);

let diceLeft = 50;
let diceTop = 50;

diceEl.style.top = diceTop + `px`;
diceEl.style.left = diceLeft + `px`;

document.addEventListener(`keypress`, function (k) {
  console.log(k);

  if (k.key === 'w') {
    // console.log(`w was pressed`);
    // console.log(diceTop);
    diceTop--;
    diceEl.style.top = diceTop + `px`;
    // console.log(Number(diceEl.style.top));
  } else if (k.key === 's') {
    diceTop++;
    diceEl.style.top = diceTop + `px`;
  } else if (k.key === 'a') {
    diceLeft--;
    diceEl.style.left = diceLeft + `px`;
  } else if (k.key === `d`) {
    diceLeft++;
    diceEl.style.left = diceLeft + `px`;
  }
});
