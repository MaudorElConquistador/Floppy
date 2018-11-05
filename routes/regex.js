var regex = {
	ValAdm: adm =>{
		if (adm.cor.length <= 3 || adm.con.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (adm.cor.length == 0 || adm.con.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValRegistroVigYFrec: vig => {
		let regex = /^[a-zàèìòùñA-ZÀÈÌÒÙÑ0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
		if (!regex.test(vig.cor))
			return "Ingresa un correo electronico valido correcto";
		if (isNaN(vig.tel) || vig.tel.length < 8 || vig.tel.length > 8 )
			return "Ingresa un número telefonico valido de 8 números";
		if (vig.cap.length > 10 ) 
			return "La capacidad del fraccionamiento no tiene que superar la cantidad de 10 vehiculos, ni ser cantidades negativas";
		return 0;
	},
	ValVig: vig => {
		if (vig.corvig.length <= 3 || vig.convig.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (vig.corvig.length == 0 || vig.convig.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValUser: user =>{
		if (user.cla.length == 0 ||  user.fra.length == 0 || user.nom.length == 0 || user.con.length == 0 || user.pla.length == 0) 
			return "Tiene que llenar todos los campos";
		return 0;
	},
	ValUserLogin: user =>{
		if (user.nom.length ==0 || user.con.length ==0) 
			return "Llena todos los campos por fa";
		return 0;
	}
}
module.exports = regex; 