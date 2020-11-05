//Modulos internos
const express = require("express");
const router = express.Router();
// Modulos creados
const { Usuario } = require("../model/usuario");
//Ruta crear usuario
router.post("/", async (req, res) => {
	let usuario = await Usuario.findOne({ correo: req.body.correo });
	// Muestra error si ya el correo del usuario esta en BD
	if (usuario) return res.status(400).send("El usuario ya esta registrado");
	// si el correo del usuario no se encuentra en BD
	usuario = new Usuario({
		nombre: req.body.nombre,
		correo: req.body.correo,
		pass: req.body.pass,
	});
	// se guarda el usuario que se va a crear con JWT
	const result = await usuario.save();
	const jwtToken = usuario.generateJWT();
	res.status(200).send({ jwtToken });
});
// se crean los exports
module.exports = router;
