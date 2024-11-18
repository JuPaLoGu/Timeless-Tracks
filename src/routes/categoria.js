const express = require("express");
const router = express.Router();
const musicSchema = require("../models/musica");
const categoriaSchema = require("../models/categoria");

// Ruta POST para agregar una nueva categoría.
router.post("/categorias", (req, res) => {
    const categoria = categoriaSchema(req.body); // Crea una instancia del modelo "categoria" con los datos recibidos.
    categoria
        .save() // Guarda la categoría en la base de datos.
        .then((data) => res.json(data)) // Responde con los datos guardados si tiene éxito.
        .catch((error) => res.send(error)); // Maneja errores.
});

// Ruta PUT para actualizar una categoría y vincularla con música.
router.put("/categorias/:id", async (req, res) => {
    const { id } = req.params; // Obtiene el ID de la categoría desde los parámetros de la URL.

    const musica = musicSchema(req.body); // Crea una instancia del modelo "musica".
    var idMusica = null;

    // Busca si la música con un código específico ya existe.
    const musicaConsulta = await musicSchema.findOne({ codigo: req.body.codigo });
    if (!musicaConsulta) {
        // Si no existe, guarda la nueva música y obtiene su ID.
        await musica.save().then((dataMusica) => {
            idMusica = dataMusica._id;
        });
    } else {
        // Si ya existe, utiliza su ID.
        idMusica = musicaConsulta._id;
    }

    // Actualiza la categoría para vincularla con la música encontrada o creada.
    categoriaSchema
        .updateOne({ _id: id }, { $addToSet: { musica: idMusica } }) // Añade el ID de la música al arreglo "musica" de la categoría.
        .then((data) => res.json(data)) // Responde con los datos actualizados si tiene éxito.
        .catch((error) => res.json({ message: error })); // Maneja errores.
});

module.exports = router; // Exporta las rutas para ser usadas en el servidor principal.
