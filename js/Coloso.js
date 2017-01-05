var Coloso = {
    GRUPOS: ["corazon", "brazos", "manos", "cintura", "hombros", "cabeza", "ojo_izquierdo", "ojo_derecho", "boca"],
    // GRUPOS: ["brazos", "manos", "cintura", "hombros", "cabeza", "ojo_izquierdo", "ojo_derecho", "boca"],
    COLORES: ["#FF002E", "#00E100", "#00C6FF", "#FFE600", "#7D7D7D"],
    COLOR_APAGADO: 4,
    SUBGRUPOS: {
        "ojo_izquierdo": [
            ["ojoIzqSup", "ojoIzqInf"],
            ["ojoIzqSup", "ojoIzqInf", "ojoIzqMedio"],
            ["ojoIzqSup"],
            ["ojoIzqInf"],
            ["ojoIzqMedio"],
            ["ojoIzqSup", "ojoIzqMedio"],
            ["ojoIzqInf", "ojoIzqMedio"]
        ],
        "ojo_derecho": [
            ["ojoDerSup", "ojoDerInf"],
            ["ojoDerSup", "ojoDerInf", "ojoDerMedio"],
            ["ojoDerSup"],
            ["ojoDerInf"],
            ["ojoDerMedio"],
            ["ojoDerSup", "ojoDerMedio"],
            ["ojoDerInf", "ojoDerMedio"]
        ],
        "boca": [
            ["labioInf", "labiosCostado"],
            [],
            ["labioInf", "labiosCostado", "labioSup"],
            ["dientes"],
            ["labioInf", "labioSup"],
            ["labioInf", "labiosCostado", "labioSup", "dientes"]
        ],
        "corazon" : [
            ["corazonTriSup"],
            ["corazonTriSup", "corazonTriInf", "corazonDiamante"],
            ["corazonTriSup", "corazonTriInf"],
        ]
    },

    SELECTORS: ["cinturaSelector", "hombrosSelector", "brazosSelector", "manosSelector"],
    svg: null,

    grupoSelected: null,
    subgrupoSelected: null,

    init: function() {
        var mainSvg = document.getElementById("mainSvg");
        Coloso.svg = mainSvg.contentDocument || mainSvg.documentElement;
        Coloso.activateGrupos();
        Coloso.activateSubGrupos();
        Coloso.initSelectors();
    },

    initSelectors: function() {
        Coloso.selectorsHideAll();
    },

    selectorsHideAll: function() {
        var query = Coloso.SELECTORS.map(function(x) {
            return "#" + x;
        }).join(", ");

        var selectors = Coloso.svg.querySelectorAll(query);
        for (var i = 0; i < selectors.length; i++) {
            var child = selectors[i];
            child.style.opacity = 0;
        }
    },

    activateGrupos: function() {
        for (i in Coloso.GRUPOS) {
            var grupo = Coloso.svg.querySelector("#" + Coloso.GRUPOS[i]);
            var nombreGrupo = Coloso.GRUPOS[i];
            grupo.onclick = function() {
                Coloso.grupoSelected = this;
                Coloso.subgrupoSelected = null;
                UI.onGrupoSelected();

                //Selectores
                Coloso.selectorsHideAll();
                selector = Coloso.svg.querySelector("#" + Coloso.grupoSelected.id + "Selector");
                if (selector) {
                    selector.style.opacity = 1;
                }

                // Coloso.setColorIfApagado();

            };
        }
    },


    activateSubGrupos: function() {
        $("#coloso .ojos img").each(function(i) {
            $(this).click(function() {
                $("#coloso #presets img").removeClass("selected");
                $(this).addClass("selected");

                switch (Coloso.grupoSelected.id) {
                    case "ojo_izquierdo":
                    case "ojo_derecho":

                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        // Coloso.setColor(0);
                        // Frames.setColor(0);
                        // UI.onFrameSetted();
                        break;
                }
            });
        });
        $("#coloso .boca img").each(function(i) {
            $(this).click(function() {
                $("#coloso #presets img").removeClass("selected");
                $(this).addClass("selected");

                switch (Coloso.grupoSelected.id) {
                    case "boca":
                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        // Coloso.setColor(0);
                        // Frames.setColor(0);
                        // UI.onFrameSetted();
                        break;
                }
            });
        });
        $("#coloso .corazon img").each(function(i) {
            $(this).click(function() {
                $("#coloso #presets img").removeClass("selected");
                $(this).addClass("selected");

                switch (Coloso.grupoSelected.id) {
                    case "corazon":
                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        // Coloso.setColor(0);
                        // Frames.setColor(0);
                        // UI.onFrameSetted();
                        break;
                }
            });
        });
    },

    ////si esta apagado que lo pinte del primer color. esto se llama desde UI
    setColorIfApagado: function() {
        //si NO elegió un subgrupo se prende directo si estaba apagado
        if (Object.keys(Coloso.SUBGRUPOS).indexOf(Coloso.grupoSelected.id) == -1) {
            if (Frames.getColor(Coloso.grupoSelected.id) == Coloso.COLOR_APAGADO) {
                Coloso.setColor(0);
                Frames.setColor(0);
                UI.onFrameSetted();
            }
        } else {
            var keysPrimerPreset = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][0];
            var todosApagados = true;
            for (var i = 0; i < keysPrimerPreset.length; i++) {
                if (Frames.getColor(keysPrimerPreset[i]) != Coloso.COLOR_APAGADO) {
                    todosApagados = false;
                    break;
                }
            }
            if (todosApagados) {
                Coloso.setColor(0);
                Frames.setColor(0);
                UI.onFrameSetted();
            }
        }
    },

    setColor: function(numColor) {
        /*if (Coloso.grupoSelected == null) {
            return;
        }*/

        var color = Coloso.COLORES[numColor];

        if (Coloso.subgrupoSelected == null) {
            for (var i = 0; i < Coloso.grupoSelected.children.length; i++) {
                var child = Coloso.grupoSelected.children[i];

                if (child.nodeName == "path") {
                    child.style.stroke = color;
                } else if (child.nodeName == "g") {
                    for (j = 0; j < child.children.length; j++) {
                        var elem = child.children[j];
                        elem.style.stroke = color;
                    }
                }
            }
        } else {
            var prevSubGrupoSelected = Coloso.subgrupoSelected; //guardo el grupoSeleccionado para después colorearlo
            if (Coloso.grupoSelected !== null) {
                var idxBiggerSubGroup; //Que subgrupo tiene todas las secciones pintadas
                if (Coloso.grupoSelected.id === "boca") {
                    idxBiggerSubGroup = 5
                } else {
                    idxBiggerSubGroup = 1
                }
                for (var i = 0; i < Coloso.SUBGRUPOS[Coloso.grupoSelected.id][idxBiggerSubGroup].length; i++) {
                    var seccion = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][idxBiggerSubGroup][i];
                    Coloso.subgrupoSelected = Coloso.svg.querySelectorAll("#" + seccion);
                    Coloso.setSubGroupColor(Coloso.COLORES[4]);
                }
            }



            Coloso.subgrupoSelected = prevSubGrupoSelected;
            Coloso.setSubGroupColor(color);
        }
    },
    //para setear color de Subgrupo. En una función porque ahora lo necesito para resetear colores al cambiar de subgrupo
    setSubGroupColor: function(color) {
        for (var i = 0; i < Coloso.subgrupoSelected.length; i++) {
            var node = Coloso.subgrupoSelected[i];
            if (node.nodeName == "path") {
                Coloso.subgrupoSelected[i].style.stroke = color;
            } else if (node.nodeName == "g") {
                for (j = 0; j < node.children.length; j++) {
                    var child = node.children[j];
                    child.style.stroke = color;
                }
            }
        }

    },
    unselect: function() {
        Coloso.grupoSelected = null;
        Coloso.subgrupoSelected = null;
        Coloso.selectorsHideAll();
    },
    setColorsAll: function(obj) {
        var prevSelected = Coloso.grupoSelected;
        var prevSubSelected = Coloso.subgrupoSelected;
        for (var key in obj) {
            if (Coloso.GRUPOS.indexOf(key) == -1) {
                Coloso.grupoSelected = null;
                Coloso.subgrupoSelected = Coloso.svg.querySelectorAll("#" + key);
            } else {
                Coloso.subgrupoSelected = null;
                Coloso.grupoSelected = Coloso.svg.querySelector("#" + key);
            }

            Coloso.setColor(obj[key]);
        }

        Coloso.grupoSelected = prevSelected;
        Coloso.subgrupoSelected = prevSubSelected;

    }
}
