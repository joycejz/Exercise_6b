//creates a happy monster :D
function Monster(x,y,c) {

	this.loc=createVector(x,y);		//location vector
	this.vel=createVector(0,0);		//velocity vector
	this.accel=createVector(0,0);	//acceleration vector
	this.col=c;						//sets color
	this.following=false;			//if monster is following an obj

	//creates face
	this.face=function() {
		stroke(0);
		//face
		fill(this.col);
		strokeWeight(1);
		ellipse(this.loc.x,this.loc.y,300,300);
		//eye
		noFill();
		strokeWeight(4);
		arc((this.loc.x-80),(this.loc.y-10),60,60,radians(200),radians(340));	//left
		arc((this.loc.x+80),(this.loc.y-10),60,60,radians(200),radians(340));	//right
		//mouth
		strokeWeight(3);
		arc(this.loc.x,this.loc.y,180,180,radians(30),radians(150));
		//blush
		strokeWeight(1);
		stroke(235,150,190);
		//left
		line((this.loc.x-80),(this.loc.y+20),(this.loc.x-60),this.loc.y);	//left
		line((this.loc.x-100),(this.loc.y+20),(this.loc.x-80),this.loc.y);	//middle
		line((this.loc.x-120),(this.loc.y+20),(this.loc.x-100),this.loc.y);	//right
		//right	
		line((this.loc.x+60),(this.loc.y+20),(this.loc.x+80),this.loc.y);	//left
		line((this.loc.x+80),(this.loc.y+20),(this.loc.x+100),this.loc.y);	//middle
		line((this.loc.x+100),(this.loc.y+20),(this.loc.x+120),this.loc.y);	//right
	}

	//creates antennas
	//can pass it a color and customize which antennas you want to appear
	this.antennas=function(c,leftOn,rightOn) {
		this.antennaCol=c
		this.l=leftOn;
		this.r=rightOn;
		stroke(0);
		if (this.l) {
			strokeWeight(10);
			noFill();
			arc((this.loc.x-180),(this.loc.y-110),160,160,radians(-90),radians(0));  //left bendy thing
			strokeWeight(1);
			fill(this.antennaCol);
			ellipse((this.loc.x-180),(this.loc.y-190),40,40);  //left ball
		}
		if (this.r) {
			strokeWeight(10);
			noFill();
			arc((this.loc.x+180),(this.loc.y-110),160,160,radians(180),radians(270));  //right bendy thing
			fill(this.antennaCol);		//light blue
			strokeWeight(1);
			ellipse((this.loc.x+180),(this.loc.y-190),40,40);  //right ball
		}
	}

	//creates feet/legs
	//can customize which feet you want to appear
	this.legs=function(leftOn,rightOn) {
		this.l=leftOn;
		this.r=rightOn;
		stroke(0);
		strokeWeight(1);
		fill(this.col);
		if (this.l) {
			ellipse((this.loc.x-100),(this.loc.y+140),120,40);	//left
		}
		if (this.r) {
			ellipse((this.loc.x+100),(this.loc.y+140),120,40);	//right
		}
	}

	//creates arms/hands
	//can customize which arms you want to appear
	this.arms=function(leftOn,rightOn) {
		this.l=leftOn;
		this.r=rightOn;
		stroke(0);
		strokeWeight(1);
		fill(this.col);
		if (this.l) {
			arc((this.loc.x-140),(this.loc.y+30),100,100,radians(135),radians(-45),CHORD);	//left
		}
		if (this.r) {
			arc((this.loc.x+140),(this.loc.y+30),100,100,radians(-135),radians(45),CHORD);	//right
		}
	}
	
	//can change monster's color
	this.changeColor=function(c) {
		this.col=c;
	}

	//updates all motion vectors
	this.update=function(lim) {
		this.velLimit=lim;
		this.vel.add(this.accel);
		if(this.following) {
			this.vel.limit(50);
		} else {
			this.vel.limit(this.velLimit);
		}
		this.loc.add(this.vel);
		if (this.following) {
			this.accel.mult(0);
		}
	}

	//makes sure bouncing monsters don't travel past the window
	this.check=function() {
		//reverses velocity if monster hits the bottom
		if (this.loc.y>windowHeight*2.5) {
			this.vel.y*=-1;
			this.accel.y=0;
		} else if (this.loc.y<0) {	//reverses velocity again if mosnter hits the top
			this.vel.y*=-1;
			this.accel.y=0;
		}
	}

	//makes monster follow something
	this.follow=function(target) {
		this.following=true;
		var lead=p5.Vector.sub(target,this.loc);	//vector from target to monster
		var l=lead.mag();							//gets magnitude
		if (l<100) {
			var m=map(l,0,100,0,40);				//adjusts magnitude value if it's less than 100
			lead.setMag(m);
		}
		var move=p5.Vector.sub(lead,this.vel);		//points monster in right direction
		this.accel.add(move);
	}

	//displays monster
	this.display=function() {
		push();
		scale(0.4);
		this.antennas(color(random(0,100),random(100,255),100),true,true);	//flashing antennas
		this.arms(true,true);
		this.legs(true,true);
		this.face();
		pop();
	}
}