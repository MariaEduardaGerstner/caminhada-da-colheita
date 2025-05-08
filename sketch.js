// 🌌 Noite das Estrelas Cadentes
// Criado com p5.js para o projeto Agrinho
// Comandos usados: if, for, keyIsDown, keyPressed, arrays, interação

let estrelas = [];
let estrelasCadentes = [];
let flores = [];
let observador;

function setup() {
  createCanvas(800, 600);
  observador = new Observador();
  // Criar estrelas piscando
  for (let i = 0; i < 100; i++) {
    estrelas.push(new Estrela(random(width), random(height / 2)));
  }
}

function draw() {
  background(10, 10, 40); // Céu noturno

  // Estrelas piscando
  for (let e of estrelas) {
    e.piscar();
  }

  // Estrelas cadentes
  for (let i = estrelasCadentes.length - 1; i >= 0; i--) {
    estrelasCadentes[i].mover();
    estrelasCadentes[i].exibir();
    if (estrelasCadentes[i].y > height - 20) {
      flores.push(new Flor(estrelasCadentes[i].x));
      estrelasCadentes.splice(i, 1);
    }
  }

  // Flores brilhantes
  for (let f of flores) {
    f.exibir();
  }

  // Observador
  observador.mover();
  observador.exibir();

  // Instruções
  fill(255);
  textSize(16);
  text("Use ← → para mover. Pressione ESPAÇO para lançar uma estrela cadente.", 10, height - 20);
}

function keyPressed() {
  if (key === ' ') {
    estrelasCadentes.push(new EstrelaCadente(observador.x));
    // Aqui poderia tocar um som suave de estrela
  }
}

// Classes

class Estrela {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamanho = random(1, 3);
    this.brilho = random(100, 255);
  }

  piscar() {
    this.brilho += random(-5, 5);
    this.brilho = constrain(this.brilho, 100, 255);
    noStroke();
    fill(this.brilho, this.brilho, 255);
    ellipse(this.x, this.y, this.tamanho);
  }
}

class EstrelaCadente {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.velocidade = random(5, 8);
  }

  mover() {
    this.y += this.velocidade;
  }

  exibir() {
    stroke(255);
    line(this.x, this.y, this.x - 10, this.y - 10);
  }
}

class Flor {
  constructor(x) {
    this.x = x;
    this.y = height - 10;
    this.cor = color(random(100, 255), random(100, 255), random(200, 255));
  }

  exibir() {
    fill(this.cor);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }
}

class Observador {
  constructor() {
    this.x = width / 2;
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW)) this.x += 5;
    this.x = constrain(this.x, 0, width);
  }

  exibir() {
    fill(200, 200, 255);
    rect(this.x - 10, height - 40, 20, 40);
    fill(255);
    ellipse(this.x, height - 50, 10); // Cabeça
  }
}
