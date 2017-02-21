var UI = {
    DEFAULT_AREA: "Seleccionar área",
    PLAY_TEXT: '<span>PLAY</span> <img src="image/playIcon.png">',
    PAUSE_TEXT: '<span>PAUSE</span> <img src="image/pauseIcon.png">',
    ENVIAR_URL: "data.php",
    COUNTDOWN: false,

    init: function() {
        UI.initColores();
        UI.initFrames();
        UI.initButtons();
        UI.initIOsFix();
        UI.setRandomBackground();



        //setup slider
        $("#slideVelocidad").bind('input', function() {
            if (Animation.isPlaying) {
                Animation.stop();
                Animation.play(Animation.mapTime($(this).val()));
            }

        });

    },
    setRandomBackground: function() {
        var imageIndex = Math.floor(Math.random() * 2) + 1;
        $("body").css("background", "black url('image/fondos/" + imageIndex.toString() + ".png')");

    },
    initIOsFix: function() {
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);


        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) || isSafari) {
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

            });
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

        $(".logo").mouseover(function() {
            $("img", this).attr("src", "image/logo_h.svg");
        });
        $(".logo").mouseleave(function() {
            $("img", this).attr("src", "image/logo.svg");
        });

        $("#animation #btnPlay").click(function() {
            if ($(this).attr("data-play") === "0") {
                var validAnim;
                var count = 0;
                for (var i = 0; i < Frames.frames.length; i++) {
                    if (Frames.frames[i] === undefined) {
                        count++;
                    }
                }
                if (count >= 2) {
                    validAnim = false;
                    alert('Tenés muchos frames intermedios sin definir!');
                } else {
                    validAnim = true;
                }
                if (validAnim) {
                    //playAnimation
                    Animation.play(Animation.mapTime($("#slideVelocidad").val()));
                    $(this).html(UI.PAUSE_TEXT);
                    $(this).attr("data-play", "1");

                }

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
            UI.onFrameSetted();
        });
        $("#btnComenzar").click(function() {
            $("#overlay, #overlay .hola").removeClass("active");
            $("#overlayTips").addClass("active");
        });
        $("#btnTipsClose").click(function() {
            $("#overlayTips").removeClass("active");
        });

        $("#btnMostrarEnviar").click(function() {
            if (!Frames.isFrameObjectValid()) {
                alert('Tenés muchos cuadros vacíos!')
            } else {
                $("#overlay, #overlay .enviar").addClass("active");
            }
        });

        $("#btnCancelarEnviar").click(function() {
            $("#overlay, #overlay .enviar").removeClass("active");
        });

        $("#btnEnviar").click(function() {
            var data = {
                "frames": Frames.getAllFramesToSend(),
                "velocidad": $("#slideVelocidad").val(),
                "nombre": $("#txtNombre").val(),
                "email": $("#txtEmail").val()
            }



            $.ajax({
                url: UI.ENVIAR_URL,
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function(result) {
                    // console.log(result);

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
            Frames.reset();
            UI.reset();

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

    reset: function() {
        $("#animation .frame").each(function(elem) {
            $(this).removeClass("setted");
        });
        $("#animation .frame").removeClass("selected");
        $("#animation .frame").eq(0).addClass("selected");
        $("#buttons #btnPlay").html(UI.PLAY_TEXT);
        $("#buttons #btnPlay").attr("data-play", "0");
        Animation.stop();



    },

    onEnviado: function() {
        $("#overlay .enviado .name").text($("#txtNombre").val());

        if (UI.COUNTDOWN) {
            $("#overlay .enviado .countdown").addClass("active");
            $("#overlay .enviado .nocountdown").removeClass("active");

            var dia = UI.COUNTDOWN.hoy ? "HOY " : "MAÑANA ";
            dia += "a las " + UI.COUNTDOWN.horario;

            $("#overlay .enviado .countdown .cuando").text(dia);

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

        $("#presets, #presets > div").removeClass("visible");

        if (["cabeza", "ojo_izquierdo", "ojo_derecho", "boca"].indexOf(Coloso.grupoSelected.id) >= 0) {
            $("#coloso object").addClass("zoom");

            if (["ojo_izquierdo", "ojo_derecho"].indexOf(Coloso.grupoSelected.id) >= 0) {
                $("#presets").addClass("visible");
                $("#presets .ojos").addClass("visible");
            } else if (Coloso.grupoSelected.id == "boca") {
                $("#presets").addClass("visible");
                $("#presets .boca").addClass("visible");
            }

            // if ( Coloso.getCurrentSubgrupoColor() == Coloso.COLOR_APAGADO ) {
            $("#presets div.visible img:first-child").click();
            // }
        }

        if (Coloso.grupoSelected.id == "corazon") {
            $("#presets, #presets > div").removeClass("visible");
            $("#coloso #presets img").removeClass("selected");
            $("#presets").addClass("visible");
            $("#presets .corazon").addClass("visible");

            // if ( Coloso.getCurrentSubgrupoColor() == Coloso.COLOR_APAGADO ) {
            $("#presets div.visible img:first-child").click();
            // }
        }

        // chequeo si no hay nada prendido entonces que prenda del primer color
        //si NO elegió un subgrupo se prende directo si estaba apagado
        if (Object.keys(Coloso.SUBGRUPOS).indexOf(Coloso.grupoSelected.id) == -1) {
            Coloso.setColorIfApagado();
        }
    },
    onFrameChanged: function(i) {
        $("#animation .frame").removeClass("selected");
        $("#animation .frame").eq(i).addClass("selected");

    },
    onFrameSetted: function() {
        $("#animation .frame.selected").each(function() {
            $(this).addClass("setted");
        });
        /*
        for (var i = 0; i < idx; i++) {
            //hay una clase .setted pero no me deja hacer .addClass(.setted) sobre el elemento :(
            $("#animation .frame")[i].style = "opacity: 1;"
        }
        */
    },

}
