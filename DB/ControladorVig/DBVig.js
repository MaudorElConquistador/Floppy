var mysql = require('mysql'); 
const cipher = require('/Floppy/routes/cipher.js');
const escape = require("mysql").escape;
var DBUtil = require('../ControladorAdmin/DBAdminRegex.js');
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
	IngresarVig: vig =>{
    return new Promise ((resolve, reject)=>{
      con.query('CALL ConsultarVig(?)', [vig.corvig], function(error, result){
        console.log("Esto es esto "+JSON.stringify(result));
        if (error)
        	throw error;
        if (result[0].length == 0)
        	return resolve("No hay ningún vigilante registrado con ese nombre");
        if (cipher.decifrar(result[0][0].pas_vig) != vig.convig)
        	return resolve("Contraseña incorrecta"); 	 
        return resolve(0);
      });
    });
  },
  ConsultarContraseña: vig =>{
    return new Promise ((resolve, reject)=>{
      con.query('SELECT FRACCIONAMIENTO.cla_fra FROM FRACCIONAMIENTO INNER JOIN VIGILANTE ON FRACCIONAMIENTO.dir_fra = VIGILANTE.dir_vig WHERE VIGILANTE.cor_vig = ?', [vig] ,function(error, result){
        if (error)
          throw error;
        return resolve(result);
      });
    });
  },
  ConsultarFrac: nombre =>{
    return new Promise ((resolve, reject)=>{
      con.query('SELECT FRACCIONAMIENTO.id_fra from FRACCIONAMIENTO INNER JOIN VIGILANTE ON FRACCIONAMIENTO.id_vig = VIGILANTE.id_vig WHERE VIGILANTE.cor_vig = ?', [nombre] ,function(error, result){
        if (error)
          throw error;
        if (result.length == 0)
          return resolve("No hay fraccionamiento"); 
        DBUtil.Habitante(result[0].id_fra).then(resultado =>{
          if (resultado.estado) 
            return resolve(resultado.mensaje);
          return resolve(resultado);
        }); 
      });
    });
  },
  ConsultaPlaca: placa =>{
    return new Promise ((resolve, reject)=>{
      con.query('SELECT FRACCIONAMIENTO.id_fra from FRACCIONAMIENTO INNER JOIN VIGILANTE ON FRACCIONAMIENTO.id_vig = VIGILANTE.id_vig WHERE VIGILANTE.cor_vig = ?', [nombre] ,function(error, result){
        if (error)
          throw error;
        if (result.length == 0)
          return resolve(1);
        return 0;  
      });
    });
  }
}
module.exports = funciones;
