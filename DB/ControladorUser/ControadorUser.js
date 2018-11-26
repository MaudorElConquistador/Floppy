var mysql = require('mysql'); 
var DBVal = require('./DBAdminRegex.js');
const cipher = require('/Floppy/routes/cipher.js');
const escape = require("mysql").escape;
var con = mysql.createConnection({
   host: 'localhost',
   user: 'floppy_admin',
   password: 'n0m3l0',
   database: 'Floppy',
   port: 3306
});
con.connect(function(error){
   if(error){
      throw error;
   }else{ 
      console.log('Conexion correcta.');
   }
});

var funciones = {
  Iniciar: admin =>{ 
    return new Promise((resolve, reject) => {
      con.query('CALL TransaUser(?,?,?,?) ', [admin.cor], (err, result) => {
      if (err)
        throw err;
      return resolve({"response":1 , "nombre":result[0].nom_adm})
      });
    });
  },

}