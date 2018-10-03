/*function Init(argument) {
	var correo = document.getElementById('email').value;
	var contraseña = document.getElementById('contraseña').value;
	var xhr = new XMLHttpRequest();
	xhr.open("post", "./admin/Iniciar", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({cor:correo,con:contraseña}));
    console.log("HOLI");
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            //document.getElementById('error').innerHTML = xhr.responseText;                 
        }
    }
}*/