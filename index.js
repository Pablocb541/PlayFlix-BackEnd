require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const app = express();
const PORT = 3000;

mongoose.connect(mongoString, {
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
    usuarioRestringidoDelete,
    loginPin
} = require('./controllers/perfilesController.js');

const { 
    videoPost,
    videoGet, 
    videoDelete,
    videoUpdate
} = require('./controllers/VIdeosController');    

const { 
    registroPost,
    login,
    loginUsuarios
 } = require("./controllers/registrosController.js");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


app.use(cors({
    domains: '*',
    methods: "*"
}));

// Rutas de Videos
app.post('/api/videos', videoPost);
app.get('/api/videos', videoGet);
app.put('/api/videos/:id', videoUpdate);
app.delete('/api/videos', videoDelete);

// Rutas de Registro
app.post("/api/registros", registroPost);

// Ruta de Login
app.post("/api/login",login);
app.post("/api/loginUsuarios",loginUsuarios);

// Rutas de perfiles
app.post('/api/perfiles',usuarioRestringidoPost);
app.get('/api/perfiles', usuarioRestringidoGet);
app.put('/api/perfiles/:id',usuarioRestringidoUpdate); // Modificado para incluir el ID en la ruta
app.delete('/api/perfiles',usuarioRestringidoDelete);

// Ruta para verificar el PIN
app.post('/api/loginPin', loginPin);

app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT} !`));

module.exports = app;
