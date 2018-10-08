let jogadas = 0;
let contagem = document.getElementById('jogadas');
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', girar));
let temCardVirado = false;
let bloqueado = false;
let primeiro, segundo;
let cardsSelecionados = [];

document.body.onload = start();

function start() {
    jogadas = 0;
    contagem.innerHTML = jogadas;
    resetar();
    cards.forEach(card => {
        card.addEventListener('click', girar);
        card.classList.remove('removed', 'girar');
    });
    embaralhar();
}

function resetar() {
    bloqueado = false;
    temCardVirado = false;
    primeio = null;
    segundo = null;
}

function embaralhar() {
    cards.forEach(card => card.style.order = Math.floor(Math.random() * 12));
}


function girar() {
    if (bloqueado) return;
    if (this === primeiro) return;
    this.classList.add('girar');
    if (!temCardVirado) {
        temCardVirado = true;
        primeiro = this;
        return;
    }
    segundo = this;
    jogadas++;
    contagem.innerHTML = jogadas;
    checar();

}

function checar() {
    var checagem = primeiro.dataset.model == segundo.dataset.model;
    checagem ? desabilitar() : desfazer();
}

function desabilitar() {
    primeiro.classList.add('removed');
    segundo.classList.add('removed');
    primeiro.removeEventListener('click', girar);
    segundo.removeEventListener('click', girar);
    cardsSelecionados = document.querySelectorAll('.removed');
    cardsSelecionados.length == cards.length ? ganhou() : resetar()
}

function desfazer() {
    setTimeout(() => {
        primeiro.classList.remove('girar');
        segundo.classList.remove('girar');
        resetar();
    }, 700);
    bloqueado = true;
}


function ganhou() {
    let modal = document.getElementById('modal');
    modal.style.display = 'inline-block';
}

function fechar() {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
}