function turboModeOn() {
	isTurbo = 1;
	$("#mode h1").text('TURBO MOAD');
	$("#mode").show();
	$('body').css("background-color","black");
	frequency = 5;
	turboModeInterval = setInterval(updateTurboMode,1000);
	player.turboTime('BACKGROUND_MUSIC');
        $('#mainCanvas').addClass('turbo');
    $("#health").addClass('turbo');
}

function turboModeOff() {
	isTurbo = 0;
	$("#mode").hide();
	frequency = 1;
	player.normalTime('BACKGROUND_MUSIC');
	isTurbo = 0;
	fireworks = null;
	clearInterval(turboModeInterval);
        $('#mainCanvas').removeClass('turbo');
    $("#health").removeClass('turbo');

}

function updateTurboMode() {
	console.log('update turbo mode: ' + streak);
	streak = streak - 1;
	setStreak(streak);
	if(streak == 0) {
		turboModeOff();
	}
}
                        
