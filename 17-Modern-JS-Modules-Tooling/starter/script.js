// Importing Module
////////////////////////////////////////////
// Exporting and Importing in ES6 Modules

/*
import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

addToCart(`bread`, 5);
console.log(totalPrice, totalQuantity);
*/
console.log(`Importing module`);

// Named import
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart(`bread`, 5);

// Default import
import add, { cart } from './shoppingCart.js';
add(`pizza`, 2);
add(`bread`, 5);
add(`apples`, 4);

console.log(cart);
/*

////////////////////////////////////////////
// The Module Pattern
// A review of how Modules used to be implemented

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart(`apple`, 4);
ShoppingCart2.addToCart(`pizza`, 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

////////////////////////////////////////////
// CommonJS Modules
// DOES NOT WORK IN VANILLA JS... JUST NODE

// Export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

// Import
const { addToCart} = require('./shoppingCart.js')
*/

////////////////////////////////////////////
// Introduction to NPM
import cloneDeep from 'lodash';

const state = {
  cart: [
    { product: `bread`, quantity: 5 },
    { product: `bread`, quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
console.log(stateClone);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve(`Ttest`).then(x => console.log(x));

import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';
