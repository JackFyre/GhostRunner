var tower,towerimg                                  
var climbers,climbersimg,climbersGroup
var door,doorimg,doorsGroup;
var ghost, ghostimg;
var invBlock, invBlocksGroup;
var gameState='play';
var sound;

function preload(){
  towerimg=loadImage('tower.png');
  doorimg=loadImage('door.png')
  climbersimg=loadImage('climber.png');
  ghostimg=loadImage('ghost-standing.png');
   sound=loadSound('spooky.wav');
}




function setup(){
  createCanvas(600,600);
  sound.play();
tower=createSprite(300,300);
  tower.addImage('tower',towerimg);
  tower.velocityY=1;
  
ghost=createSprite(200,200,50,50);
  ghost.addImage('ghost',ghostimg);
  ghost.scale=0.3;
  
   doorsGroup=new Group();
  climbersGroup=new Group();
    invBlocksGroup=new Group();
  
}

function draw(){
 
  
  background(0);
  
  if (gameState==='play'){
    
     if (invBlocksGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
       gameState='end';
  }
  

  
  if (tower.y>400){
    tower.y=300;
  }
  
  
  if(keyDown('left_arrow')){
    ghost.x=ghost.x-3;
  }
    if(keyDown('right_arrow')){
    ghost.x=ghost.x+3;
    }
   if (keyDown('space')){
   ghost.velocityY=-5;
   
   
   }
    ghost.velocityY=ghost.velocityY+0.8;
 
  
  
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
    spawnDoors();
  }
  
  if (gameState==='end'){
    text('game over',230,250);
    tower.destroy();
  }
  
 drawSprites();
  
  
  
}

function spawnDoors(){
if(frameCount%240===0){
door=createSprite(200,250);
  door.addImage('door',doorimg)
  climbers=createSprite(200,10);
  climbers.addImage('climbers',climbersimg);
  door.x=Math.round(random(120,400));
  door.velocityY=1;
  door.lifetime=800;
  doorsGroup.add(door);
  climbers.x=door.x;
 climbers.y=door.y;
  climbers.velocityY=1;
  climbers.lifetime=800;
  climbersGroup.add(climbers);
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  
  invBlock=createSprite(200,15);
  invBlock.width=climbers.width
  invBlock.height=2;
  invBlock.debug=true;
  invBlocksGroup.add(invBlock);
}

}