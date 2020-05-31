let usuario = document.getElementById ("usuario"    );
let senha   = document.getElementById ("senha"      );
let form    = document.getElementById ("Form_Login" );
let contadorErro = "" ;

if (form.addEventListener) {                   
    form.addEventListener("submit", autenticarCampos);
} else if (form.attachEvent) {                  
    form.attachEvent("onsubmit", autenticarCampos);
}

function logar(){    
    autenticarCampos();
}

function autenticarCampos(evt){
  
    //Usuario
	campoUsuario = document.querySelector('.erroUsuario');
    
    if(usuario.value == "" || usuario.value.length < 1){
		campoUsuario.innerHTML = "Favor preencher o Usuario";
		campoUsuario.style.display = 'block';
		contadorErro += 1;
	}else{
		campoUsuario.style.display = 'none';
    }
    
    //Senha
    campoSenha = document.querySelector('.erroSenha');

	if(senha.value == ""){
		campoSenha.innerHTML = "Favor preencher a Senha";
		campoSenha.style.display = 'block';
		contadorErro += 1;
	}else if(senha.value.length < 6){
		campoSenha.innerHTML = "Favor preencher a Senha com o mínimo de 6 caracteres";
		campoSenha.style.display = 'block';
		contadorErro += 1;
	}else{
		campoSenha.style.display = 'none';
	}
}

function redirecionar(){
    location.href="TelaCadastroUsuario.html"
}

let Esenha = document.querySelector("#Esenha");
Esenha.addEventListener("click", function(){
	location.href="TelaEsqueceuSenha.html";
});