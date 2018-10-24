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

router.post('/RegistrarVigFrac', function(req,res) {
	//if (val.ValAdm(req.body) != 0)
	//	return res.send("Ingresa tus datos correctamente");
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log(req.body);
  
	DB.InsertarVig(req.body).then(Vigilante=>{
		if (Vigilante != 1)
			return res.send(Vigilante);
		DB.InsertarFrac(req.body).then(Fraccionamiento=>{
			if (Fraccionamiento != 1)
				return res.send(Fraccionamiento);
			DB.InsertarIdVig(req.body).then(succes=>{
				res.send("El fraccionamiento y su vigilante ha sido registrados");
			});
		});
	});
});

router.post('/ConsultarVig', function(req,res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	DB.ConsultarFrac().then(Fraccionamientos =>{
		if (Fraccionamientos)
			return res.send(Fraccionamientos.mensaje);
	});
});

/*Rutas get para cambiar de página*/
//Arreglar las sesiones, funciona en el primer ejs, pero cuando cambias a otro ya no aparece el nombre
router.get('/AdminVig',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	return res.render("VistasAdmin/AdmVig", {user: req.body.nombre});
});

router.get('/Registros',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarVigyFrac(req.body).then(succes=>{
		console.log("GHVJHVJH ::::: " + JSON.stringify(succes[0]))
		return res.render("VistasAdmin/UsRegis", {user: req.session.nombre, Consulta: succes[0]});
	});
});

router.get('/Fraccionamientos',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	DB.	
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarFrac(req.body).then(succes=>{
		console.log("Esto es esto " + JSON.stringify(succes));
		if (succes==0)
			return res.render("VistasAdmin/Fraccion", {user: JSON.stringify(req.body.nombre)});
		return res.render("VistasAdmin/Fraccion", {user: req.session.nombre, Fraccionamiento: succes});
	});
});

router.get('/Salir',function(req, res) {
	req.session.nombre = null;
	res.redirect('/');
});

module.exports = router;
