var express = require('express');
var session = require('express-session');
var router = express.Router();
var DB = require('../DB/ControladorAdmin/DBAdmin');
var val = require('./regex');
const path = require('path');
const body_parser = require('body-parser');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));
router.use(session(
	{secret: 'abcd1234567',
	resave: false,
	saveUninitialized:false,
	cookie: {
		path:'/admin'
	}
}));
//Cambiar la ruta de estas madrolas para que las sesiones no tengan problemas entre si
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.sendFile("InicioSesionAdmin.html", {root: path.join(__dirname, "../public/html")});
	if (req.session.nombre != null)
	 	return res.redirect('./admin/AdminVig');
	console.log(req.session.nombre)
});

router.post('/Iniciar', function(req,res) {
	validado = val.ValAdm(req.body);
	if (validado != 0)
		return res.send(validado);
	DB.Iniciar(req.body).then(succes=>{
		if (succes.response != 1)
			return res.send("Contraseña o usuario incorrecto");
		if (req.body.con != "mauricio")
			return res.send("Usuarion o contraseña incorrecta");
		req.session.nombre = succes.nombre;
		return res.redirect('./AdminVig');
	});
});

router.post('/RegistrarVigFrac', function(req,res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("La madrola "+ JSON.stringify(req.body));
	validado = val.ValRegistroVigYFrec(req.body);
	if (validado != 0)
		return res.send(validado);
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

router.post('/EstadoFrac', function(req,res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	DB.ConsultarFrac2(req.body).then(Fraccionamientos =>{
		if (Fraccionamientos.estado)
			return res.send(Fraccionamientos.mensaje);
		return res.send(Fraccionamientos);
	});
});

/*Rutas get para cambiar de página*/
//Arreglar las sesiones, funciona en el primer ejs, pero cuando cambias a otro ya no aparece el nombre
router.get('/AdminVig',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	return res.render("VistasAdmin/AdmVig", {user: req.session.nombre});
});

router.get('/Registros',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarVigyFrac(req.body).then(succes=>{
		return res.render("VistasAdmin/UsRegis", {user: req.session.nombre, Consulta: succes[0]});
	});
});

router.get('/Fraccionamientos',function(req, res) {
	if(!req.session.nombre)
		return res.send("Primero tienes que iniciar sesion");
	console.log("Esta es tu sesion chiptoide " + req.session.nombre);
	DB.ConsultarFrac(req.body).then(succes=>{
		if (succes.length == 0)
			return res.render("VistasAdmin/Fraccion", {user: req.session.nombre});
		console.log("Esto es esto " + JSON.stringify(succes) );
		return res.render("VistasAdmin/Fraccion", {user: req.session.nombre, Fraccionamiento: succes});
	});
});

router.get('/Salir',function(req, res) {
	req.session.nombre = null;
	res.redirect('/');
});

module.exports = router;
