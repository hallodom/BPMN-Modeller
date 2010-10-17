/*-- Document Tester --*/

// Testing the BPMNMCG functions
var ctx = document.getElementById('canvas').getContext('2d');

var activity = new BPMNMCG.Activity();
activity.draw();

// TODO: update these methods to object declarations
var gateway = new BPMNMCG.Gateway();
gateway.draw();

var startEvent = new BPMNMCG.Event();
startEvent.draw();

var endEvent = new BPMNMCG.Event({xStart:120,type:'end'});
endEvent.draw();

var sequenceFlow = new BPMNMCG.SequenceFlow();
sequenceFlow.draw();

var messageFlow = new BPMNMCG.MessageFlow();
messageFlow.draw();

var association = new BPMNMCG.Association();
association.draw();

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
