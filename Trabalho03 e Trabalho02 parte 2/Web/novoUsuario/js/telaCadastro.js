function cadastro() {    
    if(verificarUsuarioJaExistente()){
        salvar();
    }    
}

function limpar() {
    document.getElementById("usuario")       .value = "";
    document.getElementById("senha")         .value = "";
    document.getElementById("confirmaSenha") .value = "";
}

function verificarUsuarioJaExistente(){
    var user = document.getElementById("usuario").value;    
    var result = sendAPI("GET", "http://localhost:5000/api/v1/player", false, null);

    if (result != null) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].nickname == user) {
                alert("Usuário já cadastrado, informe outro nome de usuário!");
                limpar();
                return false;
            }
        }
    }
    return true;
}

function salvar(){
    var usuario        = document.getElementById("usuario")       .value;
    var senha          = document.getElementById("senha")         .value;
    var confirmarSenha = document.getElementById("confirmaSenha") .value;

    if (senha != confirmarSenha) {
        alert("Verifique se as senhas conferem.")
        limpar();
    }else{
        var objUser = new Object();
        objUser.nickname = usuario;
        objUser.password = senha;
        jsonUser = JSON.stringify(objUser);
        debugger;
        result = sendAPI("POST", "http://localhost:5000/api/v1/player",false, jsonUser);

        if(result != null){
            limpar();
            localStorage.setItem("idPlayer", result.id);
            localStorage.setItem("nickName", result.nickname);
            window.location.href = "../sala/"
        }
    }
}

function sendAPI(method, url, assync, body){
    var result;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
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