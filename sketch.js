var bgd_img,bgd;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;


var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver;
var score=0;
var attempts=3;

function preload(){
  bgd_img=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  gameOverImg = loadImage("gameOver.png");
}
function setup() {
  createCanvas(400, 400);
   
  
  bgd= createSprite(200,200,10,10);
  bgd.addImage(bgd_img);
  bgd.velocityX=-2;
  
  ground =createSprite (200,380,400,5)
  ground.visible=false;
  
  monkey = createSprite(50,350,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
 
  obstaclesGroup=new Group();
  FoodGroup=new Group();
}

function draw() {
  background(220);
 
   
  
  if (bgd.x < 0){
      bgd.x = bgd.width/2;
    }
  monkey.collide(ground);
  if(keyDown("space")&& monkey.y>=300) {
    monkey.velocityY = -12;
  }
    
  monkey.velocityY = monkey.velocityY + 0.8;
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=monkey.scale-0.0001;
    //obstaclesGroup.destroyEach();
  }
  if(FoodGroup.isTouching(monkey)){
    monkey.scale=monkey.scale+0.01;
    FoodGroup.destroyEach();
  }
  
  if(frameCount%60===0){
    score=score+1;
  }
  
 
  obstaclesGroup.depth=monkey.depth-1;
  monkey.depth=monkey.depth+1;

  spawnObstacles();
  spawnFruit();
  drawSprites();
  fill("red");
  text("Score: "+score,200,50) ;   
}

function spawnObstacles(){
  if (frameCount % 200 === 0){
   var obstacle = createSprite(400,340,10,40);
   obstacle.addImage("obstacle",obstacle_img);
   obstacle.velocityX = -2;
   obstacle.scale=0.2;
   obstacle.lifetime=200;
   
   obstaclesGroup.add(obstacle);
 }
}

function spawnFruit(){
  if (frameCount % 50===0){
    var banana = createSprite(400,200,10,10);
    banana.addImage("fruit",bananaImage);
    banana.velocityX = -4;
    banana.scale=0.05
    banana.lifetime=100;
    FoodGroup.add(banana);
  }
}
