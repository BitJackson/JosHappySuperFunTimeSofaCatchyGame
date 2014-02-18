var stage;
var controller;
var open = false;
var locked = false;

Shadowbox.init();

function init() {

	$("#slider").carouFredSel({auto: false});	


	controller = new Leap.Controller({
		enableGestures: true,
	});

	controller.on('connect', function(){
		console.log("Successful Connection");
	});

  controller.connect();

  controller.on( 'animationFrame', function( frame ){
  	if(frame.gestures.length > 0) {

  		frame.gestures.forEach(function(gesture)
  		{
  			//ON SWIPE
  			if(gesture.type == 'swipe') 
  			{
  				if(!Shadowbox.isOpen()) {
	  				if (gesture.direction[0] > 0 && gesture.state == 'stop') {
	  					slide('left');
	  				} else if (gesture.direction[0] < 0 && gesture.state == 'stop') {
	  					slide('right');
	  				}
	  			}
  			} 
  			//ON TAP
  			else if (gesture.type == 'screenTap'  || gesture.type == 'keyTap') {
  				if(Shadowbox.isOpen() && locked == false) 
  				{
				   	locked = true;
						Shadowbox.close();
						console.log('closed');
						unlock(1000);
  				} 
  				else if (locked == false) 
  				{
  					locked = true;
						console.log('open');
  					var current = $('#slider').trigger('currentVisible', function ( currentVis ) {
		  				Shadowbox.open({
	  						content: currentVis.prop('href'),
	  						player: 'img'
		  				});
  					});
  					unlock(2000);
  				}

  			}
	  	});
	  }
  })
}
var locked = false;

function slide( direction ){
	if (locked == false) {
		if (direction == 'left') {
			$('#slider').trigger('prev',1);
		} else if (direction == 'right') {
			$('#slider').trigger('next',1);
		}
	}
}

function unlock( duration) {
	setTimeout(function(){
  					locked = false
  					console.log('unlocked');
  				},duration);
}