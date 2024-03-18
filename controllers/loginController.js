const registro = require("../models/user");

const loginPost = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  // Validación de campos requeridos
  if (!correoElectronico || !contraseña) {
    return res.status(400).json({ error: 'El correo electrónico y la contraseña son requeridos.' });
  }

  // Verificar si el usuario existe en la base de datos
  registro.findOne({ correoElectronico, contraseña })
    .then(usuario => {
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario o contraseña inválidos.' });
      }
      // Si el usuario existe, puedes realizar otras acciones, como generar un token de autenticación y devolverlo en la respuesta.
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
    })
    .catch(err => {
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

module.exports = {
  loginPost
};
