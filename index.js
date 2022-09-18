import { renderFilmsHtml } from "./utils.js";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const baseUrl = "http://www.omdbapi.com/";
const apiKey = "e770338e";

let filmNamesArray = [];
let filmsArray = [];

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});

searchButton.addEventListener("click", handleSearchButton);

async function handleSearchButton() {
  if (searchInput.value) {
    await getSearchedFilmNamesArray();
    await getFilmsArray();
    renderFilmsHtml(filmsArray, "Watchlist");
  }
}

async function getSearchedFilmNamesArray() {
  filmNamesArray = [];
  const response = await fetch(getUrlWith(arraySearchQuery()));
  const data = await response.json();
  if (data.Response !== "False") {
    for (let film of data.Search) {
      filmNamesArray.push(film.Title);
    }
  }
}

function getUrlWith(query) {
  return `
    ${baseUrl}?apikey=${apiKey}&${query}
  `;
}

function arraySearchQuery() {
  return `s=${changeSpacesIntoPlusesOf(searchInput.value)}`;
}

function singleTitleQuery(string) {
  return `t=${changeSpacesIntoPlusesOf(string)}`;
}

function changeSpacesIntoPlusesOf(string) {
  return string.replace(/ /g, "+");
}

async function getFilmsArray() {
  filmsArray = [];
  if (filmNamesArray) {
    for (let film of filmNamesArray) {
      const response = await fetch(getUrlWith(singleTitleQuery(film)));
      const data = await response.json();
      filmsArray.push(data);
    }
  }
}
