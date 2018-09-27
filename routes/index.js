var express = require('express');
var router = express.Router();
const path = require('path');
const body_parser = require('body-parser');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile("index.html", {root: path.join(__dirname, "../public/html")});
});

module.exports = router;
