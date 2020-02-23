var max_height = null;
var min_height = null;
var max_width = null;
var min_width = null;

function partialCleanResize(idx, img){
    $partialCleanResize($(img));
}

function $partialCleanResize($img){
    // Clean the style in the image. So that max height can be applied again correctly.
    $img.removeClass();
    ["position", "max-width", "max-height", "margin", "resize", "position", "zoom", "display", "top", "left"].forEach(style => {$img.css(style, "");});
    $maybe_remove_a_dimension($img);
}

function $cleanResize($field){
    // clean everything related to resize, so that it can be saved and
    // displayed properly in reviewer
    $divUi = $field.find("div[class^=ui-]");
    $divUi.replaceWith(
        function() {
            return $(this).contents();
        }
    );
    $field.find("img").each(partialCleanResize);
}

function cleanResize(field){
    $cleanResize($(field));
}

function $maybe_remove_a_dimension($img){
    if (preserve_ratio == "original"){
        if (max_width != null) {
            $img.css("height", "");
        } else {
            $img.css("width", "");
        }
    }
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
        $img.resizable({
            aspectRatio: preserve_ratio_in_resizable
        });
        $img.css("max-width", "100%");
        $divUi = $img.parents("div[class^=ui-]");
        $divUi.attr("contentEditable", "false");
        $divUi.css("display", "inline-block");
    } else {
        console.log("Trying to apply resizable to image already resizable.");
    }
}

//code originally from https://codepen.io/chriscoyier/pen/HfBtz

var timer = 0;
var delay = 200;
var waiting = false;
function onClick(img) {
    timer = setTimeout(function() {
        _onClick(img);
        waiting = false;
    }, delay);
}

function dblClickImage(img){
    clearTimeout(timer);
    waiting = false;
    _dblClickImage(img);
}
//end of code from https://codepen.io/chriscoyier/pen/HfBtz
function onClickOrDoubleClick() {
    img = this;
    if (waiting){
        dblClickImage(img);
    }
    else {
        onClick(img);
        waiting = true;
    }
}

function _onClick(img){
    $img = $(img);
    if ($img.data("resizable") != true){
        $img.data("resizable", true);
        $normalImageSize($img);
        $resizeImage($img);
    } else {
        $img.data("resizable", false);
        $img.resizable( "destroy" );
        $partialCleanResize($img);
    }
}


function $normalImageSize($img){
    $img.css("max-height", "100%");
    $img.css("max-width", "100%");
}

function onResize(event, ui){
    $img = ui.element.find("img");
    $normalImageSize($img)
}

function resizeImage(idx, img){
    $resizeImage($(img));
}
function _dblClickImage(img){
    $img = $(img);
    $img.css("width", "");
    $img.css("height", "");
    $parents = $img.parents("div[class^=ui-]");
    $parents.css("width", "");
    $parents.css("height", "");
}
function _dblClickImageUnconditional(){
    _dblClickImage(this);
}
function $resizeImagesInField($field){
    $imgs = $field.find("img");
    $imgs.dblclick(_dblClickImageUnconditional);
    $imgs.each(resizeImage);
    $imgs.css("display", "");
    $imgs.css("max-width", "100%");
}

function resizeImagesInField(idx, field){
    return $resizeImagesInField($(field));
}

function saveField(type) {
    /* Send to python an information about what just occured, on which
     * field, which note (id) and with what value in the field.
     Event may be "blur" when focus is lost. Or "key" otherwise*/
    clearChangeTimer();
    if (!currentField) {
        // no field has been focused yet
        return;
    }
    // type is either 'blur' or 'key'
    var $copyField = $(currentField).clone()
    $cleanResize($copyField);
    pycmd(type + ":" + currentFieldOrdinal() + ":" + currentNoteId + ":" + $copyField.html());
};

/// If the field has only an empty br, remove it first.
insertHtmlRemovingInitialBR = function(html) {
    if (html !== "") {
        // remove <br> in empty field
        if (currentField && currentField.innerHTML === "<br>") {
            currentField.innerHTML = "";
        }
        setFormat("inserthtml", html);
        setTimeout(
            function(){
                resizeImagesInField(null, currentField) 
            },
            2000);
    }
};

setFieldsInit = setFields;    
setFields = function(fields) {
    setFieldsInit(fields);
    $fields = $("#fields");
    if (max_height || max_width) {
        $imgs = $fields.find(".field").find("img");
        $imgs.click(onClickOrDoubleClick);
    } else {
        $fields.ready(function(){$fields.find(".field").each(resizeImagesInField);});
    }
};
