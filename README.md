# Resize image in editor
## Rationale
Some people want to resize images without going through an external
editor. This add-ons just add this feature.

### Size limit
It seems a lot of users want to still be able to use [maximum image height in card editor](https://ankiweb.net/shared/info/229181581). Both add-on can not co exists, so I had to implement its feature in my add-on. 

## History
### This add-on development.
This feature was [voted](https://www.reddit.com/r/Anki/comments/ex8h23/unofficial_feature_voting_system_february_2020/) the most wanted feature by Anki's subreddit community. I currently don't have a job and would have liked to figure out how to make a little bit of money from the (tens of?) thousands of users my add-ons have. I also don't want to limit the access to people who paid; once I have the money, I expected that every user, with or without money, could have access to it. I explained on [my blog](http://www.milchior.fr/blog_en/index.php/post/2020/02/17/How-hard-can-it-be-to-code-a-feature-to-let-users-resize-images-in-a-software) why it was actually complex to create.

May be I am just wrong on a financiary level and should copy Glutanimate's [Patreon](https://www.patreon.com/glutanimate). He seems to have far more success than me while letting some of his very useful add-ons to paying users only.

### Other ways to resize image
* The add-on
[ImageResizer](https://ankiweb.net/shared/info/1214357311) partially resize the image, but only once, when the image is added. So you should now in advance which size you want.
* The add-on [Image style editor](https://ankiweb.net/shared/info/1593969147) allows to resize any image by entering the wanted height and width. That does the job, but it's not as intuitive as a click and drag.
* The add-on [maximum image height in card editor](https://ankiweb.net/shared/info/229181581) resize images, but in the editor only, to ensure it does not takes too much room. That's a really cool idea, but not what people where looking for.

## Incompatible add-on
Currently, this add-on is not compatible with "multi-column note
editor". No other uncompatiblities are currently known.

## Warning
The add-on have been tested and seems to work with every users now. I should however note that if you yourself are used to manipulate the html of your fields, unexpected results may occur. For example if for some reason you did add classes, max-height, max-width... to some of your images.

## Configuration
### Ratio
By default, resizing preserve ratio. I assume that's the usual way to resize image and that it is what user want. If you want to be able to resize without preserving ratio, you need to switch "preserve ratio while resizing" to false. You can always resize and preserve ratio by pressing shift while resizing. 

You can also set this value to "original". In this case, the image will always have the original ratio. The main advantage being that this ratio will be preserved even if you add maximum height or width.

### Maximum height or width
You can tell the add-on to limit the height and/or width in the editor. This way, big images does not actually takes a lot of place. If you do so, you'll need to click on images before being able to resize them. You'll then need to click again if you want the maximums to be applied.

Note that the ratio won't be preserved, unless you did set "preserve ratio while resizing" to "original".

### Minimal height and width
By default, an image will never be less than 10 px in height and width. This ensure that you can always resize the image. Otherwise, you could reduce height/width by accident to 0 px and then have the image disappear. You could change this value if you need to have smaller images; but I believe it'll be rare.


## Internal
This add-on replace the method `Editor.setupWeb`. The new method calls the previous method.

## TODO
### Resizing in reviewer
If I reach 400 € (100 more than the initial goal) on the [kickstarter](https://www.kickstarter.com/projects/arthurmilchior/image-resizing-in-anki/description), I'll make a pull request to the author of (Edit Field During Review (Cloze))[https://ankiweb.net/shared/info/385888438] so that they can incorporate my feature in their add-on.

### Thanks
I can not yet add the list of supporter on kickstarter. Because kickstarter does not allow me to ask users the name they want to see in the thank you list before the end date of the kickstarter.

### Max height/width
Currently, when max-heigh/width is applied to an image which have been resized, the new size is not proportional to the old one. I don't see any easy way to correct it. May be try to figure it one day.

### Frozen fields
While this add-on is mostly compatible with frozen fields, once you freeze/unfreeze a field, images are not resizable anymore. I submitted a correction to Frozen Field add-on. You can beta test it (https://github.com/glutanimate/frozen-fields/releases/tag/v2.1.0)[here]. Please tell us (here)[https://github.com/glutanimate/frozen-fields/pull/15#event-3054473127] whether it did work correctly; in which case the add-on will be updated on ankiweb.

### Hook
Once 2.1.21 is publicly available (not in beta) I should use new's hook to add the javascript to the editor with the hook instead of changing the method setupWeb.

### Contribution
This add-on has been crowdfunden on (Kickstarter)[https://www.kickstarter.com/projects/arthurmilchior/image-resizing-in-anki]. Thanks to:
* The AnKing
* Pravin Manju Vence
* and other (contributors)[contributors.md] 

## Links, licence and credits

Key         |Value
------------|-------------------------------------------------------------------
Copyright   | Arthur Milchior <arthur@milchior.fr>
Based on    | Anki code by Damien Elmes <anki@ichi2.net>
and on      | [maximum image height in card editor](https://ankiweb.net/shared/info/229181581) by Simone Gaiarin
Incorporating| jquery-ui (under MIT license)
License     | GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
Source in   | https://github.com/Arthur-Milchior/anki-resize-image
Addon number| [1103084694](https://ankiweb.net/shared/info/1103084694)
Support me on| [![Ko-fi](https://ko-fi.com/img/Kofi_Logo_Blue.svg)](Ko-fi.com/arthurmilchior) or [![Patreon](http://www.milchior.fr/patreon.png)](https://www.patreon.com/bePatron?u=146206)
