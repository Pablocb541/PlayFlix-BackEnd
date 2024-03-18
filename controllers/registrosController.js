const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Registro = require("../models/registrosModel");

/**
 * Crea un registro de usuario
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

  try {
    // Verificar si el correo electrónico ya está registrado
    let usuario = await Registro.findOne({ correoElectronico });
    if (usuario) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado." });
    }

    // Crear un nuevo usuario
    usuario = new Registro(req.body);

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);

    await usuario.save();
    
    res.status(201).json(usuario); // Respuesta exitosa con el usuario creado
  } catch (error) {
    console.error("Error al guardar el registro:", error);
    res.status(500).json({ error: "Hubo un error al guardar el registro." });
  }
};

/**
 * Autentica un usuario y genera un token JWT
 *
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
    const { correoElectronico, contraseña } = req.body;
    
    try {
      // Buscar el usuario en la base de datos por su correo electrónico
      const usuario = await Registro.findOne({ correoElectronico });
  
      // Verificar si el usuario existe
      if (!usuario) {
        return res.status(401).json({ error: "Usuario o contraseña inválida." });
      }

    //   console.log("Usuario encontrado en la base de datos:", usuario);
  
      // Verificar si la contraseña coincide exactamente
      if (contraseña !== usuario['contraseña']) {
        return res.status(401).json({ error: "Usuario o contraseña inválida." });
      }
  
      // Si el usuario y la contraseña son válidos, responder con éxito
      res.status(200).json({ message: "Inicio de sesión exitoso." });
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      res.status(500).json({ error: "Hubo un error al autenticar el usuario." });
    }
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
  login,
};
