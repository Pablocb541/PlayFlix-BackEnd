const express = require('express');
const app = express();
// conexión a la base de datos

const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://chaconp560:juanpablo123@pablo.mfkiod2.mongodb.net/", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const {
  registroPost
} = require("./controllers/registrosController.js");

// parser para el cuerpo de la solicitud (necesario para los métodos POST y PUT)
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// verificar cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));


// rutas para las registercd 
app.post("/api/registros", registroPost);

app.listen(3000, () => console.log(`Aplicación iniciando en el puerto 3000!`));
