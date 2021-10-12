var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDegrade, grade, grupoDegrade;
var fantasma, imagemDoFantasma, ghost_jump;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR";
var pontuacao = 0;

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDegrade = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  ghost_jump = loadImage('ghost-jumping.png');
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  fantasma = createSprite(300, 300, 30, 80);
  fantasma.addImage('ghost_jump', ghost_jump);
  fantasma.addImage('fantasma_image', imagemDoFantasma);
  fantasma.scale = 0.4;
  grupoDePortas = new Group();
  grupoDeGrade = new Group();
  grupoDeBlocoInvisivel = new Group();
  somAssustador.loop();
  }


function draw(){
  background('black');
  if(fantasma.isTouching(grupoDeBlocoInvisivel) || fantasma.y > 600) {
    estadoJogo = 'ENCERRAR';
    fantasma.destroy();
  }
    if(estadoJogo === 'JOGAR') {
      torre.velocityY = 1;
      if(torre.y > 400){
        torre.y = 300
      }
      objetos();
      if(keyDown('space')) {
        fantasma.velocityY = -10;
        fantasma.changeAnimation('ghost_jump', ghost_jump);

      }
      if(keyDown('right')) {
        fantasma.x += 3;
      }
      if(keyDown('left')) {
        fantasma.x += -3;
      }
      if(fantasma.isTouching(grupoDeGrade)) {
        fantasma.velocityY = 0;
        fantasma.changeAnimation('fantasma_image', imagemDoFantasma);
      }
    }
    else if(estadoJogo === 'ENCERRAR') {
      grupoDeGrade.destroyEach();
      grupoDePortas.destroyEach();
      grupoDeBlocoInvisivel.destroyEach();
      torre.destroy();
      fill('orange');
      textSize(25);
      stroke('orange');
      text('GAME OVER!', 200, 300);
    }
    fantasma.velocityY += 1;
  drawSprites();
  fill('yellow');
  textSize(20);
  text(pontuacao, 80, 50);
}
function objetos() {
  if(frameCount% 240 === 0) {
    porta = createSprite(200, -10, 20, 20);
    porta.x = Math.round(random(80, 550));
    porta.addImage('porta_image', imagemDaPorta);
    porta.velocityY = 1;
    porta.lifetime = 610;
    porta.depth = fantasma.depth -1;
    grupoDePortas.add(porta);
    grade = createSprite(porta.x, porta.y + 50, 80, 30);
    grade.addImage('grade_image', imagemDegrade);
    grade.velocityY = porta.velocityY;
    grade.lifetime = 610;
    grupoDeGrade.add(grade);
    blocoInvisivel = createSprite(porta.x, grade.y + 10, 80, 10);
    blocoInvisivel.velocityY = porta.velocityY;
    blocoInvisivel.lifetime = 610;
    blocoInvisivel.visible = false;
    grupoDeBlocoInvisivel.add(blocoInvisivel);
  }
}