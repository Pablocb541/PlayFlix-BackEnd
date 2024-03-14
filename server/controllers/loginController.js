const Registro = require("../models/registrosModel");

const savelogin = async function (email, token) {
  // Implementa la lógica para guardar el token de inicio de sesión en la base de datos
  // y devuelve una promesa
};

const login = function (req, res, next) {
  if (req.body.email && req.body.password) {
    // Buscar el usuario por su correo electrónico en la colección de registros
    Registro.findOne({ email: req.body.email }, function(err, usuario) {
      if (err) {
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      if (!usuario) {
        res.status(422).json({ error: "Usuario no encontrado" });
        return;
      }
      // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
      if (usuario.password === req.body.password) {
        // Las credenciales son válidas, generar token de autenticación
        const token = generateToken(); // Implementa la función de generación de token según tu elección
        // Guardar el token de inicio de sesión en la base de datos o en la sesión
        savelogin(req.body.email, token)
          .then(function(login) {
            res.status(200).json({ token: token });
          })
          .catch(function(err) {
            res.status(500).json({ error: "Error interno del servidor" });
          });
      } else {
        res.status(422).json({ error: "Usuario o contraseña inválidos" });
      }
    });
  } else {
    res.status(422).json({ error: "Por favor, proporcione correo electrónico y contraseña" });
  }
};

module.exports = {
  login
};
