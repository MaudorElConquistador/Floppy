var express = require('express');
var session = require('express-session');
var router = express.Router();
var DBVig = require('../DB/ControladorVig/DBVig');
var email = require('./envia.js');
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
//Rutas post enviar formularios y cosas asi chidas
router.get('/', function(req, res, next) {
	res.sendFile("InicioSesionVig.html", {root: path.join(__dirname, "../public/html")});
});

router.post('/Ingresar', function(req, res) {
	validado = val.ValVig(req.body);
	if (validado != 0)
		return res.send(validado);
	DBVig.IngresarVig(req.body).then(succes=>{
		if (succes != 0)
			return res.send("esto "+succes);
		req.session.nombreVig = req.body.corvig;
		return res.redirect('./EnviarClave');
	});
});

router.post('/Enviar', function(req, res){
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	DBVig.ConsultarContraseña(req.session.nombreVig).then(clave =>{
		email.enviar(req.body, clave);
		res.send("Ya se envio la clave");
	});
});

//Rutas get
router.get('/Usuarios', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	return res.render("VistasVig/RegUsu", {user: req.session.nombreVig});	
});

router.get('/Fraccionamiento', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	return res.render("VistasVig/EstadoFrac", {user: req.session.nombreVig, Fraccionamiento :''});	
});

router.get('/EnviarClave', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	return res.render("VistasVig/RegUsu", {user: req.session.nombreVig});	
});

router.get('/Salir', function(req, res) {
	req.session.nombreVig = null;
	res.redirect('./');	
});


module.exports = router;