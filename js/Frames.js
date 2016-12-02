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
        Frames.actualFrame = Frames.INIT_FRAME;
        //armo el obj del primer frame
        Frames.frames[Frames.actualFrame] = this.getFrameObject();

    },
    setFrame: function(f) {
        Frames.actualFrame = f - 1; //!!!!!
        if (Frames.frames[Frames.actualFrame] !== undefined) {
            Frames.frames[Frames.actualFrame] = this.getFrameObject();
        }

    },
    getFrameObject: function() {
        var obj = {}
            //cuando se selecciona un nuevo frame, este chabon me devuelve un objeto que tenga todos los ids:color
        for (var i = 0; i < Coloso.GRUPOS.length; i++) {

            obj[Coloso.GRUPOS[i]] = "";
        }
        return obj;
    },
    setColor: function(c) {
        var grupo = Coloso.grupoSelected.id;
        var color = Coloso.COLORES[c];
        Frames.frames[Frames.actualFrame][grupo] = color;
        console.log(Frames.frames);

    }

}
