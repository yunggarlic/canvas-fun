const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let painting = false;
let paintingAllowed = true;
let states = [];

/**
 * Start drawing when the mouse button is pressed down
 * @param {Event} e - The mousedown event
 */
function startPosition(e) {
	if (!paintingAllowed) return;
	painting = true;
	draw(e);
}

/**
 * Finish drawing when the mouse button is released
 */
function finishedPosition() {
	painting = false;
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
		console.log(ctx.createImageData(canvas.width, canvas.height));
		states.pop();
		ctx.putImageData(
			states[states.length - 1] ||
				ctx.createImageData(canvas.width, canvas.height),
			0,
			0
		);
	}
}

function allowPainting(e) {
	paintingAllowed = !paintingAllowed;
	this.classList.toggle("active");
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

document.getElementById("undo").addEventListener("click", undo);
document.getElementById("toggle").addEventListener("click", allowPainting);
