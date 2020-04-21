function calcular(){
    let n1 = document.getElementById ("numero1");
    let n2 = document.getElementById ("numero2");
    let n3 = document.getElementById ("numero3");    
    let soma = n1.value + n2.value + n3.value;
    
    if(soma % 2 == 0){
        alert("O número é par");
    }else{
        alert("O número é impar");
    }
    
}