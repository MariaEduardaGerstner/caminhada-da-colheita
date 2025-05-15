// 🌱🚜 A Caminhada da Colheita

let trator;
let alimentos = [];
let entregues = 0;
let mensagens = [
  "Você entregou milho que virou pão!",
  "A cenoura colhida virou sopa na cidade!",
  "A mandioca virou farinha pro mercado!"
];
let mensagemAtual = "";
let campoLimite;

function setup() {
  createCanvas(800, 400);
  campoLimite = width / 2;
  trator = new Trator();

  // Criar alimentos
  for (let i = 0; i < 5; i++) {
    alimentos.push(new Alimento());
  }
}

function draw() {
  background(100, 200, 100); // verde - campo

  // Cidade
  fill(200); // cinza claro
  rect(campoLimite, 0, width / 2, height);

  // Trator
  trator.mostrar();
  trator.mover();

  // Alimentos
  for (let alimento of alimentos) {
    alimento.mostrar();
    if (!alimento.coletado && alimento.colidiu(trator)) {
      alimento.coletado = true;
      trator.carregando++;
    }
  }

  // Entregas
  if (trator.x > campoLimite && trator.carregando > 0) {
    entregues += trator.carregando;
    mensagemAtual = random(mensagens);
    trator.carregando = 0;
  }

  // Texto
  fill(0);
  textSize(16);
  text(`Entregas: ${entregues}`, 10, 20);
  text(mensagemAtual, 10, 50);
}

class Trator {
  constructor() {
    this.x = 100;
    this.y = height / 2;
    this.tamanho = 40;
    this.velocidade = 3;
    this.carregando = 0;
  }

  mostrar() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.tamanho, this.tamanho);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
    if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
    if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;
  }
}

class Alimento {
  constructor() {
    this.x = random(50, campoLimite - 50);
    this.y = random(50, height - 50);
    this.tamanho = 20;
    this.coletado = false;
  }

  mostrar() {
    if (!this.coletado) {
      fill(255, 255, 0);
      ellipse(this.x, this.y, this.tamanho);
    }
  }

  colidiu(trator) {
    let d = dist(this.x, this.y, trator.x, trator.y);
    return d < this.tamanho / 2 + trator.tamanho / 2;
  }
}
