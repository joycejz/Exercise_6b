var l;
var monster;
var robot;
var creatures=[];

function setup() {
	createCanvas(windowWidth,windowHeight);
	l=true;
	monster=new Monster(600,600,color(205,175,240));
	robot=new Robot(0,0,color(180,255,140),color(random(100,255)),color(50,150));

	//creates an array of 5 monsters/robots with random positions and colors
	for (var i=0; i<5; i++) {
		var r=int(random(0,2));
		if (r==0) {
			creatures[i]=new Monster((i+1)*500,random(300,1000),color(random(100,200),random(150,250),random(200,255)));
		} else if (r==1) {
			creatures[i]=new Robot((i+1)*500,random(300,1000),color(random(200,255),random(50,200),random(50,200)),color(180),color(100));
		}
	}
}

function draw() {
	background(255);
	var m=createVector(mouseX*2.5,mouseY*2.5);		//mouse vector
	monster.follow(m);		//monster will follow mouse
	monster.update();		//update monster's motion vectors
	robot.attack(monster);		//robot will attack mosnter
	robot.update();			//update tobot's motion vectors
	robot.display();
	monster.display();
	
	for (var i=0; i<creatures.length; i++) {
		var a=createVector(0,random(0.002,0.01));	//acceleration vector
		creatures[i].accel.add(a);					//make monsters drop down
		creatures[i].update(23);					//update motion vectors
		creatures[i].check();						//makes sure its bounces off the top/bottom of screen
		creatures[i].display();
	}
}

//pause program by clicking
function mousePressed() {
	if (l) {
		noLoop();
		l=!l;
	} else {
		loop();
		l=!l;
	}
}

//change bouncing monsters' colors by pressing space
function keyPressed() {
	if (key==' ') {
		for (var i=0; i<creatures.length; i++) {
			creatures[i].changeColor(color(random(200,255),random(50,200),random(50,200)),color(180),color(100))
		}
	}
}