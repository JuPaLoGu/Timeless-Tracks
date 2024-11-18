const mongoose = require("mongoose"); 
// Importa Mongoose, una biblioteca de Node.js para modelar objetos en MongoDB.

// Definición del esquema para una "categoría".
const categoriaSchema = mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    // Campo "nombre" de tipo String, obligatorio.

    descripcion: { 
        type: String, 
        required: true 
    },
    // Campo "descripcion" de tipo String, también obligatorio.

    musicas: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'musica' 
    }]
    // "musicas" es un arreglo que almacena referencias a documentos de otro modelo llamado "musica".
    // Las referencias son identificadores únicos (ObjectId) de MongoDB.
});

// Exporta el modelo basado en el esquema definido para ser usado en otras partes del proyecto.
module.exports = mongoose.model('categoria', categoriaSchema);
