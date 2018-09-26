var elem = document.getElementById('body');

if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+, Ch31+
        elem.addEventListener("wheel", onWheel);
    }
    else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    }
    else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
} else { // IE8-
    elem.attachEvent("onmousewheel", onWheel);
}

current = 1;
max = 4;

function onWheel(e) {
    e = e || window.event;
    var delta = e.deltaY || e.detail || e.wheelDelta;
    debugger
    if(delta > 0 ){
        $(".section" + (++current)).css({ "top": "0" });
    }
    else{
        $(".section" + (current--)).css({ "top": "100%" });
    }

}


