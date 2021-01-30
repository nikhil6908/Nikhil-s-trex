var jumpsound, gameoversound, milestone
var trex ,trex_running ,trexcollided;
var gameover, gameoverimg
var restart, re
var ground ,groundimage;
var invisiground;
var cloud , cloudimage;
var obstacle, O1, O2, O3, O4, O5, O6
var s = 0
var obstaclegroup, cloudgroup
var play = 1
var end = 0
var gameState = play
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  trexcollided=loadAnimation("trex_collided.png")
  O1 = loadImage("obstacle1.png")
  O2 = loadImage("obstacle2.png")
  O3 = loadImage("obstacle3.png")
  O4 = loadImage("obstacle4.png")
  O5 = loadImage("obstacle5.png")
  O6 = loadImage("obstacle6.png")
  gameoverimg = loadImage("gameOver.png")
  re = loadImage("re.jpg")
  jumpsound=loadSound("salamisound-3186499-sfx-jump-4-game-computer.mp3")
  gameoversound = loadSound("mixkit-arcade-retro-game-over-213.wav"
)
  milestone = loadSound("smb_coin.wav")
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale= 0.6;
  ground = createSprite(0, 180, 1000, 15);
  ground.addImage(groundimage);
  invisiground = createSprite (0, 190, 200, 10);
  invisiground.visible=false;
  obstaclegroup = new Group();
  cloudgroup = new Group();
  trex.addAnimation("collide", trexcollided)
  gameover=createSprite(290, 100, 10, 10)
   gameover.addImage(gameoverimg)
    gameover.scale=0.7
    reload=createSprite(290, 130, 10, 10)
    reload.addImage(re)
    reload.scale=0.1
  gameover.visible=false
  reload.visible=false
  
}

function draw(){
  background("white");
  drawSprites();
  trex.collide(invisiground);
  if (gameState===play) {
    ground.velocityX=-(5+3*s/100);
  if (ground.x<0) {
      ground.x=ground.width/2;
      
      }
  if (keyDown("space") && trex.y>100) {
    trex.velocityY=-7;
    jumpsound.play()
  }
  trex.velocityY=trex.velocityY+0.5;
  clouds();
  obstacles();
  s=Math.round(s+getFrameRate()/60);
    if (s>0&&s%100===0) {
      milestone.play()      
    }
    if (trex.isTouching(obstaclegroup)) {
      gameState=end
      gameoversound.play()
    }
    
    
  }else if(gameState===end) {
    ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0)
    trex.velocityY=0;
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.changeAnimation("collide",trexcollided)
    gameover.visible=true
    reload.visible=true

    
    
  }
  
  text("Your score is: "+s, 300,50);
  if (mousePressedOver(reload)) {
    reset()
  }
}
function clouds()
{
  if (frameCount%60===0) {
  cloud=createSprite(600, 50, 20, 20);
  cloud.velocityX=-(5+s/100);
  cloud.addImage(cloudimage);
  cloud.scale=random(0.5, 1);
  cloud.y=Math.round(random(20, 100));
  trex.depth=cloud.depth;
  trex.depth=trex.depth+3;
  cloud.lifetime=130;
  cloudgroup.add(cloud);
  }
}
function obstacles () {
  if (frameCount%60===0) {
    obstacle=createSprite(600,170, 50, 50)
    obstacle.velocityX=-(7+s/100);
    var r=Math.round(random (1,6))
    switch (r) {
      case 1:obstacle.addImage(O1);
        break;
      case 2:obstacle.addImage(O2);
        break;
      case 3:obstacle.addImage(O3);
        break;
      case 4:obstacle.addImage(O4);
        break;
      case 5:obstacle.addImage(O5);
        break;
      case 6:obstacle.addImage(O6);
        break;
      default:break;
    }
      obstacle.scale=0.7;
      obstacle.lifetime=130;
    obstaclegroup.add(obstacle)
    
  }
  
}
function reset () {
  gameState=play;
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  s=0
  gameover.visible=false
  reload.visible=false 
}