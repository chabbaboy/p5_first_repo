var f=[];
var numberFish=25;
var realTempFishes = [];
var realFishes = [];

var springing = 0.0122, damping = 0.99;
 
var b=[];
var numberBubbles=37;
var img;
var fishResizeCoef = 0.2;
var socket;
var soundsBubbles1;

var positionX, positionY;

socket = io.connect('http://192.168.1.28:3000')
  socket.on('mousePosition', function (data) {

    console.log('xxxxx',data.x);
    positionX = data.x;
    positionY = data.y;
  });

function preload() {
  img=loadImage("sea2.jpg");
  fish1 = loadImage("./pics/fishes/fish1.png")
  turtle = loadImage("./pics/fishes/turtle.png")
  shark = loadImage("./pics/fishes/shark.png")
  hook = loadImage("./pics/fishes/fish_hook.png")

  realTempFishes.push(fish1)
  realTempFishes.push(shark)
  realTempFishes.push(turtle)
  realTempFishes.push(hook)
}

function setup() { 
  createCanvas(img.width, img.height);
  noStroke(); 
  
  soundsBubbles1 = loadSound('./sounds/bubbles1.wav');
  

  function mouseMsg(data) {
     // socket.broadcast.emit('mousex',data.x);
      console.log('data',data.x);
  }
  //adds fish to the array
  for (var i=0; i<numberFish; i++) {
    f[i] = new Fish(random(width), random(height));
  }

  for (var j=0; j<realTempFishes.length; j++){    
    realFishes[j] = new RealFish( random(width/2), random(height/2), realTempFishes[j]);
  } 

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
  for (var j=0; j<realFishes.length; j++){
    realFishes[j].findTarget(positionX, positionY);
    realFishes[j].correctPosition(f);
    realFishes[j].update();
    realFishes[j].render();   
  } 
/*
  logzz({   
    acceleration: f[0].acceleration.x +"/"+f[0].acceleration.y,
    velocity: f[0].velocity.x +"/"+f[0].velocity.y
  })
*/
  for (var i=0; i<f.length; i++){ 

    f[i].findTarget(positionX, positionY);
    f[i].correctPosition(f);
    f[i].update();
    f[i].render();   
  } 
  
}

function mousePressed() {
  if ( soundsBubbles1.isPlaying() ) { // .isPlaying() returns a boolean
    soundsBubbles1.stop();
   
  } else {
    soundsBubbles1.play();
    background(0,255,0);
  }
}