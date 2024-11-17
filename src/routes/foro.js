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