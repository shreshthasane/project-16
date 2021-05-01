var ground;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  ground=createSprite(300,290,800,10);
  ground.velocityX=-4;
  
  monkey=createSprite(60,260,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.1;
  
  FoodGroup=new Group();
  obstacleGroup=new Group();

  
}


function draw() {
  background("cyan");

  if (ground.x<400){
    
    ground.x=ground.width/2;
    
  }
  
  ground.visible=true;
  
  monkey.collide(ground);
  
  if (keyDown("space") && monkey.y>=200){
    
    monkey.velocityY=-14;
    
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  spawnFood();
  spawnObstacles();
  
  if (FoodGroup.isTouching(monkey)){
    
    score=score+2;
    FoodGroup.destroyEach();
    
  }
  
  switch(score){
      
    case 10: monkey.scale=0.2;
      break;
    case 20: monkey.scale=0.3;
      break;
    case 30: monkey.scale=0.4;
      break;
    case 40: monkey.scale=0.5;
    default: break;  
      
  }
  
  if (obstacleGroup.isTouching(monkey)){
    
    monkey.scale=0.1;
    obstacleGroup.destroyEach();
    score-=2;
    
  }
  
  
  
drawSprites();
  
  stroke("black");
  textSize(20);
  fill("black");
  text("SCORE : "+score,200,50);
  
}

function spawnFood(){
  
  if (frameCount%80==0){
    
 banana=createSprite(600,Math.round(random(100,200)),20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=100;
    
    FoodGroup.add(banana);
    
  }
}

function spawnObstacles(){
  
  if (frameCount%300==0){
    
    obstacle=createSprite(700,265,0,0);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.14;
    obstacle.velocityX=-5; 
    
   obstacleGroup.add(obstacle);
    
  }
  
}



