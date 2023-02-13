const URL = 'https://api.themoviedb.org/3';
const imageURL = 'https://image.tmdb.org/t/p/w300/';
const language = 'language=en';

async function getTrendingMoviesPreview() {
    const res = await fetch(URL + '/trending/movie/day?api_key=' + APY_KEY + '&' + language);
    const data = await res.json();

    const movies = data.results;

    let renderMovie = '';
    for (const movie of movies) {
        renderMovie += `
            <div class="movie-container">
                <img src="${imageURL + movie.poster_path}" class="movie-container__movie-img" alt="${movie.title}">
                <div class="movie-container__description">
                    <p class="movie-container__movie-title">${movie.title}</p>
                    <p class="movie-container__movie-vote_average"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(1)}</p>
                </div>

            </div>
        `;
    }

    trendingPreviewContainer.innerHTML = renderMovie;
}

async function getCategoriesPreview() {
    const res = await fetch(URL + '/genre/movie/list?api_key=' + APY_KEY + '&' + language);
    const data = await res.json();
    
    const categories = data.genres;
    
    let renderCategories = '';
    for (const category of categories) {
        renderCategories += `
        <div class="category-container">
            <h3 id="${category.id}" class="category-title">${category.name}</h3>
        </div>
        `;
    }

    categoriesPreviewContainer.innerHTML = renderCategories;
}

document.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator, false);