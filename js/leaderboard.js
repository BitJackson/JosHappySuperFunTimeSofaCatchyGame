function addPoints(points) {
	var score = $("#score");
	var scoreVal = parseInt(score.text()) + parseInt(points);
	score.html('<h1>' + scoreVal + '</h1>');
}

function setStreak(streakVal) {
	var streak = $("#streak");
	streak.css('width',streakVal * 10 + '%');
}

function setDrunk(drunkVal) {
	var streak = $("#drunk");
	streak.css('width',drunkVal * 10 + '%');
}

function setHealth(healthVal) {
	var health = $("#health");
	health.css('width',healthVal + '%');
}

function getLeaderboard() {
	$.ajax({
		url: 'http://jacksonwillis.com:3000/scores',
		type: "GET",
		dataType: "json",
		success: function (data) {
		    // console.log(data);		
		    for (index = 0; index < data.length; ++index) {
		    	console.log(data[index].name+" - "+data[index].score);
			    // $("#scoreboard").append( "<p>"+data[index].name+" - "+data[index].score+"</p>" );
			}
		}
	});
}

function postScore() {
	$.ajax({
		url: 'http://jacksonwillis.com:3000/score',
		type: "POST",
		contentType: "application/json",
		data : '{"score":"'+$("#score").text()+'","name":"'+name+'", "health":"'+10+'", "streak":"'+streak+'", "drunk":"'+drunk+'"}',
		success: function (data) {
		    console.log(data);
		}
	});	
}