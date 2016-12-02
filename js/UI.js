var UI = {
    DEFAULT_AREA : "Seleccionar área",

    init : function() {
        UI.loadColores();

        $("#btnCerrar").click(function() {
            Coloso.unselect();

            $("#colores").removeClass("visible");
            $("#btnCerrar").removeClass("visible");
        });
    },

    loadColores : function() {
        $("#colores li").each(function(i) {
            $(this).css("background-color", Coloso.COLORES[i]);
            $(this).click(function() {
                Coloso.setColor(i);
            })
        });

    },

    // Evento que se llama cuando se clickea un grupo
    onGrupoSelected : function() {
        $("#colores").addClass("visible");
        $("#btnCerrar").addClass("visible");
        $("#areas").text( Coloso.grupoSelected.id  );
    }
}
