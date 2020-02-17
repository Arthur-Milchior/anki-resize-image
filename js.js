function partialCleanResize(idx, img){
    $partialCleanResize($(img));
}

function $partialCleanResize($img){
    // Clean the style in the image. So that max height can be applied again correctly.
    $img.removeClass();
    ["position", "max-width", "max-height", "margin", "resize", "position", "zoom", "display", "top", "left"].forEach(style => {$img.css(style, "");});
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


function $resizeImage($img){
    if ($img.resizable("instance") == undefined ) {
        $img.resizable();
        $img.css("max-width", "100%");
        $divUi = $img.parents("div[class^=ui-]");
        $divUi.attr("contentEditable", "false");
        $divUi.css("display", "inline-block");
    } else {
        console.log("Trying to apply resizable to image already resizable.");
    }
}

function onClick(){
    $img = $(this);
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
}

function onResize(event, ui){
    $img = ui.element.find("img");
    $normalImageSize($img)
}

function resizeImage(idx, img){
    $resizeImage($(img));
}
function dblClickImage(){
    $img = $(this);
    $img.css("width", "");
    $img.css("height", "");
    $parents = $img.parents("div[class^=ui-]");
    $parents.css("width", "");
    $parents.css("height", "");
}
function $resizeImagesInField($field){
    $imgs = $field.find("img");
    $imgs.dblclick(dblClickImage);
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
    //console.log("$fields is "+ $fields[0].outerHTML);
    if (limitSize) {
        $fields.find(".field").find("img").click(onClick);
    } else {
        $fields.ready(function(){$fields.find(".field").each(resizeImagesInField);});
    }
};
