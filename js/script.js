let moviesListItem = [];
function getMovies() {
	return fetch('https://shashijha.github.io/movie-cruiser.github.io/db.json/movies').then(response => {
		return response.json();
	}).then(res => {
		moviesListItem = res;
		let moviesList = document.getElementById('moviesList');
		let movieItem = '';
		moviesListItem.forEach(movie => {
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
	}).catch(error => {
		console.log(error);
	//	return error;
	});
}
let favouritesListItem = [];
function getFavourites() {
	return fetch('https://shashijha.github.io/movie-cruiser.github.io/db.json/favourites').then(response => {
		return response.json();
	}).then(res => {
		favouritesListItem = res;
		let favouritesList = document.getElementById('favouritesList');
		favouritesList.innerHTML = '';
		let favouriteItem = '';
		favouritesListItem.forEach(favourite => {
			favouriteItem = `<div class="card card-custom mx-2 mb-3">
						  <img src="${favourite.posterPath}" class="card-img-top" alt="movie">
  						<div class="card-body">
    						<h6 class="card-title text-center">${favourite.title}</h6>
  						</div>
					</div>`;
			favouritesList.innerHTML = favouritesList.innerHTML + favouriteItem;
		});
		return res;
	}).catch(error => {
		console.log(error);
	//	return error;
	});
}

function addFavourite(movieId) {

	let getMovie = (id, arr) => arr.find(movie => movie.id === id);
	if(getMovie(Number(movieId), favouritesListItem)) {
        alert('Movie is already added to favourites');
        return Promise.reject({message: 'Movie is already added to favourites'});
	}
	let data = getMovie(Number(movieId), moviesListItem);
	favouritesListItem.push(data);
	let favouritesList = document.getElementById('favouritesList');
		favouritesList.innerHTML = '';
		let favouriteItem = '';
		favouritesListItem.forEach(favourite => {
			favouriteItem = `<div class="card card-custom mx-2 mb-3">
						  <img src="${favourite.posterPath}" class="card-img-top" alt="movie">
  						<div class="card-body">
    						<h6 class="card-title text-center">${favourite.title}</h6>
  						</div>
					</div>`;
			favouritesList.innerHTML = favouritesList.innerHTML + favouriteItem;
		});

	return fetch('https://shashijha.github.io/movie-cruiser.github.io/db.json/favourites', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(() => {
		return favouritesListItem;
	}).catch(error => {
		console.log(error);
	//	return error;
	});
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


