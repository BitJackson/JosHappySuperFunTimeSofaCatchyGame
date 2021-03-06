!(function() {
    var InvalidSoundKey = function() {
    }
    
    var Player = function() {
        this.BACKGROUND_MUSIC = 1;
        this.INTRO_MUSAK = 2;
        this.COLLECT = 100;
        this.MISS = 101;
        this.GAME_OVER = 200;
        
        this.sounds = {
            1: 'assets/audio/getlucky.mp3',
            2: 'assets/audio/elevator.mp3',
            // In game sounds
            100: 'assets/audio/ring.mp3',
            101: 'assets/audio/miss.mp3',
            // Menu sounds
            200: 'assets/audio/living-here.mp3'
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
        
        turboTime: function(key) {
            var index = this._index(key);
            
            if (this._isPlaying(index)) {
                this.playing[index].playbackRate = 1.5;
            }
        },
        
        drunkTime: function(key) {
            var index = this._index(key);
            
            if (this._isPlaying(index)) {
                this.playing[index].playbackRate = 0.8;
            }
        },
        
        normalTime: function(key) {
            var index = this._index(key);
            
            if (this._isPlaying(index)) {
                this.playing[index].playbackRate = 1;
            }
        },
        
        fadeUp: function(key, volume) {
            var index = this._index(key);
            
            this.playing[index].volume = volume;
        },
        
        fadeDown: function(key, volume) {
            var index = this._index(key);
            
            this.playing[index].volume = volume;
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
            this._stop(index);
            
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
            if (this._isPlaying(index)) {
                this.playing[index].pause();
                document.body.removeChild(this.playing[index]);
                delete this.playing[index];
            }
            return true;
        },
        
        _isPlaying: function(index) {
            return typeof(this.playing[index]) !== "undefined";
        }
    };
    
    window.player = new Player();
})();