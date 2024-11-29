const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let cardElements = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.value = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        setTimeout(() => {
            checkForMatch();
        }, 1000);
    }
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function startGame() {
    shuffle(cards);
    const grid = document.getElementById('grid');
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        grid.appendChild(card);
        cardElements.push(card);
    });
}

startGame();
