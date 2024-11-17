const express = require("express");
const router = express.Router();
const foroSchema = require("../models/foro");
const userSchema = require("../models/user");
const musicaSchema = require("../models/musica");

router.post("/foros", (req, res) => {
    const foro = foroSchema(req.body);
    foro
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
})

router.get("/foros", (req, res) => {
    foroSchema
        .find()
        .populate("autor", "nombre email") 
        .populate("musica", "titulo artista")
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

router.get("/foros/:id", (req, res) => {
    const { id } = req.params;
    foroSchema
        .findById(id)
        .populate("autor", "nombre email")
        .populate("musica", "titulo artista")
        .then((data) => {
            if (!data) return res.status(404).json({ message: "Foro no encontrado" });
            res.json(data);
        })
        .catch((error) => res.status(500).json({ message: error.message }));
});

router.put("/foros/:id", async (req, res) => {
    const { id } = req.params;
    if (req.body.musica) {
        const musicaConsulta = await musicaSchema.findOne({ titulo: req.body.musica.titulo });
        if (!musicaConsulta) {
            const nuevaMusica = new musicaSchema(req.body.musica);
            await nuevaMusica.save().then((dataMusica) => {
                req.body.musica = dataMusica._id;
            }).catch((error) => res.status(400).json({ message: error.message }));
        } else {
            req.body.musica = musicaConsulta._id;
        }
    }
    foroSchema
        .updateOne({ _id: id }, { $set: req.body })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.delete("/foros/:id", (req, res) => {
    const { id } = req.params;
    foroSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});

module.exports = router;