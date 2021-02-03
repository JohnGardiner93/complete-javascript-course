'use strict';

/*
console.log(document.querySelector(`.message`).textContent);
console.log(document.querySelector(`.message`).textContent);
document.querySelector(`.number`).textContent = 13;
document.querySelector(`.score`).textContent = 10;
document.querySelector(`.guess`).value = 23;
console.log(document.querySelector(`.guess`).value);
*/

let secretNumber = -1;
let score = -1;
let highScore = 0;

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function resetNums() {
  secretNumber = generateRandomNumber();
  score = 20;
  console.log(secretNumber);
}

function displayMessage(message) {
  document.querySelector(`.message`).textContent = message;
}

resetNums();

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);
  // console.log(typeof guess);

  if (!guess) {
    displayMessage(`👹 No number!`);
    //When player wins
  } else if (guess === secretNumber) {
    if (score > highScore) {
      highScore = score;
      document.querySelector(`.highscore`).textContent = highScore;
    }
    displayMessage(`🤑 Correct Number`);
    document.querySelector(`body`).style.backgroundColor = '#60b347';
    document.querySelector(`.number`).style.width = '30rem';
    document.querySelector(`.number`).textContent = secretNumber;
  } //When guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? `🐒 Too High` : `🦥 Too Low`);
      score--;
      document.querySelector(`.score`).textContent = score;
    } else {
      displayMessage(`Y💀U L💀SE BEANB💀Y`);
      document.querySelector(`.score`).textContent = 0;
      document.querySelector(`body`).style.backgroundColor = '#FF0000';
    }
  }
});

//"Again" button
document.querySelector(`.again`).addEventListener(`click`, function () {
  // console.log(`You clicked the reset button`);
  resetNums();
  document.querySelector(`body`).style.backgroundColor = '#222';
  displayMessage(`Start guessing...`);
  document.querySelector(`.number`).style.width = '15rem';
  document.querySelector(`.number`).textContent = `?`;
  document.querySelector(`.guess`).value = '';
  document.querySelector(`.score`).textContent = score;
});
