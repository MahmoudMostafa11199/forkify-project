import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "../js/views/recipeView.js";
import searchView from "../js/views/searchView.js";
import resultView from "../js/views/resultView.js";
import paginationView from "../js/views/paginationView.js";
import bookmarksView from "../js/views/bookmarksView.js";
import addRecipeView from "../js/views/addRecipeView.js";

// import "core-js/stable";
// import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2) Loading Recipe
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    // 3) Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(`${err} 💥💥💥`);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Loading search result
    await model.loadSearchResult(query);

    // Render results
    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
    console.error(`${err} 💥💥💥`);
  }
};

const controlPagination = function (goToPage) {
  // Render New results
  resultView.render(model.getSearchResultPage(goToPage));
  // Render New pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/Remove bokkmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (NewRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(NewRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Close modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💥", err.message);
    addRecipeView.renderError(err.message);
  }
};

const controlWW = (function () {
  console.log("update");
})(
  // const init = function () {
  //   bookmarksView.addHandlerRender(controlBookmarks);
  //   recipeView.addHandlerRender(controlRecipe);
  //   recipeView.addHandlerBookmark(controlAddBookmark);
  //   recipeView.addHandlerUpdateServings(controlServings);
  //   searchView.addHandlerSearch(controlSearchResults);
  //   paginationView.addhandlerClick(controlPagination);
  //   addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
  // };
  // init();

  function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerBookmark(controlAddBookmark);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addhandlerClick(controlPagination);
    addRecipeView.addHandlerUploadRecipe(controlAddRecipe);
    controlWW();
  }
)();
