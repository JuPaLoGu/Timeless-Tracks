const mongoose = require("mongoose"); // Importa la biblioteca Mongoose para trabajar con MongoDB.

// Definición del esquema para la colección "Musica".
const musicSchema = mongoose.Schema({
    nombre: {
        type: String, // Campo de tipo String.
        required: true, // Campo obligatorio.
    },
    banda_artista: {
        type: String, // Nombre de la banda o artista, tipo String.
        required: true, // Campo obligatorio.
    },
    tipo: {
        type: String, // Tipo de música (género, categoría, etc.), tipo String.
        required: true, // Campo obligatorio.
    },
    fecha: {
        type: Date, // Fecha asociada a la música, tipo Date.
        required: true, // Campo obligatorio.
    },
});

// Exporta el modelo "Musica" basado en el esquema definido, para que pueda ser usado en el proyecto.
module.exports = mongoose.model("Musica", musicSchema);
