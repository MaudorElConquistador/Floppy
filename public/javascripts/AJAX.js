function limpiar(e) {
	document.getElementById('exitoReg').inneHTML = "";
}
function InsertarFrac(e) {
	var nombre =document.getElementById('nombre').value;
	var contra =document.getElementById('contraseña').value;
	var contac =document.getElementById('contacto').value;
	var telefo =document.getElementById('contactotelefono').value;
	var direcc =document.getElementById('direccion').value;
	var capaci =document.getElementById('capacidad').value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			alert("Esto es lo que se regresa " + JSON.stringify(xhr.responseText));
			document.getElementById('exitoReg').inneHTML = xhr.responseText;
        }
    }
}
function ConsultarFrac(e) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			alert("Esto es lo que se regresa " + JSON.stringify(xhr.responseText));
			document.getElementById('exitoReg').inneHTML = xhr.responseText;
        }
    }	
}