const router = require("express").Router();
var DB = require('../DB/ControladorVig/DBVig');

router.post(/^\/recognize-plate/, (req, res) => {
    if (!(req.query.username === "BenjaminGuzman" && req.query.password === "MariaUribe"))
        return res.status(404).send("Unauthorized");
    const plate = req.query.plate;
    console.log("Placa a buscar en la base de datos: \033[32;1m" + plate + "\033[0m");

    DB.ConsultaPlaca(plate).then(estado=>{
    	if (estado != 0)
    		return res.send(0) 
    	return res.send(1);
    });
});

module.exports = router;