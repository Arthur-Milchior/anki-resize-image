import json

from anki.hooks import wrap
from anki.lang import _
from aqt.editor import *
from aqt.editor import Editor, _html

from .config import getUserOption
from .from_file import add_style_in_web, str_from_file_name


def setBrowserResizeImage(self):
    js = ["js", "jquery-ui"]
    css = ["jquery-ui"]
    css = "\n".join(str_from_file_name(f"{file}.css") for file in css)
    js = "\n".join(str_from_file_name(f"{file}.js") for file in js)
    add_style_in_web(self, css)
    self.web.eval(js)
    for direction in ["width", "height"]:
        if getUserOption(f"apply maximum {direction} when not resizing", False):
            limit = getUserOption(f"max-{direction}", "200px")
            add_style_in_web(
                self, f"""#fields img {{max-{direction}: {limit} }}""")
            self.web.eval(f"""max_{direction} = "{limit}";""")
    self.web.eval(
        f"""preserve_ratio={json.dumps(getUserOption("preserve ratio while resizing", True))}""")


Editor.setupWeb = wrap(Editor.setupWeb, setBrowserResizeImage)
