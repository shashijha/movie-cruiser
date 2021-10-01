let moviesListItem = [];
let favouritesListItem = [];

let getMovie = (id, arr) => arr.find((movie) => movie.id === id);

function getMovies() {
  return fetch("https://javascriptjson.herokuapp.com/movies")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      moviesListItem = res;
      let moviesList = document.getElementById("moviesList");
      let movieItem = "";
      moviesListItem.forEach((movie) => {
        movieItem = `<div class="card card-custom mx-2 mb-3">
						  <img src="${movie.posterPath}" class="card-img-top" alt="...">
						  <a href="javascript:;" title="Add to favourite" class="fav-button-holder" 
						  onclick='addFavourite(${movie.id})'>
						  <i class="fas fa-heart"></i>
						  </a>
  						<div class="card-body">
    						<h6 class="card-title text-center">${movie.title}</h6>
  						</div>
					</div>`;
        moviesList.innerHTML = moviesList.innerHTML + movieItem;
      });
      return res;
    })
    .catch((error) => {
      console.log(error);
      //	return error;
    });
}

function getFavourites() {
  return fetch("https://javascriptjson.herokuapp.com/favourites")
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      favouritesListItem = res;
      genMovieList(
        favouritesListItem,
        document.getElementById("favouritesList")
      );
    })
    .catch((error) => {
      console.log(error);
      //	return error;
    });
}

function addFavourite(movieId) {
  if (getMovie(Number(movieId), favouritesListItem)) {
    alert("Movie is already added to favourites");
    return Promise.reject({ message: "Movie is already added to favourites" });
  }
  let data = getMovie(Number(movieId), moviesListItem);
  favouritesListItem.push(data);

  genMovieList(favouritesListItem, document.getElementById("favouritesList"));

  return fetch("https://javascriptjson.herokuapp.com/favourites", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      return favouritesListItem;
    })
    .catch((error) => {
      console.log(error);
      //	return error;
    });
}

function deleteFavourite(movieId) {
  if (!getMovie(Number(movieId), favouritesListItem)) {
    alert("Movie is already deleted from favourites");
    return Promise.reject({
      message: "Movie is already deleted from favourites",
    });
  }

  favouritesListItem = favouritesListItem.filter((data) => data.id !== movieId);
  genMovieList(favouritesListItem, document.getElementById("favouritesList"));

  return fetch(`https://javascriptjson.herokuapp.com/favourites/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      return favouritesListItem;
    })
    .catch((error) => {
      console.log(error);
      //	return error;
    });
}

function genMovieList(array, ele) {
  ele.innerHTML = "";
  let item = "";
  return array.forEach((arryItem) => {
    item = genMovieCard(arryItem);
    ele.innerHTML = ele.innerHTML + item;
  });
}

function genMovieCard(item) {
  return `<div class="card card-custom mx-2 mb-3">
						  <img src="${item.posterPath}" class="card-img-top" alt="movie">
						  <a href="javascript:;" title="Add to favourite" class="fav-button-holder" 
						  onclick='deleteFavourite(${item.id})'>
						  <i class="fas fa-times"></i>
						  </a>
  						<div class="card-body">
    						<h6 class="card-title text-center">${item.title}</h6>
  						</div>
					</div>`;
}

/*module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};*/

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution
