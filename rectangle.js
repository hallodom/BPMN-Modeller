// Need to wait for the canvas element to be ready so good to use onload event

window.onload = init;

function init() {
	var canvas = document.getElementById("square");
	if (typeof canvas.getContext != "undefined") {
		// Default colour is black
		var context = canvas.getContext("2d");
		// can change colour by setting fillStyle property
		context.fillStyle = "#0066CC";
		// can also do an RGBA value (rgba(255, 0, 0, 0.5))
		context.fillRect(0, 0, 400, 400);

		// clears out and area of the rectangle to make it transparent
		context.clearRect(75, 75, 250, 250);
		// we can also apply a stroke
		// offset the stroke so that the line doesn't blur due to the stroke being applied central
		// The color of the stroke can be controlled using the strokeStyle property
		context.strokeStyle = "#FF0000";
		context.strokeRect(150.5, 150.5, 100, 100);
		
	}
};