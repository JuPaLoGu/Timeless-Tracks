const mongoose = require("mongoose"); // importando el componente mogoose
const musicSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    banda,artista: {
        type: String ,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },

});
module.exports = mongoose.model("Musica", musicSchema);
