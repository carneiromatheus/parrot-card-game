let startGame = false;
let amountCards = undefined;

function getAmountCards() {
  const input = prompt(
    "🔢 Com quantas cartas deseja jogar?\n🟢 Deve ser um número PAR entre 4 e 14."
  );

  amountCards = parseInt(input, 10);

  if (isNaN(amountCards)) {
    alert("🟡 Por favor, insira um número válido.");
  } else {
    startGame = isValidValue(amountCards);
    if (!startGame) {
      alert("🔴 Número inválido. Deve ser um número PAR entre 4 e 14.");
    }
  }
}

function isEven(value) {
  return value % 2 === 0;
}

function inRange(value) {
  return value >= 4 && value <= 14;
}

function isValidValue(value) {
  return isEven(value) && inRange(value);
}

while (!startGame) {
  getAmountCards();
}

console.log(`O jogo começou com ${amountCards} cartas.`);
