const CryptoJS = require("crypto-js");

var funciones = {
  e: data =>{
    var ciphertext = CryptoJS.AES.encrypt(data, 'secret key 12345');
    return ciphertext.toString();
  },//listo
  d: parametros =>{
	console.log("Esto es el nombre v " + parametros+"");

    var prueba = CryptoJS.AES.decrypt(parametros, 'secret key 12345'); 
    console.log("eSTO ES los que no regresa en la de cipher " + prueba.toString(CryptoJS.enc.Utf8));
    var descifrado = prueba.toString(CryptoJS.enc.Utf8);

	 return descifrado;
  }
}
module.exports = funciones;
