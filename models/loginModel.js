const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registroSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Otros campos que puedas tener en tu colección de registros
});

module.exports = mongoose.model('Registro', registroSchema);
