/** 
Methods that are used in all cases.
*/

function $maybe_remove_a_dimension($img) { // jquery selection of an image node in a field
    if (preserve_ratio == "original") {
        if (max_width != null) {
            $img.css("height", "");
        } else {
            $img.css("width", "");
        }
    }
}

function $partialCleanResize($img) { // jquery selection of an image node in a field
    // Clean the style in the image. So that max height can be applied again correctly.
    $img.removeClass();
    ["position", "max-width", "max-height", "margin", "resize", "position", "zoom", "display", "top", "left"].forEach(style => {$img.css(style, "");});
    $maybe_remove_a_dimension($img);
}

function $get_image_parents($img) { // jquery selection of an image node in a field
    return $img.parents("div[class^=ui-]");
}

async function $resizeImage($img) { // jquery selection of an image node in a field
    var img = $img[0]; // image node in a field
    while (img.naturalWidth == 0 || img.naturalHeight == 0) {
        // Wait until the image size is not 0.
        await new Promise(r => setTimeout(r, 1000));
    }
    var preserve_ratio_in_resizable = false;
    if (preserve_ratio == "current" || preserve_ratio == "original") {
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
        var $divUi = $get_image_parents($img); // jquery of div node used by jquery-ui containing the image node.
        $divUi.attr("contentEditable", "false");
        $divUi.css("display", "inline-block");
    } else {
        console.log("Trying to apply resizable to image already resizable.");
    }
}

function _dblClickImage(img) { // img node in a field
    var $img = $(img); // jquery selection of an image node in a field
    $img.css("width", "");
    $img.css("height", "");

    var $parents = $get_image_parents($img); // jquery of div node used by jquery-ui containing the image node.
    $parents.css("width", "");
    $parents.css("height", "");
}
