!(function() {
    var InvalidSoundKey = function() {
    }
    
    var Player = function() {
        this.BACKGROUND_MUSIC = 100;
        
        this.sounds = {
            100: 'assets/audio/getlucky.mp3'
        };
        
        this.playing = {};
    };
    
    Player.prototype = {
        play: function(key, loop) {
            return this._start(this._index(key), loop);
        },
        
        pause: function(key) {
            return this._pause(this._index(key));
        },
        
        fadeUp: function(key, volume) {
            var index = this._index(key);
            
            this.playing[index].volume += volume;
        },
        
        fadeDown: function(key, volume) {
            var index = this._index(key);
            
            this.playing[index].volume -= volume;
        },
        
        stop: function(key) {
            return this._stop(this._index(key));
        },
        
        _index: function(key) {
            var index = this[key];
            
            if (index === "undefined") {
                throw InvalidSoundKey();
            }
            
            return index;
        },
        
        _start: function(index, loop) {
            // kill if playing first
            if (this._isPlaying(index)) {
                this._stop(index);
            }
            
            this.playing[index] = new Audio(this.sounds[index]);
            this.playing[index].controls = false;
            this.playing[index].autoplay = true;
            
            if (loop) {
                this.playing[index].loop = true;
            }
            
            document.body.appendChild(this.playing[index]);
            
            return true;
        },
        
        _pause: function(index) {
            this.playing[index].pause();
            
            return true;
        },
        
        _stop: function(index) {
            this.playing[index].pause();
            document.body.removeChild(this.playing[index]);
            delete this.playing[index];
            
            return true;
        },
        
        _isPlaying: function(index) {
            return typeof(this.playing[index]) !== "undefined";
        }
    };
    
    window.player = new Player();
})();