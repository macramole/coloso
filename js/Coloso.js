var Coloso = {
    GRUPOS : ["corazon", "brazos", "cintura", "hombros", "cabeza", "ojo_izquierdo", "ojo_derecho", "boca"],
    COLORES : ["#FF002E", "#00E100", "#00C6FF", "#FFE600", "#7D7D7D" ],
    SUBGRUPOS : {
        "ojo_izquierdo" : [
            ["ojoIzqSup", "ojoIzqInf"],
            ["ojoIzqSup", "ojoIzqInf", "ojoIzqMedio"],
            ["ojoIzqSup"],
            ["ojoIzqInf"],
            ["ojoIzqMedio"],
            ["ojoIzqSup","ojoIzqMedio"],
            ["ojoIzqInf","ojoIzqMedio"]
        ],
        "ojo_derecho" : [
            ["ojoDerSup", "ojoDerInf"],
            ["ojoDerSup", "ojoDerInf", "ojoDerMedio"],
            ["ojoDerSup"],
            ["ojoDerInf"],
            ["ojoDerMedio"],
            ["ojoDerSup","ojoDerMedio"],
            ["ojoDerInf","ojoDerMedio"]
        ],
        "boca" : [
            ["labioInf","labiosCostado"],
            [],
            ["labioInf","labiosCostado", "labioSup"],
            ["dientes"],
            ["labioInf", "labioSup"],
            ["labioInf","labiosCostado", "labioSup", "dientes"]
        ]
    },
    svg : null,

    grupoSelected : null,
    subgrupoSelected : null,

    init : function() {
        var mainSvg = document.getElementById("mainSvg");
        Coloso.svg = mainSvg.contentDocument || mainSvg.documentElement;
        Coloso.activateGrupos();
        Coloso.activateSubGrupos();
    },

    activateGrupos : function() {
        for ( i in Coloso.GRUPOS ) {
            var grupo = Coloso.svg.querySelector("#" + Coloso.GRUPOS[i]);
            var nombreGrupo = Coloso.GRUPOS[i];
            grupo.onclick = function() {
                Coloso.grupoSelected = this;
                Coloso.subgrupoSelected = null;
                UI.onGrupoSelected();
            };
        }
    },

    activateSubGrupos : function() {
        // $("#coloso #presets img").each( function(i) {
        //     $(this).click(function() {
        //         $("#coloso #presets img").removeClass("selected");
        //         $(this).addClass("selected");
        //
        //         switch(Coloso.grupoSelected.id) {
        //             case "ojo_izquierdo":
        //             case "ojo_derecho":
        //             case "boca":
        //
        //                 var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][ i ].map(function(x) {
        //                     return "#" + x;
        //                 }).join(", ");
        //
        //                 Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
        //                 break;
        //             default:
        //                 Coloso.subgrupoSelected = null;
        //                 break;
        //         }
        //     });
        // });
        $("#coloso .ojos img").each( function(i) {
            $(this).click(function() {
                $("#coloso #presets img").removeClass("selected");
                $(this).addClass("selected");

                switch(Coloso.grupoSelected.id) {
                    case "ojo_izquierdo":
                    case "ojo_derecho":
                    case "boca":

                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][ i ].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        break;
                    // default:
                    //     Coloso.subgrupoSelected = null;
                    //     break;
                }
            });
        });
        $("#coloso .boca img").each( function(i) {
            $(this).click(function() {
                $("#coloso #presets img").removeClass("selected");
                $(this).addClass("selected");

                switch(Coloso.grupoSelected.id) {
                    case "boca":
                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][ i ].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        break;
                    // default:
                    //     Coloso.subgrupoSelected = null;
                    //     break;
                }
            });
        });
    },

    setColor : function(numColor) {
        if ( Coloso.grupoSelected == null ) {
            return;
        }

        var color = Coloso.COLORES[numColor] ;

        if ( Coloso.subgrupoSelected == null ) {
            for ( var i = 0 ; i < Coloso.grupoSelected.children.length ; i++ ) {
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
        } else {
            for ( var i = 0 ; i < Coloso.subgrupoSelected.length ; i++ ) {
                var node = Coloso.subgrupoSelected[i];
                if ( node.nodeName == "path" ) {
                    Coloso.subgrupoSelected[i].style.stroke = color;
                } else if ( node.nodeName == "g" ) {
                    for ( j = 0 ; j < node.children.length ; j++ ) {
                        var child = node.children[j];
                        child.style.stroke = color;
                    }
                }
            }
        }
    },

    unselect : function() {
        Coloso.grupoSelected = null;
        Coloso.subgrupoSelected = null;
    },
    setColorsAll: function(obj){
      var prevSelected = Coloso.grupoSelected;
      for(var key in obj){
        Coloso.grupoSelected = Coloso.svg.querySelector("#" + key);
        Coloso.setColor(obj[key]);

      }
      Coloso.grupoSelected = prevSelected;

    }
}
