var Animation = {
    anim: null,

    play: function(time) {
        Animation.anim = setInterval(Frames.toNextFrame, time);
    },
    stop: function() {
        clearInterval(Animation.anim);
    }
}
