const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let togglePainting = true;
let states = [];

/**
 * Start drawing when the mouse button is pressed down
 * @param {Event} e - The mousedown event
 */
function startPosition(e) {
	if (!togglePainting) return;
	draw(e);
}

/**
 * Finish drawing when the mouse button is released
 */
function finishedPosition() {
	if (!togglePainting) return;
	ctx.beginPath();
	states.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

/**
 * Draw lines on the canvas while the mouse is moving
 * @param {Event} e - The mousemove event
 */
function draw(e) {
	if (!painting) return;
	ctx.lineWidth = 5;
	ctx.lineCap = "round";

	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(e.offsetX, e.offsetY);
}

/**
 * Undo the last drawn state on the canvas
 */
function undo() {
	if (states.length > 0) {
		states.pop();
		ctx.putImageData(
			states[states.length - 1] ||
				ctx.createImageData(canvas.width, canvas.height),
			0,
			0
		);
	}
}

function toggleDrawing(e) {
	togglePainting = !togglePainting;
	this.classList.toggle("active");
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("toggle").addEventListener("click", toggleDrawing);
