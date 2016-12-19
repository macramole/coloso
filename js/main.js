var svgDOM = null;
var height = null;
var width = null;

function on_resize() {
    height = $(window).height();
    width = 1080 * height / 1920;

    $("#content").css({
        width : width,
        height : height
    });

    $("body").css("font-size", height * 16 / 976);
}

$( function() {

    on_resize();
    $(window).resize(function() {
        on_resize();
    })

    $("#btnFullscreen").click(function() {
        screenfull.request();
    });

    // $("#mainSvg").css("height", 0.6 * height);
} )

window.onload = function() {
    Coloso.init();
    UI.init();
    Frames.init();
};
