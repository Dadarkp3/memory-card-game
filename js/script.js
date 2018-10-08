let jogadas = 0;
let contagem = document.getElementById('jogadas');
console.log(contagem);
const cards = document.querySelectorAll('.card');
cards.forEach(card => card.addEventListener('click', flipCard));
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

document.body.onload = startGame();


function startGame() {
    jogadas = 0;
    contagem.innerHTML = jogadas;
    resetBoard();
    cards.forEach(card => {
        console.log('oi')
        card.classList.remove('removed');
    });
    shuffle();
}


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('girar');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    jogadas++;
    contagem.innerHTML = jogadas;
    checkForMatch();
}

function checkForMatch() {
    console.log('oi');
    let isMatch = firstCard.dataset.model === secondCard.dataset.model;
    console.log(isMatch);
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.classList.add('removed');
    secondCard.classList.add('removed');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('girar');
        secondCard.classList.remove('girar');

        resetBoard();
    }, 700);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}



cards.forEach(card => card.addEventListener('click', flipCard));