$(function() {
    $("#header").css("height", $(window).height()),
    $(window).load(function() {
        $("#header .calch").each(function(e, t) {
            t = $(this),
            t.css({
                height: t.height(),
                bottom: "0",
                opacity: "1"
            })
        }),
        $("#header .header-foreground>div").not(".calch").each(function() {
            $(this).css("opacity", "1")
        })
    });
    var e = function() {
        var e = document.getElementById("deferred-styles")
          , t = document.createElement("div");
        t.innerHTML = e.textContent,
        document.body.appendChild(t),
        e.parentElement.removeChild(e)
    }
      , t = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
    t ? t(function() {
        window.setTimeout(e, 0)
    }) : window.addEventListener("load", e);
    var n = $(".promotion");
    n.length > 0 && $(window).width() > 780 && n.find(".right").css("height", n.find(".left").height())
});
