const express = require("express");
const router = express.Router(); // Crea un manejador de rutas de Express.
const musicSchema = require("../models/musica"); // Importa el modelo "musica".

// Ruta POST para agregar una nueva música.
router.post("/musicas", (req, res) => {
    const musica = musicSchema(req.body); // Crea una nueva instancia del modelo con los datos recibidos.
    musica
        .save() // Guarda la música en la base de datos.
        .then((data) => res.json(data)) // Responde con los datos guardados.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

// Ruta GET para obtener todas las músicas.
router.get("/musicas", (req, res) => {
    musicSchema
        .find() // Recupera todas las músicas de la base de datos.
        .then((data) => res.json(data)) // Responde con los datos encontrados.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

// Ruta GET para obtener una música específica por ID.
router.get("/musicas/:id", (req, res) => {
    const { id } = req.params; // Obtiene el ID de la música desde los parámetros de la URL.
    musicSchema
        .findById(id) // Busca la música por su ID.
        .then((data) => res.json(data)) // Responde con los datos encontrados.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

// Ruta PUT para actualizar una música específica por ID.
router.put("/musicas/:id", (req, res) => {
    const { id } = req.params; // Obtiene el ID de la música desde los parámetros de la URL.
    const { nombre, edad, tipo, fecha } = req.body; // Extrae los datos del cuerpo de la solicitud.
    musicSchema
        .updateOne({ _id: id }, { $set: { nombre, edad, tipo, fecha } }) // Actualiza los campos especificados.
        .then((data) => res.json(data)) // Responde con los datos actualizados.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

// Ruta DELETE para eliminar una música específica por ID.
router.delete("/musicas/:id", (req, res) => {
    const { id } = req.params; // Obtiene el ID de la música desde los parámetros de la URL.
    musicSchema
        .findByIdAndDelete(id) // Busca y elimina la música por su ID.
        .then((data) => res.json(data)) // Responde con los datos de la música eliminada.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

module.exports = router; // Exporta las rutas para que puedan ser utilizadas en el servidor principal.