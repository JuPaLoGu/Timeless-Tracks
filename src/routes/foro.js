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