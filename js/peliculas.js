// Cargar el archivo JSON con las películas
fetch('data/peliculas.json')
  .then((response) => response.json())
  .then((data) => renderMovies(data))
  .catch((error) => console.error('Error cargando el JSON:', error));

// Función para renderizar las películas
function renderMovies(movies) {
  const resultContainer = document.getElementById('result');
  
  movies.forEach((movie) => {
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
      <div class="card-content">
        <div class="card-header">
          <h3>${movie.title}</h3>
        </div>
        <div class="info">
          <p>${movie.description}</p>
          <button class="card-btn" onclick= href = ${movie.id}')">Ver película</button>
        </div>
      </div>
    `;

    resultContainer.appendChild(card);
  });
}

// Función para redirigir al reproductor con la ID de la película
function goToPlayer(movieId) {
  window.location.href = `peliculas-reproductor.html?movieId=${movieId}`;
}

// Manejar el formulario de búsqueda
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (query) {
    // Filtrar películas por título
    fetch('data/peliculas.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredMovies = data.filter((movie) => movie.title.toLowerCase().includes(query));
        renderMovies(filteredMovies);
      })
      .catch((error) => console.error('Error cargando el JSON:', error));
  }
});



