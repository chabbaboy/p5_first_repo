
function Fish(x,y) {

    this.guid=create_UUID();

    this.position = createVector(x,y);
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();

    this.delta = createVector(0, 0);

    this.maxspeed = 3;    // Maximum speed
    this.maxforce = 0.05; // Maximum steering force

    this.interactionWith = [];
  
    // following params
    this.accelX = 0.0;
    this.accelY = 0.0;
    this.deltaX = 0.0;
    this.deltaY = 0.0;
    this.size=random (25,35);
  
    this.speed=random(fishData.speed,fishData.speed + fishData.spedVariation);
  
    //determines whether it moves right or left
    if (random (-1,1) <0) {  
      this.speed *= -1; //if it moves left speed will be a negative number  
    }
  

    this.r=random (0,255);
    this.g=random (0,255);
    this.b=random (0,255);
  
    // render a fish with moving tail    
    this.render = function(){
  
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

    this.update = function (){
       // Update velocity
    this.velocity.add(this.acceleration);
     // Limit speed
     this.velocity.limit(this.maxspeed);
     this.position.add(this.velocity);
      // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
    }
  
  
    this.moveTowards = function() {

      //move center point
      this.deltaX = mouseX-this.x;
      this.deltaY = mouseY-this.y;

      this.delta = this.position.sub(createVector(mouseX,mouseX));
    
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
  
      //move object    
      this.x = this.x + this.accelX*2*this.size/30;
      this.y = this.y + this.accelY*2*this.size/30; 
  
      this.checkObjectCollisionWithOtherObjects(); 
    }
    this.checkObjectCollisionWithOtherObjects = function(){
  
      // iterate all object and tag collision
      for (var i=0; i<f.length; i++){    
        
        if (this.guid != f[i].guid) {
        
          this.checkSingleCollisionAndCheckIn(f[i]);
         
        } 
      }
    }
    
  
    this.checkSingleCollisionAndCheckIn = function (anotherObject){  
  
        var v1 = createVector(this.x,this.y)
        var v2 = createVector( anotherObject.x,anotherObject.y)
        var distance = dist ( this.x,this.y, anotherObject.x,anotherObject.y)
        var angleBetween = v1.angleBetween(v2);
  
        // objects are in collision
        if (distance < ( this.size + anotherObject.size)){  
  
          this.r=random (0,255);
          this.g=random (0,255);
          this.b=random (0,255);      
  
          // find if interaction is already registred exists
  
          var existsInteraction_V1_V2 = this.interactionWith.filter((item)=> item.guid ===anotherObject.guid)
  
          if ( existsInteraction_V1_V2.length) {
  
            var deltaAwayX = 0;
            if ( distance < this.size/2) {
              deltaAwayX = this.size/5
            } else {
              deltaAwayX = this.size/2
            }
  /*
            this.x = this.x + deltaAwayX;// *cos(existsInteraction_V1_V2[0].angle);
            this.y = this.y+ deltaAwayX; //*sin(existsInteraction_V1_V2[0].angle);
  */
          } 
           // remove interaction element 
           this.interactionWith = this.interactionWith.filter((item)=> anotherObject.guid !== item.guid)  
           
           this.interactionWith.push({
            guid: anotherObject.guid,
            distance: distance,
            angle : angleBetween 
          });   
  
        } else {
  
          // remove interaction element 
          this.interactionWith = this.interactionWith.filter((item)=> anotherObject.guid !== item.guid)
  
        }
    }
  
  }