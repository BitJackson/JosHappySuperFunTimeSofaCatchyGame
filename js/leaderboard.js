function addPoints(points) {
	var score = $("#score");
	var scoreVal = parseInt(score.text()) + parseInt(points);
	score.html('<h1>' + scoreVal + '</h1>');
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

function postScore(name) {
	$.ajax({
		url: 'http://jacksonwillis.com:3000/score',
		type: "POST",
		contentType: "application/json",
		data : '{"score":"'+$("#score").text()+'","name":"'+name+'"}',
		success: function (data) {
		    console.log(data);
		}
	});
}