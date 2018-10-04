var regex = {
	ValAdm: adm =>{
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(adm.cor))
			return 1;
		if (adm.cor <= 3 || adm.con <=3) 
			return 1;
		return 0
	},
	ValVig: vig => {
		if (isNaN())
			return 1;
	}
}
module.exports = regex; 