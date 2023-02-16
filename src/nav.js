let pagesVisited = 0;

function navigator() {
    pagesVisited++;

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
    
    headerArrowBack.classList.add("d-none");
    headerCategoryTitle.classList.add("d-none");
    headerTrendingTitle.classList.add("d-none");
    genericSection.classList.add("d-none");
    movieSection.classList.add("d-none");
    
    headerSearch.innerHTML = "";
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    headerArrowBack.classList.remove("d-none");
    headerCategoryTitle.classList.remove("d-none");
    genericSection.classList.remove("d-none");
    headerTrendingTitle.classList.remove("d-none");

    // headerTitle.classList.add("d-none");
    // headerDescription.classList.add("d-none");
    headerCategoryTitle.classList.add("d-none");
    headerSearchContainer.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    movieSection.classList.add("d-none");

    getTrendingMovies();
}

function movieDetailPage() {
    headerArrowBack.classList.remove("d-none");
    movieSection.classList.remove("d-none");

    headerSearchContainer.classList.add("d-none");
    headerCategoryTitle.classList.add("d-none");
    headerTrendingTitle.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesSection.classList.add("d-none");
    genericSection.classList.add("d-none");


    const [_, urlHashInfo] = location.hash.split("=");
    const [movieId, movieName] = urlHashInfo.split("-");
    getMovieById(movieId);
    getRelatedMoviesById(movieId);
}

function searchPage() {
    headerArrowBack.classList.remove("d-none");
    headerTitle.classList.remove("d-none");
    headerDescription.classList.remove("d-none");
    headerSearchContainer.classList.remove("d-none");
    genericSection.classList.remove("d-none");
    
    headerCategoryTitle.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    headerTrendingTitle.classList.add("d-none");
    movieSection.classList.add("d-none");

    const [_, query] = location.hash.split("=");
    getMoviesBySearch(query);
}

function categoryPage() {
    headerArrowBack.classList.remove("d-none");
    headerCategoryTitle.classList.remove("d-none");
    genericSection.classList.remove("d-none");
    
    // headerTitle.classList.add("d-none");
    // headerDescription.classList.add("d-none");
    headerSearchContainer.classList.add("d-none");
    trendingSection.classList.add("d-none");
    categoriesPreviewContainer.classList.add("d-none");
    categoriesSectionTitle.classList.add("d-none");
    headerTrendingTitle.classList.add("d-none");
    movieSection.classList.add("d-none");
    
    
    const [_, urlHashInfo] = location.hash.split("=");
    const [categoryId, categoryName] = urlHashInfo.split("-");
    getMoviesByCategories(categoryId);

    typeof categoryName != "string"
        ? headerCategoryTitle.innerHTML = "" 
        : headerCategoryTitle.innerHTML = categoryName.replace("%20", " ");
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