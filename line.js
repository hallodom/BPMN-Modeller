var width = 230;
var height = 150;
var top = 50;
var left = 50;

createDiv(width,height,top,left);
// create canvas context
var ctx = document.getElementById('canvas').getContext('2d');
// create rectangle
roundedRectFillStroke(ctx,0,0,width,height,5);

// document event mouse down listener
document.onmousedown = function(e) { 
	
	x = e.clientX;
	y = e.clientY;
	
	// The area of our rectangle
	var rectangle = 230 * 150;
	var rectX = 50;
	var rectY = 50;
	
	// see if event click is with rectangle area
	if(x == rectX || x <= (230 + rectX) && x >= rectX)
	{
		if(y == rectY || y <= (150 + rectY) && y >= rectY)
		{
			alert(' here');
		}
		
	}
	
};

function draw() {
	var ctx = document.getElementById('canvas').getContext('2d');
	roundedRect(ctx, 12, 12, 150, 150, 15);
	roundedRect(ctx, 19, 19, 150, 150, 9);
	roundedRect(ctx, 53, 53, 49, 33, 10);
	roundedRect(ctx, 53, 119, 49, 16, 6);
	roundedRect(ctx, 135, 53, 49, 33, 10);
	roundedRect(ctx, 135, 119, 25, 49, 10);

	ctx.beginPath();
	ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, true);
	ctx.lineTo(31, 37);
	ctx.fill();
	for ( var i = 0; i < 8; i++) {
		ctx.fillRect(51 + i * 16, 35, 4, 4);
	}
	for (i = 0; i < 6; i++) {
		ctx.fillRect(115, 51 + i * 16, 4, 4);
	}
	for (i = 0; i < 8; i++) {
		ctx.fillRect(51 + i * 16, 99, 4, 4);
	}
	ctx.beginPath();
	ctx.moveTo(83, 116);
	ctx.lineTo(83, 102);
	ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
	ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
	ctx.lineTo(111, 116);
	ctx.lineTo(106.333, 111.333);
	ctx.lineTo(101.666, 116);
	ctx.lineTo(97, 111.333);
	ctx.lineTo(92.333, 116);
	ctx.lineTo(87.666, 111.333);
	ctx.lineTo(83, 116);
	ctx.fill();
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.moveTo(91, 96);
	ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
	ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
	ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
	ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
	ctx.moveTo(103, 96);
	ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
	ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
	ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
	ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
	ctx.fill();
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
	ctx.fill();
}
function roundedRect(ctx, x, y, width, height, radius) {
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
	ctx.stroke();
}

function roundedRectFillStroke(ctx, x, y, width, height, radius) {

	
	
	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
	ctx.fillStyle = "black";
	ctx.fill();

	// Dom
	// Next white part
	// reasoned that padding can be assigned being how thick the line is wanted
	// for the
	// inner white area
	var padding = 5;
	// Plus passing to x and y
	x = x + padding;
	y = y + padding;
	// Subract padding from width and hight doubled for left and right sides.
	height = height - padding * 2;
	width = width - padding * 2;
	// subtract padding from radius divided by two as we are inner radius
	radius = radius - padding / 2;

	ctx.beginPath();
	ctx.moveTo(x, y + radius);
	ctx.lineTo(x, y + height - radius);
	ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
	ctx.lineTo(x + width - radius, y + height);
	ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
	ctx.lineTo(x + width, y + radius);
	ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
	ctx.lineTo(x + radius, y);
	ctx.quadraticCurveTo(x, y, x, y + radius);
	ctx.fillStyle = "white";
	ctx.fill();

}

function createDiv(width,height,top,left)
{
	 if(typeof(top) === 'undefined') 
	 {
		var top = 20;
	 }
	 if(typeof(left) === 'undefined') 
	 {
		var left = 20;
	 }
	 if(typeof(width) === 'undefined') 
	 {
		 var width = 230;
	 }
	 if(typeof(height) === 'undefined') 
	 {
		 var height = 150;
	 }
	
	var html = '<div style=\"' + 'width:' + width + 'px; ' + 'height:' + height + 'px; ' + 'position: absolute; top:' + top + 'px; ' + 'left:' + left + 'px; \">';
	html += '<canvas id="canvas" width=\"' + width + 'px\" ' + 'height=\"' + height + 'px\" />';
	html += '</div>';

	document.write(html);
	
	
}
