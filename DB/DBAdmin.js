var mysql = require('mysql');
const cipher = require('../routes/cipher.js');
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
   Iniciar: admin =>{ 
      return new Promise((resolve, reject) => {
         con.query('SELECT *FROM ADMIN WHERE cor_adm=? ', [admin.cor], (err, result) => {
            if (err)
              throw err;
            if (result.length == 0) 
              return resolve({"response":0});
            //var data = cipher.d(result[0].pas_adm);
            //if (admin.con != data)
              //return resolve({"response":0});
            return resolve({"response":1 , "nombre":result[0].nom_adm})
         });
      });
   },
  Consultar: e =>{
  return new Promise ((resolve, reject)=>{
    con.query('SELECT * FROM usuario usuario',  function(error, result){
      if (error)
        throw error;
      return resolve(result);
     });
   });
 },
 InsertarFrac: frac =>{
  return new Promise ((resolve, reject)=>{
    con.query('INSERT INTO FRACCIONAMIENTO (?,?,?,?)',[],  function(error, result){
      if (error)
        throw error;
      return resolve(result);
     });
   });
 },
 InsertarVig: vig =>{
  return new Promise ((resolve, reject)=>{
    con.query('INSERT INTO VIGILANTE dir_fra',[frac],  function(error, result){
      if (error)
        throw error;
      return resolve(result);
     });
   });
 },
 InsertarIdVid: id =>{

 } 
} 
module.exports = funciones;
