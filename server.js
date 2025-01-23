const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data/contenido.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'contenido.json'));
});

app.post('/data/contenido.json', (req, res) => {
    const newData = req.body;
    fs.writeFile(path.join(__dirname, 'data', 'contenido.json'), JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            res.status(500).send('Error al escribir el archivo');
        } else {
            res.send('Contenido agregado exitosamente');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});