const CryptoJS = require("crypto-js");

var funciones = {
  cifrar: parametros =>{
    var ciphertext = CryptoJS.AES.encrypt(parametros, 'secret key 12345');
    return ciphertext.toString();
  },
  decifrar: parametros =>{
    var prueba = CryptoJS.AES.decrypt(parametros, 'secret key 12345'); 
    var descifrado = prueba.toString(CryptoJS.enc.Utf8);
	 return descifrado;
  }
}
module.exports = funciones;
