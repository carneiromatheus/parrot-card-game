// Constants
const MIN_CARDS = 4;
const MAX_CARDS = 14;

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
    alert(`🔴 Número inválido. Deve ser um NÚMERO PAR entre ${MIN_CARDS} e ${MAX_CARDS}.`);
    return false;
  }
  return true;
}

function promptForCardAmount() {
  const amount = getCardAmountInput();
  return validateCardAmount(amount) ? amount : null;
}

// Game Functions
function distributeCards(amount) {
  console.log(`Distribuindo ${amount} cartas`);
}

function startGame() {
  let amountCards;
  let gameStarted = false;

  while (!gameStarted) {
    amountCards = promptForCardAmount();
    if (amountCards !== null) {
      gameStarted = true;
      distributeCards(amountCards);
    }
  }

  console.log(`O jogo começou com ${amountCards} cartas.`);
}

// Start the Game
startGame();
