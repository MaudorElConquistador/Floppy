const router = require("express").Router();
var DB = require('../DB/ControladorVig/DBVig');

router.post(/^\/recognize-plate/, (req, res) => {
    //if (!(req.query.username === "BenjaminGuzman" && req.query.password === "MariaUribe"))
        //return res.status(404).send("Unauthorized");
    const plate = req.query.plate;
    console.log("Placa a buscar en la base de datos: \033[32;1m" + plate + "\033[0m");

    DB.ConsultaPlaca(plate).then(estado=>{
    	if (estado != 0)
    		return res.send(false)//Cambiar por cero y uno para identificar cuando mover el servo
    	return res.send(true);
    });
});


router.post(/^\/ChangeState1/, (req, res) => {
    //if (!(req.query.username === "BenjaminGuzman" && req.query.password === "MariaUribe"))
        //return res.status(404).send("Unauthorized");
    const plate = req.query.plate;
    console.log("Cambiar estado en la base de datos: \033[32;1m" + plate + "\033[0m");

    DB.Afuera(plate).then(estado=>{
        if (estado != 0)
            return res.send(false)//Cambiar por cero y uno para identificar cuando mover el servo
        return res.send(true);
    });
});

router.post(/^\/ChangeState0/, (req, res) => {
    //if (!(req.query.username === "BenjaminGuzman" && req.query.password === "MariaUribe"))
        //return res.status(404).send("Unauthorized");
    const plate = req.query.plate;
    console.log("Cambiar estado en la base de datos: \033[32;1m" + plate + "\033[0m");

    DB.Adentro(plate).then(estado=>{
        if (estado != 0)
            return res.send(false)//Cambiar por cero y uno para identificar cuando mover el servo
        return res.send(true);
    });
});

router.get(/^\//, function(req, res) {
	res.send("Holi que paso paps");
});

module.exports = router;