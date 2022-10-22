import View from "./View.js";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet, Find a nice recipe and bookmark it :)";
  _successMessage = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generatorMarkup() {
    return this._data.map(bm => previewView.render(bm, false)).join("");
  }
}

export default new BookmarksView();

// class BookmarksView extends View {
//   _parentElement = document.querySelector(".bookmarks__list");
//   _errorMessage = "No bookmarks yet, Find a nice recipe and bookmark it :)";
//   _successMessage = "";

//   _generatorMarkup() {
//     return this._data.map(this._generatorMarkupPreview).join("");
//   }

//   _generatorMarkupPreview(recipe) {
//     const id = window.location.hash.slice(1);
//     return `
//         <li class="preview">
//           <a class="preview__link ${
//             recipe.id === id ? "preview__link--active" : ""
//           }" href="#${recipe.id}">
//             <figure class="preview__fig">
//               <img src="${recipe.image}" alt="publisher" />
//             </figure>
//             <div class="preview__data">
//               <h4 class="preview__title">${recipe.title}</h4>
//               <p class="preview__publisher">${recipe.publisher}</p>
//             </div>
//           </a>
//         </li>
//     `;
//   }
// }
