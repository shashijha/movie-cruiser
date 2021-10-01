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
      genMovieList(moviesListItem, document.getElementById("moviesList"), true);
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
        document.getElementById("favouritesList"),
        false
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

  genMovieList(
    favouritesListItem,
    document.getElementById("favouritesList"),
    false
  );

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
  let con = confirm("Are you sure you want to remove from favourite list?");
  if (con) {
    console.log(con);
    if (!getMovie(Number(movieId), favouritesListItem)) {
      alert("Movie is already deleted from favourites");
      return Promise.reject({
        message: "Movie is already deleted from favourites",
      });
    }

    favouritesListItem = favouritesListItem.filter(
      (data) => data.id !== movieId
    );
    genMovieList(
      favouritesListItem,
      document.getElementById("favouritesList"),
      false
    );

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
}

function genMovieList(array, ele, isAddToFav) {
  ele.innerHTML = "";
  let item = "";
  return array.forEach((arryItem) => {
    item = genMovieCard(arryItem, isAddToFav);
    ele.innerHTML = ele.innerHTML + item;
  });
}

function genMovieCard(item, isAddToFav) {
  if (isAddToFav) {
    return `<div class="card card-custom mx-2 mb-3">
	<img src="${item.posterPath}" class="card-img-top" alt="...">
	<a href="javascript:;" title="Add to favourite" class="fav-button-holder" 
	onclick='addFavourite(${item.id})'>
	<i class="fas fa-heart"></i>
	</a>
	<div class="card-body">
	  <h6 class="card-title text-center">${item.title}</h6>
	</div>
</div>`;
  } else {
    return `<div class="card card-custom mx-2 mb-3">
		<img src="${item.posterPath}" class="card-img-top" alt="movie">
		<a href="javascript:;" title="Delete from favourite" class="fav-button-holder" 
		onclick='deleteFavourite(${item.id})'>
		<i class="fas fa-times"></i>
		</a>
		<div class="card-body">
		  <h6 class="card-title text-center">${item.title}</h6>
		</div>
  </div>`;
  }
}
