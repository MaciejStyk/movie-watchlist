export function renderFilmsHtml(filmsArray, addOrRemove) {
  const filmContainer = document.getElementById("film-container");
  if (filmsArray.length !== 0) {
    filmContainer.innerHTML = "";
    for (let film of filmsArray) {
      if (film.Title) filmContainer.innerHTML += getFilmHtml(film, addOrRemove);
    }
    addEventListenersToButtonsOf(filmsArray, addOrRemove);
  } else if (addOrRemove === "Watchlist") {
    filmContainer.innerHTML = getNoResultsHtml();
  } else {
    filmContainer.innerHTML = getEmptyWatchlistHtml();
  }
}

function getFilmHtml(film, addOrRemove) {
  return `
    <div class="film-container">
      <img 
        src="${film.Poster}" 
        class="film-poster" 
        alt="${film.Title.slice(0, 20)}... movie poster"/>
        <div class="film-info">
          <h3 class="film-info__title">${film.Title}</h3>
          <img src="./images/star-icon.svg"/> 
          <span class="film-info__rating">
            ${film.imdbRating}
          </span>
        </div>
        <div class="film-details">
          <span>${film.Runtime}</span>
          <span>${film.Genre}</span>
          <button class="add-movies-button" data-id="${film.imdbID}">
            <img src="./images/${addOrRemove.toLowerCase()}.svg"/>
            ${addOrRemove}
          </button>
        </div>
        <p class="film-description">${film.Plot}</p>
    </div>`;
}

function getNoResultsHtml() {
  return `
    <div class="img__container">
      <p>Unable to find what you're looking for. Please try another search.</p>
    </div>
  `;
}

function getEmptyWatchlistHtml() {
  return `
    <div class="img__container">
      <p>Your watchlist is looking a little empty...</p>
      <button class="add-movies-button watchlist-button">
        <img src="./images/watchlist.svg" />
        Let's add some movies!
      </button>
    </div>
  `;
}

function addEventListenersToButtonsOf(filmsArray, addOrRemove) {
  const buttons = document.getElementsByClassName("add-movies-button");
  for (let button of buttons) {
    button.addEventListener("click", function (e) {
      const filmId = e.target.getAttribute("data-id");
      const filmToStorage = filmsArray.find((film) => film.imdbID === filmId);
      if (addOrRemove === "Watchlist") {
        window.localStorage.setItem(filmId, JSON.stringify(filmToStorage));
      } else {
        window.localStorage.removeItem(filmId);
        location.reload();
      }
    });
  }
}
