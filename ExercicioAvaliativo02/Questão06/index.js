function fatorial(){ 
    let numero = parseInt(document.getElementById('numero').value);
    let resposta = document.getElementById('resposta');
    let resultado = 1;
  
    for(var count=1 ; count<=numero ; count++){
        resultado *= count;
    }

    resposta.innerHTML = resultado;
  }