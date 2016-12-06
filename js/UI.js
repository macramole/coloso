var UI = {
    DEFAULT_AREA: "Seleccionar área",
    PLAY_TEXT:'PLAY <span>&#9654;</span>' ,
    PAUSE_TEXT: 'PAUSE <span style="font-size:12px">&#9612;&#9612;</span>',

    init: function() {
        UI.initColores();
        UI.initFrames();
        UI.initButtons();

        $("#btnCerrar").click(function() {

            Coloso.unselect();

            $("#colores").removeClass("visible");
            $("#btnCerrar").removeClass("visible");
            $("#presets, #presets > div").removeClass("visible");

            $("#coloso object").removeClass("zoom");
        });
    },

    initColores: function() {
        $("#colores li").each(function(i) {
            $(this).css("background-color", Coloso.COLORES[i]);
            $(this).click(function() {
                Coloso.setColor(i);
                Frames.setColor(i);
            })
        });

    },

    initFrames: function() {
        $("#animation .frame").each(function(i) {
            $(this).click(function(){
              UI.onFrameChanged(i)
              Frames.setFrame(i, false);
            });


        });
        $("#animation .flecha").click(function() {
            var $next = $("#animation .frame.selected").next();

            if ($(this).hasClass("flechaIzq")) {
                $next = $("#animation .frame.selected").prev();
            }

            if (!$next.hasClass("frame")) {
                return;
            }

            $("#animation .frame").removeClass("selected");
            $next.addClass("selected");
            Frames.setFrame($next.index());
        });
    },

    initButtons: function() {

        $("#animation #btnPlay").click(function() {
            if ($(this).attr("data-play") === "0") {
                //playAnimation
                Animation.play(300);
                $(this).html(UI.PAUSE_TEXT);
                $(this).attr("data-play", "1");
            } else {
                Animation.stop();
                $(this).attr("data-play", "0");
                $(this).html(UI.PLAY_TEXT);


            }

        });
        $("#animation #btnBorrar").click(function() {
            Frames.deleteFrame();
        });
        $("#animation #btnCopy").click(function() {
          Frames.copyFrame();
        });
        $("#animation #btnPaste").click(function() {
          Frames.pasteFrame();
        });

    },

    // Evento que se llama cuando se clickea un grupo
    onGrupoSelected: function() {
        $("#colores").addClass("visible");
        $("#btnCerrar").addClass("visible");
        $("#areas span.info").text(Coloso.grupoSelected.id.replace("_", " "));

        if (["cabeza", "ojo_izquierdo", "ojo_derecho", "boca"].indexOf(Coloso.grupoSelected.id) >= 0) {
            $("#coloso object").addClass("zoom");
            $("#presets, #presets > div").removeClass("visible");

            if (["ojo_izquierdo", "ojo_derecho"].indexOf(Coloso.grupoSelected.id) >= 0) {
                $("#presets").addClass("visible");
                $("#presets .ojos").addClass("visible");
            } else if (Coloso.grupoSelected.id == "boca") {
                $("#presets").addClass("visible");
                $("#presets .boca").addClass("visible");
            }
        }
    },
    onFrameChanged: function(i) {
        $("#animation .frame").removeClass("selected");
        $("#animation .frame").eq(i).addClass("selected");

    }
}
