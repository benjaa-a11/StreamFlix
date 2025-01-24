        // Obtener el parámetro 'url' del URL
        const urlParams = new URLSearchParams(window.location.search);
        const canalUrl = urlParams.get('url');

        // Establecer la URL del iframe
        if (canalUrl) {
            document.getElementById('iframe').src = decodeURIComponent(canalUrl);
        }

        // Cargar canales desde el archivo JSON
        fetch('data/canales.json')
            .then(response => response.json())
            .then(data => {
                const channelOptions = document.getElementById('channel-options');
                data.canales.forEach((channel, index) => {
                    const button = document.createElement('a');
                    button.className = 'btn btn-md';
                    button.textContent = channel.title;
                    button.href = '#';
                    button.onclick = () => {
                        document.getElementById('iframe').src = channel.url;
                        return false;
                    };
                    channelOptions.appendChild(button);
                });
            })
            .catch(error => console.error('Error al cargar los canales:', error));