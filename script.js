const compostBin = document.getElementById("composteira");
const trashBin = document.getElementById("lixo");
const itemsArea = document.getElementById("items");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const gameOverScreen = document.getElementById("gameOver");
const restartGame = document.getElementById("restartGame");

let score = 0;
let gameOver = false;

const items = [
  { name: "Casca de banana", type: "org" },
  { name: "Papel", type: "org" },
  { name: "Garrafa plástica", type: "trash" },
  { name: "Restos de comida", type: "org" },
  { name: "Lata de refrigerante", type: "trash" },
  { name: "carne", type: "trash" },
  { name: "Casca de ovo", type: "org" },
  { name: "Folhas secas", type: "org" },
  { name: "Isopor", type: "trash" },
];

function createItems() {
  itemsArea.innerHTML = "";
  totalItems = items.length;
  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = `item ${item.type}`;
    div.textContent = item.name;
    div.draggable = true;
    div.id = "item-" + i;
    div.addEventListener("dragstart", (e) => {
      if (gameOver) return;
      e.dataTransfer.setData("type", item.type);
      e.dataTransfer.setData("id", div.id);
    });
    itemsArea.appendChild(div);
  });
}

// Permitir arrastar sobre os bins
[compostBin, trashBin].forEach((bin) => {
  bin.addEventListener("dragover", (e) => e.preventDefault());
  bin.addEventListener("drop", dropItem);
});

function dropItem(e) {
  if (gameOver) return;
  e.preventDefault();

  const type = e.dataTransfer.getData("type");
  const id = e.dataTransfer.getData("id");
  const element = document.getElementById(id);
  if (element) element.remove();

  if (this.id === "composteira" && type === "org") {
    score++;
    message.textContent = "🌿 Acertou! Compostagem!";
  } else if (this.id === "lixo" && type === "trash") {
    score++;
    message.textContent = "🗑️ Certinho! Vai pro lixo comum.";
  } else {
    loseGame();
    return;
  }

  updateScore();

  // Se acertou tudo
  if (score === totalItems) {
    winGame();
  }
}

function updateScore() {
  scoreText.textContent = "Pontos: " + score;
}

function loseGame() {
  gameOver = true;
  document.body.style.filter = "grayscale(100%) brightness(0.6)";
  gameOverScreen.classList.remove("hidden");
  message.textContent = "💀 Você errou e contaminou a composteira!";
}

function winGame() {
  gameOver = true;
  document.body.style.filter = "brightness(1.2)";
  victoryScreen.classList.remove("hidden");
  message.textContent = "🎉 Parabéns! Você ganhou um pirulito!";
}

function resetGame() {
  gameOver = false;
  score = 0;
  message.textContent = "";
  document.body.style.filter = "none";
  gameOverScreen.classList.add("hidden");
  victoryScreen.classList.add("hidden");
  updateScore();
  createItems();
}

resetBtn.addEventListener("click", resetGame);
restartGame.addEventListener("click", resetGame);
playAgain.addEventListener("click", resetGame);

window.onload = createItems;