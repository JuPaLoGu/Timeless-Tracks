const express = require("express");
const router = express.Router(); //manejador de rutas de express
const musicSchema = require("../models/musica");

router.post("/musicas", (req, res) => {
    const musica = musicSchema(req.body);
    musica
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;

router.get("/musicas", (req, res) => {
    musicSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.get("/musicas/:id", (req, res) => {
    const { id } = req.params;
    musicSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
router.put("/musicas/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, tipo, fecha } = req.body;
    musicSchema
        .updateOne({ _id: id }, {
            $set: { nombre, edad, tipo, fecha }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.delete("/musicas/:id", (req, res) => {
    const { id } = req.params;
    musicSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});


