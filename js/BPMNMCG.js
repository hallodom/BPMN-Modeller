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

	function drawPathRoundedRectangle(ctx, x, y, width, height, radius, borderWidth, strokeColour, fillColour) {
		// TODO: Implement border width across other GC elements.
		ctx.beginPath();
		ctx.moveTo(x, y + radius);
		ctx.lineWidth = borderWidth;
		ctx.lineTo(x, y + height - radius);
		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
		ctx.lineTo(x + width - radius, y + height);
		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
		ctx.lineTo(x + width, y + radius);
		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.quadraticCurveTo(x, y, x, y + radius);

		if (typeof (strokeColour) !== 'undefined') {
			ctx.strokeStyle = strokeColour;
		}

		if (typeof (fillColour) !== 'undefined') {
			ctx.fillStyle = fillColour;

		} else {
			ctx.fillStyle = '#fff';
		}

		ctx.fill();
		ctx.stroke();

	};
	window['BPMNMCG']['drawPathRoundedRectangle'] = drawPathRoundedRectangle;

	function drawPathCircle(ctx, x, y, radius) {

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, true); // Outer circle
		ctx.stroke();

	};
	window['BPMNMCG']['drawPathCircle'] = drawPathCircle;

	function drawPathDiamond(ctx, x, y, width) {

		// Stroked triangle
		ctx.beginPath();
		// Start path at moveTo location
		ctx.moveTo(x, y);
		ctx.lineTo(x + (width / 2), y + (width / 2));
		ctx.lineTo(x + width, y);
		ctx.lineTo(x + (width / 2), y - (width / 2));
		ctx.closePath();
		ctx.stroke();

	};
	window['BPMNMCG']['drawPathDiamond'] = drawPathDiamond;

	function drawSequenceFlow(ctx, xStart, yStart, xEnd, yEnd, width) {

		// Start point
		// End point
		// TODO: if xEnd is different from starting end then need to start using
		// quadratic curves to correct ratio

		// Stroked triangle
		ctx.beginPath();
		// Start path at moveTo location
		ctx.moveTo(xStart, yStart);
		ctx.lineTo(xEnd, yEnd);

		// Draw arrow head based on line width
		// TODO: arrow head dependent on line width some how
		// length of the arrow head can be dependant on width.

		// 'Lift pencil' so we don't get a fill
		ctx.moveTo(xEnd, yEnd);

		// TODO: Make number 4 here the stoke width

		ctx.lineTo(xEnd, yEnd + 4);
		ctx.lineTo(xEnd + (4 * 4), yEnd);
		ctx.lineTo(xEnd, yEnd - 4);
		ctx.fillStyle = '#000';
		ctx.fill();
		ctx.closePath();
		ctx.stroke();

	};
	window['BPMNMCG']['drawSequenceFlow'] = drawSequenceFlow;

	function drawMessageFlow(ctx, xStart, yStart, xEnd, yEnd, width) {

		// TODO: if xEnd is different from starting end then need to start using
		// quadratic curves to correct ratio

		var radius = (4 * 2) / 1.8;
		// Want to start arrow line after the circle so add radius to xStart
		var newStartX = xStart + radius;

		// Need to get line length to calculate dash widths - take starting
		// point from end point
		var lineLength = xStart - xEnd;
		// Make number positive by taking away itself * 2 to bring it into
		// positive number realm
		lineLength = lineLength - (lineLength * 2);

		// Use local method to draw circle
		drawPathCircle(ctx, xStart, yStart, radius);

		// Start path at moveTo location to draw line
		ctx.moveTo(newStartX, yStart);

		// Make dashes - We want 5px dashes and a 4px gap
		var dashWidthSetting = 6;
		var gapWidthSetting = 3;
		// Find out how many times we should write the dash
		var loopValue = lineLength / (dashWidthSetting + gapWidthSetting);
		// Decerement loop value by one as we don't want the final loop
		loopValue--;
		// Set lineTo (dashWidth) and moveTo (gapWidth) locations
		var dashWidth = dashWidthSetting + newStartX;
		var gapWidth = gapWidthSetting + dashWidthSetting + newStartX;

		for ( var i = 0; i < loopValue; i++) {

			ctx.lineTo(dashWidth, yEnd);
			ctx.moveTo(gapWidth, yEnd);
			// update positions according to settings
			dashWidth = gapWidth + dashWidthSetting;
			gapWidth = dashWidth + gapWidthSetting;
		}

		// Draw arrow head based on line width
		// TODO: arrow head dependent on line width some how
		// length of the arrow head can be dependent on width.

		// 'Lift pencil' so we don't get a fill
		ctx.moveTo(xEnd, yEnd);

		// TODO: Make number 4 here the stroke width

		ctx.lineTo(xEnd, yEnd + radius);
		ctx.lineTo(xEnd + (4 * (radius / 1.5)), yEnd);
		ctx.lineTo(xEnd, yEnd - radius);
		ctx.fillStyle = '#fff';
		ctx.fill();
		ctx.closePath();
		ctx.stroke();

	};
	window['BPMNMCG']['drawMessageFlow'] = drawMessageFlow;

	function drawAssociation(ctx, xStart, yStart, xEnd, yEnd, width) {
		// Start point
		// End point
		// TODO: if xEnd is different from starting end then need to start using
		// quadratic curves to correct ratio

		ctx.beginPath();
		// Start path at moveTo location
		ctx.moveTo(xStart, yStart);

		
		
		// Need to get line length to calculate dash widths - take starting
		// point from end point
		var lineLength = xStart - xEnd;
		// Make number positive by taking away itself * 2 to bring it into
		// positive number realm
		lineLength = lineLength - (lineLength * 2);
		
		// Make dashes - We want 5px dashes and a 4px gap
		var dashWidthSetting = 3;
		var gapWidthSetting = 2;
		// Find out how many times we should write the dash
		var loopValue = lineLength / (dashWidthSetting + gapWidthSetting);
		loopValue += 2;
		// Set lineTo (dashWidth) and moveTo (gapWidth) locations
		var dashWidth = dashWidthSetting + xStart;
		var gapWidth = gapWidthSetting + dashWidthSetting + xStart;
		
		
		for ( var i = 0; i < loopValue; i++) {

			ctx.lineTo(dashWidth, yEnd);
			ctx.moveTo(gapWidth, yEnd);
			// update positions according to settings
			dashWidth = gapWidth + dashWidthSetting;
			gapWidth = dashWidth + gapWidthSetting;
		}

		// Draw arrow head based on line width
		// TODO: arrow head dependent on line width some how
		// length of the arrow head can be dependant on width.

		// 'Lift pencil' so we don't get a fill
		ctx.moveTo(xEnd, yEnd);
		ctx.moveTo(xEnd + (4 * 4), yEnd);
		
		// TODO: Make number 4 here the stoke width

		ctx.lineTo(xEnd, yEnd + 6);
		ctx.moveTo(xEnd + (4 * 4), yEnd);
		ctx.lineTo(xEnd, yEnd - 6);
		ctx.moveTo(xEnd + (4 * 4), yEnd);
		ctx.closePath();
		ctx.stroke();

	};
	window['BPMNMCG']['drawAssociation'] = drawAssociation;
	
	function drawPool(params) {
		params = params || {};
		
		// There are probably a few critical variables here that should necessarily be defined and therefore can throw errors
		// if undefined
		this.xStart = params.xStart || 100;
		this.yStart = params.yStart || 200;
		this.width = params.width || 800;
		this.height = params.height || 200;
		this.label = params.label || 'untitled';
		
		// Maybe objects can always implement a draw method as part of an interface
		// that can later be used in the command pattern?
		this.draw = function() {
			
			// Start by parsing objects properties then organise default fall backs
			// Check data types and value ranges

			ctx.beginPath();
			ctx.moveTo(this.xStart, this.yStart);
			
			// Lineto should be defined by box width
			ctx.lineTo(this.xStart + this.width, this.yStart);
			// Move line up
			ctx.lineTo(this.xStart + this.width, this.yStart - this.height);
			ctx.lineTo(this.width - this.width + this.xStart, this.yStart - this.height);
			// Next Line to should be defined by height of the box

			ctx.closePath();
			ctx.stroke();
		};
		this.getLabel = function() {
			return this.label;
		};
		
		//return this object
		return this;

	};
	
	window['BPMNMCG']['drawPool'] = drawPool;

})();
