const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibroSchema = new Schema({
    Nombre:{type: String},
    Autor:{type: String},
    Editorial:{type: String},
    UnidadesDisponibles:{type: String},
    Ciudad:{type: String},
})

const Libro = mongoose.model("Libro", LibroSchema );

module.exports = Libro;