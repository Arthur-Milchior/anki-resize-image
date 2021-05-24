/** Methods used only if the images are resizable only if they are clicked, otherwise their size is capped */

function $normalImageSize($img) { // jquery selection of an image node in a field
    $img.css("max-height", "100%");
    $img.css("max-width", "100%");
}

function _onClick(img) { // img node in a field
    var $img = $(img); // jquery selection of an image node in a field
    if ($img.data("resizable") != true) {
        $img.data("resizable", true);
        $normalImageSize($img);
        $resizeImage($img);
    } else {
        $img.data("resizable", false);
        $img.resizable( "destroy" );
        $partialCleanResize($img);
    }
}

//code originally from https://codepen.io/chriscoyier/pen/HfBtz

var timer = 0;
var delay = 200;
var waiting = false;
function onClick(img) { // img node in a field
    timer = setTimeout(function() {
        _onClick(img);
        waiting = false;
    }, delay);
}

function dblClickImage(img) { // img node in a field
    clearTimeout(timer);
    waiting = false;
    _dblClickImage(img);
}
//end of code from https://codepen.io/chriscoyier/pen/HfBtz

function onClickOrDoubleClick() {
    var img = this; // img node in a field
    if (waiting) {
        dblClickImage(img);
    }
    else {
        onClick(img);
        waiting = true;
    }
}

