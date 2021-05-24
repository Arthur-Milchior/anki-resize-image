/** 
Methods that are used in all cases.
*/

function $maybe_remove_a_dimension($img){
    if (preserve_ratio == "original"){
        if (max_width != null) {
            $img.css("height", "");
        } else {
            $img.css("width", "");
        }
    }
}

function $partialCleanResize($img){
    // Clean the style in the image. So that max height can be applied again correctly.
    $img.removeClass();
    ["position", "max-width", "max-height", "margin", "resize", "position", "zoom", "display", "top", "left"].forEach(style => {$img.css(style, "");});
    $maybe_remove_a_dimension($img);
}

async function $resizeImage($img){
    var img = $img[0];
    while (img.naturalWidth == 0 || img.naturalHeight == 0) {
        await new Promise(r => setTimeout(r, 1000));
    }
    var preserve_ratio_in_resizable = false;
    if (preserve_ratio == "current" || preserve_ratio == "original"){
        preserve_ratio_in_resizable = true;
    }
    if ($img.resizable("instance") == undefined ) {
        $maybe_remove_a_dimension($img);
        var minHeight = ((min_height == null) ? 0: min_height)
        var minWidth = ((min_width == null) ? 0: min_width)
        $img.resizable({
            aspectRatio: preserve_ratio_in_resizable,
            minHeight: minHeight,
            minWidth: minWidth
        });
        $img.css("max-width", "100%");
        var $divUi = $img.parents("div[class^=ui-]");
        $divUi.attr("contentEditable", "false");
        $divUi.css("display", "inline-block");
    } else {
        console.log("Trying to apply resizable to image already resizable.");
    }
}

function _dblClickImage(img){
    var $img = $(img);
    $img.css("width", "");
    $img.css("height", "");
    var $parents = $img.parents("div[class^=ui-]");
    $parents.css("width", "");
    $parents.css("height", "");
}

