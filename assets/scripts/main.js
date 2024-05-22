// Constants
const MIN_CARDS = 4;
const MAX_CARDS = 14;
const LIST_CARDS = [
  "bobross",
  "explody",
  "fiesta",
  "metal",
  "revertit",
  "triplets",
  "unicorn",
];
const flippedCardsTemp = [];
let flipCount = 0;

// Utility Functions
function isEven(value) {
  return value % 2 === 0;
}

function inRange(value) {
  return value >= MIN_CARDS && value <= MAX_CARDS;
}

function isValidCardAmount(value) {
  return isEven(value) && inRange(value);
}

function getComparator() {
  return Math.random() - 0.5;
}

function createFace(className, src, alt, width = 100, height = 100) {
  const face = document.createElement("div");
  const img = document.createElement("img");

  face.classList.add("face", className);
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;

  face.appendChild(img);

  return face;
}

function generateCard(gifName) {
  const card = document.createElement("div");
  card.classList.add("card");

  const frontFace = createFace(
    "front-face",
    "./assets/images/png/parrots.png",
    "parrots logo"
  );
  const backFace = createFace(
    "back-face",
    `./assets/images/gif/${gifName}parrot.gif`,
    gifName
  );

  card.appendChild(frontFace);
  card.appendChild(backFace);
  card.addEventListener("click", () => flipCard(card));

  return card;
}

// Input and Validation Functions
function getCardAmountInput() {
  const input = prompt(
    `🔢 Com quantas cartas deseja jogar?\n🟢 Deve ser um número PAR entre ${MIN_CARDS} e ${MAX_CARDS}.`
  );
  return parseInt(input, 10);
}

function validateCardAmount(amount) {
  if (isNaN(amount)) {
    alert("🟡 Por favor, insira um NÚMERO válido.");
    return false;
  }
  if (!isValidCardAmount(amount)) {
    alert(
      `🔴 Número inválido. Deve ser um NÚMERO PAR entre ${MIN_CARDS} e ${MAX_CARDS}.`
    );
    return false;
  }
  return true;
}

function promptForCardAmount() {
  let amount = null;
  while (amount === null) {
    const inputAmount = getCardAmountInput();
    if (validateCardAmount(inputAmount)) {
      amount = inputAmount;
    }
  }
  return amount;
}

// Game Functions
function shuffleCards(cards) {
  return cards.sort(getComparator);
}

function assembleDeck(amount) {
  const ceil = amount / 2;
  const selectedCards = LIST_CARDS.slice(0, ceil);
  const deck = [...selectedCards, ...selectedCards];
  return shuffleCards(deck);
}

function distributeCards(deck) {
  const gameBoard = document.getElementById("board");
  gameBoard.innerHTML = "";
  deck.forEach((item) => gameBoard.appendChild(generateCard(item)));
}

function unflipCard() {
  flippedCardsTemp.forEach((card) => card.classList.remove("flipped"));
  flippedCardsTemp.length = 0;
}

function checkForMatch() {
  const [card1, card2] = flippedCardsTemp;

  if (card1.innerHTML === card2.innerHTML) {
    flippedCardsTemp.length = 0;
  } else {
    setTimeout(unflipCard, 1000);
  }
}

function flipCard(card) {
  
  if (flippedCardsTemp.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCardsTemp.push(card);
    flipCount++;

    if (flippedCardsTemp.length === 2) checkForMatch();
    checkGameOver();
  }
}

function checkGameOver() {
  const allCards = document.querySelectorAll(".card");
  const allFlippedCards = document.querySelectorAll(".flipped");

  if (allFlippedCards.length === allCards.length) {
    setTimeout(() => alert(`🎉 Você ganhou em ${flipCount} jogadas!`), 500);
  }
}

function startGame() {
  const amountCards = promptForCardAmount();
  const deck = assembleDeck(amountCards);
  distributeCards(deck);
}

// Start the Game
startGame();
