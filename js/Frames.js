var Frames = {

    INIT_FRAME: 0,
    actualFrame: null,
    frameToCopy:null,
    /*
    formato JSON frames
    frame: {id:color,id:color}
    */
    frames: [],
    init: function() {
        //var frameSelector = document.getElementById("frames");
        Frames.actualFrame = Frames.INIT_FRAME;
        //armo el obj del primer frame
        Frames.frames[Frames.actualFrame] = Frames.getFrameObject();

    },
    getFrameObject: function() {
        var obj = {}
            //cuando se selecciona un nuevo frame, este chabon me devuelve un objeto que tenga todos los ids:color
        for (var i = 0; i < Coloso.GRUPOS.length; i++) {
            obj[Coloso.GRUPOS[i]] = 4;
        }
        return obj;
    },
    setFrame: function(f, onAnim) {
        Frames.actualFrame = f; //!!!!!

        if (Frames.frames[Frames.actualFrame] === undefined && !onAnim) {
            Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
        }
        Coloso.setColorsAll(Frames.frames[Frames.actualFrame]);



    },
    toNextFrame: function() {

      if(Frames.frames[Frames.actualFrame] === undefined){
        Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
      }
        if (Frames.actualFrame > Frames.frames.length + 1 || Frames.actualFrame === 9) {
            Frames.setFrame(0);
        } else {
            Frames.setFrame((Frames.actualFrame + 1) % Frames.frames.length, true)

        }
      UI.onFrameChanged(Frames.actualFrame);

    },
    setColor: function(c) {
        var grupo = Coloso.grupoSelected.id;
        var color = c;
        Frames.frames[Frames.actualFrame][grupo] = color;

    },
    deleteFrame:function(){
      Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
      Frames.setFrame(Frames.actualFrame,false);

    },
    copyFrame:function(){
      Frames.frameToCopy = Frames.frames[Frames.actualFrame];
    },
    pasteFrame:function(){
      Frames.frames[Frames.actualFrame] = Frames.frameToCopy;
      Frames.setFrame(Frames.actualFrame,false);

    }



}
