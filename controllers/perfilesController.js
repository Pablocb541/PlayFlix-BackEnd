const UsuarioRestringido = require("../models/perfilesModel");

/**
 * Crea un usuario restringido
 *
 * @param {*} req
 * @param {*} res
 */
const usuarioRestringidoPost = async (req, res) => {
  const { nombreCompleto, pin, avatar, edad } = req.body;
  const errorMessages = [];

  // Validación de campos requeridos
  if (!nombreCompleto || !pin || !avatar || !edad) {
    errorMessages.push("Todos los campos marcados con (*) son requeridos.");
  }

  // Verificar si ya existe un usuario con el mismo nombre
  const usuarioExistente = await UsuarioRestringido.findOne({ nombreCompleto });
  if (usuarioExistente) {
    errorMessages.push("Ya existe un usuario con el mismo nombre.");
  }

  if (errorMessages.length > 0) {
    return res.status(400).json({ errors: errorMessages }); // Devolver mensajes de error
  }

  try {
    // Crear un nuevo usuario restringido
    const nuevoUsuarioRestringido = new UsuarioRestringido(req.body);
    await nuevoUsuarioRestringido.save();
    
    res.status(201).json(nuevoUsuarioRestringido); // Respuesta exitosa con el usuario creado
  } catch (error) {
    console.error("Error al crear el usuario restringido:", error);
    res.status(500).json({ error: "Hubo un error al crear el usuario restringido." });
  }
};

/**
 * Obtiene todos los usuarios restringidos
 *
 * @param {*} req
 * @param {*} res
 */
const usuarioRestringidoGet = async (req, res) => {
  try {
    const usuariosRestringidos = await UsuarioRestringido.find();
    res.status(200).json(usuariosRestringidos);
  } catch (error) {
    console.error("Error al obtener los usuarios restringidos:", error);
    res.status(500).json({ error: "Hubo un error al obtener los usuarios restringidos." });
  }
};

/**
 * Actualiza un usuario restringido
 *
 * @param {*} req
 * @param {*} res
 */
const usuarioRestringidoUpdate = async (req, res) => {
  const { id } = req.params;
  const { nombreCompleto, pin, avatar, edad } = req.body;

  // Validación de campos requeridos
  if (!nombreCompleto || !pin || !avatar || !edad) {
    return res.status(400).json({ error: "Todos los campos marcados con (*) son requeridos." });
  }

  try {
    const usuarioRestringido = await UsuarioRestringido.findByIdAndUpdate(id, req.body, { new: true });
    if (!usuarioRestringido) {
      return res.status(404).json({ error: "Usuario restringido no encontrado." });
    }
    res.status(200).json(usuarioRestringido);
  } catch (error) {
    console.error("Error al actualizar el usuario restringido:", error);
    res.status(500).json({ error: "Hubo un error al actualizar el usuario restringido." });
  }
};

/**
 * Elimina un usuario restringido
 *
 * @param {*} req
 * @param {*} res
 */
const usuarioRestringidoDelete = async (req, res) => {
  const { id } = req.query; // Modificado para obtener el ID desde la consulta (query) en lugar de los parámetros de ruta

  try {
    const usuarioRestringido = await UsuarioRestringido.findByIdAndDelete(id);
    if (!usuarioRestringido) {
      return res.status(404).json({ error: "Usuario restringido no encontrado." });
    }
    res.status(200).json({ message: "Usuario restringido eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar el usuario restringido:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el usuario restringido." });
  }
};

/**
 * Autentica un usuario restringido y envía la URL de redirección
 *
 * @param {*} req
 * @param {*} res
 */
const loginPin = async (req, res) => {
  const { pin } = req.body;
  
  try {
    // Buscar el usuario restringido en la base de datos por su PIN
    const usuario = await UsuarioRestringido.findOne({ pin });

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({ error: "PIN inválido." });
    }

    // Si el PIN es válido, enviar la URL de redirección según el tipo de usuario
    if (usuario.nombreCompleto === "administrador") {
      res.status(200).json({ redirectURL: "./admin.html" }); // Redirigir al panel de administrador
    } else {
      res.status(200).json({ redirectURL: "./videos.html" }); // Redirigir a otra página para usuarios regulares
    }
  } catch (error) {
    console.error("Error al autenticar usuario:", error);
    res.status(500).json({ error: "Hubo un error al autenticar el usuario." });
  }
};

module.exports = {
  usuarioRestringidoPost,
  usuarioRestringidoGet,
  usuarioRestringidoUpdate,
  usuarioRestringidoDelete,
  loginPin
};
