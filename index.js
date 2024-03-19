const express = require('express');
const mongoose = require('mongoose');
const dbUrl = require('./db/dbConfig');
const app = express();
const PORT = 3000;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true

}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch(error => {
    console.error('Error de conexión a la base de datos:', error);
});

const { 
    usuarioRestringidoPost,
    usuarioRestringidoGet,
    usuarioRestringidoUpdate,
    usuarioRestringidoDelete }
     = require('./controllers/perfilesController.js');

const { 
        videoPost,
        videoGet, 
        videoDelete,
        videoUpdate }
         = require('./controllers/VIdeosController');    

const { registroPost, login } = require("./controllers/registrosController.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
    domains: '*',
    methods: "*"
}));

// Rutas de Videos
app.post('/api/videos', videoPost);
app.get('/api/videos', videoGet);
app.patch('/api/videos', videoUpdate);
app.delete('/api/videos', videoDelete);

// Rutas de Registro
app.post("/api/registros", registroPost);

// Ruta de Login
app.post("/api/login", login);

// Rutas de perfiles
app.post('/api/perfiles',usuarioRestringidoPost);
app.get('/api/perfiles', usuarioRestringidoGet);
app.patch('/api/perfiles',usuarioRestringidoUpdate);
app.delete('/api/perfiles',usuarioRestringidoDelete); 

app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT} !`));

module.exports = app;
