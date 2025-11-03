// Compostagem e Gestão de Recursos — feito por alunos do CEP para amostra de química 3K

const itemsBox = document.getElementById('items');
const compost = document.getElementById('compost');
const trash = document.getElementById('trash');
const compostFill = document.getElementById('compostFill');
const compostAmt = document.getElementById('compostAmt');
const resources = document.getElementById('resources');
const pollution = document.getElementById('pollution');
const logBox = document.getElementById('logBox');
const moisture = document.getElementById('moisture');
const moistureVal = document.getElementById('moistureVal');
const aerationBtn = document.getElementById('turnBtn');
const spawnBtn = document.getElementById('spawnBtn');

let game = {
  compost: 0,
  resources: 0,
  pollution: 0,
  decayRate: 1,
};

moisture.addEventListener('input', () => {
  moistureVal.textContent = moisture.value;
  adjustDecay();
});

function adjustDecay() {
  const m = Number(moisture.value);
  if (m < 40) game.decayRate = 0.6;
  else if (m <= 75) game.decayRate = 1.2;
  else game.decayRate = 0.8;
}
adjustDecay();

aerationBtn.addEventListener('click', () => {
  log('Composteira virada — aeração aumentada!');
  game.decayRate *= 1.25;
  setTimeout(() => {
    adjustDecay();
    log('Compostagem estabilizada.');
  }, 6000);
});

spawnBtn.addEventListener('click', () => {
  generateItems(4);
  log('Novos itens gerados.');
});

function log(txt) {
  const d = new Date().toLocaleTimeString();
  logBox.innerHTML = `<div>[${d}] ${txt}</div>` + logBox.innerHTML;
}

const ITEM_TYPES = [
  { key: 'org', label: 'Restos orgânicos', value: 6 },
  { key: 'paper', label: 'Papel', value: 3 },
  { key: 'plastic', label: 'Plástico', value: -2 },
];

function generateItems(n = 6) {
  for (let i = 0; i < n; i++) {
    const t = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
    const el = document.createElement('div');
    el.className = `item ${t.key}`;
    el.draggable = true;
    el.dataset.type = t.key;
    el.dataset.value = t.value;
    el.innerHTML = `<span>${t.label.split(' ')[0]}</span>`;

    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('type', t.key);
      e.dataTransfer.setData('value', t.value);
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => (el.style.opacity = '0.5'), 0);
    });

    el.addEventListener('dragend', () => {
      el.style.opacity = '1';
    });

    itemsBox.appendChild(el);
  }
}

generateItems(8);

[compost, trash].forEach((bin) => {
  bin.addEventListener('dragover', (e) => e.preventDefault());
  bin.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    const value = Number(e.dataTransfer.getData('value'));
    handleDrop(bin.id, type, value);
  });
});

function handleDrop(targetId, type, value) {
  if (targetId === 'compost') {
    if (type === 'plastic') {
      game.pollution += 5;
      game.compost -= 1;
      log('❌ Plástico na composteira — poluição aumentou!');
    } else if (type === 'org') {
      game.compost += 4;
      game.resources += 2;
      log('✅ Orgânicos compostados com sucesso.');
    } else if (type === 'paper') {
      game.compost += 2;
      game.resources += 1;
      log('📝 Papel aceito na compostagem.');
    }
  } else if (targetId === 'trash') {
    if (type === 'plastic') {
      log('🗑️ Plástico descartado corretamente.');
    } else {
      game.resources = Math.max(0, game.resources - 1);
      log('⚠️ Orgânicos no lixo — perda de recurso.');
    }
  }

  clampValues();
  updateUI();
}

function clampValues() {
  game.compost = Math.max(0, Math.round(game.compost));
  game.resources = Math.max(0, Math.round(game.resources));
  game.pollution = Math.max(0, Math.round(game.pollution));
}

function updateUI() {
  compostAmt.textContent = game.compost;
  resources.textContent = game.resources;
  pollution.textContent = game.pollution;
  compostFill.style.height = Math.min(100, game.compost * 3) + '%';
}

setInterval(() => {
  const produced = Math.floor(game.compost * 0.02 * game.decayRate);
  if (produced > 0) {
    game.resources += produced;
    game.compost = Math.max(0, game.compost - produced);
    log(`🌱 +${produced} recursos gerados pela compostagem.`);
  }
  if (Math.random() < 0.15) generateItems(1);
  clampValues();
  updateUI();
}, 3000);

log('Bem-vindo! Arraste os itens para a composteira ou para o lixo.');
updateUI();
