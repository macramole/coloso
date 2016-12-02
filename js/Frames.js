var Frames = {

    INIT_FRAME: 0,
    actualFrame: null,
    /*
    formato JSON frames
    frame: {id:color,id:color}
    */
    frames: [],
    init: function() {
        //var frameSelector = document.getElementById("frames");
        actualFrame = Frames.INIT_FRAME;
    },
    setFrame: function(f) {
        Frames.actualFrame = f;
        console.log(Frames.actualFrame);
        Frames.frames[Frames.actualFrame] = this.getFrameObject();

    },
    getFrameObject: function() {
        var obj = {}
            //cuando se selecciona un nuevo frame, este chabon me devuelve un objeto que tenga todos los ids:color
        for (var i = 0; i < Coloso.GRUPOS.length; i++) {
            obj[Coloso.GRUPOS[i]] = "";
        }
        return obj;
    },
    setColor: function(grupo,color) {
      Frames.frames[Frames.actualFrame].
    }

}
