# konva-honeypot

Konva.js - A 2D canvas JS library for desktop and mobile applications. They do some cool stuff with Javascript. You need to add their script tag.

For this to work, we need to query selector a submit button, and that div I said we'll need the most

loadImage function loads images to the canvas. We need 2 images. the draggable one is, and the one we are going to drop on. 

isNearOutline function calculates if the draggable image is at least 20px closer to the dropping point. if it is, then it shall return true.

The initStage function is where the magic happens. CreateS a canvas and the layers. Image position, that's the draggable image position, this can be randomised.

This for-loop makes the image draggable. In line 81, we check if the draggable image is in the right place. If this is true, we increment the score to one, and send set submit button's disabled to false. this means that you can now submit the form
