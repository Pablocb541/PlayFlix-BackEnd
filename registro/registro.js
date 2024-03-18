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

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
    domains: '*',
    methods: "*"
}));


// Controladores
const { 
    registroPost, 
    registroGet
} = require("../controllers/registrosController.js");

const { 
    loginPost 
} = require("../controllers/loginController.js");

// Registro de rutas
app.post("/api/registros", registroPost);
app.get("/api/registros", registroGet);
app.post("/api/login", loginPost);

app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT}!`));

module.exports = app;
