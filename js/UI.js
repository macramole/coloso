var UI = {
    DEFAULT_AREA : "Seleccionar área",

    init : function() {
        UI.initColores();
        UI.initFrames();
        UI.initButtons();

        $("#btnCerrar").click(function() {
            Coloso.unselect();

            $("#colores").removeClass("visible");
            $("#btnCerrar").removeClass("visible");
        });
    },

    initColores : function() {
        $("#colores li").each(function(i) {
            $(this).css("background-color", Coloso.COLORES[i]);
            $(this).click(function() {
                Coloso.setColor(i);
                Frames.setColor(i);
            })
        });

    },

    initFrames : function() {
        $("#animation .frame").click(function() {
            $("#animation .frame").removeClass("selected");
            $(this).addClass("selected");
            Frames.setFrame($(this).index());

        });
        $("#animation .flecha").click(function() {
            var $next = $("#animation .frame.selected").next();

            if ( $(this).hasClass("flechaIzq") ) {
                $next = $("#animation .frame.selected").prev();
            }

            if ( !$next.hasClass("frame") ) {
                return;
            }

            $("#animation .frame").removeClass("selected");
            $next.addClass("selected");
            Frames.setFrame($next.index());
        });
    },

    initButtons : function() {
        
    },

    // Evento que se llama cuando se clickea un grupo
    onGrupoSelected : function() {
        $("#colores").addClass("visible");
        $("#btnCerrar").addClass("visible");
        $("#areas").text( Coloso.grupoSelected.id  );
    }
}
