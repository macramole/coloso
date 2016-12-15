var Frames = {

    INIT_FRAME: 0,
    actualFrame: null,
    frameToCopy: {},
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
    //devuelvo un obj con todas las partes en gris
    getFrameObject: function() {
        var obj = {}
        for (var i = 0; i < Coloso.GRUPOS.length; i++) {
            obj[Coloso.GRUPOS[i]] = 4;
        }
        return obj;
    },
    getAllFrames:function(){
      return Frames.frames;
    },
    //setea los colores del frame actual según el JSON
    setFrame: function(f, onAnim) {
        Frames.actualFrame = f; //!!!!!
        if (Frames.frames[Frames.actualFrame] !== undefined) {
            Coloso.setColorsAll(Frames.frames[Frames.actualFrame]);
        } else {
            Coloso.setColorsAll(Frames.getFrameObject());
        }

    },
    //pasa al siguiente frame (wrapper setFrame)
    toNextFrame: function() {

        /*if (Frames.frames[Frames.actualFrame] === undefined) {
            Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
        }*/

        if (Frames.actualFrame > Frames.frames.length + 1 || Frames.actualFrame === 9) {
            Frames.setFrame(0);
        } else {
            Frames.setFrame((Frames.actualFrame + 1) % Frames.frames.length, true)

        }
        UI.onFrameChanged(Frames.actualFrame);

    },
    //setea el color del frame actual
    setColor: function(c) {

        if (Frames.frames[Frames.actualFrame] === undefined) {
            Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
        }

        var grupo = Coloso.grupoSelected.id;
        var color = c;
        Frames.frames[Frames.actualFrame][grupo] = color;

    },
    deleteFrame: function() {
        delete Frames.frames[Frames.actualFrame];
        Frames.setFrame(Frames.actualFrame, false);

    },
    copyFrame: function() {
        Object.assign(Frames.frameToCopy, Frames.frames[Frames.actualFrame]);
    },
    pasteFrame: function() {
        Frames.frames[Frames.actualFrame] = Frames.frameToCopy;
        Frames.setFrame(Frames.actualFrame, false);
    },
    //de array de jsons a json de jsons cuyos keys son valores
    arrToJSON: function(arr){
      var obj = {}
      
      for(var index in arr){
        obj[i] = arr[i];
        console.log(obj['i']);
      }
      console.log(obj);
      return obj;
    }


}
