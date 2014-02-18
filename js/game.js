var stage, hand;
var delta = 5;
var collidables = new Array();

function init() {
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
	hand.x += delta;
	hand.alpha = 0.3;
	if(hand.x >= stage.canvas.width - 400) {
		delta = -5;
	}
	if(hand.x == 100) {
		delta = 5;
	}

	var rand = Math.floor((Math.random()*100)+1);
	if(rand > 95) {
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