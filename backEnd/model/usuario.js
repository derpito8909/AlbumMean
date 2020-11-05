// modulos de node
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//Schema
const userSchema = new mongoose.Schema({
	nombre: String,
	correo: String,
	pass: String,
});
// se Genera el JWT
userSchema.methods.generateJWT = function () {
	return jwt.sign(
		{
			_id: this._id,
			nombre: this.nombre,
			correo: this.correo,
		},
		"clave"
	);
};
// se crean los exports
const Usuario = mongoose.model("usuario", userSchema);
module.exports.Usuario = Usuario;
