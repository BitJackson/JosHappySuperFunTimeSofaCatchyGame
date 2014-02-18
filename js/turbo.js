function turboModeOn() {
	isTurbo = 1;
	$("#turbo").show();
	$('body').css("background-color","black");
	frequency = 5;
	turboModeInterval = setInterval(updateTurboMode,1000);
	player.turboTime('BACKGROUND_MUSIC');
        $('#mainCanvas').addClass('turbo');
}

function turboModeOff() {
	isTurbo = 0;
	$("#turbo").hide();
	frequency = 1;
	player.normalTime('BACKGROUND_MUSIC');
	isTurbo = 0;
	clearInterval(turboModeInterval);
        $('#mainCanvas').removeClass('turbo');
}

function updateTurboMode() {
	streak--;
	setStreak(streak);
	if(streak == 0) {
		turboModeOff();
	}
}
                        
