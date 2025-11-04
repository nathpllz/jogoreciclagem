const compostBin = document.getElementById("composteira");
const trashBin = document.getElementById("lixo");
const itemsArea = document.getElementById("items");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");
const gameOverScreen = document.getElementById("gameOver");
const victoryScreen = document.getElementById("victory");
const restartGame = document.getElementById("restartGame");
const playAgain = document.getElementById("playAgain");

let score = 0;
let gameOver = false;

const items = [
  { name: "Casca de banana", type: "org" },
  { name: "Garrafa plástica", type: "trash" },
  { name: "Restos de comida", type: "org" },
  { name: "Lata de refrigerante", type: "trash" },
  { name: "Carne, type: "trash" } , 
  { name: "Folhas secas", type: "org" },
  { name: "cascas de ovo", type: "org" },
  { name: "Isopor", type: "trash" },
];

function createItems() {
  itemsArea.innerHTML = "";
  score = 0;
  gameOver = false;
  updateScore();
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

  if ((this.id === "composteira" && type === "org") ||
      (this.id === "lixo" && type === "trash")) {
    score++;
    message.textContent = "✅ Acertou!";
    updateScore();

    if (score === items.length) {
      winGame();
    }
  } else {
    loseGame();
  }
}

function updateScore() {
  scoreText.textContent = "Pontos: " + score;
}

function loseGame() {
  gameOver = true;
  itemsArea.innerHTML = ""; // ❌ apaga todos os itens
  message.textContent = "💀 Você perdeu!";
  document.body.style.filter = "grayscale(100%)";
  gameOverScreen.classList.remove("hidden");
}

function winGame() {
  gameOver = true;
  itemsArea.innerHTML = ""; // limpa tudo ao vencer também
  message.textContent = "🎉 Parabéns! Você ganhou um pirulito!";
  victoryScreen.classList.remove("hidden");
}

function resetGame() {
  document.body.style.filter = "none";
  message.textContent = "";
  gameOverScreen.classList.add("hidden");
  victoryScreen.classList.add("hidden");
  createItems();
}

resetBtn.addEventListener("click", resetGame);
restartGame.addEventListener("click", resetGame);
playAgain.addEventListener("click", resetGame);

window.onload = createItems;
