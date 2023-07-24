# How to
1. Clone the repository.
2. Navigate to the directory and open index.html in the browser
3. Draw on the canvas with the mouse.

## Explanation
1. There are multiple approaches to redrawing a canvas. 
2. This example uses a command pattern to store the data for each stroke. The data is then used to redraw the canvas. In a smaller example like this one, it's overkill but highlights a pattern that is meant to be less memory intensive.
3. Another way to perform a redraw is to save the entire canvas as an image and redraw from the image data. This is a fine approach for smaller canvasses. For larger canvasses, it can be slow and memory intensive.