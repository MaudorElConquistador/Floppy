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
	saveUninitialized:false,
	cookie: {
		path:'/vig'
	}
}));
//Cambiar la ruta de estas madrolas para que las sesiones no tengan problemas entre si
//Rutas post enviar formularios y cosas asi chidas
router.get('/', function(req, res, next) {
	res.sendFile("InicioSesionVig.html", {root: path.join(__dirname, "../public/html")});
});

router.post('/Ingresar', function(req, res) {
	validado = val.ValVig(req.body);
	if (validado != 0)
		return res.json({estado: 1,mensaje:validado});
	DBVig.IngresarVig(req.body).then(succes=>{
		if (succes != 0)
			return res.json({estado: 1,mensaje:succes});
		req.session.nombreVig = req.body.corvig;
		return res.json({estado: 0});
	});
});

router.post('/Enviar', function(req, res){
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	DBVig.ConsultarContraseña(req.session.nombreVig).then(clave =>{
		email.enviar(req.body, clave[0].cla_fra);
		res.send("Ya se envio la clave");
	});
});


router.post('/ModificarHab', function(req, res){
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esto es esto" + JSON.stringify(req.body));
	validado = val.ValModifiHab(req.body);
	if (validado != 0)
		return res.send(validado);
	if (req.body.con.length != 0){
		DBVig.ModificarContraseñaHab(req.body);
	}
	if (req.body.nom.length != 0){
		DBVig.ModificarNombreHab(req.body)
	}
	return res.send("Sus datos se han modificado con exito");
});

//Rutas get
router.get('/Usuarios', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	DBVig.ConsultarFrac(req.session.nombreVig).then(cosa =>{
		if (cosa == 'No hay habitantes en este fraccionamiento')
			return res.render("VistasVig/ModifiHab", {user: req.session.nombreVig, Fraccionamiento:''});
		console.log("Esto esta pasando " + JSON.stringify(cosa));

		return res.render("VistasVig/ModifiHab", {user: req.session.nombreVig, Fraccionamiento:cosa});	
	});	
});

router.get('/Fraccionamiento', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	DBVig.ConsultarFrac(req.session.nombreVig).then(cosa =>{
		if (cosa == 'No hay habitantes en este fraccionamiento')
			return res.render("VistasVig/EstadoFrac", {user: req.session.nombreVig, Fraccionamiento:''});	
		console.log("Esto esta pasando " + JSON.stringify(cosa));
		return res.render("VistasVig/EstadoFrac", {user: req.session.nombreVig, Fraccionamiento:cosa});
	});		
});

router.get('/EnviarClave', function(req, res) {
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesion");
	return res.render("VistasVig/RegUsu", {user: req.session.nombreVig});	
});

router.get('/Salir', function(req, res) {
	req.session.nombreVig = null;
	res.redirect('/');	
});

module.exports = router;