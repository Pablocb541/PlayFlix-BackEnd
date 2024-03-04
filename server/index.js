// index.js

const express = require('express');

const CrudVideosApp = require('./videos/CrudVideos');
const registroApp = require('./registro/registro');

const app = express();
const PORT = 3000;

// // Iniciar la aplicación de registro en el puerto 3001


// Iniciar la aplicación de CRUD de videos en el puerto 3000
// crudVideosApp.listen(PORT, () => {
//     console.log(`Servidor de CRUD de videos corriendo en el puerto ${PORT}`);
// });
