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
            switch (Coloso.GRUPOS[i]) {
                case 'ojo_izquierdo':
                    for (var k = 0; k < Coloso.SUBGRUPOS['ojo_izquierdo'][1].length; k++) {
                        obj[Coloso.SUBGRUPOS['ojo_izquierdo'][1][k]] = 4;
                    }
                    break;
                case 'ojo_derecho':
                    for (var k = 0; k < Coloso.SUBGRUPOS['ojo_derecho'][1].length; k++) {
                        obj[Coloso.SUBGRUPOS['ojo_derecho'][1][k]] = 4;
                    }
                    break;
                case 'boca':
                    for (var k = 0; k < Coloso.SUBGRUPOS['boca'][5].length; k++) {
                        obj[Coloso.SUBGRUPOS['boca'][5][k]] = 4;
                    }
                    break;
                default:
                    obj[Coloso.GRUPOS[i]] = 4;
                    break;
            }

        }

        return obj;
    },
    getAllFrames: function() {
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
    //setea el color del cacho dentro del frame actual
    setColor: function(c) {
        var color = c;

        if (Frames.frames[Frames.actualFrame] === undefined) {
            Frames.frames[Frames.actualFrame] = Frames.getFrameObject();
        }
        var grupo = Coloso.grupoSelected.id;
        if (Coloso.subgrupoSelected !== null) {
            for (var key in Frames.frames[Frames.actualFrame]) {
                for (var i = 0; i < Coloso.subgrupoSelected.length; i++) {
                    if (Coloso.subgrupoSelected[i].id === key) {
                        Frames.frames[Frames.actualFrame][key] = color;
                    }
                }
            }

        } else {
            Frames.frames[Frames.actualFrame][grupo] = color;
        }


    },
    //Devuelve el color actual de una parte del coloso (key)
    getColor : function( key ) {
        return Frames.frames[Frames.actualFrame][key];
    },
    deleteFrame: function() {
        delete Frames.frames[Frames.actualFrame];
        Frames.setFrame(Frames.actualFrame, false);

    },
    copyFrame: function() {
        Frames.frameToCopy =  Frames.frames[Frames.actualFrame];
    },
    pasteFrame: function() {
        var tempFrame = {};
        Object.assign(tempFrame,Frames.frameToCopy);
        Frames.frames[Frames.actualFrame] = tempFrame;
        Frames.setFrame(Frames.actualFrame, false);
    },
    //de array de jsons a json de jsons cuyos keys son valores
    arrToJSON: function(arr) {
        var obj = {}

        for (var index in arr) {
            obj[i] = arr[i];
            console.log(obj['i']);
        }
        console.log(obj);
        return obj;
    }


}
