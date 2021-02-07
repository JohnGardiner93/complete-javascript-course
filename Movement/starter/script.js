'use strict';

// Selecting elements
// const playerEl = document.getElementById(`player`);

// Declare Variables

//Functions

//Returns a string with "px" tagged onto the end of a number
const pixelizeNumber = function (num) {
  return num + `px`;
};

//Move an Entity (element)
const moveEntity = function (id, direction, position) {
  const entityStyle = document.getElementById(`${id}`).style;
  switch (direction) {
    case `up`:
      entityStyle.top = position + `px`;
      break;
    case `down`:
      entityStyle.top += this.movementIncrement;
      break;
    case `left`:
      this.posLeft -= this.movementIncrement;
      break;
    case `right`:
      this.posLeft += this.movementIncrement;
    default:
      return -1;
  }
};

//Objects
function Entity(
  posLeft,
  posTop,
  movementIncrement,
  height,
  id,
  entityType,
  art
) {
  //Set properties
  (this.posLeft = posLeft),
    (this.posTop = posTop),
    (this.movementIncrement = movementIncrement),
    (this.height = height),
    (this.id = id),
    (this.entityType = entityType),
    (this.art = art),
    this.entityElement,
    // Methods
    // Move - moves the entity and its representation on the board
    (this.move = function (direction) {
      //directions= left, right, up, down
      //amount= pixels to move
      //ADD POSITION CHECKING?

      switch (direction) {
        case `up`:
          this.posTop -= this.movementIncrement;
          break;
        case `down`:
          this.posTop += this.movementIncrement;
          break;
        case `left`:
          this.posLeft -= this.movementIncrement;
          break;
        case `right`:
          this.posLeft += this.movementIncrement;
        default:
          return -1;
      }
      console.log('out of the switch');
      // console.log(this.id);
      // console.log(document.getElementById(this.id).style.top);
      this.entityElement.style.top = pixelizeNumber(this.posTop);

      this.entityElement.style.left = pixelizeNumber(this.posLeft);
    }),
    // Spawn Entity - Creates the representation of the entity on the board
    (this.spawnEntity = function () {
      const boardElement = document.getElementById(`board`);
      const entityElement = document.createElement(`img`);
      entityElement.id = this.id;
      entityElement.src = this.art;
      entityElement.classList.add(this.entityType);
      entityElement.height = this.height;
      entityElement.style.top = pixelizeNumber(this.posTop);
      entityElement.style.left = pixelizeNumber(this.posLeft);
      //CHANGE style.css instead of inline?? getelementsbytagname
      boardElement.appendChild(entityElement);
      this.entityElement = document.getElementById(`${this.id}`);
      // console.log(document.getElementById(`${this.id}`));
      // console.log(this.entityElement);
    });
  this.spawnEntity();
}

const player = new Entity(
  200,
  200,
  10,
  25,
  `player--1`,
  `player`,
  `dice-5.png`
);

//Player movement handling & inputs
document.addEventListener(`keypress`, function (k) {
  console.log(k);

  if (k.key === 'w') {
    player.move(`up`);
    // console.log(Number(El.style.top));
  } else if (k.key === 's') {
    player.move(`down`);
  } else if (k.key === 'a') {
    player.move(`left`);
  } else if (k.key === `d`) {
    player.move(`right`);
  }
});
