/*-- Document Tester --*/

// Testing the BPMNMCG functions
var ctx = document.getElementById('canvas').getContext('2d');

var activity = new BPMNM.CG.Activity({
	ctx : ctx
});
activity.draw();

// TODO: update these methods to object declarations
var gateway = new BPMNM.CG.Gateway({
	ctx : ctx
});
gateway.draw();

var startEvent = new BPMNM.CG.Event({
	ctx : ctx
});
startEvent.draw();

var endEvent = new BPMNM.CG.Event({
	ctx : ctx,
	xStart : 120,
	type : 'end'
});
endEvent.draw();

var sequenceFlow = new BPMNM.CG.SequenceFlow({
	ctx : ctx
});
sequenceFlow.draw();

var messageFlow = new BPMNM.CG.MessageFlow({
	ctx : ctx
});
messageFlow.draw();

var association = new BPMNM.CG.Association({
	ctx : ctx
});
association.draw();

// Using object notation for specifying parameters
var test = new BPMNM.CG.Pool({
	ctx : ctx,
	xStart : 30,
	yStart : 900,
	width : 800,
	height : 200,
	label : 'First pool'
});
test.draw();

var test2 = new BPMNM.CG.Pool({
	ctx : ctx,
	xStart : 30,
	yStart : 1350,
	width : 800,
	height : 200,
	label : 'Second pool',
	lanes : 1
});
test2.draw();

var dataObject = new BPMNM.CG.DataObject({
	ctx : ctx,
	yStart : 1500
});
dataObject.draw();

var textAnnotation = new BPMNM.CG.TextAnnotation({
	ctx : ctx,
	xStart : 200,
	yStart : 1650,
	xEnd : 100,
	yEnd : 100
});
textAnnotation.draw();

var group = new BPMNM.CG.Group({
	ctx : ctx,
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
