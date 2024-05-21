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
  const amount = getCardAmountInput();
  return validateCardAmount(amount) ? amount : null;
}

// Game Functions
function shuffleCards(cards) {
  return cards.sort(getComparator);
}

function assembleDeck(amount) {
  const ceil = amount / 2;
  const cards = LIST_CARDS.splice(0, ceil);
  const deck = [...cards, ...cards];
  return shuffleCards(deck);
}

function distributeCards(deck) {
  const gameBoard = document.getElementById("board");
  deck.map((item) => gameBoard.appendChild(generateCard(item)));
}

function startGame() {
  let amountCards;
  let gameStarted = false;

  shuffleCards(LIST_CARDS);

  while (!gameStarted) {
    amountCards = promptForCardAmount();
    if (amountCards !== null) {
      const deck = assembleDeck(amountCards);
      distributeCards(deck);
      gameStarted = true;
    }
  }
}

// Start the Game
startGame();
