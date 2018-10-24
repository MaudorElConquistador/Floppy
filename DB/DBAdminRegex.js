const mysql = require('mysql');
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

const funciones = {
   ExisteFrac: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve(1);         
            return resolve(0);
         });
      });
   },
   ExisteNombre: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve(1);         
            return resolve(0);
         });
      });
   },
   ExisteCorreo: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve(1);         
            return resolve(0);
         });
      });
   },
   ExisteNumero: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve(1);         
            return resolve(0);
         });
      });
   },
   ExisteCorreo: dir =>{
      return new Promise ((resolve, reject)=>{
         con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?', [dir],function(error, result){
            if (error)
              throw error;
            if (result.length >= 1)
               return resolve(1);         
            return resolve(0);
         });
      });
   },
} 
module.exports = funciones;
