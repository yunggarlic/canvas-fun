# How to
1. Clone the repository.
2. Navigate to the directory and open index.html in the browser
3. Draw on the canvas with the mouse.

## Explanation
1. The main branch's approach to redrawing the canvas is to use image data through get and put methods. In a small example, this is fine.
2. However, in a larger example, saving and restoring data from image data is longer than running a series of commands to perform the redraw.
3. This example implements a tiny command pattern.