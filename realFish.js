
function RealFish(x,y,newImage) {

    this.guid=create_UUID();
    this.image = newImage
    this.position = createVector(x,y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.delta = createVector(0, 0);
    this.maxspeed = random(fishData.maxSpeed,fishData.maxSpeed+ fishData.spedVariation);    // Maximum speed
    this.maxforce = 0.11; // Maximum steering force
    this.isMoving=false;
    this.size=1

  
    // render a fish with moving tail    
    this.render = function(){

      push();
      translate(this.position.x,this.position.y); 
      image(this.image, this.position.x, this.position.y, this.image.width*fishResizeCoef,this.image.height*fishResizeCoef)
      pop();
    };

    this.applyForce = function (force) {
      this.acceleration.add(force);
    }
    this.update = function (){ 
      
      var newSpeedSizeDependentFactor = this.size /((fishData.fishSizeMax+fishData.fishSizeMin)/2);// scale velocity by object size
      var amortizer = map(newSpeedSizeDependentFactor,0.6666667,1.33333334,0.90,1.0);

      this.velocity= this.acceleration.mult(amortizer );  
      this.velocity.limit(this.maxspeed);       // Limit speed
      this.position.add(this.velocity); 

      if (this.acceleration.mag() < 0.3 ) {
        this.isMoving= false;
      }
      else {
        this.isMoving=true
      }
    }

    this.findTarget = function(){     

      var mouseVector = createVector(mouseX,mouseY) 
      this.delta =  p5.Vector.sub(mouseVector, this.position).mult(springing)  ;
      this.delta =this.delta.mult(springing)

      this.acceleration = this.acceleration.add(this.delta).mult(damping); 
    }

    this.correctPosition= function(objects) {
      var sep = this.separate(objects);
      this.applyForce(sep);
    }
    this.separate= function(objects) {
      let desiredseparation = 100
      let steer = createVector(0, 0);
      let count = 0;
      // For every boid in the system, check if it's too close
      for (let i = 0; i < objects.length; i++) {

        if( this.guid !=  objects[i].guid) {

          let d = p5.Vector.dist(this.position, objects[i].position);
          // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
          if ((d > 0) && (d < desiredseparation)) {
            // Calculate vector pointing away from neighbor
            let diff = p5.Vector.sub(this.position, objects[i].position);
            diff.normalize();
            diff.div(d); // Weight by distance
            steer.add(diff);
            count++; // Keep track of how many
          }
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        steer.div(count);
      }
    
      // As long as the vector is greater than 0
      if (steer.mag() > 0) {
        // Implement Reynolds: Steering = Desired - Velocity
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
      }
      return steer;
    }

   
  }