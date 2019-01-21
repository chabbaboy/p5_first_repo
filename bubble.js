
function Bubble(x,y,size = random(3,25)){
    this.x=x
    this.size= size;
    this.y=y; //height+random(this.size*2,this.size*20);
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
 