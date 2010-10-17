/**
 * BPMN Modeller - Core Graphics package
 * 
 * Use functions with BPMNMCG.functionName( params );
 * 
 */

// Create name space BPMNMCoreGraphics (BPMNMCG)
(function() {
	if (!window.BPMNMCG) {
		window['BPMNMCG'] = {};
	};

	function Activity(params) {
		params = params || {};

		this.xStart = params.xStart || 30;
		this.yStart = params.yStart || 30;
		this.width = params.width || 140;
		this.height = params.height || 100;

		this.radius = params.radius || 10;

		this.borderWidth = params.borderWidth || 2;
		this.strokeColour = params.strokeColour || '#000';
		this.fillColour = params.fillColour || '#fff';

		this.draw = function() {

			ctx.beginPath();

			ctx.moveTo(this.xStart, this.yStart + this.radius);
			ctx.lineWidth = this.borderWidth;
			ctx.lineTo(this.xStart, this.yStart + this.height - this.radius);
			ctx.quadraticCurveTo(this.xStart, this.yStart + this.height, this.xStart + this.radius, this.yStart + this.height);
			ctx.lineTo(this.xStart + this.width - this.radius, this.yStart + this.height);
			ctx.quadraticCurveTo(this.xStart + this.width, this.yStart + this.height, this.xStart + this.width, this.yStart + this.height - this.radius);
			ctx.lineTo(this.xStart + this.width, this.yStart + this.radius);
			ctx.quadraticCurveTo(this.xStart + this.width, this.yStart, this.xStart + this.width - this.radius, this.yStart);
			ctx.lineTo(this.xStart + this.radius, this.yStart);
			ctx.quadraticCurveTo(this.xStart, this.yStart, this.xStart, this.yStart + this.radius);

			ctx.strokeStyle = this.strokeColour;
			ctx.fillStyle = this.fillColour;

			ctx.fill();
			ctx.stroke();
		};
		return this;
	};
	window['BPMNMCG']['Activity'] = Activity;

	function Group(params) {
		// TODO: Implement border width across other GC elements.
		params = params || {};

		this.xStart = params.xStart || 30;
		this.yStart = params.yStart || 30;
		this.width = params.width || 140;
		this.height = params.height || 100;

		this.radius = params.radius || 10;

		this.borderWidth = params.borderWidth || 2;
		this.strokeColour = params.strokeColour || '#000';
		this.fillColour = params.fillColour || '#fff';
		this.strokePattern = [ 2, 10, 20, 10 ];

		this.draw = function() {

			ctx.beginPath();
			ctx.moveTo(this.xStart, this.yStart + this.radius);
			ctx.lineWidth = this.borderWidth;
			ctx.dashedLineTo(this.xStart, this.yStart + this.radius, this.xStart, this.yStart + this.height - this.radius, this.strokePattern);
			ctx.quadraticCurveTo(this.xStart, this.yStart + this.height, this.xStart + this.radius, this.yStart + this.height);
			ctx.dashedLineTo(this.xStart + this.radius, this.yStart + this.height, this.xStart + this.width - this.radius, this.yStart + this.height, this.strokePattern);
			ctx.quadraticCurveTo(this.xStart + this.width, this.yStart + this.height, this.xStart + this.width, this.yStart + this.height - this.radius);
			ctx.dashedLineTo(this.xStart + this.width, this.yStart + (this.height - this.radius), this.xStart + this.width, this.yStart + this.radius, this.strokePattern);
			ctx.quadraticCurveTo(this.xStart + this.width, this.yStart, this.xStart + this.width - this.radius, this.yStart);
			ctx.dashedLineTo(this.xStart + this.width - this.radius, this.yStart, this.xStart + this.radius, this.yStart, this.strokePattern);
			ctx.quadraticCurveTo(this.xStart, this.yStart, this.xStart, this.yStart + this.radius);
			ctx.strokeStyle = this.strokeColour;
			ctx.fillStyle = this.fillColour;
			ctx.fill();
			ctx.stroke();
		};
		return this;
	};
	window['BPMNMCG']['Group'] = Group;

	function Event(params) {
		params = params || {};

		this.xStart = params.xStart || 60;
		this.yStart = params.yStart || 300;
		this.width = params.width || 40;
		this.height = params.height || 40;
		this.radius = this.width / 2;
		this.lineWidth = 4;
		// Event can be of type start or end.
		if (typeof (params.type) !== 'undefined') {
			this.type = params.type;
		} else {
			this.type = 'start';
		}

		this.draw = function() {

			// Check type
			ctx.save();
			ctx.beginPath();
			if (this.type == 'start') {
				ctx.strokeStyle = "rgba(30,255,116,1)";
			} else if (this.type == 'end') {
				ctx.strokeStyle = "rgba(255,75,75,1)";
			}

			ctx.arc(this.xStart, this.yStart, this.radius, 0, Math.PI * 2, true);
			ctx.lineWidth = 4;
			ctx.stroke();
			ctx.restore();

		};
		// alert(this.type);
		return this;

	};
	window['BPMNMCG']['Event'] = Event;

	function Gateway(params) {

		params = params || {};

		this.xStart = params.xStart || 30;
		this.yStart = params.yStart || 200;
		this.width = params.width || 65;
		this.height = params.height || 65;

		this.draw = function() {
			// Stroked triangle
			ctx.beginPath();
			// Start path at moveTo location
			ctx.moveTo(this.xStart, this.yStart);
			ctx.lineTo(this.xStart + (this.width / 2), this.yStart + (this.width / 2));
			ctx.lineTo(this.xStart + this.width, this.yStart);
			ctx.lineTo(this.xStart + (this.width / 2), this.yStart - (this.width / 2));
			ctx.closePath();
			ctx.stroke();

		};
		return this;

	};
	window['BPMNMCG']['Gateway'] = Gateway;

	function SequenceFlow(params) {

		params = params || {};

		this.xStart = params.xStart || 200;
		this.yStart = params.yStart || 400;
		this.xEnd = params.xEnd || this.xStart * 3;
		this.yEnd = params.yEnd || this.yStart;

		// Stroked triangle
		ctx.beginPath();
		// Start path at moveTo location
		ctx.moveTo(this.xStart, this.yStart);
		ctx.lineTo(this.xEnd, this.yEnd);

		// Draw arrow head based on line width
		// TODO: arrow head dependent on line width some how
		// length of the arrow head can be dependant on width.
		this.draw = function() {
			// 'Lift pencil' so we don't get a fill
			ctx.moveTo(this.xEnd, this.yEnd);

			// TODO: Make number 4 here the stroke width

			ctx.lineTo(this.xEnd, this.yEnd + 4);
			ctx.lineTo(this.xEnd + (4 * 4), this.yEnd);
			ctx.lineTo(this.xEnd, this.yEnd - 4);
			ctx.fillStyle = '#000';
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
		};
		return this;

	};
	window['BPMNMCG']['SequenceFlow'] = SequenceFlow;

	function MessageFlow(params) {

		params = params || {};

		this.xStart = params.xStart || 200;
		this.yStart = params.yStart || 500;
		this.xEnd = params.xEnd || this.xStart * 3;
		this.yEnd = params.yEnd || this.yStart;

		var radius = (4 * 2) / 1.8;
		// Want to start arrow line after the circle so add radius to xStart
		var newStartX = this.xStart + radius;

		// Need to get line length to calculate dash widths - take starting
		// point from end point
		var lineLength = this.xStart - this.xEnd;
		// Make number positive by taking away itself * 2 to bring it into
		// positive number realm
		lineLength = lineLength - (lineLength * 2);

		this.draw = function() {

			// Draw circle starting point
			ctx.beginPath();
			ctx.arc(this.xStart, this.yStart, radius, 0, Math.PI * 2, true); // Outer
			ctx.stroke();

			// Start path at moveTo location to draw line
			ctx.moveTo(newStartX, this.yStart);

			ctx.dashedLineTo(this.xStart + radius, this.yStart, this.xEnd, this.yEnd, [ 20, 15 ]);

			// Draw arrow head based on line width
			// TODO: arrow head dependent on line width some how
			// length of the arrow head can be dependent on width.

			// 'Lift pencil' so we don't get a fill
			ctx.moveTo(this.xEnd, this.yEnd);

			// TODO: Make number 4 here the stroke width

			ctx.lineTo(this.xEnd, this.yEnd + radius);
			ctx.lineTo(this.xEnd + (4 * (radius / 1.5)), this.yEnd);
			ctx.lineTo(this.xEnd, this.yEnd - radius);
			ctx.fillStyle = '#fff';
			ctx.fill();
			ctx.closePath();
			ctx.stroke();
		};

	};
	window['BPMNMCG']['MessageFlow'] = MessageFlow;

	function Association(params) {
		params = params || {};

		this.xStart = params.xStart || 200;
		this.yStart = params.yStart || 600;
		this.xEnd = params.xEnd || this.xStart * 3;
		this.yEnd = params.yEnd || this.yStart;

		// TODO: if xEnd is different from starting end then need to start using
		// quadratic curves to correct ratio
		this.draw = function() {
			ctx.beginPath();
			// Start path at moveTo location
			ctx.moveTo(this.xStart, this.yStart);

			ctx.dashedLineTo(this.xStart, this.yStart, this.xEnd + 6, this.yEnd, [ 5, 5 ]);

			// Draw arrow head based on line width
			// TODO: arrow head dependent on line width some how
			// length of the arrow head can be dependant on width.

			// 'Lift pencil' so we don't get a fill
			ctx.moveTo(this.xEnd, this.yEnd);
			ctx.moveTo(this.xEnd + (4 * 4), this.yEnd);

			// TODO: Make number 4 here the stroke width

			ctx.lineTo(this.xEnd, this.yEnd + 6);
			ctx.moveTo(this.xEnd + (4 * 4), this.yEnd);
			ctx.lineTo(this.xEnd, this.yEnd - 6);
			ctx.moveTo(this.xEnd + (4 * 4), this.yEnd);
			ctx.closePath();
			ctx.stroke();
		};

	};
	window['BPMNMCG']['Association'] = Association;

	function Pool(params) {
		params = params || {};

		this.xStart = params.xStart || 100;
		this.yStart = params.yStart || 200;
		this.width = params.width || 800;
		this.height = params.height || 200;
		this.label = params.label || 'untitled';
		this.lanes = params.lanes || 0;
		// Properties for label
		var labelWidth = 40;
		var fontSize = 16;

		if (this.lanes > 0) {
			// draw lane
			// 1 = 1 half
			// 2 = 2 a third
			// 4 = a quarter
			switch (this.lanes) {
			case 1:
				this.height = this.height * 2;
				break;
			}

		}

		// Maybe objects can always implement a draw method as part of an
		// interface
		// that can later be used in the command pattern?
		this.draw = function() {

			ctx.beginPath();
			ctx.moveTo(this.xStart, this.yStart);

			// Lineto should be defined by box width
			ctx.lineTo(this.xStart + this.width, this.yStart);
			// Move line up
			ctx.lineTo(this.xStart + this.width, this.yStart - this.height);
			// Next Line to should be defined by height of the box
			ctx.lineTo(this.width - this.width + this.xStart, this.yStart - this.height);
			ctx.closePath();

			// If has lanes
			if (this.lanes > 0) {
				switch (this.lanes) {
				case 1:
					ctx.moveTo(this.xStart + labelWidth, this.yStart - (this.height / 2));
					ctx.lineTo(this.xStart + this.width, this.yStart - (this.height / 2));
					break;
				}
			}

			// Create label

			ctx.moveTo(this.xStart + labelWidth, this.yStart);
			ctx.lineTo(this.xStart + labelWidth, this.yStart - this.height);

			// TODO: Make font and align to label space
			// Save current context state
			ctx.closePath();
			ctx.save();

			// Set new canvas point of origin
			// TODO: Ideally the alignment should be half the height of the box
			// and also half the height of the text
			// which isn't available yet
			ctx.translate(this.xStart + (labelWidth / 2) - (fontSize / 2), this.yStart - ((this.height / 2) - 35));
			// Rotate on new origin
			ctx.rotate(270 * Math.PI / 180);

			ctx.textBaseline = 'top';
			ctx.fillStyle = '#000';
			ctx.font = 'bold ' + fontSize + 'px arial';
			ctx.fillText(this.label, 0, 0);

			// Restore saved state so that all future shapes are not draw from
			// new
			// transform rotated location
			ctx.restore();
			ctx.stroke();
		};
		this.getLabel = function() {
			return this.label;
		};

		// return this object
		return this;

	};

	window['BPMNMCG']['Pool'] = Pool;

	function DataObject(params) {
		params = params || {};

		// There are probably a few critical variables here that should
		// necessarily be defined and therefore can throw errors
		// if undefined

		// Start by parsing objects properties then organise default fall
		// backs
		// Check data types and value ranges
		this.xStart = params.xStart || 100;
		this.yStart = params.yStart || 200;
		this.width = params.width || 60;
		this.height = params.height || 70;
		this.label = params.label || 'untitled';

		// Maybe objects can always implement a draw method as part of an
		// interface
		// that can later be used in the command pattern?
		this.draw = function() {

			ctx.beginPath();
			ctx.moveTo(this.xStart, this.yStart);

			// Lineto should be defined by box width
			ctx.lineTo(this.xStart, this.yStart + this.height);
			// Move line up
			ctx.lineTo(this.xStart + this.width, this.yStart + this.height);
			ctx.lineTo(this.xStart + this.width, this.yStart + 10);
			ctx.lineTo(this.xStart + this.width - 10, this.yStart + 10);
			ctx.lineTo(this.xStart + this.width - 10, this.yStart);
			ctx.lineTo(this.xStart, this.yStart);
			// Now for the fold
			ctx.moveTo(this.xStart + this.width - 10, this.yStart);
			ctx.lineTo(this.xStart + this.width, this.yStart + 10);
			// Stroke
			ctx.stroke();
			ctx.closePath();

		};
		// return this object
		return this;

	};

	window['BPMNMCG']['DataObject'] = DataObject;

	function TextAnnotation(params) {
		params = params || {};

		this.xStart = params.xStart || 100;
		this.yStart = params.yStart || 200;
		this.width = params.width || 20;
		this.height = params.height || 150;
		// End point should always be middle of the Annotation text frame
		this.xEnd = params.xEnd || alert('error');
		this.yEnd = params.yEnd || alert('error');

		this.draw = function() {

			// Start path at moveTo location
			ctx.moveTo(this.xStart, this.yStart);
			ctx.lineTo(this.xStart + this.width, this.yStart);
			ctx.moveTo(this.xStart, this.yStart);
			ctx.lineTo(this.xStart, this.yStart + this.height);
			ctx.moveTo(this.xStart, this.yStart + this.height);
			ctx.lineTo(this.xStart + this.width, this.yStart + this.height);
			ctx.moveTo(this.xStart, this.yStart + (this.height / 2));
			ctx.dashedLineTo(this.xStart, this.yStart + (this.height / 2), this.xStart - 60, this.yStart, [ 2, 7 ]);

			ctx.closePath();
			ctx.stroke();

		};
		return this;

	};
	window['BPMNMCG']['TextAnnotation'] = TextAnnotation;

})();

// This function extends the Canvas object to add a dashedLineTo function
// Original source from:
// http://davidowens.wordpress.com/category/programming/javascript/
CanvasRenderingContext2D.prototype.dashedLineTo = function(fromX, fromY, toX, toY, pattern) {
	// Our growth rate for our line can be one of the following:
	// (+,+), (+,-), (-,+), (-,-)
	// Because of this, our algorithm needs to understand if the x-coord and
	// y-coord should be getting smaller or larger and properly cap the values
	// based on (x,y).
	var lt = function(a, b) {
		return a <= b;
	};
	var gt = function(a, b) {
		return a >= b;
	};
	var capmin = function(a, b) {
		return Math.min(a, b);
	};
	var capmax = function(a, b) {
		return Math.max(a, b);
	};

	var checkX = {
		thereYet : gt,
		cap : capmin
	};
	var checkY = {
		thereYet : gt,
		cap : capmin
	};

	if (fromY - toY > 0) {
		checkY.thereYet = lt;
		checkY.cap = capmax;
	}
	if (fromX - toX > 0) {
		checkX.thereYet = lt;
		checkX.cap = capmax;
	}

	this.moveTo(fromX, fromY);
	var offsetX = fromX;
	var offsetY = fromY;
	var idx = 0, dash = true;
	while (!(checkX.thereYet(offsetX, toX) && checkY.thereYet(offsetY, toY))) {
		var ang = Math.atan2(toY - fromY, toX - fromX);
		var len = pattern[idx];

		offsetX = checkX.cap(toX, offsetX + (Math.cos(ang) * len));
		offsetY = checkY.cap(toY, offsetY + (Math.sin(ang) * len));

		if (dash)
			this.lineTo(offsetX, offsetY);
		else
			this.moveTo(offsetX, offsetY);

		idx = (idx + 1) % pattern.length;
		dash = !dash;
	}
};
