const game = document.getElementById("game");
const startBtn = document.getElementById("startBtn");

let fase = 0;
let pontos = 0;

const fases = [
  {
    titulo: "🚮 Estação 1 – Desafio da Reciclagem",
    conteudo: `
      <p>Coloque cada item na lixeira correta:</p>
      <ul style="text-align:left">
        <li>🟦 Azul: papel</li>
        <li>🟥 Vermelho: plástico</li>
        <li>🟩 Verde: vidro</li>
        <li>🟨 Amarelo: metal</li>
        <li>🟫 Marrom: orgânico</li>
      </ul>
      <button class='btn' onclick='avancar(5)'>Concluir Estação ✅</button>
    `
  },
  {
    titulo: "💧 Estação 2 – Gestor dos Recursos",
    conteudo: `
      <p>Fechar a torneira enquanto escova os dentes economiza até:</p>
      <button class='btn' onclick='avancar(2)'>💧 30 litros</button>
      <button class='btn' onclick='avancar(0)'>5 litros</button>
      <button class='btn' onclick='avancar(0)'>100 litros</button>
    `
  },
  {
    titulo: "🔁 Estação 3 – Oficina do Reaproveitamento",
    conteudo: `
      <p>Crie um objeto útil com material reciclável!</p>
      <p>Ganhe até 5 pontos pela criatividade!</p>
      <button class='btn' onclick='avancar(5)'>Finalizar Criação 🎨</button>
    `
  },
  {
    titulo: "🏆 Resultado Final",
    conteudo: `
      <h2>Parabéns! 🌿</h2>
      <p>Você completou a Missão Planeta Limpo com <strong>${pontos}</strong> pontos!</p>
      <button class='btn' onclick='reiniciar()'>Jogar Novamente 🔄</button>
    `
  }
];

startBtn.addEventListener("click", () => {
  fase = 0;
  pontos = 0;
  mostrarFase();
});

function mostrarFase() {
  const f = fases[fase];
  game.innerHTML = `
    <h2>${f.titulo}</h2>
    <div class='fade-in'>${f.conteudo}</div>
  `;
}

function avancar(valor) {
  pontos += valor;
  fase++;
  if (fase < fases.length - 1) {
    mostrarFase();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const f = fases[fases.length - 1];
  game.innerHTML = `
    <h2>${f.titulo}</h2>
    <div>${f.conteudo.replace('${pontos}', pontos)}</div>
  `;
}

function reiniciar() {
  fase = 0;
  pontos = 0;
  game.innerHTML = `
    <p>Bem-vindo(a) à <strong>Missão Planeta Limpo!</strong></p>
    <p>Aprenda sobre reciclagem e gestão sustentável jogando!</p>
    <button id='startBtn' class='btn' onclick='mostrarFase()'>Começar Jogo ♻️</button>
  `;
}
