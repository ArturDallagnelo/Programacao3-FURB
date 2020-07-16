function atualizarSalas(){            
    $("tr").remove();

    var roomsAvaliable = getAvaliableRooms();

    if(roomsAvaliable[0]!= null){
        var columnName;
        var columnAction;
        var link;
        for(var i = 0; i < roomsAvaliable.length; i++){            
            var line = document.createElement("tr");
                    
            columnName   = document.createElement("td");
            columnAction = document.createElement("td");

            columnName.innerHTML = roomsAvaliable[i].name;                        
            
            columnAction.innerHTML = "+";
                                 
            columnAction.setAttribute("onclick", "joinRoom("+ roomsAvaliable[i].id +")");            
            columnAction.setAttribute("id","buttonJoinRoom");
            columnAction.setAttribute("class","button blue");                    
            
            line.appendChild( columnName );
            line.appendChild( columnAction );
        }                
    }    
    setTimeout(function(){
        atualizarSalas();
    }, 2500);
}

function getAvaliableRooms(){
    var result = sendAPI("GET", "http://localhost:5000/api/v1/RoomPlayer", false, null); 
    return result;
}

function desconectar(){
    var object = returnPlayer( sessionStorage.getItem("idPlayer") );
    object.active = false;
    json = JSON.stringify(object);
    sendAPI("PUT", "http://localhost:5000/api/v1/player?idplayer="+ sessionStorage.getItem("idPlayer"), false, json);    
}

function returnPlayer(idplayer){
    var url = "http://localhost:5000/api/v1/Player";
    if(idplayer > 0){
        url = url +"?idplayer="+ idplayer;
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

function createRoom(){    
    var nameRoom = $("#nomeSala").val();
    if(nameRoom != ""){        
        var room = sendAPI("POST", "http://localhost:5000/api/v1/room?nameroom="+ nameRoom, false, null);
        joinRoom(room.id);
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

function joinRoom(idRoom){
    localStorage.setItem("idPlayer", sessionStorage.getItem("idPlayer"));
    localStorage.setItem("idRoom", idRoom);
    sessionStorage.removeItem("idPlayer");
    window.location.href = "room/";
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