var express = require('express');
var session = require('express-session');
var router = express.Router();
var DB = require('../DB/DBAdmin');
var val = require('./regex');
const path = require('path');
const body_parser = require('body-parser');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));
router.use(session(
	{secret: 'abcd1234',
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
	DB.Iniciar(req.body).then(succes=>{
		if (succes.response != 1) 
			return res.send("Contraseña o usuario incorrecto");
		req.session.nombre = succes.nombre;
		console.log("Esta es tu sesion amiguito " + req.session.nombre);
		if (req.body.con != "mauricio") 
			return res.send("Usuarion o contraseña incorrecta");
		return res.render("AdmVig", {user:succes.nombre});
	});
});

router.post('/RegistrarVig', function(req,res) {
	//if (val.ValAdm(req.body) != 0) 
	//	return res.send("Ingresa tus datos correctamente");	
	console.log(req.body);
	DB.InsertarFrac(req.body).then(succes=>{
		if (succes != 1) 
			return res.send("Ese fraccionamiento ya ha sido registrado");
		DB.InsertarVig(req.body).then(succes=>{
			//DB.InsertarIdVig(req.body).then(succes=>{
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