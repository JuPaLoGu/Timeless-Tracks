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
    autor: { // Usuario que publicó el comentario
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Referencia al modelo de usuario
        required: true,
    },
    musica: { // Relacionado a una canción específica, opcional
        type: mongoose.Schema.Types.ObjectId,
        ref: "Musica",
    },
    respuestas: [ // Respuestas al comentario
        {
            autor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            contenido: {
                type: String,
                required: true,
            },
            fecha: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    fecha: { // Fecha del comentario principal
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Foro", foroSchema);
