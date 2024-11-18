const express = require("express");
const router = express.Router();
const foroSchema = require("../models/foro");
const musicaSchema = require("../models/musica");

// Ruta POST para crear un nuevo foro.
router.post("/foros", (req, res) => {
    const foro = foroSchema(req.body); // Crea una instancia del modelo "foro" con los datos del cuerpo de la solicitud.
    foro
        .save() // Guarda el foro en la base de datos.
        .then((data) => res.json(data)) // Responde con los datos guardados.
        .catch((error) => res.status(400).json({ message: error.message })); // Maneja errores con un estado HTTP 400.
});

// Ruta GET para obtener todos los foros.
router.get("/foros", (req, res) => {
    foroSchema
        .find() // Busca todos los foros en la colección.
        .populate("autor", "nombre email") // Agrega información del autor (nombre y email).
        .populate("musica", "titulo artista") // Agrega información de la música (título y artista).
        .then((data) => res.json(data)) // Responde con los datos encontrados.
        .catch((error) => res.status(500).json({ message: error.message })); // Maneja errores con un estado HTTP 500.
});

// Ruta GET para obtener un foro específico por ID.
router.get("/foros/:id", (req, res) => {
    const { id } = req.params; // Obtiene el ID del foro desde los parámetros de la URL.
    foroSchema
        .findById(id) // Busca el foro por su ID.
        .populate("autor", "nombre email") // Agrega información del autor.
        .populate("musica", "titulo artista") // Agrega información de la música.
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Foro no encontrado" }); // Responde con error 404 si no encuentra el foro.
            res.json(data); // Responde con los datos encontrados.
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Maneja errores con un estado HTTP 500.
});

// Ruta PUT para actualizar un foro por ID.
router.put("/foros/:id", async (req, res) => {
    const { id } = req.params; // Obtiene el ID del foro desde los parámetros de la URL.

    if (req.body.musica) {
        // Si se incluye música en la solicitud, verifica si ya existe en la base de datos.
        const musicaConsulta = await musicaSchema.findOne({ titulo: req.body.musica.titulo });
        if (!musicaConsulta) {
            // Si la música no existe, la crea y guarda su ID en el foro.
            const nuevaMusica = new musicaSchema(req.body.musica);
            await nuevaMusica.save()
                .then((dataMusica) => { req.body.musica = dataMusica._id; })
                .catch((error) => res.status(400).json({ message: error.message }));
        } else {
            req.body.musica = musicaConsulta._id; // Si ya existe, usa su ID.
        }
    }

    foroSchema
        .updateOne({ _id: id }, { $set: req.body }) // Actualiza el foro con los datos proporcionados.
        .then((data) => res.json(data)) // Responde con los datos actualizados.
        .catch((error) => res.status(400).json({ message: error.message })); // Maneja errores con un estado HTTP 400.
});

// Ruta DELETE para eliminar un foro por ID.
router.delete("/foros/:id", (req, res) => {
    const { id } = req.params; // Obtiene el ID del foro desde los parámetros de la URL.
    foroSchema
        .deleteOne({ _id: id }) // Elimina el foro con el ID proporcionado.
        .then((data) => res.json(data)) // Responde con los datos de eliminación.
        .catch((error) => res.status(500).json({ message: error.message })); // Maneja errores con un estado HTTP 500.
});

module.exports = router; // Exporta las rutas para ser usadas en el servidor principal.