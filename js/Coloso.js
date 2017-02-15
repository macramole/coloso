var Coloso = {
    GRUPOS: ["corazon", "brazos", "manos", "cintura", "hombros", "cabeza", "ojo_izquierdo", "ojo_derecho", "boca"],
    COLORES: ["#FF002E", "#00E100", "#00C6FF", "#FFE600", "#7D7D7D", "#FFFFFF"],
    COLOR_APAGADO: 4,
    COLOR_DIENTES: 5,
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
            ["labioSup"],
            ["labioInf", "labiosCostado", "labioSup"],
            ["dientes"],
            ["labioInf", "labioSup"],
            ["labioInf", "labiosCostado", "labioSup", "dientes"]
        ],
        "corazon": [
            ["corazonTriSup"],
            ["corazonTriSup", "corazonTriInf", "corazonDiamante"],
            ["corazonTriSup", "corazonTriInf"],
        ]
    },
    //cada subgrupo cuales son todas sus piezas, se usa para definir el color en Coloso.setColorIfApagado
    SUBGRUPOS_COMPLETOS: {
        "ojo_izquierdo": ["ojoIzqSup", "ojoIzqInf", "ojoIzqMedio"],
        "ojo_derecho": ["ojoDerSup", "ojoDerInf", "ojoDerMedio"],
        "boca": ["labioInf", "labiosCostado", "labioSup"], // no incluyo dientes porque son blancos
        "corazon": ["corazonTriSup", "corazonTriInf", "corazonDiamante"]
    },

    SELECTORS: ["cinturaSelector", "hombrosSelector", "brazosSelector", "manosSelector"],
    svg: null,

    grupoSelected: null,
    subgrupoSelected: null,
    atColor: 0,

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
        for (var i in Coloso.GRUPOS) {
            var grupo = Coloso.svg.querySelector("#" + Coloso.GRUPOS[i]);
            var nombreGrupo = Coloso.GRUPOS[i];
            grupo.onclick = function() {
                Coloso.restoreColorsLayout();

                if (this === Coloso.grupoSelected && Coloso.subgrupoSelected === null) {
                    Coloso.atColor = Frames.getColor(Coloso.grupoSelected.id);
                    Coloso.toNextColor();
                }

                Coloso.grupoSelected = this;
                Coloso.subgrupoSelected = null;
                UI.onGrupoSelected();

                //Selectores
                Coloso.selectorsHideAll();
                var selector = Coloso.svg.querySelector("#" + Coloso.grupoSelected.id + "Selector");
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

                Coloso.restoreColorsLayout();


                switch (Coloso.grupoSelected.id) {
                    case "ojo_izquierdo":
                    case "ojo_derecho":

                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        Coloso.setColorIfApagado();
                        break;
                }

                //si la sección clickeada es igual a la ya seleccionada
                if ($(this).index() === $("img.selected").index()) {
                    Coloso.atColor = Frames.getColor(Coloso.subgrupoSelected[0].id);
                    Coloso.toNextColor();
                } else {
                    $("#coloso #presets img").removeClass("selected");
                    $(this).addClass("selected");
                }
            });
        });
        $("#coloso .boca img").each(function(i) {
            $(this).click(function() {
                console.log(this);
                switch (Coloso.grupoSelected.id) {
                    case "boca":
                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        if (i === 3) {
                            //si se seleccionan los dientes
                            if ($("#colores li").length === 5) {
                                $("#colores li").each(function(j) {
                                    if (j < 3) {
                                        $(this).addClass("invisible");

                                    } else if (j == 3) {
                                        $(this).addClass("blanco");
                                    }
                                });
                                $("ul#colores.visible").addClass("seleccionDientes");
                            }

                        } else {
                            Coloso.restoreColorsLayout();
                        }
                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        Coloso.setColorIfApagado();
                        break;
                }

                //si la sección seleccionada es igual a la ya clickeada
                if ($(this).index() === $("img.selected").index()) {
                    Coloso.atColor = Frames.getColor(Coloso.subgrupoSelected[0].id);
                    Coloso.toNextColor();
                } else {
                    $("#coloso #presets img").removeClass("selected");
                    $(this).addClass("selected");
                }
            });
        });
        $("#coloso .corazon img").each(function(i) {
            $(this).click(function() {

                Coloso.restoreColorsLayout();


                switch (Coloso.grupoSelected.id) {
                    case "corazon":
                        var query = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][i].map(function(x) {
                            return "#" + x;
                        }).join(", ");

                        Coloso.subgrupoSelected = Coloso.svg.querySelectorAll(query);
                        Coloso.setColorIfApagado();
                        break;
                }

                //si la sección clickeada es igual a la ya seleccionada
                if ($(this).index() === $("img.selected").index()) {
                    Coloso.atColor = Frames.getColor(Coloso.subgrupoSelected[0].id);
                    Coloso.toNextColor();
                } else {
                    $("#coloso #presets img").removeClass("selected");
                    $(this).addClass("selected");
                }
            });
        });
    },
    toNextColor: function() {
        Coloso.atColor = (++Coloso.atColor) % 4;
        Coloso.setColor(Coloso.atColor);
        Frames.setColor(Coloso.atColor);
    },
    //para volver a la grilla de 5 colores
    //está función se corre siempre que se hace click sobre un grupo o un subgrupo (por ahí no es necesario...)
    restoreColorsLayout: function() {
        $("#colores li").each(function(i) {
            $(this).removeClass("blanco");
            $(this).removeClass("invisible");

        });
        $("ul#colores").removeClass("seleccionDientes");
    },

    //recorre las partes del subgrupo seleccionado y devuelve el color (o Coloso.COLOR_APAGADO)
    getCurrentSubgrupoColor: function() {
        var keysSubGrupo = Coloso.SUBGRUPOS_COMPLETOS[Coloso.grupoSelected.id];
        var currentSubGrupoColor = Coloso.COLOR_APAGADO;

        for (var i = 0; i < keysSubGrupo.length; i++) {
            var subGrupoColor = Frames.getColor(keysSubGrupo[i]);
            if (subGrupoColor != Coloso.COLOR_APAGADO) {
                currentSubGrupoColor = subGrupoColor;
                break;
            }
        }

        return currentSubGrupoColor;
    },

    ////si esta apagado que lo pinte del primer color. esto se llama desde UI
    setColorIfApagado: function() {
        var rIdx = Math.floor(Math.random() * 4);
        var atColor = rIdx;
        //si NO elegió un subgrupo se prende directo si estaba apagado
        if (Object.keys(Coloso.SUBGRUPOS).indexOf(Coloso.grupoSelected.id) == -1) {
            if (Frames.getColor(Coloso.grupoSelected.id) == Coloso.COLOR_APAGADO) {
                Coloso.setColor(rIdx);
                Frames.setColor(rIdx);
                UI.onFrameSetted();
            }
        } else {

            var currentSubGrupoColor = Coloso.getCurrentSubgrupoColor();
            var colorASetear = rIdx;

            if (currentSubGrupoColor != Coloso.COLOR_APAGADO) {
                colorASetear = currentSubGrupoColor;
            }

            Coloso.setColor(colorASetear);
            Frames.setColor(colorASetear);
            UI.onFrameSetted();
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
                    for (var j = 0; j < child.children.length; j++) {
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
                    idxBiggerSubGroup = 5;
                } else {
                    idxBiggerSubGroup = 1;
                }
                for (var i = 0; i < Coloso.SUBGRUPOS[Coloso.grupoSelected.id][idxBiggerSubGroup].length; i++) {
                    var seccion = Coloso.SUBGRUPOS[Coloso.grupoSelected.id][idxBiggerSubGroup][i];
                    Coloso.subgrupoSelected = Coloso.svg.querySelectorAll("#" + seccion);
                    Coloso.setSubGroupColor(Coloso.COLORES[Coloso.COLOR_APAGADO], false);
                }
            }



            Coloso.subgrupoSelected = prevSubGrupoSelected;
            Coloso.setSubGroupColor(color, true);
        }
    },
    //para setear color de Subgrupo. En una función porque ahora lo necesito para resetear colores al cambiar de subgrupo
    setSubGroupColor: function(color, coloreando) { //el segundo param es para ver si estoy coloreando o no (para los dientes...)
        for (var i = 0; i < Coloso.subgrupoSelected.length; i++) {
            var node = Coloso.subgrupoSelected[i];
            if (node.nodeName == "path") {
                Coloso.subgrupoSelected[i].style.stroke = color;
            } else if (node.nodeName == "g") {
                for (var j = 0; j < node.children.length; j++) {
                    var child = node.children[j];

                    if (node.id === "dientes" && coloreando && color !== Coloso.COLORES[Coloso.COLOR_APAGADO]) {
                        child.style.stroke = Coloso.COLORES[Coloso.COLOR_DIENTES];
                    } else {
                        child.style.stroke = color;
                    }

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
};
