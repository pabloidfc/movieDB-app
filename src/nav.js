function navigator() {
    const sections = {
        '#trends'   : () => trendsPage(),
        '#movie'    : () => movieDetailPage(),
        '#search='  : () => searchPage(),
        '#category=': () => categoryPage(),
    }

    for (const key in sections) {
        if(location.hash.startsWith(key)) {
            sections[key]();
            return;
        }
    }

    homePage();
}

function homePage() {
    headerTitle.classList.remove('d-none');
    headerSearchContainer.classList.remove('d-none');
    trendingSection.classList.remove('d-none');
    categoriesSection.classList.remove('d-none');
    headerDescription.classList.remove('d-none');

    headerArrowBack.classList.add('d-none');
    headerCategoryTitle.classList.add('d-none');
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage() {
    console.log('trends!!');
}

function movieDetailPage() {
    console.log('movies!!');
}

function searchPage() {
    console.log('search!!');
}

function categoryPage() {
    headerArrowBack.classList.remove('d-none');
    headerCategoryTitle.classList.remove('d-none');
    
    headerTitle.classList.add('d-none');
    headerDescription.classList.add('d-none');
    headerSearchContainer.classList.add('d-none');
    trendingSection.classList.add('d-none');
    categoriesSection.classList.add('d-none');
}

headerSearchBtn.addEventListener('click', () => {
    location.hash = '#search=';
});

trendingSectionBtn.addEventListener('click', () => {
    location.hash = '#trends'
});

// categoriesSectionTitle.addEventListener('click', () => {
//     location.hash = '#category=';
// });