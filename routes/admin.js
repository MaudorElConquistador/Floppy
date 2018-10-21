const express = require('express');
const session = require('express-session');
const router = express.Router();
const DB = require('../DB/DBAdmin');
const val = require('./regex');
const path = require('path');
const body_parser = require('body-parser');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));
// NO es recomenfable ponerle una contra así, ni tampoco subir este archivo a GitHub
router.use(session(
	{secret: 'Floppy es un proyecto desarrollado por personas buenas',
	resave: false,
	saveUninitialized:false
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile("InicioSesionAdmin.html", {root: path.join(__dirname, "../public/html")});
});

router.post('/Iniciar', function(req,res) {
	//if (val.ValAdm(req.body) != 0) 
	//	return res.send("Ingresa tus datos correctamente");	
	console.log(req.body);
	DB.Iniciar(req.body).then(success=>{
		if (success.response != 1)
			return res.send("Contraseña o usuario incorrecto");
		req.session.nombre = success.nombre;
		console.log("Esta es tu sesion amiguito " + req.session.nombre);
		if (req.body.con != "mauricio") 
			return res.send("Usuarion o contraseña incorrecta");
		return res.render("AdmVig", {user:success.nombre});
	});
});

router.post('/RegistrarVig', function(req,res) {
	//if (val.ValAdm(req.body) != 0) 
	//	return res.send("Ingresa tus datos correctamente");	
	console.log(req.body);
	DB.InsertarFrac(req.body).then(success=>{
		if (success != 1)
			return res.send("Ese fraccionamiento ya ha sido registrado");
		DB.InsertarVig(req.body).then(success=>{
			//DB.InsertarIdVig(req.body).then(success=>{
				res.send("Ya se registro");
			//});	
		});
	});
});

/*Rutas get para cambiar de página*/
//Arreglar las sesiones, funciona en el primer ejs, pero cuando cambias a otro ya no aparece el nombre
router.get('/AdminVig',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	return res.render("AdmVig", {user: req.body.nombre});
});

router.get('/Registros',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	return res.render("UsRegis", {user: JSON.stringify(req.body.nombre)});
});

router.get('/Fraccionamientos',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	DB.	
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	return res.render("Fraccion", {user: JSON.stringify(req.body.nombre)});
});

router.get('/Salir',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	req.session.nombre = null;	
	res.redirect('./');
});

module.exports = router;