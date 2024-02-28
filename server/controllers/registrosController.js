// Importa el modelo de registro
const registro = require("../models/registrosModel");

/**
 * Crea una registro
 *
 * @param {*} req
 * @param {*} res
 */
const registroPost = async (req, res) => {
  let registros = new registro(req.body);
  await registros.save()
    .then(registro => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/registros/?id=${registros.id}`
      });
      res.json(registro);
    })
    .catch(err => {
      res.status(422);
      console.log('Error al guardar la registro', err);
      res.json({
        error: 'Hubo un error al guardar la registro'
      });
    });
};

/**
 * Obtiene todas las registros o una
 *
 * @param {*} req
 * @param {*} res
 */
const registroGet = (req, res) => {
  // si se requiere una registro específica
  if (req.query && req.query.id) {
    registro.findById(req.query.id)
      .then(registro => {
        res.json(registro);
      })
      .catch(err => {
        res.status(404);
        console.log('Error al consultar la registro', err);
        res.json({ error: "La registro no existe" });
      });
  } else {
    // obtener todas las registros
    registro.find()
      .then(registros => {
        res.json(registros);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

/**
 * Actualiza una registro
 *
 * @param {*} req
 * @param {*} res
 */
const registroPut = (req, res) => {
  registro.findByIdAndUpdate(req.query.id, req.body, { new: true })
    .then(registro => {
      if (!registro) {
        res.status(404).json({ error: "La registro no existe" });
      } else {
        res.json(registro);
      }
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Elimina una registro
 *
 * @param {*} req
 * @param {*} res
 */
const registroDelete = (req, res) => {
  registro.findByIdAndDelete(req.query.id)
    .then(registro => {
      if (!registro) {
        res.status(404).json({ error: "La registro no existe" });
      } else {
        res.json(registro);
      }
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

module.exports = {
  registroPost,
  registroGet,
  registroPut,
  registroDelete
};
