from aqt import gui_hooks, mw
from .config import getUserOption
import re

prefix = """/*Start of style added by resize image add-on. Don't edit directly or the edition will be lost. Edit via the add-on configuration */"""
suffix = """/*End of style added by resize image add-on*/"""

def add_style_to_note(editor):
    """
    Look for prefix and suffix. If it is not present, add them.
    In between, but the style from config note-type style if it defined.
    """
    style = getUserOption("note-type style", None)
    if style is not None:
        return
    model = editor.note.model()
    css = model["css"]
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
