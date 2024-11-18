// const mongoose = require("mongoose"); // Importa Mongoose para trabajar con MongoDB.
const bcrypt = require("bcrypt"); // Importa bcrypt para manejar el hash de contraseñas.

// Definición del esquema para la colección "User".
const userSchema = mongoose.Schema({
    usuario: {
        type: String, // Nombre del usuario, tipo String.
        required: true // Campo obligatorio.
    },
    correo: {
        type: String, // Dirección de correo electrónico, tipo String.
        required: true // Campo obligatorio.
    },
    clave: {
        type: String, // Contraseña del usuario, tipo String.
        required: true // Campo obligatorio.
    }
});

// Método para encriptar la contraseña antes de almacenarla.
userSchema.methods.encryptClave = async (clave) => {
    const salt = await bcrypt.genSalt(10); // Genera un salt con un factor de complejidad de 10.
    return bcrypt.hash(clave, salt); // Crea un hash de la contraseña utilizando el salt.
}

// Exporta el modelo "User" basado en el esquema definido.
module.exports = mongoose.model('User', userSchema);
