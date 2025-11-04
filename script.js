const compostBin = document.getElementById("composteira");
const trashBin = document.getElementById("lixo");
const itemsArea = document.getElementById("items");
const scoreText = document.getElementById("score");
const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

let score = 0;

const items = [
  { name: "Casca de banana", type: "org" },
  { name: "Papel", type: "org" },
  { name: "Garrafa plástica", type: "trash" },
  { name: "Restos de comida", type: "org" },
  { name: "casca de ovo", type: "org" },
  { name: "carne", type: "trash" },
  { name: "Folhas secas", type: "org" },
  { name: "Isopor", type: "trash" },
];

// Gera os itens
function createItems() {
  itemsArea.innerHTML = "";
  items.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = `item ${item.type}`;
    div.textContent = item.name;
    div.draggable = true;
    div.id = "item-" + i;
    div.addEventListener("dragstart", (e) => {
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
  e.preventDefault();
  const type = e.dataTransfer.getData("type");
  const id = e.dataTransfer.getData("id");
  const element = document.getElementById(id);
  element.remove();

  if (this.id === "composteira" && type === "org") {
    score++;
    message.textContent = "🌿 Acertou! Isso vai para a compostagem.";
  } else if (this.id === "lixo" && type === "trash") {
    score++;
    message.textContent = "🗑️ Muito bem! Isso vai para o lixo comum.";
  } else {
    score--;
    message.textContent = "❌ Errou! Esse lixo foi pro lugar errado.";
  }

  updateScore();

  if (score >= 10) {
    message.textContent = "🎉 Parabéns! Você é um mestre da compostagem!";
  }

  if (itemsArea.children.length === 0) {
    setTimeout(createItems, 1500);
  }
}

function updateScore() {
  scoreText.textContent = "Pontos: " + score;
}

// 🔄 Reiniciar o jogo
resetBtn.addEventListener("click", () => {
  score = 0;
  message.textContent = "";
  updateScore();
  createItems();
});

// Garante que os itens apareçam assim que a página carregar
window.onload = createItems;
