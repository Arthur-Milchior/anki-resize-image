from anki.hooks import wrap
from anki.lang import _
from aqt.editor import *
from aqt.editor import Editor, _html

from .config import getUserOption
from .from_file import add_style_in_web, str_from_file_name


def setBrowserResizeImage(self):
    js = ["js", "jquery-ui"]
    css = ["jquery-ui"]
    if getUserOption("apply maximum height when not resizing", False):
        js.append("limit_height")
        max_height = getUserOption("max-height", "200px")
        jquery_max_height = f"""#fields img {{max-height: {max_height} }}"""
        add_style_in_web(self, jquery_max_height)
    else:
        js.append("no_limit_height")
    css = "\n".join(str_from_file_name(f"{file}.css") for file in css)
    js = "\n".join(str_from_file_name(f"{file}.js") for file in js)
    add_style_in_web(self, css)
    self.web.eval(js)


Editor.setupWeb = wrap(Editor.setupWeb, setBrowserResizeImage)
