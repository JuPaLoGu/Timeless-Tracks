const mongoose = require("mongoose");
const foroSchema = mongoose.Schema({

    titulo: { // Título del tema o hilo del foro
        type: String,
        required: true,
    },
    contenido: { // Mensaje principal
        type: String,
        required: true,
    },
    autor: [{ // Usuario que publicó el comentario
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Referencia al modelo de usuario
        required: true,
    }],
    cancion: [{ // Relacionado a una canción específica, opcional
        type: mongoose.Schema.Types.ObjectId,
        ref: "musica",
    }],

});

module.exports = mongoose.model("foro", foroSchema);
