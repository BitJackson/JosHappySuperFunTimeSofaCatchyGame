!(function() {
    var Toasty = function() {
        this.soundFile = 'assets/audio/toasty.mp3';
        this.imageFile = 'assets/images/toasty.jpg';
    };
        
    Toasty.prototype.toastIt = function() {
        toasty.audio = new Audio(this.soundFile);
        
        toasty.image = new createjs.Bitmap(this.imageFile);
        toasty.image.x = - 100;
        toasty.image.y = stage.canvas.height + 91;
        stage.addChild(toasty.image);
        
        createjs.Ticker.on("tick", this.animateToastIn);
    };
    
    Toasty.prototype.animateToastIn = function(event) {
        if (toasty.image.x >= 0) {
            event.remove();
            toasty.playSound();
            
            setTimeout(function() {
                createjs.Ticker.on("tick", toasty.animateToastOut);
            }, 1500);
        } else {
            toasty.image.x += 4;
            toasty.image.y -= 7;
        }
    };
    
    Toasty.prototype.animateToastOut = function(event) {
        if (toasty.image.x <= -100) {
            event.remove();
            stage.removeChild(toasty.image);
        } else {
            toasty.image.x -= 2;
            toasty.image.y += 3.5;
        }
    };
    
    Toasty.prototype.playSound = function() {
        this.audio.play();
    };
    
    window.toasty = new Toasty();
})();