// videosController.js

const Video = require('../models/videosModel');


/**
 * Crea una registro
 *
 * @param {*} req
 * @param {*} res
 */


const videoPost = async (req, res) => {
    const { name, youtubeUrl } = req.body;
    try {
        const newVideo = new Video({ name, youtubeUrl });
        const savedVideo = await newVideo.save();
        res.status(201).json({ video: savedVideo, location: `/api/videos/${savedVideo._id}` });
    } catch (error) {
        console.error('Error al guardar el video:', error);
        res.status(500).json({ error: 'Hubo un error al guardar el video' });
    }
};

/**
 * Obtiene todas las registros o una
 *
 * @param {*} req
 * @param {*} res
 */

const videoGet = async (req, res) => {
    try {
        const videos = await Video.find({}, 'name youtubeUrl'); // Selecciona los campos 'name' y 'youtubeUrl'
        res.json(videos);
    } catch (error) {
        console.error('Error al obtener los videos:', error);
        res.status(500).json({ error: 'Hubo un error al obtener los videos' });
    }
};



/**
 * Actualiza una registro
 *
 * @param {*} req
 * @param {*} res
 */

const videoDelete = async (req, res) => {
    const { id } = req.query;
    try {
        const deletedVideo = await Video.findByIdAndDelete(id);
        if (!deletedVideo) {
            res.status(404).json({ error: 'El video no existe' });
        } else {
            res.json(deletedVideo);
        }
    } catch (error) {
        console.error('Error al eliminar el video:', error);
        res.status(500).json({ error: 'Hubo un error al eliminar el video' });
    }
};

/**
 * Actualiza un video existente
 *
 * @param {*} req
 * @param {*} res
 */
const videoUpdate = async (req, res) => {
    const { id } = req.params; // Cambiado a params en lugar de query
    const { name, youtubeUrl } = req.body;
    try {
        // Busca el video por su ID y actualiza sus campos
        const updatedVideo = await Video.findByIdAndUpdate(id, { name, youtubeUrl }, { new: true });
        if (!updatedVideo) {
            return res.status(404).json({ error: 'El video no existe' });
        }
        res.json(updatedVideo);
    } catch (error) {
        console.error('Error al actualizar el video:', error);
        res.status(500).json({ error: 'Hubo un error al actualizar el video' });
    }
};

module.exports = {
    videoPost,
    videoGet,
    videoDelete,
    videoUpdate
};
