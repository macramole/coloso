var Coloso = {
    GRUPOS : ["corazon", "brazos", "cintura", "hombros"],
    COLORES : ["#FF002E", "#00E100", "#00C6FF", "#FFE600", "#7D7D7D" ],

    svg : null,

    grupoSelected : null,

    init : function() {
        var mainSvg = document.getElementById("mainSvg");
        Coloso.svg = mainSvg.contentDocument || mainSvg.documentElement;
        Coloso.activateGrupos();
    },

    activateGrupos : function() {
        for ( i in Coloso.GRUPOS ) {
            var grupo = Coloso.svg.querySelector("#" + Coloso.GRUPOS[i]);
            grupo.onclick = function() {
                Coloso.grupoSelected = this;
                UI.onGrupoSelected();
            };
        }
    },

    setColor : function(numColor) {
        if ( Coloso.grupoSelected == null ) {
            return;
        }

        var color = Coloso.COLORES[numColor] ;

        for ( i = 0 ; i < Coloso.grupoSelected.children.length ; i++ ) {
            var child = Coloso.grupoSelected.children[i];

            if ( child.nodeName == "path" ) {
                child.style.stroke = color;
            } else if ( child.nodeName == "g" ) {
                for ( j = 0 ; j < child.children.length ; j++ ) {
                    var elem = child.children[j];
                    elem.style.stroke = color;
                }
            }
        }
    },

    unselect : function() {
        Coloso.grupoSelected = null;
    }
}
