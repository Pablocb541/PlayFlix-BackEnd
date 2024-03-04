const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    name: { type: String, },
    youtubeUrl: { type: String, }
});

module.exports = mongoose.model('Video', videoSchema);
