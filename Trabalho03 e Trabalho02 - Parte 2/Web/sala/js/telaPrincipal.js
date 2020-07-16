function getSalasDisponiveis(){
    var result = sendAPI("GET", "http://localhost:8000/api/e1/salas", false, null); 
    return result;
}

function desconectar(){
    var object = returnUser(sessionStorage.getItem("idUser") );
    object.active = false;
    json = JSON.stringify(object);
    sendAPI("PUT", "http://localhost:8000/api/e1/user?idUser="+ sessionStorage.getItem("idUser"), false, json);    
}

function returnUser(idUser){
    var url = "http://localhost:8000/api/e1/User";
    if(idUser > 0){
        url = url +"?idUser="+ idUser;
    } 
    return sendAPI("GET", url, false, null);
}

function sair(){
    desconectar();
    window.location.href = "../"; 
}

function criarSala(){     
    $("#nomeSala").val("");
    $("#nomeSala").css("border-color","#ced4da");
    
    if($("#smallAlert").length > 0){
        $("#smallAlert").remove();
    }    
    
    document.getElementById("nomeSala").focus();
}

function criarSala(){    
    var nomeSala = $("#nomeSala").val();
    if(nomeSala != ""){        
        var room = sendAPI("POST", "http://localhost:8000/api/e1/sala?nomeSala="+ nomeSala, false, null);
    }else{
        if($("#smallAlert").length == 0){
            $("#nomeSala").css("border-color","red");
            var smallAlert = document.createElement("small");
            smallAlert.setAttribute("id","smallAlert");
            smallAlert.innerHTML = "O nome da sala precisa ser preenchido";
            $("#nomeSala").after(smallAlert);
        }    
    }
}

function sendAPI(method, url, assync, body){    
    var result = null; 
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){        
        if((this.readyState == 4) && (this.status == 200)){            
            result = JSON.parse( this.responseText ); 
            result = result.data; 
        }
    }
    
    xhttp.open(method, url, assync); 
    xhttp.setRequestHeader("Content-Type","application/json");
    if(body != null){
        xhttp.send( body );
    }else{
        xhttp.send();        
    }
    return result; 
}