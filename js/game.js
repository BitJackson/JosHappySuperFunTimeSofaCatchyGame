var stage, hand;
var delta = 5;
var collidables = new Array();
var controller;
var handPosition = 0;
var streak = 0;
var drunk = 0;
var name = 'Player1';
var health = 25;
var frequency = 1; //Number of collidables to spawn (% probability on each tick);


//Drunk mode shit
var isDrunk = 0;
var drunkModeInterval;

//Turbo mode shit
var isTurbo = 0;
var turboModeInterval;

var startGame = function() {
	if ($('#player').val().match(/\S/)) {
		name = $('#player').val();
		$('#intro').toggle();
                player.stop('INTRO_MUSAK');
                player.play('BACKGROUND_MUSIC', true);
		init();
	} else {
		alert('You must enter a name');
	}
};

$('#startGame').click(startGame);
$("#intro input").keyup(function (e) {
    if (e.keyCode == 13) {
        startGame();
    }
});

function init() {
	setupController();

	stage = new createjs.Stage("mainCanvas");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        
        hand = new createjs.Bitmap("assets/images/hand.png");
	stage.addChild(hand);
        
        window.onresize = function() {
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
        if (isDrunk) {
            var mid = stage.canvas.width / 2
            if (handPosition > mid) {
                var diff = handPosition - mid;
                hand.x = mid - diff;
            } else {
                var diff = mid - handPosition;
                hand.x = mid + diff;
            }
        } else {
            hand.x = handPosition;
        }

	var rand = Math.floor((Math.random()*100)+1);
	if(rand > (100 - frequency)) {
		//Create a new 'collidable object'
		var image = new Image();

		var rand2 = Math.floor((Math.random()*100)+1);

		var spriteSheet;

		if(rand2 < 20) {
			image.src = "assets/images/laptop.png";
			imgWidth = 200;
			imgHeight = 191;
		} else if(rand2 >= 20 && rand2 < 40) {
			image.src = "assets/images/cat.png";
			imgWidth = 167;
			imgHeight = 200;

		} else if(rand2 >= 40 && rand2 < 50) {
			image.src = "assets/images/mug.png";
			imgWidth = 119;
			imgHeight = 119;

		} else if(rand2 >= 50 && rand2 < 75) {
			image.src = "assets/images/wine.png";
			imgWidth = 62;
			imgHeight = 201;
		} else {
			image.src = "assets/images/gin.png";
			imgWidth = 98;
			imgHeight = 200;
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
		if(rand2 >= 50) {
			bmpAnimation.isBooze = true;
		} else {
			bmpAnimation.isBooze = false;
		}

		if(rand2 >= 40 && rand2 < 50) {
			bmpAnimation.givesLife = true;
		} else {
			bmpAnimation.givesLife = false;
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

				if(collidable.isBooze && !isDrunk && !isTurbo) {
					drunk++;
					setDrunk(drunk);
				}

				stage.removeChild(collidable);
				indicesToRemove.push(i);
				
				if(!isTurbo && !isDrunk) {
					streak++;
					setStreak(streak);
				}

				if(collidable.givesLife && health < 100) {
					health += 5;
					setHealth(health);
				}
			}
			//console.log('collided');
		}

		if (collidable.y >= stage.canvas.height) {
			if(!collidable.hasCollided) {
				addPoints(-500);
				collidable.hasCollided = true;
				stage.removeChild(collidable);
				indicesToRemove.push(i);
				
				if(!isTurbo) {
					health = health - 5;
					setHealth(health);
				}

				if(health == 0) {
					gameOver();
					return;
				}
				
				if(!isTurbo) {
					streak = 0;
					setStreak(streak);
				}
			}
		}
	}

	/*
	for (var i = 0; i < indicesToRemove.length; i++) {
		collidables.splice(indicesToRemove[i],1);
	}*/
        
    if (streak == 10 && !isTurbo) {
    	console.log('turning on turbo');
    	if(drunk == 10) {
    		drunk = 9;
    	}
        toasty.toastIt();
        turboModeOn();
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
    player.drunkTime('BACKGROUND_MUSIC');
    $('#mainCanvas').toggleClass('drunk');
}

function updateDrunkMode() {
	drunk--;
	setDrunk(drunk);
	if(drunk == 0) {
            isDrunk = 0;
            clearInterval(drunkModeInterval);
            player.normalTime('BACKGROUND_MUSIC');
            $('#mainCanvas').toggleClass('drunk');
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
        
        $(window).on('mousemove', function(e) {
            handPosition = e.pageX - 88;
        });
}

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

function gameOver() {
	postScore();
	getLeaderboard();
    player.stop('BACKGROUND_MUSIC');
    player.stop('TURBO_MUSIC');
    player.play('GAME_OVER');
}