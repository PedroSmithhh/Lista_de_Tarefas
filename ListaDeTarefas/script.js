let input = document.querySelector('.input-tarefa');
const adiciona = document.querySelector('.adiciona');
const section = document.querySelector('.section-container');
const ul = document.createElement('ul');
const apagaTodas = document.querySelector('.apaga-todas');



//Inicia a lista
function criaLista () {

    section.appendChild(ul);
    ul.classList.add('lista');

}

//Cria um botão apagar para cada tarefa
function criaBotaoApagar (li) {

    const button = document.createElement('button');
    button.innerHTML = 'Apagar';
    button.classList.add('buttonApagar');
    button.setAttribute('title' , 'Apagar esta tarefa');
    li.appendChild(button);
   

}


function adicionaTarefa (tarefa) {

    const li = document.createElement('li');
    li.innerHTML = tarefa;
    ul.appendChild(li);
    
    criaBotaoApagar(li);

    limpaInput();

    salvarTarefas();

}

function limpaInput (){
    input.value = '';
    input.focus();
}

// Atualiza o storage
function salvarTarefas () {
    const todosLis = ul.querySelectorAll('li');
    const listaDeTarefas = [];

    for( let tarefas of todosLis){
        let tarefaTxt = tarefas.innerText;
        tarefaTxt = tarefaTxt.replace('Apagar', '');
        listaDeTarefas.push(tarefaTxt);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas)
        adicionaTarefa(tarefa);
}


criaLista();


adiciona.addEventListener('click', function () {
    
    if(!input.value)
        return;

    adicionaTarefa(input.value);


})

input.addEventListener('keypress', function (e) {

    if(e.key === "Enter"){
        if(!input.value)
        return;

    adicionaTarefa(input.value);
    }
   

})
 
//Apaga a tarefa
document.addEventListener('click', function (e) {

    const el = e.target;

    if(el.classList.contains('buttonApagar')){
        el.parentElement.remove(); 
        salvarTarefas();           
    }
})

//Apaga todas as tarefas
apagaTodas.addEventListener('click', function () {
    
    let lista = document.querySelector(".lista");
            
    if (lista && lista.classList.contains('lista')) {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        salvarTarefas();
    }
  
})

adicionaTarefasSalvas();