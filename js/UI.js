var UI = {
    DEFAULT_AREA: "Seleccionar área",
    PLAY_TEXT: 'PLAY <span>&#9654;</span>',
    PAUSE_TEXT: 'PAUSE <span style="font-size:12px">&#9612;&#9612;</span>',
    ENVIAR_URL: "data.php",
    COUNTDOWN : false,

    init: function() {
        UI.initColores();
        UI.initFrames();
        UI.initButtons();
        UI.initIOsFix();



        //setup slider
        $("#slideVelocidad").bind('input', function() {
            if (Animation.isPlaying) {
                Animation.stop();
                Animation.play(Animation.mapTime($(this).val()));
            }

        });


    },

    initIOsFix: function() {
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
            $("#slideVelocidad").removeClass("normal");
            $("#slideVelocidad").addClass("ios");
        }
    },

    initColores: function() {
        $("#colores li").each(function(i) {
            $(this).css("background-color", Coloso.COLORES[i]);
            $(this).click(function() {
                Coloso.setColor(i);
                Frames.setColor(i);
                UI.onFrameSetted();

            })
        });

    },

    initFrames: function() {
        $("#animation .frame").each(function(i) {
            $(this).click(function() {
                UI.onFrameChanged(i);
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
            Frames.setFrame($next.index() - 1); //si numero hardcodeado feo, blablabla
        });
    },

    initButtons: function() {

        $("#animation #btnPlay").click(function() {
            if ($(this).attr("data-play") === "0") {
                //playAnimation
                Animation.play(Animation.mapTime($("#slideVelocidad").val()));
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
        $("#btnComenzar").click(function() {
            $("#overlay, #overlay .hola").removeClass("active");
        });

        $("#btnMostrarEnviar").click(function() {
            if (!Frames.isFrameObjectValid()) {
                alert('Tenés muchos cuadros vacíos!')
            } else {
                $("#overlay, #overlay .enviar").addClass("active");
            }
        });
        $("#btnEnviar").click(function() {
            var data = Frames.getAllFrames();
            $.ajax({
                url: UI.ENVIAR_URL,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    console.log(result);

                    $("#overlay .enviar").removeClass("active");
                    $("#overlay .enviado").addClass("active");

                    UI.COUNTDOWN = result.processing;
                    UI.onEnviado();
                },
                error: function() {
                    alert("Hubo un error enviando la animación al servidor, por favor, inténtelo más tarde.");
                }
            });

        });
        $("#btnNuevaAnimacion").click(function() {
            $("#overlay, #overlay .enviado").removeClass("active");
            //TODO que vuelva a empezar;
        });

        //setup boton cerrar zoom a cabeza
        $("#btnCerrar").click(function() {

            Coloso.unselect();

            $("#colores").removeClass("visible");
            $("#btnCerrar").removeClass("visible");
            $("#presets, #presets > div").removeClass("visible");

            $("#coloso object").removeClass("zoom");

            $("#areas .info").text(UI.DEFAULT_AREA);
        });
    },

    onEnviado : function() {
        if ( UI.COUNTDOWN ) {
            $("#overlay .enviado .countdown").addClass("active");
            $("#overlay .enviado .nocountdown").removeClass("active");

            $("#overlay .enviado .countdown .hour").text( UI.COUNTDOWN.hour );
            $("#overlay .enviado .countdown .min").text( UI.COUNTDOWN.min );
            $("#overlay .enviado .countdown .sec").text( UI.COUNTDOWN.sec );
        } else {
            $("#overlay .enviado .nocountdown").addClass("active");
            $("#overlay .enviado .countdown").removeClass("active");
        }
    },

    // Evento que se llama cuando se clickea un grupo
    onGrupoSelected: function() {
        $("#colores").addClass("visible");
        $("#btnCerrar").addClass("visible");
        $("#areas span.info").text(Coloso.grupoSelected.id.replace("_", " "));

        if (["cabeza", "ojo_izquierdo", "ojo_derecho", "boca"].indexOf(Coloso.grupoSelected.id) >= 0) {
            $("#coloso object").addClass("zoom");
            $("#presets, #presets > div").removeClass("visible");
            $("#coloso #presets img").removeClass("selected");

            if (["ojo_izquierdo", "ojo_derecho"].indexOf(Coloso.grupoSelected.id) >= 0) {
                $("#presets").addClass("visible");
                $("#presets .ojos").addClass("visible");
            } else if (Coloso.grupoSelected.id == "boca") {
                $("#presets").addClass("visible");
                $("#presets .boca").addClass("visible");
            }

            $("#presets div.visible img:first-child").click();
        }

        if ( Coloso.grupoSelected.id == "corazon" ) {
            $("#presets, #presets > div").removeClass("visible");
            $("#coloso #presets img").removeClass("selected");
            $("#presets").addClass("visible");
            $("#presets .corazon").addClass("visible");
            $("#presets div.visible img:first-child").click();
        }

        // chequeo si no hay nada prendido entonces que prenda del primer color
        Coloso.setColorIfApagado();
    },
    onFrameChanged: function(i) {
        $("#animation .frame").removeClass("selected");
        $("#animation .frame").eq(i).addClass("selected");

    },
    onFrameSetted: function(){
      var idx = $("#animation .frame.selected").index();
      for (var i = 0; i < idx; i++) {
        //hay una clase .setted pero no me deja hacer .addClass(.setted) sobre el elemento :(
        $("#animation .frame")[i].style = "opacity: 1;"
      }
    }
}
