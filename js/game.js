var stage, hand;
var delta = 5;
var collidables = new Array();

function init() {
	stage = new createjs.Stage("mainCanvas");

	hand = stage.addChild(new createjs.Shape());
	hand.graphics.beginFill("black").drawRect(20,20,100,40);
	hand.x = 20;
	hand.y = 500;

	createjs.Ticker.on("tick",tick);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
}

function tick(event) {
	hand.x += delta;
	if(hand.x >= 700) {
		delta = -5;
	}
	if(hand.x == 0) {
		delta = 5;
	}

	var rand = Math.floor((Math.random()*100)+1);
	if(rand > 99) {
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
		bmpAnimation.x = Math.floor((Math.random() * 500) +1);
		bmpAnimation.y = 0;

		bmpAnimation.currentFrame = 0;
		collidables.push(bmpAnimation);
		stage.addChild(bmpAnimation);
	}

	for (var i = 0; i < collidables.length; i++) {
		var collidable = collidables[i];
		collidable.y += collidable.vY;
	}

	stage.update(event);
}