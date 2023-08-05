var score=0
var life=3
var gameState="play"


function preload(){
bgImg=loadImage("assets/bg.jpeg");
heart1Img=loadImage("assets/heart_1.png")
heart2Img=loadImage("assets/heart_2.png")
heart3Img=loadImage("assets/heart_3.png")
shooter1Img=loadImage("assets/shooter_1.png")
shooter2Img=loadImage("assets/shooter_2.png")
shooter3Img=loadImage("assets/shooter_3.png")
zombieImg=loadImage("assets/zombie.png")
bulletImg=loadImage("assets/bullet.png")
restartImg=loadImage("assets/restart.png")
gameOverImg=loadImage("assets/gameOver.png")

}

function setup(){
createCanvas(windowWidth,windowHeight)
shooter=createSprite(100,600)
shooter.addImage(shooter2Img)
shooter.scale=0.5
zombieGroup= new Group()
bulletGroup= new Group()
heart1=createSprite(width-150,40,20,20)
heart1.addImage(heart1Img)
heart1.scale=0.4
heart1.visible=false
heart2=createSprite(width-105,40,20,20)
heart2.addImage(heart2Img)
heart2.scale=0.4
heart2.visible=false
heart3=createSprite(width-150,40,20,20)
heart3.addImage(heart3Img)
heart3.scale=0.4

gameOver=createSprite(width/2,height/2-50)
gameOver.addImage(gameOverImg)
gameOver.visible=false
restart=createSprite(width/2,height/2+70)
restart.addImage(restartImg)
restart.scale=0.3
restart.visible=false




}

function draw(){
background(bgImg)
if(life===3){
  heart3.visible=true
  heart2.visible=false
  heart1.visible=false
}
if(life===2){
  heart3.visible=false
  heart2.visible=true
  heart1.visible=false
}
if(life===1){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=true
}
if(life===0){
  heart3.visible=false
  heart2.visible=false
  heart1.visible=false
}
if(life===0){
  gameState="end"
}
if(gameState==="play"){
  if(keyDown(UP_ARROW)){
    shooter.y-=3 
  }
  if(keyDown(DOWN_ARROW)){
      shooter.y+=3 
    }
  
  if(keyWentDown("space")){
      shooter.addImage(shooter3Img)
      spawnBullets(shooter.x,shooter.y-40)
  }
  if(keyWentUp("space")){
      shooter.addImage(shooter2Img)
  }
  
  spawnZombies()
  
  if(zombieGroup.isTouching(shooter)){
    for(var i=0;i<zombieGroup.length;i++){
      if(zombieGroup[i].isTouching(shooter)){
        life-=1
        
        zombieGroup[i].destroy()
      }
    }
  }
  if(bulletGroup.isTouching(zombieGroup)){
    for(var i=0;i<zombieGroup.length;i++){
      for(var j=0;j<bulletGroup.length;j++){
        if(zombieGroup[i].isTouching(bulletGroup[j])){
          zombieGroup[i].destroy() 
          bulletGroup.destroyEach()
          score+=1
      }
      }
    }
  }
  
}

textSize(35)
fill("cream")
text("Score: "+score,40,90)


if(gameState==="end"){
  zombieGroup.setVelocityXEach(0)
  zombieGroup.setLifetimeEach(0)
  shooter.visible=false
  gameOver.visible=true
  restart.visible=true

  if(mousePressedOver(restart)){
    gameState="play"
    zombieGroup.destroyEach()
    shooter.visible=true
    gameOver.visible=false
    restart.visible=false
    score=0
    life=3
  }
}

drawSprites()
}

function spawnZombies(){
  if(frameCount%60===0){
    zombie=createSprite(width,200)
    zombie.y=random(height-200,100)
    zombie.velocityX=-4
    zombie.addImage(zombieImg)
    zombie.scale=0.2
    zombie.lifetime=width/4
    zombieGroup.add(zombie)
    zombie.setCollider("rectangle",0,0,400,1000)
    //zombie.debug=true
  }
  


}

function spawnBullets(x,y){
    bullet=createSprite(x,y)
    bullet.addImage(bulletImg)
    bullet.velocityX=15
    bullet.scale=0.1
    bullet.lifetime=width/15
    bulletGroup.add(bullet)
  
}

