/* Jogo simples: arraste itens para composteira ou lixo.
// lixo
if(type === 'plastic'){
game.pollution += 0; // correto
removeItem(el);
log('Plástico descartado corretamente.');
} else {
// throwing organics to trash loses potential
game.resources -= 1;
removeItem(el);
log('Orgânicos no lixo — perda de recursos.');
}
}
clampValues();
updateUI();
}


function removeItem(el){
if(el && el.parentNode) el.parentNode.removeChild(el);
}


function clampValues(){
game.compost = Math.max(0, Math.round(game.compost));
game.resources = Math.max(0, Math.round(game.resources));
game.pollution = Math.max(0, Math.round(game.pollution));
}


function updateUI(){
compostAmt.textContent = game.compost;
resources.textContent = game.resources;
pollution.textContent = game.pollution;
// ajustar altura visual do composto
const h = Math.min(100, Math.max(0, game.compost*3));
compostFill.style.height = h + '%';
}


// processo automático: com o tempo, o composto gera recursos se estiver acima de certo valor
setInterval(()=>{
// decomposição baseada em decayRate e quantidade
const produced = Math.floor((game.compost * 0.02) * game.decayRate);
if(produced > 0){
game.resources += produced;
game.compost = Math.max(0, game.compost - produced);
log(`Transformação acontecendo: +${produced} recursos gerados.`);
clampValues();
updateUI();
}
// gerar item ocasionalmente
if(Math.random() < 0.12) generateItems(1);
},3000);


// dica inicial
log('Bem-vindo! Arraste itens para a composteira ou para o lixo