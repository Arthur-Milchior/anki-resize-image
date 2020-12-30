import json

from anki.hooks import wrap
from anki.lang import _
from aqt import gui_hooks, mw
from aqt.editor import Editor
import re

from .config import getUserOption


def setBrowserResizeImage(web_content, context):
    if not isinstance(context, Editor):
        return
    addon_package = mw.addonManager.addonFromModule(__name__)
    web_content.css.append(f"/_addons/{addon_package}/web/jquery-ui.css")
    web_content.js.append(f"/_addons/{addon_package}/web/js.js")
    web_content.js.append(f"js/vendor/jquery-ui.js")

    style = getUserOption("resizable-style", "border:1px dashed black;")
    css = []
    js = []
    if style:
        css.append(f".ui-wrapper {{   {style} }}\n")
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
                js.append(f"""{m}_{direction} = "{limit}";""")
            else:
                js.append(f"""{m}_{direction} = null;""")
    image_classes = getUserOption("image-classes", {})
    image_classes = json.dumps(image_classes)
    js.append(f"""image_classes = {image_classes};""")
    js.append(
        f"""preserve_ratio={json.dumps(getUserOption("preserve ratio while resizing", "current"))}""")
    web_content.head += (f"""
<style>""" + "\n".join(css) + """</style>
<script>""" + "\n".join(js) + """</script>""")


mw.addonManager.setWebExports(__name__, r"web/.*(css|js)")
gui_hooks.webview_will_set_content.append(setBrowserResizeImage)

def add_style_to_note(editor):
    style = getUserOption("note-type style", None)
    if not style:
        return
    model = editor.note.model()
    css = model["css"]
    prefix = """/*Start of style added by resize image add-on. Don't edit directly or the edition will be lost. Edit via the add-on configuration */"""
    suffix = """/*End of style added by resize image add-on*/"""
    slashed_star = r"\*"
    find_query = f"""{prefix.replace("*", slashed_star)}\n(?P<style>.*?)\n{suffix.replace("*", slashed_star)}"""
    correct_style_part = f"""{prefix}
{style}
{suffix}"""
    m = re.search(find_query, css, flags=re.S|re.M)
    def save_css():
        model["css"] = css
        mw.col.models.save(model, updateReqs=False)
    if m is None:
        css += "\n" + correct_style_part
        save_css()
    elif m.group("style") != style :
        css = re.sub(find_query, correct_style_part, css, flags=re.S|re.M)
        save_css()

gui_hooks.editor_did_load_note.append(add_style_to_note)
