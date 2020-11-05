// Modulos Node
const express = require("express");
const mongoose = require("mongoose");
// Modulos internos
const usuario = require("./routers/usuario");
const auth = require("./routers/auth");
const album = require("./routers/album");

//App
const app = express();
app.use(express.json());
app.use("/api/usuario/", usuario);
app.use("/api/auth", auth);
app.use("/api/album/", album);
// Puerto para ejecutar nuestro servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el puerto " + port));
// conexion con Mongo
mongoose
	.connect("mongodb://localhost/scrum", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Conexion a Mongo: online"))
	.catch((error) => console.log("Conexion a Mongo:Offline"));