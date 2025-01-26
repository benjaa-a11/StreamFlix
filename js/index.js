// Cargar canales desde el archivo JSON
fetch('data/peliculas.json')
.then(response => response.json())
.then(data => {
    const deportesContainer = document.getElementById('deportes-container');
    const televisionContainer = document.getElementById('television-container');
    const entretenimientoContainer = document.getElementById('entretenimiento-container'); // Nuevo contenedor
    data.canales.forEach(canal => {
        const canalElement = document.createElement('div');
        canalElement.className = 'canales-item';
        canalElement.innerHTML = `
            <img src="${canal.img}" alt="${canal.title}">
            <h2>${canal.title}</h2>
            <div class="canales-info">
                <p>${canal.detail}</p>
                <a href="peliculas-reproductor.html?url=${encodeURIComponent(canal.url)}" class="btn-btn-md">Ver</a>
            </div>
        `;
        canalElement.addEventListener('click', () => toggleCanal(canalElement));
        if (canal.category === 'deportes') {
            deportesContainer.appendChild(canalElement);
        } else if (canal.category === 'television') {
            televisionContainer.appendChild(canalElement);
        } else if (canal.category === 'entretenimiento') { // Nueva categoría
            entretenimientoContainer.appendChild(canalElement);
        } else if (canal.category === 'peliculas') { // Nueva categoría
        entretenimientoContainer.appendChild(canalElement);
    }
    });
})
.catch(error => console.error('Error al cargar los canales:', error));

// Función para filtrar canales
function filterCanales() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const canales = document.querySelectorAll('.canales-item');
    canales.forEach(canal => {
        const title = canal.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            canal.style.display = '';
        } else {
            canal.style.display = 'none';
        }
    });
}



const apiKey = "YOUR_API_KEY";
const imgApi = "https://image.tmdb.org/t/p/w1280";
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const form = document.getElementById("search-form");
const query = document.getElementById("search-input");
const result = document.getElementById("result");

let page = 1;
let isSearching = false;

// Fetch JSON data from url
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        return await response.json();
    } catch (error) {
        return null;
    }
}

// Fetch and show results based on url
async function fetchAndShowResult(url) {
    const data = await fetchData(url);
    if (data && data.results) {
        showResults(data.results);
    }
}

// Create movie card html template
function createMovieCard(canal.img) {
    const { poster_path, original_title, release_date, overview } = movie;
    const imagePath = poster_path ? imgApi + poster_path : "./img-01.jpeg";
    const truncatedTitle = original_title.length > 15 ? original_title.slice(0, 15) + "..." : original_title;
    const formattedDate = release_date || "No release date";
    const cardTemplate = `
        <div class="column">
            <div class="card">
                <a class="card-media" href="./img-01.jpeg">
                    <img src="${canal}" alt="${original_title}" width="100%" />
                </a>
                <div class="card-content">
                    <div class="card-header">
                        <div class="left-content">
                        <h3 style="font-weight: 600">${movie.title}</h3>
                        <span style="color: #12efec">${formattedDate}</span>
                        </div>
                    <div class="right-content">
                        <a href="${imagePath}" target="_blank" class="card-btn">See Cover</a>
                    </div>
                </div>
                <div class="info">
                    ${overview || "No overview yet..."}
                </div>
            </div>
        </div>
    </div>
    `;
    return cardTemplate;
}

// Clear result element for search
function clearResults() {
    result.innerHTML = "";
}

// Show results in page
function showResults(item) {
    const newContent = item.map(createMovieCard).join("");
    result.innerHTML += newContent || "<p>No results found.</p>";
}

// Load more results
async function loadMoreResults() {
    if (isSearching) {
        return;
    }
    page++;
    const searchTerm = query.value;
    const url = searchTerm ? `${searchUrl}${searchTerm}&page=${page}` : `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    await fetchAndShowResult(url);
}

// Detect end of page and load more results
function detectEnd() {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        loadMoreResults();
    }
}

// Handle search
async function handleSearch(e) {
    e.preventDefault();
    const searchTerm = query.value.trim();
    if (searchTerm) {
        isSearching = true;
        clearResults();
        const newUrl = `${searchUrl}${searchTerm}&page=${page}`;
        await fetchAndShowResult(newUrl);
        query.value = "";
    }
}

// Event listeners
form.addEventListener('submit', handleSearch);
window.addEventListener('scroll', detectEnd);
window.addEventListener('resize', detectEnd);

// Initialize the page
async function init() {
    clearResults();
    const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&page=${page}`;
    isSearching = false;
    await fetchAndShowResult(url);
}

init();