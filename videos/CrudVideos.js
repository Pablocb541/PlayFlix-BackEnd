// ALLVideos.js

const express = require('express');
const mongoose = require('mongoose');
const dbUrl = require('../db/dbConfig');
const app = express();
const PORT = 3001;

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
    videoPost,
    videoGet, 
    videoDelete,
    videoUpdate }
     = require('../controllers/VIdeosController');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({
    domains: '*',
    methods: "*"
}));

app.post('/api/videos', videoPost);
app.get('/api/videos', videoGet);
app.patch('/api/videos', videoUpdate);
app.delete('/api/videos', videoDelete);


app.listen(PORT, () => console.log(`Aplicación iniciando en el puerto ${PORT} !`));

module.exports = app;
