/** 
Methods used if all images should directly be resizable
*/
function resizeImage(idx, img){ //index of an image node in its field, the image node
    $img = $(img); // jquery selection of an image node in a field
    $resizeImage($img);
}

function _dblClickImageUnconditional(){
    img = this; // img of a field
    _dblClickImage(img);
}

function $resizeImagesInField($editable){ // jquery selection of editable.Editable(HTMLElement) of current field
    var $imgs = $editable.find("img"); // jquery selection of images in the current field
    $imgs.dblclick(_dblClickImageUnconditional);
    $imgs.each(resizeImage);
    $imgs.css("display", "");
    $imgs.css("max-width", "100%");
    $imgs.css("max-height", "100%");
}
