var stage;
var controller;


  	google.maps.event.addDomListener(window, 'load', initialize);

function init() {
	var canvas = document.getElementById("main");

  	canvas.width = window.innerWidth;
  	canvas.height = window.innerHeight;
  	
  	//stage = new createjs.Stage(canvas);

	controller = new Leap.Controller({
		enableGestures: true,
	});
	console.log(controller);

	controller.on('connect', function(){
		console.log("Successful Connection");
	});

  	controller.connect();

  	controller.on( 'animationFrame', function( frame ){
  		if(frame.gestures.length > 0) {

	  		frame.gestures.forEach(function(gesture)
	  		{
	  			
		  	});
	  }
  })
}
function initialize() {
	var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("main"),
        mapOptions);
}