import os

from anki.lang import _
from aqt.editor import *
from aqt.editor import _html

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))
css_file = os.path.join(__location__, "jquery-ui.css")
with open(css_file, "r") as f:
    css = f.read()

js_file = os.path.join(__location__, "js.js")

css = f"""<style>{css}</style>"""


def setupWeb(self):
    self.web = EditorWebView(self.widget, self)
    self.web.title = "editor"
    self.web.allowDrops = True
    self.web.onBridgeCmd = self.onBridgeCmd
    self.outerLayout.addWidget(self.web, 1)

    # List of buttons on top right of editor
    righttopbtns = list()
    righttopbtns.append(self._addButton('text_bold', 'bold',
                                        _("Bold text (Ctrl+B)"), id='bold'))
    righttopbtns.append(self._addButton(
        'text_italic', 'italic', _("Italic text (Ctrl+I)"), id='italic'))
    righttopbtns.append(self._addButton('text_under', 'underline', _(
        "Underline text (Ctrl+U)"), id='underline'))
    righttopbtns.append(self._addButton('text_super', 'super', _(
        "Superscript (Ctrl++)"), id='superscript'))
    righttopbtns.append(self._addButton('text_sub', 'sub',
                                        _("Subscript (Ctrl+=)"), id='subscript'))
    righttopbtns.append(self._addButton(
        'text_clear', 'clear', _("Remove formatting (Ctrl+R)")))
    # The color selection buttons do not use an icon so the HTML must be specified manually
    tip = _("Set foreground colour (F7)")
    righttopbtns.append('''<button tabindex=-1 class=linkb title="{}"
            type="button" onclick="pycmd('colour');return false;">
            <div id=forecolor style="display:inline-block; background: #000;border-radius: 5px;"
            class=topbut></div></button>'''.format(tip))
    tip = _("Change colour (F8)")
    righttopbtns.append('''<button tabindex=-1 class=linkb title="{}"
            type="button" onclick="pycmd('changeCol');return false;">
            <div style="display:inline-block; border-radius: 5px;"
            class="topbut rainbow"></div></button>'''.format(tip))
    righttopbtns.append(self._addButton(
        'text_cloze', 'cloze', _("Cloze deletion (Ctrl+Shift+C)")))
    righttopbtns.append(self._addButton(
        'paperclip', 'attach', _("Attach pictures/audio/video (F3)")))
    righttopbtns.append(self._addButton(
        'media-record', 'record', _("Record audio (F5)")))
    righttopbtns.append(self._addButton('more', 'more'))
    righttopbtns = runFilter("setupEditorButtons", righttopbtns, self)

    # Fields... and Cards... button on top lefts, and
    lefttopbtns = """
                <button title='%(fldsTitle)s' onclick="pycmd('fields')">%(flds)s...</button>
                <button title='%(cardsTitle)s' onclick="pycmd('cards')">%(cards)s...</button>
        """ % dict(flds=_("Fields"), cards=_("Cards"),
                   fldsTitle=_("Customize Fields"),
                   cardsTitle=shortcut(_("Customize Card Templates (Ctrl+L)")))
    topbuts = """
            <div id="topbutsleft" style="float:left;">
                %(lefttopbtns)s
            </div>
            <div id="topbutsright" style="float:right;">
                %(rightbts)s
            </div>
        """ % dict(lefttopbtns=lefttopbtns, rightbts="".join(righttopbtns))
    bgcol = self.mw.app.palette().window().color().name()
    # then load page
    html = _html % (
        bgcol, bgcol,
        topbuts,
        _("Show Duplicates"))
    with open(js_file, "r") as f:
        js = f.read()
    js = f"""<script>{js}</script>"""

    self.web.stdHtml(html,
                     css=["editor.css"],
                     # only difference, css and js file and -ui
                     js=["jquery.js", "jquery-ui.js", "editor.js"],
                     head=js+css)


Editor.setupWeb = setupWeb


def loadNote(self, focusTo=None):
    """Todo

    focusTo -- Whether focus should be set to some field."""
    if not self.note:
        return

    # field name, field content modified so that it's image's url can be used locally.
    data = []
    for fld, val in list(self.note.items()):
        data.append((fld, self.mw.col.media.escapeImages(val)))
    self.widget.show()
    self.updateTags()

    def oncallback(arg):
        if not self.note:
            return
        self.setupForegroundButton()
        self.checkValid()
        if focusTo is not None:
            self.web.setFocus()
        runHook("loadNote", self)

    # only change is setFields_
    self.web.evalWithCallback("setFields_(%s); setFonts(%s); focusField(%s); setNoteId(%s)" % (
        json.dumps(data),
        json.dumps(self.fonts()), json.dumps(focusTo),
        json.dumps(self.note.id)),
        oncallback)


Editor.loadNote = loadNote


def addMedia(self, path, canDelete=False):
    html = self._addMedia(path, canDelete)
    self.web.eval("setFormat_('inserthtml', %s);" % json.dumps(html))


Editor.addMedia = addMedia
