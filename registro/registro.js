const express = require('express');
const app = express();
const dbUrl = require('../db/dbConfig.js');
const PORT = 3000;

const mongoose = require("mongoose");
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conexión exitosa a la base de datos');
})
.catch(error => {
    console.error('Error de conexión a la base de datos:', error);
});

const { registroPost, login } = require("../controllers/registrosController.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
    domains: '*',
    methods: "*"
}));

// Rutas de Registro
app.post("/api/registros", registroPost);

// Ruta de Login
app.post("/api/login", login);

app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT}!`));

module.exports = app;
