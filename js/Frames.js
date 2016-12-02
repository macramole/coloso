var Frames = {

    INIT_FRAME : 0,
    actualFrame : null,
    /*
    formato JSON frames
    frame: {id:color,id:color}
    */

    init: function() {
        //var frameSelector = document.getElementById("frames");
        actualFrame = Frames.INIT_FRAME;
    },
    setFrame: function(f){
      Frames.actualFrame = f;
      console.log(Frames.actualFrame);
    },
    getFrameObject: function(){
      //cuando se selecciona un nuevo frame, este chabon me devuelve un objeto que tenga todos los ids:color

    }



}
