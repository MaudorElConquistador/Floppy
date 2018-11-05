var mysql = require('mysql'); 
var DBVal = require('../ControladorAdmin/DBAdminRegex.js');
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
  Registrar: user =>{
    return new Promise((resolve, reject) => {
      DBVal.ExisteFrac2(user.fra, user.cla).then(fraccionamiento =>{
        if(fraccionamiento.estado != 0)
          return resolve(fraccionamiento.mensaje);
        DBVal.ExisteUser(user.nom).then(usuario=>{
          if (usuario.estado !=0 ) 
            return resolve(usuario.mensaje);
          DBVal.ExistePlaca(user.pla).then(placas =>{
            if (placas.estado !=0 )
              return resolve(placas.mensaje);
            con.query('CALL TransaUser(?,?,?,?) ', [user.nom, cipher.cifrar(user.con), user.pla, fraccionamiento.resultado[0].id_fra], (err, result) => {
              if (err)
                throw err;
              return resolve("Se ha registrado correctamente")
            });
          });
        });
      });
    });
  },
  Login: user =>{
    return new Promise((resolve, reject) =>{
      con.query('SELECT *FROM HABITANTE WHERE nom_usu = ?', [user.nom], (err, result) => {
        if (err)
          throw err;
        if (result.length == 0) 
          return resolve("Ese usuarion no existe");
        console.log("Hola "+user.con +" " + cipher.decifrar(result[0].pas_usu));
        if (user.con != cipher.decifrar(result[0].pas_usu)) 
          return resolve("Contraseña incorrecta");
        return resolve(0);
      });
    });
  }
}
module.exports = funciones;