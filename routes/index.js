var express = require('express');
var router = express.Router();
const path = require('path');
const body_parser = require('body-parser');
var DB = require('../DB/ControladorAdmin/DBAdmin');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile("index.html", {root: path.join(__dirname, "../public/html")});
});

router.get('/RegistroUsuario', function(req, res) {
	DB.ConsultarFrac().then(Fraccionamientos =>{ 
		return res.render("Registrate", {Fraccionamiento: Fraccionamientos});
	});
});

router.post('Registrate' , function(req, res) {
	//DB.
})


module.exports = router;
