const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioRestringidoSchema = new Schema({
    nombreCompleto: { type: String, required: true },
    pin: { type: String, required: true },
    avatar: { type: String, required: true }, // Ruta de la imagen del avatar
    edad: { type: Number, required: true }
});

module.exports = mongoose.model('UsuarioRestringido', usuarioRestringidoSchema);
