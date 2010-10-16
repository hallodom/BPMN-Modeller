/*-- Document Tester --*/

// Testing the BPMNMCG functions
var ctx = document.getElementById('canvas').getContext('2d');

var activity = new BPMNMCG.Activity();
activity.draw();

// TODO: update these methods to object declarations
BPMNMCG.drawPathDiamond(ctx, 20, 200, 80);
BPMNMCG.drawPathCircle(ctx, 60, 300, 30);
BPMNMCG.drawSequenceFlow(ctx, 200, 400, 600, 400);
BPMNMCG.drawMessageFlow(ctx, 200, 500, 600, 500);
BPMNMCG.drawAssociation(ctx, 200, 600, 600, 600);

// Using object notation for specifying parameters
var test = new BPMNMCG.Pool({
	xStart : 30,
	yStart : 900,
	width : 800,
	height : 200,
	label : 'First pool'
});
test.draw();

var test2 = new BPMNMCG.Pool({
	xStart : 30,
	yStart : 1350,
	width : 800,
	height : 200,
	label : 'Second pool',
	lanes : 1
});
test2.draw();

var dataObject = new BPMNMCG.DataObject({
	yStart : 1500
});
dataObject.draw();

var textAnnotation = new BPMNMCG.TextAnnotation({
	xStart : 200,
	yStart : 1650,
	xEnd : 100,
	yEnd : 100
});
textAnnotation.draw();

var group = new BPMNMCG.Group({
	xStart : 100,
	yStart : 1900,
	width : 200,
	height : 150
});
group.draw();

/*
 * Class Extend function - performs classical inheritence
 */
function extend(subClass, superClass) {
	var F = function() {};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;

	subClass.superclass = superClass.prototype;
	if (superClass.prototype.constructor == Object.prototype.constructor) {
		superClass.prototype.constructor = superClass;
	}
}
