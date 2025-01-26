async function fetchMovies() {
  try {
      const response = await fetch('data/peliculas.json');
      const data = await response.json();
      return data.canales.filter(canal => canal.category === 'peliculas');
  } catch (error) {
      console.error('Error al cargar los datos:', error);
      return [];
  }
}

async function loadMovies() {
  const movies = await fetchMovies();
  const container = document.getElementById('movies-container');
  container.innerHTML = movies.map(movie => `
      <div class="movie-card animate__animated animate__fadeInUp">
          <img src="${movie.img}" alt="${movie.title}">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-actions">
              <button onclick="goToPlayer('${movie.title}', '${movie.detail}', '${movie.url}')">Ver</button>
          </div>
      </div>
  `).join('');
}

function filterMovies() {
  const searchTerm = document.getElementById('search-bar').value.toLowerCase();
  fetchMovies().then(movies => {
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
      const container = document.getElementById('movies-container');
      container.innerHTML = filteredMovies.map(movie => `
          <div class="movie-card animate__animated animate__fadeInUp">
              <img src="${movie.img}" alt="${movie.title}">
              <h3 class="movie-title">${movie.title}</h3>
              <div class="movie-actions">
                  <button onclick="goToPlayer('${movie.title}', '${movie.detail}', '${movie.url}')">Ver</button>
              </div>
          </div>
      `).join('');
  });
}

function goToPlayer(title, detail, url) {
  const playerUrl = `peliculas-reproductor.html?title=${encodeURIComponent(title)}&detail=${encodeURIComponent(detail)}&url=${encodeURIComponent(url)}`;
  window.location.href = playerUrl;
}

loadMovies();