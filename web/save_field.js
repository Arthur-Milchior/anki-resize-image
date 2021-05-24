/** 
Methods ensuring that fields are correctly saved, removing all jquery parts.
*/

function partialCleanResize(idx, img){
    $partialCleanResize($(img));
}

function $cleanResize($field){
    // clean everything related to resize, so that it can be saved and
    // displayed properly in the reviewer
    var $divUi = $field.find("div[class^=ui-]");
    $divUi.replaceWith(
        function() {
            return $(this).contents();
        }
    );
    var $imgs = $field.find("img")
    $imgs.each(partialCleanResize);
    $imgs = $field.find("img");
    image_classes.forEach(function(clas, idx){
        $imgs.addClass(clas);
    });
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
