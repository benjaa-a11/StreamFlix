// Cargar canales desde el archivo JSON
fetch('data/canales.json')
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
                <a href="canales-reproductor.html?url=${encodeURIComponent(canal.url)}" class="btn-btn-md">Ver</a>
            </div>
        `;
        canalElement.addEventListener('click', () => toggleCanal(canalElement));
        if (canal.category === 'deportes') {
            deportesContainer.appendChild(canalElement);
        } else if (canal.category === 'television') {
            televisionContainer.appendChild(canalElement);
        } else if (canal.category === 'entretenimiento') { // Nueva categoría
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

// Función para expandir y colapsar canales
function toggleCanal(selectedCanal) {
    const canales = document.querySelectorAll('.canales-item');
    canales.forEach(canal => {
        if (canal !== selectedCanal) {
            canal.classList.remove('expanded');
            canal.querySelector('.canales-info').classList.remove('show');
        }
    });
    selectedCanal.classList.toggle('expanded');
    selectedCanal.querySelector('.canales-info').classList.toggle('show');
}