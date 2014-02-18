!(function() {
    var Toasty = function() {
        this.soundFile = 'assets/audio/toasty.mp3';
        this.imageFile = 'assets/images/toasty.png';
    };
        
    Toasty.prototype = {
        toastIt: function() {
            toasty.audio = new Audio(this.soundFile);

            toasty.image = new createjs.Bitmap(this.imageFile);
            toasty.image.x = - 200;
            toasty.image.y = stage.canvas.height + 259;
            stage.addChild(toasty.image);

            createjs.Ticker.on("tick", this.animateToastIn);
        },
    
        animateToastIn: function(event) {
            if (toasty.image.x >= 0) {
                event.remove();
                toasty.playAudio();

                setTimeout(function() {
                    createjs.Ticker.on("tick", toasty.animateToastOut);
                }, 1500);
            } else {
                toasty.image.x += 8;
                toasty.image.y -= 20;
            }
        },
    
        animateToastOut: function(event) {
            if (toasty.image.x <= -100) {
                event.remove();
                stage.removeChild(toasty.image);
            } else {
                toasty.image.x -= 4;
                toasty.image.y += 7;
            }
        },
    
        playAudio: function() {
            player.fadeDown('BACKGROUND_MUSIC', 0.2);
            toasty.audio.play();

            setTimeout(function() {
                player.fadeUp('BACKGROUND_MUSIC', 1);
            }, 1000);
        }
    };
    
    window.toasty = new Toasty();
})();