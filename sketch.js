var f=[];
var numberFish= 2;

var fishData = {
  speed: 10,
  spedVariation: 0.4
};


var springing = 0.00009, damping = 0.989;
 
var b=[];
var numberBubbles=37;
var img;


function preload() {
  img=loadImage("sea2.jpg");
}
function setup() { 

  createCanvas(img.width, img.height);
  noStroke(); 
  
  //adds 50 fish to the array
  for (var i=0; i<numberFish; i++) {
      f.push(new Fish());
  }
  
  //adds 20 bubbles to the array
  for(var g=0; g<numberBubbles; g++){
       b.push(new Bubble());     
  }  
} 

function draw() { 

  image(img,0,0); 

  for (var g=0; g<b.length; g++){
    b[g].move();
    b[g].draw();
  } 

  for (var i=0; i<f.length; i++){  if (frameCount%60===0)  console.log("mousex ", mouseX," x/y", f[i].x+"/"+f[i].y )    
    f[i].moveTowards();
    f[i].draw();   
  }   
}



function Fish(){

  this.guid=create_UUID();
  this.x= random (0,width);
  this.y=random (0,height);
  this.isMoving = false;
  this.intersertWithAnother = false;

  // following params
  this.accelX = 0.0;
  this.accelY = 0.0;
  this.deltaX = 0.0;
  this.deltaY = 0.0;

  this.speed=random(fishData.speed,fishData.speed + fishData.spedVariation);

  //determines whether it moves right or left
  if (random (-1,1) <0) {  
    this.speed *= -1; //if it moves left speed will be a negative number  
  }
  this.size=random (25,30);
  this.r=random (0,255);
  this.g=random (0,255);
  this.b=random (0,255);

  // draw a fish with moving tail
  this.draw=function(){

    fill (this.r, this.g, this.b);    
    
    push();    
   
    translate(this.x,this.y);

    if((this.x-mouseX)>0){
      rotate(PI);    
    }

    var jitter = (this.isMoving ) ? random(0,this.size*0.2): 0;

    ellipse (0, 0, this.size*2, this.size); 
    translate(-this.size,0);   

    beginShape();
    curveVertex(-this.size, -this.size/2 + jitter);
    curveVertex(-this.size, this.size/2 + jitter);
    curveVertex(0,0);
    endShape(CLOSE);

    pop();
    
  };

  this.swim = function(){
    this.x += this.speed;
    if (this.accelX<= 0.01 || this.x >=this.accely<= 0.01) {
        this.speed *= -1;      
    }
  };

  this.moveTowards = function() {

    this.intersertWithAnother = false;
    //move center point
    this.deltaX = mouseX-this.x;
    this.deltaY = mouseY-this.y;
  
    // create springing effect
    this.deltaX *= springing;
    this.deltaY *= springing;

    this.accelX += this.deltaX;
    this.accelY += this.deltaY;
  
    // move predator's center
    this.x += this.accelX;
    this.y += this.accelY;
  
    // slow down springing
    this.accelX *= damping;
    this.accelY *= damping;

    
    if (abs(this.accelX )<= 0.001 && abs(this.accelY )<= 0.001 ) {
      this.isMoving=false;
    } else {
      this.isMoving=true; 
    }  
    // change curve tightness
    organicConstant = 1-((abs(this.accelX)+abs(this.accelY))*0.1);
  

    //move nodes
    var movementX = sin(radians(2))*(this.accelX*2);
    var movementY = sin(radians(2))*(this.accelY*2);

    

    for (var i=0; i<f.length; i++){     
      
      if (this.intersects(f[i])) {
        this.intersertWithAnother = true; 

      }
    }
    
    if (this.intersertWithAnother){
      if (frameCount%60===0) {  console.log("inteSECTTT/" ) }   
    
    } else {
      this.x = this.x + movementX;
      this.y = this.y + movementY; 

    }
  }

  this.intersects = function (anotherObject){  
    
      if(this.guid != anotherObject.guid)
      var d= dist(this.x, this.y, anotherObject.x, anotherObject.y);
  
      if (d<( this.size + anotherObject.size)){       
        
        return true;
      } else {
        return false;
      }
  }
}

function Bubble(){
   this.x=random (0,width);
   this.size= random (3,15);
   this.y=height+random(this.size*2,this.size*20);
   this.speed= 1;
  
}

Bubble.prototype.constructor=Bubble;
Bubble.prototype.move= function (){
       this.y-=this.speed;
  if (this.y<-this.size*2){
   this.y=height+random(this.size*2,this.size*20);
  } 
};

Bubble.prototype.draw=function(){
       fill(255,255,255,75);
      ellipse(this.x,this.y,this.size,this.size);
        
};


function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}
