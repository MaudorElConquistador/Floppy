var mysql = require('mysql'); 
var DBVal = require('./DBAdminRegex.js');
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
  Iniciar: admin =>{ 
    return new Promise((resolve, reject) => {
      con.query('SELECT *FROM ADMIN WHERE cor_adm=? ', [admin.cor], (err, result) => {
      if (err)
        throw err;
      if (result.length == 0) 
        return resolve({"response":0});
      return resolve({"response":1 , "nombre":result[0].nom_adm})
      });
    });
  },
  InsertarFrac: frac =>{
    return new Promise ((resolve, reject)=>{
      DBVal.ExisteFrac(frac.dir).then(Fraccionamiento =>{
        console.log("Esto esta pasando " + Fraccionamiento);
        if (Fraccionamiento != 0) 
          return resolve(Fraccionamiento);
        con.query('INSERT INTO FRACCIONAMIENTO(dir_fra, cap_fra,cla_fra) VALUES(?,?,?)',[frac.dir, frac.cap, cipher.cifrar(frac.dir)], function(error, result){
          if (error)
            throw error;
          return resolve(1);
          });
        });
    });
  },
  InsertarVig: vig =>{
    return new Promise ((resolve, reject)=>{
      DBVal.ExisteVig(vig.cor).then(Vigilante =>{
        if (Vigilante != 0) 
          return resolve(Vigilante);
        con.query('INSERT INTO VIGILANTE(nom_vig,pas_vig,cor_vig,dir_vig,tel_vig) VALUES (?,?,?,?,?)',[vig.nom, cipher.cifrar(vig.pas), vig.cor, vig.dir, cipher.cifrar(vig.tel)], function(error, result){
          if (error)    
            throw error;
          return resolve(1);
          });
        });
    });
  },
  InsertarIdVig: dir =>{
    return new Promise ((resolve, reject)=>{
      con.query('CALL InsertIdVig', function(error, result){
        if (error)
          throw error;
        return resolve(1);
      });
    });
  },
  ConsultarFrac: e =>{
    return new Promise ((resolve, reject)=>{
      con.query('SELECT *FROM FRACCIONAMIENTO ', function(error, result){
        if (error)
          throw error;
        if (result.length == 0)
          return resolve("No hay ningun fraccionamiento registrado"); 
        return resolve(result);
        });
    });
  },
  ConsultarVigyFrac: e =>{
    return new Promise ((resolve, reject)=>{
      con.query('CALL ConsultarVigyFrac', function(error, result){
        if (error)
          throw error;
        if (result.length < 1)
          return resolve("No hay ningun fraccionamiento registrado"); 
        return resolve(result);
        });
    });
  },
  ConsultarFrac2: Fraccion =>{
    return new Promise ((resolve, reject)=>{
      con.query('SELECT *FROM FRACCIONAMIENTO WHERE dir_fra = ?',[Fraccion.nom] ,function(error, result){
        if (error)
          throw error;
        if (result.length ==0 )
          return resolve({estado:1 ,mensaje: "No ningun fraccionamiento con ese nombre"}); 
        DBVal.TodosHabitantes(result[0].id_fra).then(habitantes =>{
          if (habitantes.estado)
            return resolve(habitantes.mensaje) 
          return resolve(habitantes);    
        });
        });
    });
  }    
} 
module.exports = funciones;
