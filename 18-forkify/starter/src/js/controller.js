import * as model from './model.js';
import recipeView from './views/recipeView.js';

// import icons from '../img/icons.svg'; // Parcel 1
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { async } = require('q');

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // 1)) Loading the Recipe
    await model.loadRecipe(id);

    // 2)) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

controlRecipes();

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
