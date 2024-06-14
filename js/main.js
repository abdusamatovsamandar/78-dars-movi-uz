const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '&api_key=ec8e1a593d30fc057056cd2183b95a29'
const API_URL = BASE_URL + '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&' + API_KEY
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const elMovieList = document.querySelector('.movies-list')
const elMovieItem = elMovieList.querySelector('.movie-item')
const elForm = document.querySelector('form')
const elSearchInput = document.querySelector('.search-input')

// console.log(elSearch)
getMovies(API_URL)

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    
    showMovies(data.results)
    
  })
}

function showMovies(data){

  elMovieList.innerHTML = '';

  data.forEach(movie => {
    const {title, poster_path, vote_average, overview} = movie;
    elMovieItem.innerHTML = `
      <img class="movie-item__img" src="${IMG_URL + poster_path}" alt="img">

      <div class="movie-info">
        <h3 class="movie-title">${title}</h3>

        <span class="movie-rating">${vote_average}</span>

        <div class="owerview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>
    `

    elMovieList.appendChild(elMovieItem.cloneNode(true))
  });
}

// elForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const searchTerm = search.value;
  
//   if(searchTerm){
//     getMovies(SEARCH_URL+ '&query=' + searchTerm)
//   }
// })

elForm.addEventListener('submit', evt => {
	evt.preventDefault()

	const searchTerm = elSearchInput.value.trim()

  if (searchTerm) {
    getMovies(SEARCH_URL + '&query=' + searchTerm)
  }
})