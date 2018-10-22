var regex = {
	ValAdm: adm =>{
		if (adm.cor.length <= 3 || adm.con.length <=3) 
			return "El correo electronico y la contraseña deben ser mayor a tres caracteres";
		if (adm.cor.length == 0 || adm.con.length == 0) 
			return "Ingresa todos los datos";
		return 0;
	},
	ValRegistro: vig => {
		if (isNaN(vig.tel))
			return 1;
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