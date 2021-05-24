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
    web_content.js.append(f"/_addons/{addon_package}/web/js.js")
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
    width: {borderwidth}px;; 
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
                css.append(f""".field img {{{m}-{direction}: {limit}px}}""")
                js.append(f"""const {m}_{direction} = "{limit}";""")
            else:
                js.append(f"""const {m}_{direction} = null;""")
    image_classes = getUserOption("image-classes", {})
    image_classes = json.dumps(image_classes)
    js.append(f"""const image_classes = {image_classes};""")
    js.append(
        f"""const preserve_ratio = {json.dumps(getUserOption("preserve ratio while resizing", "current"))}""")
    web_content.head += (f"""
<style>""" + "\n".join(css) + """</style>
<script>""" + "\n".join(js) + """</script>""")


mw.addonManager.setWebExports(__name__, r"web/.*(css|js)")
gui_hooks.webview_will_set_content.append(setBrowserResizeImage)


def note_is_loaded(editor: Editor):
    editor.web.eval("start_resize_addon()")

gui_hooks.editor_did_load_note.append(note_is_loaded)

