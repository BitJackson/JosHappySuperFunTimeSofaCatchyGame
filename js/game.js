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
	}

	stage.update(event);
}