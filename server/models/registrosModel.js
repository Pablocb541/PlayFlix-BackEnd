const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  nombre: { type: String },
  apellido: { type: String },
  contraseña: { type: String },
  repetirConstraseña: { type: String },
  pin: { type: Number },
  gmail: { type: String },
  pais: { type: String },
  fechaNacimiento: { type: Date}
});

module.exports = mongoose.model('registro', registroSchema);
