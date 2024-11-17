const express = require("express");
const router = express.Router();
const musicSchema = require("../models/musica");
const categoriaSchema = require("../models/categorias");

router.post("/categorias", (req, res) => {
    const area = areaSchema(req.body);
    area
        .save().then((data) => {
            res.json(data)
        }).catch((error) => res.send(error));
})

router.put("/categorias/:id", async (req, res) => {
    const { id } = req.params;
    const musica = musicSchema(req.body);
    var idMusica = null;

    const musicaConsulta = await musicSchema.findOne({ codigo: req.body.codigo });
    if (!musicaConsulta) {
        await musica.save().then((dataMusica) => {
            idMusica = dataMusica._id;
        });
    } else {
        idMusica = musicaConsulta._id;
    }

    categoriaSchema
        .updateOne({ _id: id }, {
            $addToSet: { musica: idMusica }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;