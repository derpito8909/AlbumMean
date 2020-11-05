// Modulos de Node
const express = require("express");
const router = express.Router();
// modulos internos
const { Usuario } = require("../model/usuario");
const { route } = require("./usuario");

//se Crea la ruta para la autorizacion
router.post("/", async (req, res) => {
	// se valida que el correo exista
	const usuario = await Usuario.findOne({ correo: req.body.correo });
	if (!usuario) return res.status(400).send("Correo o contraseña no son validos");
	// muestra error si el pass no existe
	if (usuario.pass !== req.body.pass) return res.status(400).send("Correo o Contraseña no son validos");
	// generar un JWT
	const jwtToken = usuario.generateJWT();
	res.status(200).send({ jwtToken });
});
module.exports = router;
