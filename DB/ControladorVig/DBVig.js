var mysql = require('mysql'); 
const cipher = require('../../routes/cipher.js');
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
      con.query('SELECT FRACCIONAMIENTO.id_fra FROM FRACCIONAMIENTO INNER JOIN VIGILANTE ON FRACCIONAMIENTO.id_vig = VIGILANTE.id_vig WHERE VIGILANTE.cor_vig = ?', [nombre] ,function(error, result){
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
      con.query('SELECT *FROM HABITANTE WHERE let_hab = ?', [placa] ,function(error, result){
        if (error)
          throw error;
        console.log("la longitud del resultado " + result.length)
        if (result.length == 0)
          return resolve(1);
        return resolve(0);  
      });
    });
  },
  Adentro: placa =>{
    return new Promise ((resolve, reject)=>{
      con.query('UPDATE car SET est_car = false WHERE let_car = ?', [placa] ,function(error, result){
        if (error)
          throw error;
        return resolve(0);  
      });
    });
  },
  Afuera: placa =>{
    return new Promise ((resolve, reject)=>{
      con.query('UPDATE car SET est_car = true WHERE let_car = ?', [placa] ,function(error, result){
        if (error)
          throw error;
        return resolve(0);  
      });
    });
  },
  ModificarNombreHab: Habitante =>{
    return new Promise ((resolve, reject)=>{
      DBUtil.ExisteUser(Habitante.cor).then(mensaje =>{
        if (mensaje.estado == 0)
          return resolve("No se ha encontrado a ese usuario")   
        con.query('UPDATE HABITANTE SET nom_usu = ? WHERE cor_usu = ?',[Habitante.nom, Habitante.cor] ,function(error, result){
          if (error)
            throw error;
          return resolve("Los datos han sido modificados");
        });
      });
    });
  },
  ModificarMarcaHab: Habitante =>{
    return new Promise ((resolve, reject)=>{
       DBUtil.ExisteUser(Habitante.cor).then(mensaje =>{
        if (mensaje.estado == 0)
          return resolve("No se ha encontrado a ese usuario")
        con.query('UPDATE HABITANTE SET mar_car = ? WHERE cor_usu = ?',[Habitante.mar, Habitante.cor] ,function(error, result){
          if (error)
            throw error;
          return resolve("Los datos han sido modificados");
        });
      });
    });
  },
  ModificarMatriculaHab: Habitante =>{
    return new Promise ((resolve, reject)=>{
      DBUtil.ExisteUser(Habitante.cor).then(mensaje =>{
        if (mensaje.estado == 0)
          return resolve("No se ha encontrado a ese usuario")
        DBUtil.ExistePlaca(Habitante.mat).then(placa =>{
          if (placa.estado == 1)
            return resolve(placa.mensaje)
          con.query('UPDATE CAR INNER JOIN HABITANTE ON HABITANTE.let_hab = CAR.let_car SET CAR.let_car = ?, HABITANTE.let_hab = ? WHERE cor_usu = ?',[Habitante.mat, Habitante.mat, Habitante.cor] ,function(error, result){
            if (error)
              throw error;
            return resolve("Los caracteres de la placa han sido modificados con éxito");
          });
        });
      });
    });
  },
  EliminarHab: Habitante=>{
    return new Promise ((resolve, reject)=>{
      DBUtil.ExisteUser(Habitante.hab).then(esto =>{
        if (esto.estado == 0)
          return resolve('Ese usuario no esta registrado')
        con.query('DELETE FROM HABITANTE WHERE cor_usu = ?',[Habitante.hab] ,function(error, result){
          if (error)
            throw error;
          return resolve("El usuario ha sido eliminado con exito");
        });
      });
    });
  }
}
module.exports = funciones;
