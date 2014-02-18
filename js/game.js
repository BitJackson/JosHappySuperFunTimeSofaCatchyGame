var stage, hand;
var delta = 5;
var collidables = new Array();
var controller;
var handPosition = 0;

function init() {
	setupLeap();

	stage = new createjs.Stage("mainCanvas");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;

	hand = new createjs.Bitmap("assets/images/hand.png");
	stage.addChild(hand);
	//hand.graphics.beginFill("black").drawRect(20,20,100,40);
	hand.x = 20;
	hand.y = stage.canvas.height - 100;

	createjs.Ticker.on("tick",tick);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
        
        // Update stage on each tick
        createjs.Ticker.on("tick", stage);
}

function tick(event) {
	hand.alpha = 0.3;

	/*
	hand.x += delta;
	if(hand.x >= stage.canvas.width - 400) {
		delta = -5;
	}
	if(hand.x == 100) {
		delta = 5;
	}*/

	hand.x = handPosition;

	var rand = Math.floor((Math.random()*100)+1);
	if(rand > 98) {
		//Create a new 'collidable object'
		var image = new Image();
		image.src = "assets/images/laptop.png";

		//This "spritesheet" only has one frame at the moment, so bodging it
		var spriteSheet = new createjs.SpriteSheet({
			images: [image],
			frames: {width: 150, height: 123, regX: 0, regY: 0},
			animations: {
				move: [0, "move"]
			}
		});

		var bmpAnimation = new createjs.BitmapAnimation(spriteSheet);
		bmpAnimation.gotoAndPlay("move");
		bmpAnimation.direction = 180;
		bmpAnimation.vY = 4;
		bmpAnimation.x = Math.floor((Math.random() * stage.canvas.width) +1);
		bmpAnimation.y = 0;

		bmpAnimation.currentFrame = 0;
		collidables.push(bmpAnimation);
		stage.addChild(bmpAnimation);
	}

	for (var i = 0; i < collidables.length; i++) {
		var collidable = collidables[i];
		collidable.y += collidable.vY;
		collidable.rotation += 2;

		if (ndgmr.checkPixelCollision(collidable,hand)) {
			hand.alpha = 1.0;
			//console.log('collided');
		}
	}
}

function setupLeap() {
	/*
	controller = new Leap.Controller({
		enableGestures: true
	});

	controller.on('connect', function() {
		console.log('Connected to LeapMotion');
	});

	controller.connect();

	controller.on('animationFrame', function(frame) {
	*/

	var controllerOptions = {enableGestures: true};

	Leap.loop(controllerOptions, function(frame) {
	  // Body of callback function
	  		var handString = "";
		if (frame.hands.length > 0) {
		  for (var i = 0; i < frame.hands.length; i++) {
		    var hand = frame.hands[i];
		    handPosition = convertRange(hand.palmPosition[0], [-150.0,150.0], [0,stage.canvas.width]);
		    /*
		    handString += "Hand ID: " + hand.id + "<br />";
		    handString += "Direction: " + hand.direction, 2 + "<br />";
		    handString += "Palm normal: " + vectorToString(hand.palmNormal, 2) + "<br />";
		    handString += "Palm position: " + vectorToString(hand.palmPosition) + " mm<br />";
		    handString += "Palm velocity: " + vectorToString(hand.palmVelocity) + " mm/s<br />";
		    handString += "Sphere center: " + vectorToString(hand.sphereCenter) + " mm<br />";
		    handString += "Sphere radius: " + hand.sphereRadius.toFixed(1) + " mm<br />";
		    */
		    //console.log('hand direction: ' + hand.direction);
		    //console.log('palm position: ' + hand.palmPosition);

		    // And so on...
		  }

		}
	});
}

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}