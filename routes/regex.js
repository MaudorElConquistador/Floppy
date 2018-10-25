var regex = {
	ValAdm: adm =>{
		if (adm.cor.length <= 3 || adm.con.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (adm.cor.length == 0 || adm.con.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValRegistro: vig => {
		let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
		if (!regex.test(vig.cor))
			return "Ingresa un nombre correcto";
		if (isNaN(vig.tel) || vig.tel.length < 8 || vig.tel.length > 8 )
			return "Ingresa un número telefonico valido de 8 números";
		if (vig.tel.length > 10 ) 
			return "La capacidad del fraccionamiento no tiene que superar la cantidad de 10 vehiculos, ni ser cantidades negativas";
		return 0
	},
	ValVig: vig => {
		if (vig.corvig.length <= 3 || vig.convig.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (vig.corvig.length == 0 || vig.convig.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	}

}
module.exports = regex; 