$(document).ready(function() {
    document.getElementById("usuario").focus();
});

function validacaoLogin() {    
    var user = document.getElementById("usuario").value;
    var password = document.getElementById("senha").value;
    var result = sendAPI("GET", "http://localhost:8000/api/e1/user?name="+ user +"&password="+ password, false, null);
    
    if (result != null) {
        if(!result.active){
            localStorage.setItem("idUser", result.id);
            localStorage.setItem("nickName", result.nickname);
            window.location.href = "sala/";
        }
    }else{
        alert("Usuário ou Senha inválidos!");
    }
}

function sendAPI(method, url, assync, body){
    var result; 
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if ((this.readyState == 4) && (this.status == 200)) {
            result = JSON.parse(this.responseText); 
            result = result.data; 
        }
    }

    xhttp.open(method, url, assync);
    xhttp.setRequestHeader("Content-Type", "application/json");
    if(body != null){
        xhttp.send(body);
    }else{
        xhttp.send();        
    }
    return result;
}