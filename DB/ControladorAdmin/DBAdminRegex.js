var mysql = require('mysql');
const cipher = require('/Floppy/routes/cipher.js');
const escape = require("mysql").escape;
var con = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'holamundo',
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
   ExisteFrac: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve("Ya se ha registrado un fraccionamiento con esa direccion");         
            console.log("Esto es lo que me sale paps " + JSON.stringify(result));
            return resolve(0);
         });
      });
   },
   ExisteVig: correo =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM VIGILANTE WHERE cor_vig = ? ', [correo], function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve("Ya se ha registrado un vigilante con ese correo electronico");         
            return resolve(0);
         });
      });
   },
} 
module.exports = funciones;
