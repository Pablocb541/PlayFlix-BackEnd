// // registro.js

// const express = require('express');
// const app = express();
// const dbUrl = require('../db/dbConfig.js');
// const PORT = 3000;

// // conexión a la base de datos
// const mongoose = require("mongoose");
// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Conexión exitosa a la base de datos');
// })
// .catch(error => {
//     console.error('Error de conexión a la base de datos:', error);
// });

// const { 
//     registroPost, 
//     registroGet
//  } = require("../controllers/registrosController.js");

// // parser para el cuerpo de la solicitud (necesario para los métodos POST y PUT)
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());

// // verificar cors
// const cors = require("cors");
// app.use(cors({
//     domains: '*',
//     methods: "*"
// }));

// // rutas para las registercd 
// app.post("/api/registros", registroPost);
// app.get("/api/registros", registroGet);

// app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT}!`));

// module.exports = app;