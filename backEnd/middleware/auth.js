// modulos de node
const jwt = require("jsonwebtoken");
//creamos la validacion para identificar el usuario logueando y todos sus procesos
function auth(req, res, next) {
	let jwtToken = req.header("Authorization");
	if (!jwtToken) return res.status(405).send("No hay token para un acceso");
	//Split al jwt para separar el Beaver que pone por defecto en el header del Auth
	jwtToken = jwtToken.split(" ")[1];
	// si el token no existe
	if (!jwtToken) return res.status(405).send("No hay token para un acceso");
	try {
		const payload = jwt.verify(jwtToken, "clave");
		req.usuario = payload;
		next();
	} catch (error) {
		res.status(405).send("token sin autorizacion");
	}
}
module.exports = auth;
