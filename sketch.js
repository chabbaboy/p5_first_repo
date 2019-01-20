
var rotationAngle = 0;
var scalar = 40;
var speed = 0.02;

function setup() {
  createCanvas(windowWidth,windowHeight);
  fill(0);
  
}

function draw() {
  background(255);
  var y1 = sin(rotationAngle) * scalar   + 100
  var y2 = sin(rotationAngle + 0.8) * scalar   + 100
  var y3 = sin(rotationAngle + 1.8) * scalar   + 100
  
  ellipse(100,y1 , 50)
  ellipse(200,y2 , 50)
  ellipse(300,y3 , 50)

 rotationAngle+=speed;
}