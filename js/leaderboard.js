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
	$("#gameover").show();
	$("#your-name").text(name);
	$("#your-score").text($("#score").text());
	$.ajax({
		url: 'http://jacksonwillis.com:3000/scores',
		type: "GET",
		dataType: "json",
		success: function (data) {
			data.sort(function(a, b){
			 return b.score-a.score
			})

		    for (index = 0; index < 40; ++index) {
			    $("#leaderboard").append( "<li>"+data[index].name+" <span>"+data[index].score+"</span></li>" );
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
		    getLeaderboard();
		}
	});	
}