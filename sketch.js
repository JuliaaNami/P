var PLAY = 1
var END = 0
var gameState = PLAY

var tom,ImgTomcorrendo, tomG 
var jerry, ImgJerry
var street,Imgstreet
var invisibleGround
var reiniciar, Imgreiniciar

var score

function preload(){
ImgTomcorrendo = loadImage("tomcorrendo.png");
ImgJerry = loadImage("jerry.png");
Imgstreet = loadImage("street.jpg");
Imgreiniciar = loadImage("reiniciar2.png")
}

function setup() {
 createCanvas(600,200)

 
 street = createSprite(200, 180,400,20)
 street.addImage(Imgstreet)
 street.x = street.width/2
 jerry = createSprite(50,160, 50,160)
 jerry.addImage(ImgJerry)
 
 jerry.scale = 0.1

 reiniciar = createSprite(300,100,30,30)
reiniciar.addImage(Imgreiniciar)
reiniciar.visible = false
reiniciar.scale = 0.1

invisibleGround = createSprite(200,190,400,10)
invisibleGround.visible = false

 tomG = new Group()

 jerry.setCollider("rectangle",0,0,jerry.width,jerry.height)
 
 score = 0
}

function draw() {
 background(180)



    if(gameState === PLAY){
    
      street.velocityX = -(4 + 3* score/100)
    
      score = score + Math.round(getFrameRate()/60)

      if (street.x<10){
    street.x = street.width/2
} 


   if(keyDown("space")&&jerry.y>=100){
    jerry.velocityY = -12
   }
  
   jerry.velocityY = jerry.velocityY + 0.8

spawnTom()

if(tomG.isTouching(jerry)){
    gameState = END 
  }
 
  }



else if(gameState === END){
street.velocityX = 0
jerry.velocityY = 0

tomG.setLifetimeEach(-1)
tomG.setVelocityXEach(0)

reiniciar.visible = true

if(mousePressedOver(reiniciar)){
restart()
}

}

jerry.collide(invisibleGround)

drawSprites()

fill("red")
textSize(20)
text("Pontuação:"+score, 400,50)

}

function spawnTom(){
    if (frameCount % 60 ===0 ){
    tom = createSprite(600,165,10,40)
    tom.velocityX = -(6+score/100)
    tomG.add(tom)  
    tom.addImage(ImgTomcorrendo)
  tom.scale = 0.15
  }
}

function restart(){
 
tomG.destroyEach()
score = 0
gameState = PLAY
reiniciar.visible = false
}

