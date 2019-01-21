var f=[];
var numberFish=15;

var springing = 0.0122, damping = 0.99;
 
var b=[];
var numberBubbles=37;
var img;

function preload() {
  img=loadImage("sea2.jpg");
}

function setup() { 
  createCanvas(img.width, img.height);
  noStroke(); 
  
  //adds fish to the array
  for (var i=0; i<numberFish; i++) {
    f[i] = new Fish(random(width), random(height));
  }

  //adds bubbles to the array
  for(var g=0; g<numberBubbles; g++){
    b.push(new Bubble(random(width), random(height)));     
  }  
} 

function draw() { 
  background(0);
  image(img,0,0); 

  for (var g=0; g<b.length; g++){
    b[g].move();
    b[g].draw();    
  } 

  logzz({   
    acceleration: f[0].acceleration.x +"/"+f[0].acceleration.y,
    velocity: f[0].velocity.x +"/"+f[0].velocity.y
  })

  for (var i=0; i<f.length; i++){ 

    f[i].findTarget();
    f[i].correctPosition(f);
    f[i].update();
    f[i].render();
   
  } 
}