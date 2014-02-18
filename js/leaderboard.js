function addPoints(points) {
	var score = $("#score");
	var scoreVal = parseInt(score.text()) + parseInt(points);
	score.html('<h1>' + scoreVal + '</h1>');
}

function setStreak(streakVal) {
	var streak = $("#streak");
	streak.css('width',streakVal * 10 + '%');
}

function getLeaderboard() {
	$.ajax({
		url: 'http://jacksonwillis.com:3000/scores',
		type: "GET",
		dataType: "json",
		success: function (data) {
		    // console.log(data);
		    for (index = 0; index < data.length; ++index) {
			    $("#scoreboard").append( "<p>"+data[index].name+" - "+data[index].score+"</p>" );
			}
		}
	});
}

function postScore(name, score) {
	$.ajax({
		url: 'http://jacksonwillis.com:3000/score',
		type: "POST",
		dataType: "json",
		data : "",
		success: function (data) {
		    console.log(data);
		}
	});
}