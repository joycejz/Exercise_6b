//subclass of monster
//creates a monster that's half robot
function Robot(x,y,c,rc1,rc2) {

	Monster.call(this,x,y,c);			//declares position vector and color in superclass
	this.rCol1=rc1;						//color for robot's face, hand, and feet
	this.rCol2=rc2;						//color for tobot's eye and shoulders
	//this.angle=0;

	//creates half robot face
	this.rFace=function() {
		stroke(0);
		//face
		fill(this.rCol1);
		arc(this.loc.x,this.loc.y,305,305,radians(110),radians(290),CHORD);
		//outer eye
		fill(this.rCol2);
		ellipse((this.loc.x-80),(this.loc.y-30),60,60);
		//inner eye
		strokeWeight(2);
		fill(color(255,0,0));	//red
		ellipse((this.loc.x-80),(this.loc.y-30),30,30);
		//mouth
		rect((this.loc.x-80),(this.loc.y+50),40,30);
		line((this.loc.x-60),(this.loc.y+50),(this.loc.x-60),(this.loc.y+80));
		quad((this.loc.x-40),(this.loc.y+50),(this.loc.x-18),(this.loc.y+50),(this.loc.x-29),(this.loc.y+80),(this.loc.x-40),(this.loc.y+80));
	}

	//creates robot spikes
	this.rAntennas=function(spikes) {
		this.spikesCol=spikes;
		stroke(0);
		fill(this.spikesCol);
		triangle((this.loc.x-120),(this.loc.y-70),(this.loc.x-160),(this.loc.y-150),(this.loc.x-80),(this.loc.y-110));  //bottom
		triangle((this.loc.x-80),(this.loc.y-110),(this.loc.x-80),(this.loc.y-190),(this.loc.x-20),(this.loc.y-130));  //middle
		triangle((this.loc.x-20),(this.loc.y-130),this.loc.x,(this.loc.y-230),(this.loc.x+20),(this.loc.y-130));  //top
	}

	//creates robot leg
	this.rLegs=function() {
		stroke(0);
		strokeWeight(1);
		fill(this.rCol1);
		triangle((this.loc.x-80),(this.loc.y+90),(this.loc.x-180),(this.loc.y+150),(this.loc.x-50),(this.loc.y+130));
	}

	//creates robot arms
	this.rArms=function() {
		stroke(0);
		//upper arm
		noFill();
		strokeWeight(15);
		curve((this.loc.x-160),(this.loc.y-30),(this.loc.x-160),(this.loc.y-30),(this.loc.x-240),(this.loc.y-70),(this.loc.x-280),(this.loc.y-150)); 
		curve((this.loc.x-160),(this.loc.y-30),(this.loc.x-240),(this.loc.y-70),(this.loc.x-280),(this.loc.y-150),(this.loc.x-280),(this.loc.y-150)); 
		//lower arm
		noFill();
		strokeWeight(15);
		curve((this.loc.x-160),(this.loc.y+30),(this.loc.x-160),(this.loc.y+30),(this.loc.x-360),(this.loc.y-30),(this.loc.x-360),(this.loc.y+90));
		curve((this.loc.x-160),(this.loc.y+30),(this.loc.x-360),(this.loc.y-30),(this.loc.x-360),(this.loc.y+90),(this.loc.x-360),(this.loc.y+90)); 
		//upper shoulder
		fill(this.rCol2); 
		strokeWeight(1);
		ellipse((this.loc.x-160),(this.loc.y-30),30,30);
		//lower shoulder
		fill(this.rCol2);
		strokeWeight(1);
		ellipse((this.loc.x-160),(this.loc.y+30),30,30);
		//upper hand
		fill(this.rCol1);
		quad((this.loc.x-280),(this.loc.y-150),(this.loc.x-300),(this.loc.y-150),(this.loc.x-340),(this.loc.y-210),(this.loc.x-280),(this.loc.y-170));
		//lower hand
		fill(this.rCol1);
		quad((this.loc.x-360),(this.loc.y+90),(this.loc.x-360),(this.loc.y+110),(this.loc.x-300),(this.loc.y+150),(this.loc.x-340),(this.loc.y+90));
	}

	//updates all motion vectors
	this.update=function(lim) {
		this.velLimit=lim;
		this.vel.add(this.accel);
		if(this.following) {
			this.vel.limit(20);
		} else {
			this.vel.limit(this.velLimit);
		}
		this.loc.add(this.vel);
		if (this.following) {
			this.accel.mult(0);
		}
	}

	//makes robot attack something
	this.attack=function(tar) {
		this.following=true;
		var target=p5.Vector.sub(tar.loc,this.loc);		//vector from target to robot
		var t=target.mag();								//gets magnitude
		if (t<100) {
			var m=map(t,0,100,0,10);					//adjusts magnitude if it's less than 100
			target.setMag(t);
		}
		var move=p5.Vector.sub(target,this.vel);		//points robot in right direction
		this.accel.add(move);
	}

	/*this.keepWatch=function(tar) {
		this.angle+=1;
		this.loc=createVector(mouseX,mouseY);
		this.loc.sub(tar.loc);
		push();
		translate(tar.loc.x/2.5,tar.loc.y/2.5);
		this.loc.rotate(radians(this.angle));
		pop();
	}*/

	//displays robot
	this.display=function() {
		push();
		scale(0.4);
		this.antennas(color(255,0,0),false,true);	//red antennas
		this.arms(false,true);
		this.legs(false,true);
		this.face();
		this.rAntennas(color(random(100,200),90,165));	//flashing spikes
		this.rArms();
		this.rLegs();
		this.rFace();
		pop();
	}

	Robot.prototype=Object.create(Monster.prototype);
	Robot.prototype.constructor=Monster;
}