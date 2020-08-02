# Resize image in editor
## Rationale
Some people want to resize images without going through an external
editor. This add-on adds that exact feature.

### Size limit
It seems a lot of users want to still be able to use the [maximum image height in card editor](https://ankiweb.net/shared/info/229181581) add-on.
I had to implement its feature in my add-on since both add-ons cannot be used simultaneously.

## History
### Development of this add-on
This feature was [voted](https://www.reddit.com/r/Anki/comments/ex8h23/unofficial_feature_voting_system_february_2020/) the most wanted feature by Anki's subreddit community.
I currently don't have a job and would have liked to figure out how to make a little bit of money from the (tens of?) thousands of users my add-ons have.
I also don't want to limit the access to only people who paid for my add-ons; once I have the money, I expected that every user, with or without money, could have access to them.
I explained on [my blog](http://www.milchior.fr/blog_en/index.php/post/2020/02/17/How-hard-can-it-be-to-code-a-feature-to-let-users-resize-images-in-a-software) why it was actually complex to create.

Maybe I am just wrong on a financiary level and should copy Glutanimate's [Patreon](https://www.patreon.com/glutanimate).
He seems to have far more success than me while some of his very useful add-ons are only accessible to paid users.

### Compatibility with mobile

In order to be compatible with mobile, the default decision is to ignore image size on mobile. This is done thanks to the default value of the configuration "note-type style". If you know some CSS, feel free to change it if you need it. Default value should work for most people.

### Other ways to resize an image
* The add-on [ImageResizer](https://ankiweb.net/shared/info/1214357311) resizes images but only when a new image is added.
So you must know in advance which size you want.
It is a set-and-forget, one-size-fits-all option.
It is convenient because it runs automatically, but it does not allow for easily sizing images differently or changing image sizes after they've been added to a note.
* The add-on [Image style editor](https://ankiweb.net/shared/info/1593969147) allows the user to resize any image by entering the desired height and width.
That does the job, but it's not as intuitive as a click and drag.
* The add-on [maximum image height in card editor](https://ankiweb.net/shared/info/229181581) resize images, but in the editor only, to ensure it does not takes too much room.
That's a really cool idea, but not what people were looking for.

## Incompatible add-ons
* [maximum image height in card editor](https://ankiweb.net/shared/info/229181581) - its functionality has been incorporated into this add-on so there is no need to use both add-ons.

No other incompatiblities are currently known.

## Warning
The add-on has been tested and seems to work with all users now.
I should however note that if you are used to manipulating the html of your fields, unexpected results may occur.
For example if for some reason you added classes, max-height, max-width... to some of your images.

## Configuration
### Ratio
By default, resizing preserves the height:width ratio. I assume that's the usual way to resize an image and that is what the user wants.
If you want to be able to resize without preserving the aspect ratio, you need to switch `preserve ratio while resizing` to `false`.
You can always resize and preserve the acpect ratio by pressing `Shift` while resizing. 

You can also set this value to `original`. In this case, the image will always have the original ratio.
The main advantage is that this ratio will be preserved even if you add a maximum height or width.

### Maximum height or width
You can tell the add-on to limit the height and/or width in the editor.
This way, big images do not take up a lot of space.
If you do so, you'll need to click on the images before being able to resize them.
You'll then need to click again if you want the maximum to be applied.

Note that the ratio won't be preserved, unless you had set `preserve ratio while resizing` to `original`.

### Minimum height and width
By default, an image will never be less than 10 px in height and width.
This ensures that you can always resize the image.
Otherwise, you could reduce height/width by accident to 0 px and then have the image disappear.
You could change this value if you need to have smaller images, but I believe it'll be rare.

### draggable border width
`draggable border width` sets the width of the area on the image border that allows you to resize the image.

## Internal
This add-on replaces the method `Editor.setupWeb`. The new method calls the previous method.

## TODO
### Resizing in reviewer
~~If I reach 400 € (100 more than the initial goal) on the [kickstarter](https://www.kickstarter.com/projects/arthurmilchior/image-resizing-in-anki/description),
I'll make a pull request to the author of [Edit Field During Review (Cloze)](https://ankiweb.net/shared/info/385888438) so that they can incorporate my feature in their add-on.~~ Done!

### Max height/width
Currently, when max-height/width is applied to an image which has been resized, the new size is not proportional to the old one.
I don't see any easy way to correct it. Maybe try to figure it out one day.

### Hook
Once 2.1.21 is publicly available (not in beta) I should use a new hook to feed the javascript to the editor with the hook instead of changing the method setupWeb.

### Contribution
This add-on has been crowdfunded on [Kickstarter](https://www.kickstarter.com/projects/arthurmilchior/image-resizing-in-anki). Thanks to:
* The AnKing
* Pravin Manju Vence
* Joseph
* and other [contributors](contributors.md) 

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
Default css by | [AlienFever](https://github.com/Arthur-Milchior/anki-resize-image/issues/16#issuecomment-613541753)
