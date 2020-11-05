const express = require("express");
const router = express.Router();
//modulos internos
const { Album } = require("../model/album");
const { Usuario } = require("../model/usuario");
const auth = require("../middleware/auth");
const cargarArchivo = require("../middleware/file");
//rutas
// listar todos lo albumnes
router.get("/lista", auth, async (req, res) => {
	// se busca el usuario
	const usuario = await Usuario.findById(req.usuario._id);
	// muestra error si no existe el usuario
	if (!usuario) return res.status(400).send("El usuario no existe en BD");
	// si el usuario existe
	const album = await Album.find({ idUsuario: req.usuario._id });
	res.send(album);
});
//Registrar Album
router.post("/", cargarArchivo.single("imagen"), auth, async (req, res) => {
	const url = req.protocol + "://" + req.get("host");
	// se obtiene el id del usuario autenticado
	const usuario = await Usuario.findById(req.usuario._id);
	// muestra error si el usuario no existe
	if (!usuario) return res.status(400).send("El usuario no existe");
	// si el usuario existe se crea un album para ese usuario
	let rutaImagen = null;
	if (req.file.filename) {
		rutaImagen = url + "/public/" + req.file.filename;
	} else {
		rutaImagen = null;
	}
	const album = new Album({
		idUsuario: usuario._id,
		nombre: req.body.nombre,
		imagen: rutaImagen,
	});
	// se envia el resultado
	const resultado = await album.save();
	res.status(200).send(resultado);
});
// se actualiza el album
router.put("/", auth, async (req, res) => {
	//Buscamos el usuario por id
	const usuario = await Usuario.findById(req.usuario._id);
	//muestra error si el usuario no existe
	if (!usuario) return res.status(400).send("El usuario no existe en BD");
	// si el usuario existe
	const album = await Album.findByIdAndUpdate(
		req.body._id,
		{
			idUsuario: req.usuario._id,
			nombre: req.body.nombre,
		},
		{
			new: true,
		}
	);
	if (!album) return res.status(400).send(" no hay album asignado a este usuario");
	res.status(200).send(album);
});
//Eliminar album
router.delete("/:_id", auth, async (req, res) => {
	//Buscamos usuario
	const usuario = await Usuario.findById(req.usuario._id);
	//muestra error si no existe el usuario
	if (!usuario) return res.status(400).send("El usuario no existe en la BD");
	// si existe eliminamos el album
	const album = await Album.findByIdAndDelete(req.params._id);
	//si no existe ese album
	if (!album) return res.status(400).send("No se encontro album para eliminar");
	// muestra mensaje si se elimina el album
	res.status(200).send({ message: "Album elmiminado" });
});
module.exports = router;
