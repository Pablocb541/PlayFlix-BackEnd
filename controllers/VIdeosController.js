// videosController.js

const Video = require('../models/videosModel');


/**
 * Crea una registro
 *
 * @param {*} req
 * @param {*} res
 */


const videoPost = async (req, res) => {
    const { name, youtubeUrl,userId } = req.body;
    try {
        const newVideo = new Video({ name, youtubeUrl, userId }); // Asociar el ID del usuario con el video creado
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
        const userId = req.query.userId; // Obtener el ID del usuario desde la consulta

        // Buscar los videos asociados con el ID de usuario
        const videos = await Video.find({ userId: userId }, 'name youtubeUrl');

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


// Actualiza un video existente por su ID
// Actualiza un video existente por su ID
const videoUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const { youtubeUrl, name } = req.body;

        // Verificar si el video existe en la base de datos
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: 'Video no encontrado' });
        }

        // Actualizar la URL de YouTube si se proporciona
        if (youtubeUrl !== undefined && youtubeUrl.trim() !== '') {
            video.youtubeUrl = youtubeUrl.trim();
        }

        // Actualizar el nombre del video si se proporciona
        if (name) {
            video.name = name;
        }

        // Guardar los cambios en el video actualizado
        await video.save();

        // Responder con el video actualizado
        return res.status(200).json({ message: 'Video actualizado correctamente' });
    } catch (error) {
        // Manejar errores
        console.error('Error al actualizar el video:', error);
        return res.status(500).json({ error: 'Error al actualizar el video' });
    }
};




module.exports = {
    videoPost,
    videoGet,
    videoDelete,
    videoUpdate
};
