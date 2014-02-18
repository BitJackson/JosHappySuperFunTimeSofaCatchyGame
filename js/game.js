var stage, hand;
var delta = 5;
var collidables = new Array();
var controller;
var handPosition = 0;
var streak = 0;
var drunk = 0;
var frequency = 1; //Number of collidables to spawn (% probability on each tick);


//Drunk mode shit
var isDrunk = 0;
var drunkModeMillisecondsLeft = 0;
var drunkModeInterval;

function init() {
	setupController();

	stage = new createjs.Stage("mainCanvas");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        
        hand = new createjs.Bitmap("assets/images/hand.png");
	stage.addChild(hand);
        
        window.onresize = function() {
            console.log(window.innerHeight);
            stage.canvas.width = window.innerWidth;
            stage.canvas.height = window.innerHeight;
            hand.x = 20;
            hand.y = stage.canvas.height - 140;
        };

	createjs.Ticker.on("tick",tick);
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
        
        // Update stage on each tick
        createjs.Ticker.on("tick", stage);
        
        window.onresize();
}

function tick(event) {

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

		var rand2 = Math.floor((Math.random()*100)+1);

		var spriteSheet;

		if(rand2 < 25) {
			image.src = "assets/images/laptop.png";
			imgWidth = 200;
			imgHeight = 191;
		} else if(rand2 >= 25 && rand2 < 50) {
			image.src = "assets/images/gin.png";
			imgWidth = 98;
			imgHeight = 200;
		} else if(rand2 >= 50) {
			image.src = "assets/images/wine.png";
			imgWidth = 62;
			imgHeight = 201;
		}

		var spriteSheet = new createjs.SpriteSheet({
			images: [image],
			frames: {width: imgWidth, height: imgHeight, regX: 0, regY: 0},
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
		if(rand2 >= 25) {
			bmpAnimation.isBooze = true;
		} else {
			bmpAnimation.isBooze = false;
		}
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

				if(collidable.isBooze && !isDrunk) {
					drunk++;
					setDrunk(drunk);
				}

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
        
    if (streak == 10) {
        streak = 0;
        setStreak(streak);
        toasty.toastIt();
        //Fire super mode
    }

    if (drunk == 10 && !isDrunk) {
        //drunk = 0;
        setDrunk(drunk);
        makeDrunkModeGo();
        //Fire drunk mode
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

function makeDrunkModeGo() {
	isDrunk = 1;
	drunkModeInterval = setInterval(updateDrunkMode,1000);
}

function updateDrunkMode() {
	drunk--;
	setDrunk(drunk);
	if(drunk == 0) {
		isDrunk = 0;
		clearInterval(drunkModeInterval);
	}
}

function setupController() {
	var controllerOptions = {enableGestures: true}
          , leapController = new Leap.Controller(controllerOptions);

        Leap.loop(controllerOptions, function(frame) {
            if (frame.hands.length > 0) {
              for (var i = 0; i < frame.hands.length; i++) {
                var hand = frame.hands[i];
                handPosition = convertRange(hand.palmPosition[0], [-150.0,150.0], [0,stage.canvas.width]);
              }
            }
        });
        
        $('#mainCanvas').on('mousemove', function(e) {
            handPosition = stage.mouseX - 88;
        });
}

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

function gameOver() {
    player.stop('BACKGROUND_MUSIC');
    player.stop('TURBO_MUSIC');
    player.play('GAME_OVER');
}