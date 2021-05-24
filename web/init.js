/** 
Methods used to initialize the add-on, for all configurations
*/

function add_on_to_field(editorField){ // editorField.EditorField(HTMLDivElement)
    const editingArea = editorField.editingArea; // editingArea.EditingArea(HTMLDivElement)
    const editable = editingArea.editable; // editable.Editable(HTMLElement)
    const $editable = $(editable); // jquery selection of editable.Editable(HTMLElement) of current field

    const shadowRoot = editingArea.shadowRoot; // editingArea.EditingArea(HTMLDivElement)'s shadow root
    const shadowStyleLink = document.createElement("link"); // Css link
    shadowStyleLink.setAttribute("rel", "stylesheet");
    shadowStyleLink.setAttribute("href", jquery_ui_path);
    shadowRoot.appendChild(shadowStyleLink);

    const rootStyleCss = document.createElement("style");
    rootStyleCss.innerHTML = css_editable;
    shadowRoot.appendChild(rootStyleCss);


    if (max_height || max_width) {
        var $imgs = $editable.find("img"); // jquery selection of images in the current field
        $imgs.off("click");
        $imgs.click(onClickOrDoubleClick);
    } else {
        $resizeImagesInField($editable);
    }
};

function start_resize_addon() {
    const fieldsContainer = document.getElementById("fields");
    for (let i = 0; i < fieldsContainer.childElementCount; i++) {
        editorField = fieldsContainer.children[i] // editorField.EditorField(HTMLDivElement)
        add_on_to_field(fieldsContainer.children[i]);
    }
};
