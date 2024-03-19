const UsuarioRestringido = require("../models/perfilesModel");

/**
 * Crea un usuario restringido
 *
 * @param {*} req
 * @param {*} res
 */
const usuarioRestringidoPost = async (req, res) => {
  const { nombreCompleto, pin, avatar, edad } = req.body;

  // Validación de campos requeridos
  if (!nombreCompleto || !pin || !avatar || !edad) {
    return res.status(400).json({ error: "Todos los campos marcados con (*) son requeridos." });
  }

  // Otras validaciones pueden incluir la validación del formato del PIN, la edad, etc.

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

module.exports = {
  usuarioRestringidoPost,
  usuarioRestringidoGet,
  usuarioRestringidoUpdate,
  usuarioRestringidoDelete
};
