var svgDOM = null;
var height = null;
var width = null;

$( function() {
    height = $(window).height();
    width = 1080 * height / 1920;

    $("#content").css({
        width : width,
        height : height
    });

    $("body").css("font-size", height * 16 / 976);

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
