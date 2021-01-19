const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var b_img;
var player;
var p_img;
var target;
var t_img;
var gameState="onSling";
var score=0;
var arrow1,arrow2,arrow3,arrow4,arrow5
var arrows=[]
var score=0;

function preload(){
  bg=loadImage("golden project-2.png")
b_img=loadImage("bg.jpg")
p_img=loadImage("player.png")

}

function setup(){
  var canvas=createCanvas(displayWidth-20,displayHeight-30);
 // background(bg);
  engine=Engine.create();
  world=engine.world
  var options = {
    isStatic: true
}
target = new Target();
target2 = new Target(40);
target3 = new Target(60);
target4 = new Target(80);
target5= new Target(100);

 player=createSprite(200,576)
 player.addImage(p_img);
 player.visible=false;
  form=new Form();
  ground= new Ground(displayWidth/2,displayHeight-20,displayWidth,20)
  arrow=new Arrow(256,536)
 
chain=new Chain(arrow.body,{x:256,y:536})


}
function draw(){
  
  Engine.update(engine);
  background(b_img);
  ground.display()
  //fill("white")
  target.display();
  /*target2.display();
  target3.display();
  target4.display();
  target5.display();*/
  textSize(30);
  fill("black")
  text("Score:"+score,100,100)
  text("mouseX:"+mouseX,displayWidth/2,displayHeight/2)
  text("mouseY:"+mouseY,displayWidth/2,displayHeight/2+50)
  drawSprites()
  form.display();
 form.button2.mousePressed(() => {
  
  player.visible=true
    form.greeting.hide();
    form.title.hide();
   
    form.button2.hide();
  
})
if(player.visible===true)
{
  
  fill("black")
  textSize(30);
  text("Press Space to get Arrow", 200,200);
  arrow.display();
  chain.display();
}

}
function mouseDragged(){
  if(gameState!=="launched")
  {
      Matter.Body.setPosition(arrow.body, {x: mouseX , y: mouseY});
 // Matter.Body.applyForce(arrow.body,arrow.body.position,{x:5,y:-5})

return false;    
}
}



function mouseReleased(){
 chain.fly();
 
  //arrows.pop()
 
  gameState="launched"
  return false
}

function keyPressed(){
  if(keyCode === 32 && gameState==="launched"){
     // if(arrows.length>=0){
          Matter.Body.setPosition(arrow.body, {x: 158, y: 340});
      
     chain.attach(arrow.body);
     gameState="onSling"
     
    //  }
    }
  }