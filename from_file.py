import os

__location__ = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__)))


def str_from_file_name(file_name):
    file_path = os.path.join(__location__, file_name)
    with open(file_path, "r") as f:
        return f.read()


def str_from_file_name_in_tag(file_name: str, tag=None):
    if tag is None:
        if file_name.endswith(".js"):
            tag = "script"
        elif file_name.endswith(".css"):
            tag = "style"
        else:
            raise Exception(
                "No tag, and files {file_name} does not ends with .js or .css")
    return f"<{tag}>{str_from_file_name(file_name)}</{tag}>"


def add_style_in_web(self, string):
    string = string.replace("\\", "\\\\").replace(
        "'", "\\'").replace("\n", "\\\n")
    eval = f"""$('head').append('<style ="text/css">{string}</style>')"""
    self.web.eval(eval)
