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

    itens[existe.id] = itemAtual;
/** array | posição | escrever por cima do conteúdo */
  } else {
    itemAtual.id = itens.length;/*caso o item 'NÃO' exista, o 'id' é o tamanho do 'array'*/

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

  lista.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade; /** Atualiza o elemento na tela */
}