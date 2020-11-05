// Modulos Node
const mongoose = require("mongoose");
//Schema
const albumSchema = new mongoose.Schema({
	idUsuario: String,
	nombre: String,
	imagen: String,
});
// se crean los exports
const Album = mongoose.model("album", albumSchema);
module.exports.Album = Album;
