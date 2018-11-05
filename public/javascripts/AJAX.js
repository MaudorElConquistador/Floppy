function Tabla(json, longitud) {
    var Tabl = document.createElement("table");
    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    var tr = document.createElement("tr"); 
   var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    th1.innerHTML="Nombre";
    th2.innerHTML="Estado";
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    Tabl.appendChild(thead);
    Tabl.setAttribute("class","responsive-table"); 
    thead.setAttribute("id","col s5");
    for (var i = 0; i <= longitud -1 ; i++) {
        var th1a = document.createElement("th");
        var th2a = document.createElement("th");
        var tra = document.createElement("tr");
        var nombre = document.createTextNode(JSON.stringify(json[i].nom_usu));
        alert("Holi " + json[i].est_car.data);
        if (json[i].est_car.data == 0){
            var estado = document.createTextNode("Afuera");
            th2a.className = "card-panel red";    
            th1a.appendChild(nombre);
            th2a.appendChild(estado);
            tra.appendChild(th1a);
            tra.appendChild(th2a);
            tbody.appendChild(tra);
            Tabl.appendChild(tbody);
        }else{
            var estado = document.createTextNode("Adentro");
            th1a.appendChild(nombre);
            th2a.appendChild(estado);
            th2a.className  = "card-panel green";
            tra.appendChild(th1a);
            tra.appendChild(th2a);
            tbody.appendChild(tra);
            Tabl.appendChild(tbody);
        }
    }
    document.getElementById("Consultas").appendChild(Tabl);;
}

function InsertarFrac(e) {
	var nombre = document.getElementById('nombre').value;
	var contra = document.getElementById('contraseña').value;
	var contac = document.getElementById('contacto').value;
	var telefo = document.getElementById('contactotelefono').value;
	var direcc = document.getElementById('direccion').value;
	var capaci = document.getElementById('capacidad').value;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			M.toast({html: xhr.responseText})
        }
    }
}

function ConsultarFrac(valor) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./EstadoFrac", true);//Enviar la peticion a la ruta en user
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom:valor}));
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
        	Json = JSON.parse(xhr.responseText);
            console.log("EWsto es esto " + xhr.responseText);
            alert("holi " + Json.length);
            document.getElementById("Consultas").innerHTML ="";    
            Tabla(Json, Json.length);
        }   
    } 
}


/*
function ConsultarFrac(e) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "./RegistrarVigFrac", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify({nom: nombre , pas: contra , cor: contac , tel: telefo , dir: direcc , cap: capaci ,}));
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
			alert("Esto es lo que se regresa " + JSON.stringify(xhr.responseText));
			//document.getElementById('exitoReg').inneHTML = xhr.responseText;
        }
    }	
}*/
