var Animation = {
    anim: null,
    isPlaying: false,
    play: function(time) {
        Animation.isPlaying = true;
        Animation.anim = setInterval(Frames.toNextFrame, time);
    },
    stop: function() {
        Animation.isPlaying = false;
        clearInterval(Animation.anim);
    },

    mapTime: function(time) {
        time = 1 - time; //invertir rango
        time = Math.round((time * 1400) + 100);
        return time;
    },
};
