!(function() {
    var Toasty = function() {
        this.soundFile = 'assets/audio/toasty.mp3';
        this.imageFile = 'assets/images/toasty.jpg';
        this.audio = new Audio(this.soundFile);
        this.image;
    };
        
    Toasty.prototype.toastIt = function() {
        // Play audio file and display the face
        this.image = document.createElement('img');
        this.image.setAttribute('id', 'toasty');
        this.image.setAttribute('src', this.imageFile);
        document.body.appendChild(this.image);
        
        setTimeout(this.playSound, 1000);
    };
    
    Toasty.prototype.playSound = function() {
        alert('test');
        this.audio.play();
        //setTimeout(this.destroyToast, 2000);
    };
    
    Toasty.prototype.destroyToast = function() {
        this.audio.stop();
        document.body.removeChild(this.image);
        this.image = nill;
    };
    
    window.Toasty = Toasty;
})();