var regexNombre = /^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$/;
var regexCor = /^[a-zàèìòùñA-ZÀÈÌÒÙÑ0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
var regexNumber =/^[0-9]+$/;
var regexPlaca = /^([A-Z]{3})+([0-9]{3,4})$/;
var regex = {
	ValAdm: adm =>{
		if (!regexCor.test(adm.cor)) 
			return "Ingresa un correo electronico valido ejemplo@ejemplo.ne"
		if (adm.cor.length == 0 || adm.con.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValRegistroVigYFrec: vig => {
		if (vig.nom.length == 0 || vig.pas.length == 0 || vig.cor.length == 0 || vig.tel.length == 0 || vig.dir.length == 0 || vig.cap.length == 0 ) 
			return "Tiene que llenar todos los campos";
		if (!regexCor.test(vig.cor))
			return "Cumple con el fromato establecido del correo electronico";
		if (!regexNumber.test(vig.tel) || vig.tel.length < 8 || vig.tel.length > 8 )
			return "Ingresa un número telefonico valido de 8 números"; 
		if (!regexNombre.test(vig.nom))
			return "Ingresa un nombre valido"; 
		if (!regexNumber.test(vig.cap))
			return "ingresa un numero valido";
		if (parseInt(vig.cap) > 10 ) 
			return "La capacidad del fraccionamiento no tiene que superar la cantidad de 10 vehiculos, ni ser cantidades negativas";
		return 0;
	},
	ValModifiVig: vig =>{//"fra":"Ciudad Almeja
		if (vig.nom.length == 0 && vig.pas.length  == 0 && vig.cor.length  == 0 && vig.tel.length == 0 ) 
			return "Tienes que llenas por lo menos un campo";
	},
	ValVig: vig => {
		if (vig.corvig.length == 0 || vig.convig.length == 0) 
			return "Llena todos los campos";
		if (!regexCor.test(vig.corvig)) 
			return "Ingresa un correo electronico valido ejemplo@ejemplo.ne"
		return 0;
	},
	ValUserRegistro: user =>{
		if (user.cla.length == 0 ||  user.fra.length == 0 || user.nom.length == 0 || user.con.length == 0 || user.pla.length == 0 || user.cor.length == 0 || user.mar.length == 0 ) 
			return "Tiene que llenar todos los campos";
		if (user.cla.length > 99 ||  user.fra.length > 99 || user.nom.length > 99 || user.con.length == 99 || user.pla.length == 0 || user.cor.length == 0 || user.mar.length == 0 ) 
			return "Los campos no pueden sobrepasar los 99 caracteres";
		if (!regexCor.test(user.cor)) 
			return "Cumple con el fromato establecido del correo electronico";
		if (!regexNombre.test(user.nom))
			return "Escribe un nombre valido";
		if (user.pla.length > 7 || user.pla.length < 6 ) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";
		if (!regexPlaca.test(user.pla)) 
			return "Las placas de la CDMX tienen que cumplir con el siguiente formato AAA-999 o AAA-9999";
		if (user.con.length >=17 || user.con.length <=8) 
			return "La contraseña tiene que se de mas de 8 caracteres y menor que 17";
		return 0;
	},
	ValUserLogin: user =>{
		if (user.nom.length ==0 || user.con.length ==0) 
			return "Llena todos los campos";
		return 0;
	},
	ValModHabNom: user =>{
		if (!regexNombre.test(user.nom))
			return "Escribe un nombre valido";
		return 0;
	},
	ValModHabMar: user =>{
		if (!regexNombre.test(user.nom))
			return "Escribe una marca de auto valido";
		return 0;
	},
	ValModHabMat: user =>{
		if (!regexPlaca.test(user.mat))
			return "Las placas del Estado de México tienen que cumplir con el siguiente formato AAA999 o AAA9999";
		if (user.mat.length > 7 || user.mat.length < 6 ) 
			return "Las placas del Estado de México tienen que cumplir con el siguiente formato AAA999 o AAA9999";
		return 0;
	}
}
module.exports = regex; 