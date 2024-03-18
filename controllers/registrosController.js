const Registro = require("../models/registrosModel");

/**
 * Crea un registro
 *
 * @param {*} req
 * @param {*} res
 */
const registroPost = async (req, res) => {
  const {
    correoElectronico,
    contraseña,
    repetirContraseña,
    pin,
    nombre,
    apellido,
    pais,
    fechaNacimiento,
  } = req.body;

  // Validación de campos requeridos
  if (
    !correoElectronico ||
    !contraseña ||
    !repetirContraseña ||
    !pin ||
    !nombre ||
    !apellido ||
    !fechaNacimiento
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos marcados con (*) son requeridos." });
  }

  // Validación de la edad del usuario
  const edadUsuario = calcularEdad(fechaNacimiento);
  if (edadUsuario < 18) {
    return res
      .status(400)
      .json({ error: "Debes tener al menos 18 años para registrarte." });
  }

  // Validación de contraseña y repetición de contraseña
  if (contraseña !== repetirContraseña) {
    return res.status(400).json({ error: "Las contraseñas no coinciden." });
  }

  // Resto del código para guardar el registro
  let usuario = await Registro.findOne({ correoElectronico });

  if (usuario) {
    return res
      .status(400)
      .json({ error: "El correo electrónico ya está registrado." });
  }

  usuario = new Registro(req.body);
  await usuario
    .save()
    .then((registro) => {
      res.status(201); // CREATED
      res.header({
        location: `/api/registros/?id=${usuario.id}`,
      });
      res.json(registro);
    })
    .catch((err) => {
      res.status(422);
      console.log("Error al guardar el registro", err);
      res.json({
        error: "Hubo un error al guardar el registro",
      });
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
};
