/** 
Methods ensuring that fields are correctly saved, removing all jquery parts.
*/

function partialCleanResize(idx, img){ // Index of the image node in the editable and an image node
    $partialCleanResize($(img));
}

function $cleanResizeInEditable($editable){ // selection of editable.Editable(HTMLDivElement);
    // clean everything related to resize, so that it can be saved and
    // displayed properly in the reviewer
    var $divUi = $editable.find("div[class^=ui-]"); // jquery selection of div used by jquery ui to deal with images.
    $divUi.replaceWith(
        function() {
            return $(this).contents();
        }
    );
    var $imgs = $editable.find("img"); // jquery selection of images in the editable
    $imgs.each(partialCleanResize);
    $imgs = $editable.find("img");
    image_classes.forEach(function(clas, idx){
        $imgs.addClass(clas);
    });
}
function cleanResizeInEditable(editable){ // editable.Editable(HTMLDivElement);
    $editable = $(editable); // jquery selection of editable.Editable(HTMLDivElement);
    $cleanResizeInEditable($editable);
}

function cleanResizeInEditingArea(editingArea){ // editingArea.EditingArea(HTMLDivElement);
    const editable = editingArea.editable; // editable.Editable(HTMLElement)
    cleanResizeInEditable(editable);
}

// copied from anki editor/helpers.ts
function nodeIsElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
}
const INLINE_TAGS = [
    "A",
    "ABBR",
    "ACRONYM",
    "AUDIO",
    "B",
    "BDI",
    "BDO",
    "BIG",
    "BR",
    "BUTTON",
    "CANVAS",
    "CITE",
    "CODE",
    "DATA",
    "DATALIST",
    "DEL",
    "DFN",
    "EM",
    "EMBED",
    "I",
    "IFRAME",
    "IMG",
    "INPUT",
    "INS",
    "KBD",
    "LABEL",
    "MAP",
    "MARK",
    "METER",
    "NOSCRIPT",
    "OBJECT",
    "OUTPUT",
    "PICTURE",
    "PROGRESS",
    "Q",
    "RUBY",
    "S",
    "SAMP",
    "SCRIPT",
    "SELECT",
    "SLOT",
    "SMALL",
    "SPAN",
    "STRONG",
    "SUB",
    "SUP",
    "SVG",
    "TEMPLATE",
    "TEXTAREA",
    "TIME",
    "U",
    "TT",
    "VAR",
    "VIDEO",
    "WBR",
];

function nodeIsInline(node) {
    return !nodeIsElement(node) || INLINE_TAGS.includes(node.tagName);
}

// copied from anki editor/index.ts
function containsInlineContent(field) {
    if (field.childNodes.length === 0) {
        // for now, for all practical purposes, empty fields are in block mode
        return false;
    }

    for (const child of field.children) {
        if (!nodeIsInline(child)) {
            return false;
        }
    }

    return true;
}

function removeTrailerBr(editable) {
        return containsInlineContent(editable) && editable.innerHTML.endsWith("<br>")
            ? editable.innerHTML.slice(0, -4) // trim trailing <br>
            : editable.innerHTML;
}

// not copied anymore
/** 
Receive a command as it is sent to python - with jquery-ui track in it. Remove the jquery-ui part and resend it without jquery-ui
*/
function cleanResizeHtml(type, ord, nid, node_as_text) {
    outer = document.createElement("div");
    $outer = $(outer)
    $outer.html(node_as_text)
    
    cleanResizeInEditable(outer);
    output = removeTrailerBr(outer);
    bridgeCommand(
        `without_resize:${type}:${ord}:${nid}:${output}`
    );
}
