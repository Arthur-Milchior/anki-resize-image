/** 
Methods used to initialize the add-on, for all configurations
*/

function add_on_to_field(editorField){ // taking EditorField (HTMLDivElement)
    const editingArea = editorField.editingArea;
    const editable = editingArea.editable;
    const $editable = $(editable);

    const shadowRoot = editingArea.shadowRoot;
    const shadowStyle = document.createElement("link");
    shadowStyle.setAttribute("rel", "stylesheet");
    shadowStyle.setAttribute("href", jquery_ui_path);
    shadowRoot.appendChild(shadowStyle);


    if (max_height || max_width) {
        var $imgs = $editable.find("img");
        $imgs.off("click");
        $imgs.click(onClickOrDoubleClick);
    } else {
        $resizeImagesInField($editable);
    }
};

function start_resize_addon() {
    const fieldsContainer = document.getElementById("fields");
    for (let i = 0; i < fieldsContainer.childElementCount; i++) {
        add_on_to_field(fieldsContainer.children[i]);
    }
};
