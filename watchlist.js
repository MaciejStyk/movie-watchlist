import { renderFilmsHtml } from "./utils.js";

let filmsArray = [];

for (let object in { ...localStorage }) {
  filmsArray.push(JSON.parse(localStorage[object]));
}

renderFilmsHtml(filmsArray, "Remove");

if (filmsArray.length === 0) {
  document
    .getElementsByClassName("watchlist-button")[0]
    .addEventListener("click", () => {
      window.location.href = "index.html";
    });
}
