var robot, robotImg
var obstcaleGroup
var background_factory, backgroundImg
var ground
var obstacle1Img,obstacle2Img,obstacle
var obstacle2
var GameOver, GameOverImg
var Restart, ResartImg
var gameState= "PLAY"
var score = 0

function preload(){

  robotImg=loadImage("Images/RobotImg.png")
  backgroundImg=loadImage("Images/Background.png")
  obstacle1Img=loadImage("Images/Obstacle1.png")
  obstacle2Img=loadImage("Images/Obstacle2.png")
  RestartImg=loadImage("Images/RestartImg.png")
  GameOverImg=loadImage("Images/gameOverImg.png")
}

function setup(){
  createCanvas(1000,1000);
  robot=createSprite(200,900)
  robot.addImage("spider",robotImg)
  robot.scale=0.25
  
  ground=createSprite(500,950,1000,5)
  ground.visible=true

  obstacleGroup=new Group()

  background_factory=createSprite(500,600,1000,1000)
  background_factory.addImage("factory",backgroundImg)
  background_factory.scale=2.25
  background_factory.depth=robot.depth
  robot.depth=robot.depth+1
  
  gameOver=createSprite(500,300)
  gameOver.addImage("gameOverButton", GameOverImg)
  gameOver.scale=1.5

  restart=createSprite(500,800)
  restart.addImage("restartButton",RestartImg)
  restart.visible=false
  gameOver.visible=false
  
}
function draw() 
  {
    background(30);
    textSize(30)
    fill("white")
    text("Score: "+score,100,100)
    if(frameCount%50 == 0 && gameState!="END"){
      score=score+10
      text("Score: "+score,100,100)
    }
    //text("velocity:"+obstacle.velocityX,205,900)
    //if(frameCount%500 == 0 && gameState!="END"){
    //  obstacle.velocityX=obstacle.velocityX-10
    //}
    
   
 
  
  
    robot.collide(ground)
  
    if (gameState==="PLAY"){
    ground.velocityX=-1
    if(keyDown(UP_ARROW)){
      robot.velocityY=-20
    }
    createObstacles();
    if(ground.x<0){
      ground.x=500 
    }
    robot.velocityY=robot.velocityY+1
    if(robot.isTouching(obstacleGroup)){
      restart.visible=true
      gameOver.visible=true
      gameState="END"
    }
  }
  if(gameState==="END"){
  ground.velocityX=0
  obstacleGroup.setVelocityXEach(0)
  obstacleGroup.setLifetimeEach(-1)
  if(mousePressedOver(restart)){
    console.log("Restart")
    restartGame()
    
  }
  
  }
  drawSprites();
}

function createObstacles(){
  if(frameCount%200==0){
  obstacle=createSprite(950,900,50,50)
  obstacle.scale=0.2
  obstacle.velocityX=-19
  obstacleGroup.add(obstacle)
  obstacle.lifetime=200
  var myRandom=Math.round(random(1,2))

  switch(myRandom){
    case 1: obstacle.addImage("barrel",obstacle1Img)
      break;
    case 2: obstacle.addImage("fire",obstacle2Img)
 }
}
}
function restartGame(){
gameState="PLAY"
obstacleGroup.destroyEach()
restart.visible=false
gameOver.visible=false
score=0
}