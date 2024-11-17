const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;
const musicaRoutes = require("./routes/musica");
const categoriaRoutes = require("./routes/categoria");
const foroRoutes = require("./routes/foro");


const mongoose = require("mongoose");
require('dotenv').config();
app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON
//Gestión de las rutas usando el middleware
app.use("/api", musicaRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", foroRoutes);


app.use(express.json());
//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Algo salió mal. Intenta nuevamente." });
});