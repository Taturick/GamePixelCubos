let personagem;
let grama;
let moeda;
let enemy;
let pedra;

let tamanho = 64;

let andarx = 0;
let andary = 0;

let velocidade = 64;

let enemyX = tamanho * 4;
let enemyY = tamanho * 4;

let pedras = [
  { x: tamanho * 3, y: tamanho * 3 },
  { x: tamanho * 2, y: tamanho * 4 },
  { x: tamanho * 1, y: tamanho * 3 },
  { x: tamanho * 1, y: tamanho * 0 },
  { x: tamanho * 3, y: tamanho * 1 },
    { x: tamanho * 4, y: tamanho * 5 },
   { x: tamanho * 1, y: tamanho * 8 },
   { x: tamanho * 7, y: tamanho * 8 },
   { x: tamanho * 6, y: tamanho * 5 },
   { x: tamanho * 7, y: tamanho * 5 },
   { x: tamanho * 8, y: tamanho * 5 },
   { x: tamanho * 8, y: tamanho * 5 },
  { x: tamanho * 5, y: tamanho * 3 }
];

let enemies = [
  { x: tamanho * 6, y: tamanho * 2, direction: 1 },
  { x: tamanho * 7, y: tamanho * 6, direction: -1 },
  { x: tamanho * 3, y: tamanho * 7, direction: 1 }
];

let restart;

function preload() {
  personagem = loadImage('boneco.png');
  grama = loadImage('grass.jpg');
  moeda = loadImage('moeda.png');
  enemy = loadImage('soldierM.png');
  pedra = loadImage('pedra.png');
}

function setup() {
  createCanvas(576, 576);
}

function draw() {
  if (andarx < 0) {
    andarx = 0;
  }

  if (andary < 0) {
    andary = 0;
  }
  if (andarx > tamanho * 8) {
    andarx = tamanho * 8;
  }
  if (andary > tamanho * 8) {
    andary = tamanho * 8;
  }

  background(220);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      image(grama, tamanho * i, tamanho * j, tamanho, tamanho);
    }
  }

  // Desenhar as pedras
  for (let i = 0; i < pedras.length; i++) {
    image(pedra, pedras[i].x, pedras[i].y, tamanho, tamanho);
  }

  image(personagem, andarx, andary, tamanho, tamanho);
  image(moeda, tamanho * 8, tamanho * 8, tamanho / 0.9, tamanho / 0.9);

  // Movimentar e desenhar os inimigos
  for (let i = 0; i < enemies.length; i++) {
    image(enemy, enemies[i].x, enemies[i].y, tamanho / 0.9, tamanho / 0.9);
  }

  // Verificar colisão com a moeda
  if (andarx === tamanho * 8 && andary === tamanho * 8) {
    ganhou();
  }

  // Verificar colisão com os inimigos
  for (let i = 0; i < enemies.length; i++) {
    if (andarx === enemies[i].x && andary === enemies[i].y) {
      gameOver();
    }
  }
}

function reset() {
  andarx = 0;
  andary = 0;
  restart.remove();
  loop();
}

function keyPressed() {
  let newX = andarx;
  let newY = andary;

  if (keyIsDown(UP_ARROW)) {
    newY = andary - velocidade;
  }
  if (keyIsDown(DOWN_ARROW)) {
    newY = andary + velocidade;
  }
  if (keyIsDown(LEFT_ARROW)) {
    newX = andarx - velocidade;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    newX = andarx + velocidade;
  }

  // Verificar colisão com as pedras
  let colidiuPedra = false;
  for (let i = 0; i < pedras.length; i++) {
    if (newX === pedras[i].x && newY === pedras[i].y) {
      colidiuPedra = true;
      break;
    }
  }

  if (!colidiuPedra) {
    andarx = newX;
    andary = newY;
  }

  // Movimentar os inimigos
  for (let i = 0; i < enemies.length; i++) {
    if (andarx !== enemies[i].x || andary !== enemies[i].y) {
      moveEnemy(enemies[i]);
    }
  }
}

function moveEnemy(enemy) {
  if (enemy.direction === 1) {
    enemy.x += velocidade;
    if (enemy.x > tamanho * 8) {
      enemy.x = tamanho * 0;
    }
  } else if (enemy.direction === -1) {
    enemy.x -= velocidade;
    if (enemy.x < 0) {
      enemy.x = tamanho * 8;
    }
  }
}

function ganhou() {
  background(0);
  fill(255);
  textSize(35);
  text('Ganhou!', 220, 300);

  restart = createButton('Reiniciar');
  restart.mousePressed(reset);
  restart.position(260, 350); // Posição do botão reiniciar

  noLoop();
}

function gameOver() {
  background(0);
  fill(255);
  textSize(35);
  text('Game Over', 200, 300);

  restart = createButton('Reiniciar');
  restart.mousePressed(reset);
  restart.position(260, 350); // Posição do botão reiniciar

  noLoop();
}
