var stage, hand;
var delta = 5;
var collidables = new Array();
var controller;
var handPosition = 0;
var streak = 0;
var frequency = 1; //Number of collidables to spawn (% probability on each tick);

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
	if(rand > (100 - frequency)) {
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

		var bmpAnimation = new createjs.Sprite(spriteSheet);
		bmpAnimation.gotoAndPlay("move");
		bmpAnimation.direction = 180;
		bmpAnimation.vY = 4;
		bmpAnimation.x = Math.floor((Math.random() * stage.canvas.width) +1);
		bmpAnimation.y = 0;

		bmpAnimation.currentFrame = 0;
		collidables.push(bmpAnimation);
		stage.addChild(bmpAnimation);
	}

	var indicesToRemove = new Array() //Array of indices to remove from collidables
	for (var i = 0; i < collidables.length; i++) {
		var collidable = collidables[i];
		collidable.y += collidable.vY;
		collidable.rotation += 2;


		if (ndgmr.checkPixelCollision(collidable,hand)) {
			if(!collidable.hasCollided) {
				hand.alpha = 1.0;
				addPoints(500);
				collidable.hasCollided = true;
				stage.removeChild(collidable);
				indicesToRemove.push(i);
				streak++;
				setStreak(streak);
			}
			//console.log('collided');
		}

		if (collidable.y >= stage.canvas.height) {
			if(!collidable.hasCollided) {
				addPoints(-500);
				collidable.hasCollided = true;
				stage.removeChild(collidable);
				indicesToRemove.push(i);
				streak = 0;
				setStreak(streak);
			}	
		}
	}
	for (var i = 0; i < indicesToRemove.length; i++) {
		collidables.splice(indicesToRemove[i],1);
	}
}

function setupLeap() {

	var controllerOptions = {enableGestures: true};

	Leap.loop(controllerOptions, function(frame) {
		if (frame.hands.length > 0) {
		  for (var i = 0; i < frame.hands.length; i++) {
		    var hand = frame.hands[i];
		    handPosition = convertRange(hand.palmPosition[0], [-150.0,150.0], [0,stage.canvas.width]);

		  }

		}
	});
}

function convertRange( value, r1, r2 ) { 
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}