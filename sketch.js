var gameState=0;
var speed,car1,stone,car2,back;
var stoneGroup;
var response,responseJSON,datetime,min;
var minT=[];
var stone;
function preload(){
  back = loadImage("images/track.png");
  Car1 = loadImage("images/car3.png");
  Stone = loadImage("images/stone.png");
  car2 = loadImage("images/car1.png");
}
function setup() {
  createCanvas(700,700);

  car1 = createSprite(400,400,20,20);
  car1.addImage("car1",Car1);
  car1.scale=1.1;

 // computerCar = createSprite(400,600,40,40);
  //computerCar.addImage(car2);
 
   stoneGroup = new Group()
 // back1 = createSprite(382,300,1,1);

  
}

function draw() {
  background(back);
 
  
  car1.depth+=1;
  
 
 
 if (gameState===0){
   strokeWeight(2);
   stroke("white");
   fill("black");
   textSize(35);
   text("Press Space To Play",250,100);
 }
  if (keyCode===32){
    gameState=1;
    minT.push(min);
  }
  if (gameState===1){
    
    
   textSize(29);
   fill("darkorange");
   strokeWeight(1);
   stroke("white");
   text("Time: "+min,10,100);
    if (keyIsDown(LEFT_ARROW) && car1.x>160){
          car1.x=car1.x-5;
         
    }
    if (keyIsDown(RIGHT_ARROW) && car1.x<533){
      car1.x=car1.x+5;
      
}
if (keyIsDown(UP_ARROW) && car1.y>180){
      car1.y-=4;
}
if (keyIsDown(DOWN_ARROW)&&car1.y<550){
  car1.y+=4;
}

    stoneGroup.velocityY=stoneGroup.velocityY+3;
 
if (stoneGroup.isTouching(car1)){
  gameState=2;
}
if (frameCount===1850){
  gameState=3;
}
   
}
  else if(gameState===2){
    car1.destroy();
    stone.destroy();
    stone.velocityY=0;
    textSize(35);
    fill("Blue");
    strokeWeight("2");
    stroke("black")
    text("Game Over",300,100);
    text("Refresh Tab To Play Again",200,200);
  }else if(gameState==3){
         car1.destroy();
          stoneGroup.destroyEach();
            textSize(35);
            strokeWeight(2);
            stroke("red");
            fill("green");
            text("You Win",300,200);
            text("Refresh Tab To Play Again",250,300);
  }
 //console.log(frameCount);
 
  getTime();
  spawnStone();
  drawSprites();
}
function spawnStone(){
  if (frameCount%30===0){
   stone = createSprite(220,-20,20,20);
   stone.addImage("c2",Stone);
   stone.scale=0.2;
   stone.velocityY=13;
   
   stone.x=Math.round(random(270,620));
   stone.depth=car1.depth;
   stone.lifetime=820;
  
   stone.debug=false;
   stone.setCollider("circle",0,0,240);
   stoneGroup.add(stone);
  }
   
    
}
async function getTime(){
 response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
 responseJSON = await response.json();
   datetime = responseJSON.datetime;
   min = datetime.slice(11,17);
  console.log(min);

}

