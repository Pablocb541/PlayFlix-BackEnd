const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dbUrl = require('../db/dbConfig');
const PORT = 3002;
const { login } = require('../controllers/loginController.js');

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

app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));

// Aquí va tu middleware para verificar el token de autenticación

app.post("/api/login", login);

app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT}!`));
