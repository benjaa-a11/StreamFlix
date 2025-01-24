document.addEventListener('DOMContentLoaded', function() {
    fetch('data/series.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('series-container');
            data.series.forEach(serie => {
                const seriesItem = document.createElement('div');
                seriesItem.className = 'series-item';
                seriesItem.innerHTML = `
                    <img src="${serie.img}" alt="${serie.title}">
                    <h2>${serie.title}</h2>
                    <div class="series-info">
                        <p>${serie.detail}</p>
                        <button onclick="playSeries('${serie.url}')">Ver</button>
                    </div>
                `;
                seriesItem.addEventListener('click', function() {
                    const infoDiv = this.querySelector('.series-info');
                    if (infoDiv.style.display === 'none' || infoDiv.style.display === '') {
                        infoDiv.style.display = 'block';
                        setTimeout(() => infoDiv.style.opacity = '1', 10);
                        this.style.maxHeight = '500px';
                    } else {
                        infoDiv.style.opacity = '0';
                        setTimeout(() => infoDiv.style.display = 'none', 500);
                        this.style.maxHeight = '250px';
                    }
                });
                container.appendChild(seriesItem);
            });
        });
});

function playSeries(url) {
    window.open(url, '_blank');
}

function filterSeries() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const seriesItems = document.querySelectorAll('.series-item');
    seriesItems.forEach(item => {
        const title = item.querySelector('h2').innerText.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}