const form = document.getElementById('novoItem');
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || []; /*JSON.parse() para transformar 'strings' em 'arrays'*/

itens.forEach((elemento) => {
  criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = evento.target.elements['nome'];
  const quantidade = evento.target.elements['quantidade'];

  const existe = itens.find(elemento => elemento.nome === nome.value);
  /**           |array| |buscando elemento| |elemento| |digitado no form|*/

  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

  if (existe) {
    itemAtual.id = existe.id; /*adicionando elemento de controle com 'id'*/

    atualizaElemento(itemAtual);

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;
    /** se 'id' já existir, achar no último elemento o 'id' e adicionar '1'*/   /**se não existir nada no array = '0'*/  

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens)); /* colocando item no localStorage e usando método 'stringify' do 'JSON' para transformar em string*/

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroItem = document.createElement("strong");
  numeroItem.innerHTML = item.quantidade;
  numeroItem.dataset.id = item.id; /*criando id*/
  novoItem.appendChild(numeroItem);

  novoItem.innerHTML += item.nome;

  novoItem.appendChild(botaoDeleta(item.id));

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade; /** Atualiza o elemento na tela */
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function() {
    deletaElemento(this.parentNode, id); /** Removendo elemento pai do botão */
  });

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1); /** Achar elemento em que o 'id' seja igual ao 'id' que acabou de ser "clicado" */

  localStorage.setItem("itens", JSON.stringify(itens));
}