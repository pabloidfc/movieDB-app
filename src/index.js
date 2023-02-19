const URL = "https://api.themoviedb.org/3";
const imageURL = "https://image.tmdb.org/t/p/w300/";
const imageURL500 = "https://image.tmdb.org/t/p/w500/";
const language = "language=en";

// Utils
function loadingSkeleton() {
    const loadingStructure = `
    <div class="render-container">
        <div class="movie-container--loading"></div>
        <div class="title--loading"></div>
        <div class="score--loading"></div>
    </div>
    `;

    genericSection.innerHTML = loadingStructure.repeat(10);
}

function loadingSkeletonMovieDetails() {
    const loadingStructure = `
    <div class="movie-section__img--loading"></div>
        <div class="movie-section__details-container--loading">
            <div class="movie-section__header">
                <div class="movie-section__h2--loading"></div>
                <div class="movie-section__vote-average--loading"></div>
            </div>
            <div class="movie-section__body">
                <div class="movie-section__release-date--loading"></div>
                <div class="movie-section__desc--loading"></div>
            </div>
            <div class="categories-container">
                <div class="category-container--loading"></div>
                <div class="category-container--loading"></div>
                <div class="category-container--loading"></div>
            </div>
        </div>
        <div class="movie-section__related-movies related-movies">
            <h3 class="related-movies__title">Related Movies</h3>
            <div class="related-movies__container">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
    </div>
    `;

    movieSection.innerHTML = loadingStructure;
}

function printMovies(array, container) {
    let printedMovies = "";
    if (array.length !== 0) {
        for (const movie of array) {
            let newTitle = movie.title.replace("'", "");

            if (movie.poster_path != null) {
                printedMovies += `
                <div class="movie-container">
                    <img 
                        src="${imageURL + movie.poster_path}"
                        id="${movie.id}"
                        onclick='location.hash = "#movie=${movie.id}-${newTitle}"'
                        class="movie-container__movie-img"
                        alt="${movie.title}"
                    >
                    <div class="movie-container__description">
                        <p class="movie-container__movie-title">${movie.title}</p>
                        <p class="movie-container__movie-vote_average"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(1)}</p>
                    </div>
                </div>
            `;
            }
        }
    } else {
        printedMovies = `
            <h2>Lo sentimos no hemos encontrado nada! 😢</h2>
        `;
    }

    container.innerHTML = printedMovies;
}

// API Requests
async function getMoviesBySearch(query) {
    const res = await fetch(
        URL + "/search/movie?api_key=" + API_KEY + "&query=" + query + "&" + language
    );
    const data = await res.json();
    const movies = data.results;

    printMovies(movies, genericSection);
}

async function getMoviesByCategories(id) {
    loadingSkeleton();
    const res = await fetch(
        URL + "/discover/movie?api_key=" + API_KEY + "&with_genres=" + id + "&" + language
    );
    const data = await res.json();
    const movies = data.results;

    printMovies(movies, genericSection);
}

async function getTrendingMoviesPreview() {
    const res = await fetch(URL + "/trending/movie/day?api_key=" + API_KEY + "&" + language);
    const data = await res.json();
    const movies = data.results;

    printMovies(movies, trendingPreviewContainer);
}

async function getTrendingMovies() {
    loadingSkeleton();
    const res = await fetch(URL + "/trending/movie/day?api_key=" + API_KEY + "&" + language);
    const data = await res.json();
    const movies = data.results;

    printMovies(movies, genericSection);
}

async function getMovieById(id) {
    loadingSkeletonMovieDetails();
    const res = await fetch(URL + "/movie/" + id + "?api_key=" + API_KEY + "&" + language);
    const movie = await res.json();

    let movieGenres = "";
    for (const genre of movie.genres) {
        movieGenres += `
            <div class="category-container">
                <h3 
                    class="category-title"
                    id="${genre.id}"
                    onclick='location.hash = "#category=${genre.id}-${genre.name}"'
                >
                    ${genre.name}
                </h3>
            </div>
        `;
    }

    let printMovie = `
        <img 
            src="${imageURL500 + movie.poster_path}" 
            class="movie-section__img" 
            alt="${movie.title}"
        >
        <div class="movie-section__details-container">
            <div class="movie-section__header">
                <h2 class="movie-section__h2">${movie.title}</h2>
                <div class="movie-section__vote-average"><i class="movie-section__icon fa-solid fa-star"></i>${movie.vote_average.toFixed(1)}</div>
            </div>
            <div class="movie-section__body">
                <p class="movie-section__release-date">Release date: <span class="release-date">${movie.release_date}</span></p>
                <p class="movie-section__desc">${movie.overview}</p>
                <div class="categories-container">
                    ${movieGenres}
                </div>
            </div>
        </div>
        <div class="movie-section__related-movies related-movies">
            <h3 class="related-movies__title">Related Movies</h3>
            <div class="related-movies__container">
                
            </div>
        </div>
    `;
    movieSection.innerHTML = printMovie;
    getRelatedMoviesById(movie.id);
}

async function getRelatedMoviesById(id) {
    const res = await fetch(URL + "/movie/" + id + "/similar?api_key=" + API_KEY + "&" + language);
    const data = await res.json();

    const movies = data.results;
    const container = document.querySelector(".related-movies__container");

    let printedMovies = "";
    for (const movie of movies) {
        let newTitle = movie.title.replace("'", "");

        if (movie.poster_path != null) {
            printedMovies += `
            <div class="related-movies__movie-container">
            <div>
                <img 
                    src="${imageURL + movie.poster_path}"
                    id="${movie.id}"
                    onclick='location.hash = "#movie=${movie.id}-${newTitle}"'
                    class="related-movies__movie-img"
                    alt="${movie.title}"
                >
            </div></div>
        `;
        }
    }

    container.innerHTML = printedMovies || "No se encontraron!";
}

async function getCategoriesPreview() {
    const res = await fetch(URL + "/genre/movie/list?api_key=" + API_KEY + "&" + language);
    const data = await res.json();
    
    const categories = data.genres;
    
    let renderCategories = "";
    for (const category of categories) {
        renderCategories += `
        <div class="category-container">
            <h3 
                id="${category.id}"
                onclick='location.hash = "#category=${category.id}-${category.name}"'
                class="category-title"
            >
                ${category.name}
            </h3>
        </div>
        `;
    }

    categoriesPreviewContainer.innerHTML = renderCategories;
}

document.addEventListener("DOMContentLoaded", navigator);
window.addEventListener("hashchange", navigator, false);