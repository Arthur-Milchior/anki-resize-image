limitSize = false

function $cleanResize($field){
    $divUi = $field.find("div[class^=ui-]");
    $divUi.replaceWith(
        function() {
            return $(this).contents();
        }
    );
    imgs = $field.find("img.ui-resizable");
    imgs.removeClass();
    imgs.css("position", "");
    imgs.css("max-width", "");
    imgs.css("max-height", "");
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
    $normalImageSize($img);
    $resizeImage($img);
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

setTimeout(    
    function() {
        saveField = function(type) {
            /* Send to python an information about what just occured, on which
             * field, which note (id) and with what value in the field.
             
             Event may be "blur" when focus is lost. Or "key" otherwise*/
            clearChangeTimer();
            
            if (!currentField) {
                // no field has been focused yet
                return;
            }
            // type is either 'blur' or 'key'
            pycmd(type + ":" + currentFieldOrdinal() + ":" + currentNoteId + ":" + currentField.innerHTML);
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
    },
    1000
);
// really want to redefine this function. Waiting 1 second should let
// $ be loaded. No saving should occur on first second hopefully.
    
function setFields_(fields) {
    setFields(fields);
    $fields = $("#fields");
    if (limitSize) {
        $fields.find(".field").find("img").click(onClick);
    } else {
        setTimeout(function(){$fields.find(".field").each(resizeImagesInField);}, 1000);
    }
}

