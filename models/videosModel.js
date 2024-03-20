const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: { type: String },
    youtubeUrl: { type: String },
    // usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Registro' } // Referencia al usuario que creó el video
});

module.exports = mongoose.model('Video', videoSchema);
