var express = require('express');
var session = require('express-session');
var router = express.Router();
const path = require('path');
var val = require('./regex');
const DBUser = require('../DB/ControladorUser/DBUser');
const body_parser = require('body-parser');

router.use(body_parser.json());
router.use(body_parser.urlencoded({extended: true}));
router.use(session(
	{secret: 'abcd1234567',
	resave: false,
	saveUninitialized:false,
	cookie: {
		path:'/users'
	}
}));
//Cambiar la ruta de estas madrolas para que las sesiones no tengan problemas entre si
/*Routers */
//Rutas post
router.post('/Login', function(req, res) {
	console.log("Esto es esto " + JSON.stringify(req.body));
	var validado = val.ValUserLogin(req.body);
	if (validado != 0) 
		return res.json({estado:1, mensaje:validado});
	DBUser.Login(req.body).then(usuario =>{
		if (usuario != 0) 
			return res.json({estado:1, mensaje:usuario});
		req.session.nombre = req.body.nom; 
		return res.json({estado:0})
	});
});


/* GET users listing. */
router.get('/MiAuto', function(req, res, next) {
	if (!req.session.nombre)
		return res.send('Primero tienes que iniciar sesion');
	return res.render("VistasUser/MiAuto",{user: req.session.nombre});
});


module.exports = router;
