import sys

from aqt import mw
from aqt.utils import showWarning

# to be configured by Dev
############################
addonName = "Resize images"
version = 0


def newVersion():
    pass


"""A string stating what could occurs with a wrong configuration file"""
otherwise = ""


# end configuration

userOption = None


def writeConfig():
    mw.addonManager.writeConfig(__name__, userOption)


def _getUserOption():
    global userOption
    if userOption is None:
        userOption = mw.addonManager.getConfig(__name__)


def getUserOption(key=None, default=None):
    """Get the user option if it is set. Otherwise return the default
    value and add it to the config.

    When an add-on was updated, new config key was not added. This
    was a problem because users never discovered those configs. By adding
    it to the config file, users will see the option and could configure it.

    """
    _getUserOption()
    if key is None:
        return userOption
    if key in userOption:
        return userOption[key]
    else:
        userOption[key] = default
        writeConfig()
        return default


lastVersion = getUserOption(version, 0)
if lastVersion < version:
    newVersion()
    pass
if lastVersion > version:
    t = f"Please update add-on {addonName}. It seems that your configuration file is made for a more recent version of the add-on."
    if otherwise:
        t += "\n" + otherwise
    showWarning(t)


def update(_):
    global userOption, fromName
    userOption = None
    fromName = None


mw.addonManager.setConfigUpdatedAction(__name__, update)

fromName = None


def getFromName(name):
    global fromName
    if fromName is None:
        fromName = dict()
        for dic in getUserOption("columns"):
            fromName[dic["name"]] = dic
    return fromName.get(name)


def setUserOption(key, value):
    _getUserOption()
    userOption[key] = value
    writeConfig()
