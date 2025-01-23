const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 5500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/get-names', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).send("Error al recuperar los nombres");
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${5500}`);
});
