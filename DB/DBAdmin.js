const mysql = require('mysql');
const DBVal = require('./DBAdminRegex.js');
const cipher = require('../routes/cipher.js');
const escape = require("mysql").escape;
const con = mysql.createConnection({
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
//Regresar 0 para errores
const funciones = {
  Iniciar: admin =>{ 
    return new Promise((resolve, reject) => {
      con.query('SELECT * FROM ADMIN WHERE cor_adm=?', [admin.cor], (err, result) => {
      if (err)
        throw err;
      if (result.length == 0) 
        return resolve({"response":0});
      return resolve({"response":1 , "nombre":result[0].nom_adm})
      });
    });
  },
  Consultar: e =>{
  return new Promise ((resolve, reject)=>{
    con.query('SELECT *FROM usuario usuario',  function(error, result){
      if (error)
        throw error;
      return resolve(result);
     });
   });
 },
 InsertarFrac: frac =>{
  return new Promise ((resolve, reject)=>{
    DBVal.ExisteFrac(frac.dir).then(objeto =>{
      if (objeto != 0) 
        return resolve(0);
      con.query('INSERT INTO FRACCIONAMIENTO(dir_fra, cap_fra) VALUES(?,?)',[frac.dir, frac.cap], function(error, result){
        if (error)
          throw error;
        return resolve(1);
      });
    });
   });
 },
 InsertarVig: vig =>{
  return new Promise ((resolve, reject)=>{
    con.query('INSERT INTO VIGILANTE(nom_vig,pas_vig,cor_vig,dir_vig,tel_vig) VALUES (?,?,?,?,?)', [vig.nom, cipher.cifrar(vig.pas), vig.cor, vig.dir, cipher.cifrar(vig.tel)], function(error, result){
      if (error)    
        throw error;
      return resolve(result);
     });
   });
 },
 InsertarIdVig: dir =>{
  return new Promise ((resolve, reject)=>{
    con.query('INSERT INTO FRACCIONAMIENTO(id_vig) SELECT id_vig FROM VIGILANTE WHERE dir_vig = ?',[dir.dir],  function(error, result){
      if (error)
        throw error;
      return resolve(result);
     });
   });
  }
};
module.exports = funciones;
