/**
 * 
 */
// Drag event can send X y drop locations to this function
// which can then be used to create the objects. 
// Depending on what has been dragged a 'type' will also be passed in so that the 
// BPMN Element can be identified. 
function createElement(params) {
	params = params || {};
	
	this.type = params.type;
	this.id = params.id;
	this.width = 140;
	this.height = 100;

	var pageElement = document.getElementById("container");
	var newElementString = '<div id="' + this.id + '"><canvas id="canvas_' + this.id + '" width="' + (this.width + 2) + 'px" height="' + (this.height + 2) + 'px"  /></div>';

	pageElement.innerHTML = newElementString;

	var ctx = document.getElementById('canvas_' + this.id).getContext('2d');

	switch (this.type) {
//	case 'Activity':
//		var activity = new BPMNM.CG.Activity({
//			ctx : ctx,
//			// Need to offset to include stroke
//			yStart : 1,
//			xStart : 1,
//			width : this.width,
//			height : this.height
//		});
//		activity.draw();
//		break;
	case 'Activity':
		var activity = new BPMNM.CG.Activity({
			ctx : ctx,
			// Need to offset to include stroke
			yStart : 1,
			xStart : 1,
			width : this.width,
			height : this.height
		});
		activity.draw();
		break;
	case 'Group':
		var group = new BPMNM.CG.Group({
			ctx : ctx,
			// Need to offset to include stroke
			yStart : 1,
			xStart : 1,
			width : this.width,
			height : this.height
		});
		group.draw();
		break;
	case 'Event':
		this[type][this.id] = new BPMNM.CG[type]({
			ctx : ctx,
			// Need to offset to include stroke
			yStart : 1,
			xStart : 1,
			width : this.width,
			height : this.height
		});
		this[type][this.id].draw();
//		console.log(this[type][this.id]);
		return this[type][this.id];
		break;

	};

};

var test = createElement({type:'Event',id:'2'});
