* apply maximum height/width when not resizing: true or false. Whether to limit the height/width of image in the editor. You must then click on the image to be able to resize it.
*max-height/max-width: which limit to apply to image (only if previous value is set to true). It can be any valid css value. px, %.. any units of https://www.w3schools.com/cssref/css_units.asp
* Apply minimum height/width: true or false. This ensure that you don't resize your image to 0 px and then lost it. Set it to false if you have some reason to want really small images.
* min-height/min-width: which limit to apply to image (only if previous value is set to true). It can be any valid css value. px, %.. any units of https://www.w3schools.com/cssref/css_units.asp
* preserve ratio: It value can be: "current" (preserve the current ration. If image was resized, it will keep the new ratio), "original" (if image was resized, it'll take back original ratio). With any other value it'll resize freely.
* resizable style: css style to apply to resizable elements. This allow users to see the border for images without border. It allows to see whether an image is resizable.
