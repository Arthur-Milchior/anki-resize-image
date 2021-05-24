/** 
Methods used if all images should directly be resizable
*/
function resizeImage(idx, img){
    $resizeImage($(img));
}

function _dblClickImageUnconditional(){
    _dblClickImage(this);
}

function $resizeImagesInField($editable){
    var $imgs = $editable.find("img");
    $imgs.dblclick(_dblClickImageUnconditional);
    $imgs.each(resizeImage);
    $imgs.css("display", "");
    $imgs.css("max-width", "100%");
    $imgs.css("max-height", "100%");
}
