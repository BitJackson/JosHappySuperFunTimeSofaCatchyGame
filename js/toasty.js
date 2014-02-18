!(function($) {
    var Toasty = function() {
        this.soundFile = '';
    };
    
    Toasty.prototype = {
        init: function() {
            this.audio = new Audio(this.soundFile);
        },
        
        play: function() {
            this.audio.play();
        }
    };
    
    window.Toasty = Toasty;
})(jQuery);
    