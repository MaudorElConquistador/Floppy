function Registrarse(e) {
	var nombre = document.getElementById('correo').value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({cor: nombre}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
        	if (xhr.status == 200) {
        		M.toast({html: xhr.responseText})	
        	}else{
        		M.toast({html: xhr.responseText})	
        	}
      	}
    }
}