import json

from aqt import gui_hooks, mw
from aqt.editor import Editor


from .config import getUserOption
from . import add_style

from aqt.webview import AnkiWebView

def setBrowserResizeImage(web_content, context):
    if not isinstance(context, Editor):
        return
    addon_package = mw.addonManager.addonFromModule(__name__)
    jquery_ui_path = AnkiWebView.webBundlePath(f"/_addons/{addon_package}/web/jquery-ui.css")
    web_content.js.append(f"/_addons/{addon_package}/web/all_cases.js")
    web_content.js.append(f"/_addons/{addon_package}/web/directly_resize.js")
    web_content.js.append(f"/_addons/{addon_package}/web/default_max.js")
    web_content.js.append(f"/_addons/{addon_package}/web/init.js")
    web_content.js.append(f"/_addons/{addon_package}/web/save_field.js")
    web_content.js.append(f"js/vendor/jquery-ui.min.js")

    style = getUserOption("resizable-style", "border:1px dashed black;")
    css = []
    js = []
    if style:
        css.append(f".ui-wrapper {{   {style} }}\n")
    js.append(f"""const jquery_ui_path = "{jquery_ui_path}";""")
    borderwidth = getUserOption("draggable border width", 15)
    css.append(f"""
.ui-resizable-s {{
    height: {borderwidth}px;
}}
.ui-resizable-e {{
    width: {borderwidth}px;
}}
.ui-resizable-se {{
    width: {borderwidth}px;
    height: {borderwidth}px; 
}}""")
    for m, default, suffix in [
            ("min", 10, ""),
            ("max", 200, " when not resizing")
    ]:
        for direction in ["width", "height"]:
            if getUserOption(f"apply {m}imum {direction}{suffix}", False):
                limit = getUserOption(f"{m}-{direction}", default)
                css.append(f"""img {{{m}-{direction}: {limit}px}}""")
                js.append(f"""const {m}_{direction} = "{limit}";""")
            else:
                js.append(f"""const {m}_{direction} = null;""")
    image_classes = getUserOption("image-classes", {})
    image_classes = json.dumps(image_classes)
    js.append(f"""const image_classes = {image_classes};""")
    css = "\n".join(css)
    js.append(f"""const css_editable = {json.dumps(css)}""")
    js.append(
        f"""const preserve_ratio = {json.dumps(getUserOption("preserve ratio while resizing", "current"))}""")
    web_content.head += (f"""
<script>""" + "\n".join(js) + """</script>""")


mw.addonManager.setWebExports(__name__, r"web/.*(css|js)")
gui_hooks.webview_will_set_content.append(setBrowserResizeImage)


def note_is_loaded(editor: Editor):
    editor.web.eval("start_resize_addon()")

gui_hooks.editor_did_load_note.append(note_is_loaded)


def receive_field_value(handled, cmd, editor):
    if not isinstance(editor, Editor):
        return handled
    if not (cmd.startswith("blur") or cmd.startswith("key")):
        return handled
    (handled, callback_value) = handled
    (type, ord_str, nid_str, txt) = cmd.split(":", 3)
    editor.web.eval(f"""cleanResizeHtml("{type}", {ord_str}, {nid_str}, {json.dumps(txt)});""")
    return (True, callback_value)

gui_hooks.webview_did_receive_js_message.append(receive_field_value)

def receive_corrected_value(handled, cmd, editor):
    if not isinstance(editor, Editor):
        return handled
    if not cmd.startswith("without_resize"):
        return handled
    (handled, callback_value) = handled
    (without_resize, cmd) = cmd.split(":", 1)
    editor.onBridgeCmd(cmd)
    return (True, callback_value)

gui_hooks.webview_did_receive_js_message.append(receive_corrected_value)
