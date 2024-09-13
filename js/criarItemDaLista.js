import { editarItem } from "./editarItem.js";
import { excluirItem } from "./excluirItem.js";
import { gerarDiaDaSemana } from "./gerarDiaDaSemana.js";
import { verificarListaComprados } from "./verificarListaComprados.js";

const listaDeCompras = document.getElementById("lista-de-compras");
const listaComprados = document.getElementById("lista-comprados");
let contador = 0;

export function criarItemDaLista(item, comprado = false) {
    const itemDaLista = document.createElement("li");
    const containerItemLista = document.createElement("div");
    containerItemLista.classList.add("lista-item-container");

    const containerNomeDoItem = document.createElement("div");

    const containerCheckbox = document.createElement("div");
    containerCheckbox.classList.add("container-checkbox");

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.classList.add("input-checkbox");
    checkboxInput.id = "checkbox-" + contador++;
    checkboxInput.checked = comprado;

    const checkboxLabel = document.createElement("label");
    checkboxLabel.setAttribute("for", checkboxInput.id);

    checkboxInput.addEventListener("change", function () {
        const itemTitulo = itemDaLista.querySelector("#item-titulo");

        if (checkboxInput.checked) {
            itemTitulo.style.textDecoration = "line-through";
            listaComprados.appendChild(itemDaLista);
        } else {
            itemTitulo.style.textDecoration = "none";
            listaDeCompras.appendChild(itemDaLista);
        }

        verificarListaComprados(listaComprados);
        salvarListas();
    });

    const checkboxCustomizado = document.createElement("div");
    checkboxCustomizado.classList.add("checkbox-customizado");

    checkboxLabel.appendChild(checkboxInput);
    checkboxLabel.appendChild(checkboxCustomizado);

    containerCheckbox.appendChild(checkboxLabel);
    containerNomeDoItem.appendChild(containerCheckbox);

    const nomeDoItem = document.createElement("p");
    nomeDoItem.id = "item-titulo";
    nomeDoItem.innerText = item;
    containerNomeDoItem.appendChild(nomeDoItem);

    const containerBotoes = document.createElement("div");
    //botoes
const botaoRemover = document.createElement("button");
botaoRemover.classList.add("item-lista-button");

const imagemRemover = document.createElement("img");
imagemRemover.src = "img/delete.svg";
imagemRemover.alt = "Remover";

botaoRemover.addEventListener("click", function () {
    excluirItem(itemDaLista);
})

botaoRemover.appendChild(imagemRemover);
containerBotoes.appendChild(botaoRemover);

const botaoEditar = document.createElement("button");
botaoEditar.classList.add("item-lista-button")

const imagemEditar = document.createElement("img");
imagemEditar.src = "img/edit.svg";
imagemEditar.alt = "Editar";

botaoEditar.addEventListener("click", function () {
    editarItem(itemDaLista);
})

botaoEditar.appendChild(imagemEditar);
containerBotoes.appendChild(botaoEditar);

containerItemLista.appendChild(containerNomeDoItem);
containerItemLista.appendChild(containerBotoes);
// fim dos botoes

    const itemData = document.createElement("p");
    itemData.innerText = gerarDiaDaSemana();
    itemData.classList.add("texto-data");

    itemDaLista.appendChild(containerItemLista);
    itemDaLista.appendChild(itemData);

    return itemDaLista;
}

function salvarListas() {
    const itensCompras = [];
    const itensComprados = [];

    listaDeCompras.querySelectorAll('li').forEach(item => {
        itensCompras.push(item.querySelector("#item-titulo").innerText);
    });

    listaComprados.querySelectorAll('li').forEach(item => {
        itensComprados.push(item.querySelector("#item-titulo").innerText);
    });

    localStorage.setItem('itensCompras', JSON.stringify(itensCompras));
    localStorage.setItem('itensComprados', JSON.stringify(itensComprados));
}

export function carregarItensDaLista() {
    const itensCompras = JSON.parse(localStorage.getItem('itensCompras')) || [];
    const itensComprados = JSON.parse(localStorage.getItem('itensComprados')) || [];

    itensCompras.forEach(item => {
        const itemDaLista = criarItemDaLista(item, false);
        listaDeCompras.appendChild(itemDaLista);
    });

    itensComprados.forEach(item => {
        const itemDaLista = criarItemDaLista(item, true);
        listaComprados.appendChild(itemDaLista);
    });

    verificarListaComprados(listaComprados);
}



// const containerBotoes = document.createElement("div");
// const botaoRemover = document.createElement("button");
// botaoRemover.classList.add("item-lista-button");

// const imagemRemover = document.createElement("img");
// imagemRemover.src = "img/delete.svg";
// imagemRemover.alt = "Remover";

// botaoRemover.addEventListener("click", function () {
//     excluirItem(itemDaLista);
// })

// botaoRemover.appendChild(imagemRemover);
// containerBotoes.appendChild(botaoRemover);

// const botaoEditar = document.createElement("button");
// botaoEditar.classList.add("item-lista-button")

// const imagemEditar = document.createElement("img");
// imagemEditar.src = "img/edit.svg";
// imagemEditar.alt = "Editar";

// botaoEditar.addEventListener("click", function () {
//     editarItem(itemDaLista);
// })

// botaoEditar.appendChild(imagemEditar);
// containerBotoes.appendChild(botaoEditar);

// containerItemLista.appendChild(containerNomeDoItem);
// containerItemLista.appendChild(containerBotoes);