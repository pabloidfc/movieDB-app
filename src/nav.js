let pagesVisited = 0;
let page = 1;
let infiniteScroll;

function navigator() {
    pagesVisited++;
    page = 1;

    window.removeEventListener("scroll", infiniteScroll);

    const sections = {
        "#trends"   : () => trendsPage(),
        "#movie"    : () => movieDetailPage(),
        "#search="  : () => searchPage(),
        "#category=": () => categoryPage(),
    }

    for (const key in sections) {
        if(location.hash.startsWith(key)) {
            sections[key]();
            scrollTo(0, 0);
            return;
        }
    }
    
    scrollTo(0, 0);
    homePage();
}

/*
    Oculto los bloques que no son necesarios en la sección que actualmente
    se esta visualizando, y a su vez muestro los necesarios.
*/

function homePage() {
    headerTitle.classList.remove("d-none");
    headerSearchContainer.classList.remove("d-none");
    trendingSection.classList.remove("d-none");
    categoriesSection.classList.remove("d-none");
    categoriesPreviewContainer.classList.remove("d-none");
    headerDescription.classList.remove("d-none");
    categoriesSectionTitle.classList.remove("d-none");
    
    headerGenericTitle.classList.add("d-none");
    headerArrowBack.classList.add("d-none");
    genericSection.classList.add("d-none");
    movieSection.classList.add("d-none");
    
    headerSearch.innerHTML = "";
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    headerArrowBack.classList.remove("d-none");
    headerGenericTitle.classList.remove("d-none");
    genericSection.classList.remove("d-none");

    headerSearchContainer.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    movieSection.classList.add("d-none");

    headerGenericTitle.innerHTML = "Trending Movies"
    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
    window.addEventListener("scroll", infiniteScroll);
}

function movieDetailPage() {
    headerArrowBack.classList.remove("d-none");
    movieSection.classList.remove("d-none");

    headerGenericTitle.classList.add("d-none");
    headerSearchContainer.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesSection.classList.add("d-none");
    genericSection.classList.add("d-none");


    const [_, urlHashInfo] = location.hash.split("=");
    const [movieId, movieName] = urlHashInfo.split("-");
    getMovieById(movieId);
}

function searchPage() {
    headerArrowBack.classList.remove("d-none");
    headerTitle.classList.remove("d-none");
    headerDescription.classList.remove("d-none");
    headerSearchContainer.classList.remove("d-none");
    genericSection.classList.remove("d-none");
    
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    movieSection.classList.add("d-none");

    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);
    window.addEventListener("scroll", infiniteScroll);
}

function categoryPage() {
    headerArrowBack.classList.remove("d-none");
    headerGenericTitle.classList.remove("d-none");
    genericSection.classList.remove("d-none");
    
    headerSearchContainer.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    movieSection.classList.add("d-none");
    
    
    const [_, urlHashInfo] = location.hash.split("=");
    const [categoryId, categoryName] = urlHashInfo.split("-");
    getMoviesByCategories(categoryId);

    typeof categoryName != "string"
        ? headerGenericTitle.innerHTML = "" 
        : headerGenericTitle.innerHTML = categoryName.replace("%20", " ");
}

/*
    Listeners para los cambios de sección solicitados
    por el usuario.
*/

// headerSearchBtn.addEventListener("click", () => {
// });

headerSearchContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    location.hash = "#search=" + headerSearch.value;
});

headerTitle.addEventListener("click", () => {
    location.hash = "#home";
})

trendingSectionBtn.addEventListener("click", () => {
    location.hash = "#trends"
});

headerArrowBack.addEventListener("click", () => {
    if (pagesVisited == 1) {
        location.hash = "#home";
    } else {
        location.hash = window.history.back();
    }
});