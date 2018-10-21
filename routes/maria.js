const router = require("express").Router();

router.post(/^\/recognize-plate/, (req, res) => {
    if (!(req.query.username === "BenjaminGuzman" && req.query.password === "MariaUribe"))
        return res.status(404).send("Unauthorized");
    const plate = req.query.plate;
    console.log("Placa a buscar en la base de datos: \033[32;1m" + plate + "\033[0m");
    res.send("received")
});

module.exports = router;