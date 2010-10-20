/**
 * 
 */
// Drag event can send X y drop locations to this function
// which can then be used to create the objects. 
// Depending on what has been dragged a 'type' will also be passed in so that the 
// BPMN Element can be identified. 

// Function for start middle and end of a draggable
// Don't get caught up on all the UI details yet!

function createElement(params) {
	params = params || {};
	
	this.type = params.type;
	this.id = params.id;
	this.width = 'width' in params ? params.width: 140;
	this.height = 'height' in params ? params.height: 100;
	this.left = 'left' in params ? params.left: 10;
	this.top = 'top' in params ? params.top: 10;

	var newElement = document.createElement('div');
	newElement.setAttribute('id', this.id);
	document.getElementById('container').appendChild(newElement);
	
	var pageElement = document.getElementById(this.id);
	
	var newElementString = '<div class="BPMNMElements" id="' + this.id + '" style="position:absolute; left: ' + this.left + 'px; top: ' + this.top + 'px;"><canvas id="canvas_' + this.id + '" width="' + (this.width + 2) + 'px" height="' + (this.height + 2) + 'px"  /></div>';
	
	

	pageElement.innerHTML = newElementString;

	var ctx = document.getElementById('canvas_' + this.id).getContext('2d');

	switch (this.type) {

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
		$("#" + this.id).draggable({ opacity: 0.35 });
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
		$("#" + this.id).draggable({ opacity: 0.35 });
		break;
	case 'StartEvent':
		var startEvent = new BPMNM.CG.Event({
			ctx : ctx,
			// Need to offset to include stroke
			yStart : 1 + (this.width / 2),
			xStart : 1 + (this.height / 2),
			width : this.width,
			height : this.height
		});
		startEvent.draw();
		$("#" + this.id).draggable({ opacity: 0.35 });
		break;
		
	case 'EndEvent':
		var endEvent = new BPMNM.CG.Event({
			ctx : ctx,
			// Need to offset to include stroke
			yStart : 1 + (this.width / 2),
			xStart : 1 + (this.height / 2),
			width : this.width,
			height : this.height,
			type: 'end'
		});
		endEvent.draw();
		$("#" + this.id).draggable({ opacity: 0.35 });
		break;

	};

};

createElement({type:'Activity',id:'2',top: 150});
createElement({type:'Group',id:'3'});
createElement({type:'StartEvent',id:'4',left: 180, width:40,height:40});
createElement({type:'EndEvent',id:'5',left: 230, width:40,height:40});
