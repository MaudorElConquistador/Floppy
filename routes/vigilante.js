var express = require('express');
var session = require('express-session');
var router = express.Router();
/*Para el socket-----------------------*/
const net = require("net");
const server = net.createServer(socket => socket.on("data", buffer => io.emit("video stream", buffer.toString("utf-8"))));

server.on("error", err => {
    console.error(err);
    server.close();
});

server.on("listening", () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.listen({
    host: "159.89.150.189",
    port: 5050
});
const fs = require("fs");
const io = require("socket.io")(8888);
/*-------------------------------------*/
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
		return res.send("Primero tienes que iniciar sesión");
	DBVig.ConsultarContraseña(req.session.nombreVig).then(clave =>{
		email.enviar(req.body, clave[0].cla_fra);
		res.send("Ya se envio la clave");
	});
});


//Modificaciones del habitante
router.post('/ModNomHab', function(req, res){
	if(!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesión");
	console.log("Los datos " + JSON.stringify(req.body));
	validado = val.ValModHabNom(req.body);
	if (validado != 0)
		return res.send(validado);
	DBVig.ModificarNombreHab(req.body).then(mensaje =>{
		return res.send(mensaje);
	});
});

router.post('/ModMatHab', function (req, res) {
	if (!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesión"); 
	console.log("Los datos " + JSON.stringify(req.body));
	validado = val.ValModHabMat(req.body);
	if (validado != 0)
		return res.send(validado)
	DBVig.ModificarMatriculaHab(req.body).then(mensaje =>{
		return res.send(mensaje);
	});
});

router.post('/ModMarHab', function (req, res) {
	if (!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesión"); 
	validado = val.ValModHabMar(req.body);
	if (validado != 0)
		return res.send(validado)
	DBVig.ModificarMarcaHab(req.body).then(mensaje=>{
		return res.send(mensaje);
	});
});

router.post('/EliminarHab', function (req, res) {
	if (!req.session.nombreVig)
		return res.send("Primero tienes que iniciar sesión"); 
	DBVig.EliminarHab(req.body).then(mensaje=>{
		return res.send(mensaje);
	})
});

//Rutas get
router.get('/Usuarios', function(req, res) {
	if(!req.session.nombreVig)
		return res.sendFile("ErrorSesion.html", {root: path.join(__dirname, "../public/html")});
	DBVig.ConsultarFrac(req.session.nombreVig).then(cosa =>{
		if (cosa == 'No hay habitantes en este fraccionamiento')
			return res.render("VistasVig/ModifiHab", {user: req.session.nombreVig, Fraccionamiento:''});
		console.log("Esto esta pasando " + JSON.stringify(cosa));
		return res.render("VistasVig/ModifiHab", {user: req.session.nombreVig, Fraccionamiento:cosa});	
	});	
});

router.get('/Fraccionamiento', function(req, res) {
	if(!req.session.nombreVig)
		return res.sendFile("ErrorSesion.html", {root: path.join(__dirname, "../public/html")});
	DBVig.ConsultarFrac(req.session.nombreVig).then(cosa =>{
		if (cosa == 'No hay habitantes en este fraccionamiento')
			return res.render("VistasVig/EstadoFrac", {user: req.session.nombreVig, Fraccionamiento:''});	
		console.log("Esto esta pasando " + JSON.stringify(cosa[1].est_car[0]));
		return res.render("VistasVig/EstadoFrac", {user: req.session.nombreVig, Fraccionamiento:cosa});
	});		
});

router.get('/Video', function (req, res) {
	if(!req.session.nombreVig)
		return res.sendFile("ErrorSesion.html", {root: path.join(__dirname, "../public/html")});
	return res.render("VistasVig/Video", {user: req.session.nombreVig});
});

router.get('/EnviarClave', function(req, res) {
	if(!req.session.nombreVig)
		return res.sendFile("ErrorSesion.html", {root: path.join(__dirname, "../public/html")});
	return res.render("VistasVig/RegUsu", {user: req.session.nombreVig});	
});

router.get('/Salir', function(req, res) {
	req.session.nombreVig = null;
	res.redirect('/');	
});

module.exports = router;