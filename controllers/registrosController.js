const registro = require("../models/user");

const registroPost = async (req, res) => {
  const { correoElectronico, contraseña, repetirContraseña, pin, nombre, apellidos, fechaNacimiento } = req.body;

  // Validación de campos requeridos
  if (!correoElectronico || !contraseña || !repetirContraseña || !pin || !nombre || !apellidos || !fechaNacimiento) {
    return res.status(400).json({ error: 'Todos los campos marcados con (*) son requeridos.' });
  }

  // Validación de la edad del usuario
  const edadUsuario = calcularEdad(fechaNacimiento);
  if (edadUsuario < 18) {
    return res.status(400).json({ error: 'Debes tener al menos 18 años para registrarte.' });
  }

  // Validación de contraseña y repetición de contraseña
  if (contraseña !== repetirContraseña) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  // Resto del código para guardar el registro
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

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const cumpleaños = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - cumpleaños.getFullYear();
  const mes = hoy.getMonth() - cumpleaños.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleaños.getDate())) {
    edad--;
  }
  return edad;
}

module.exports = {
  registroPost,
  registroGet,
  registroPut,
  registroDelete
};
