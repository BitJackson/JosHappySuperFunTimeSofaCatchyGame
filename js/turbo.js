var fireworks, fireworkInterval;

var fireworks = new Fireworks();
fireworks.init();


function turboModeOn() {
	isTurbo = 1;
	$("#turbo").show();
	$('body').css("background-color","black");
	frequency = 5;
	turboModeInterval = setInterval(updateTurboMode,1000);
        fireworks.display();
	player.turboTime('BACKGROUND_MUSIC');
        $('#mainCanvas').addClass('turbo');
}

function turboModeOff() {
	isTurbo = 0;
	$("#turbo").hide();
	clearInterval(fireworkInterval);
	frequency = 1;
	player.normalTime('BACKGROUND_MUSIC');
	isTurbo = 0;
	clearInterval(turboModeInterval);
        $('#mainCanvas').removeClass('turbo');
}

function updateTurboMode() {
	console.log('update turbo mode: ' + streak);
	streak--;
	setStreak(streak);
	if(streak == 0) {
		turboModeOff();
	}
}
                        
