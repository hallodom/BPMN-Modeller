// Parent object properties




// Class declaration for BPMNELement super class

function BPMNElement(width, height, x, y, idName, label)
{
	/*-- Constructor --*/
	this.width = width + 8;
	this.height = height + 8;
	this.xPosition = x;
	this.yPosition = y;
	this.label = label;
	this.idName = idName;
	this.customCanvas = '';
	this.css3DropShadow = '-moz-box-shadow: 3px 3px 3px #666; -webkit-box-shadow: 3px 3px 3px #666; box-shadow: 3px 3px 3px #666;';
	this.css3Gradient = 'background: -moz-linear-gradient(100% 100% 90deg, #c7d1d5, #d9e4e8); background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#d9e4e8), to(#c7d1d5));';

	if(!this.idName) 
	{
		console.log('no idName defined set to default BPMNElement');
		this.idName = 'BPMNElement';
	}
	if(!this.width) 
	{
		console.log('no width defined for ' + this.idName);
	}
	if(!this.height) 
	{
		console.log('no height defined for ' + this.idName);
	}
	if(!this.xPosition) 
	{
		console.log('no xPosition defined for ' + this.idName);
	}
	if(!this.yPosition) 
	{
		console.log('no yPosition defined for ' + this.idName);
	}
	if(!this.label) 
	{
		console.log('no label defined for ' + this.idName);
	}
	
	
	// Make new canvas and wrap in a div
	// Place on document with x and y positions
	
	
	
	/*-- Methods --*/
	
	this.getArea = function()
	{
		//TODO: implement get area */
	};
	
	this.log = function()
	{
		//TODO: log all object properties to console - maybe add this to a parent abstract object class */
	};
	
	this.createCustomCanvas = function()
	{
		
		this.customCanvas = '<div id="' + this.idName + '" style=\"' + 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px; ' + 'position: absolute; top:' + this.yPosition + 'px; ' + 'left:' + this.xPosition + 'px; border: solid 0px #000; \">';
		this.customCanvas += '<canvas style="position:relative" id="canvas-' + this.idName + '" width=\"' + (this.width + 4) + 'px\" ' + 'height=\"' + (this.height + 4) + 'px\" />';
		this.customCanvas += '</div>';
		document.write(this.customCanvas);
		return this.customCanvas;
	};
	
	this.createCustomHTML = function()
	{
		this.customHTML = '<div id="' + this.idName + '" style=\"' + 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px; ' + 'position: absolute; top:' + this.yPosition + 'px; ' + 'left:' + this.xPosition + 'px; border: solid 2px #000; \">';
		this.customHTML += '</div>';
		document.write(this.customHTML);
	};

	// clickIsInArea returns boolean if click was on this object or not
	// TODO: not sure if this should go here yet
	this.clickIsInArea = function(x,y)
	{
		var mouseClickX = x;
		var mouseClickY = y;
		
		// see if event click is with rectangle area
		if(mouseClickX == this.xPosition || mouseClickX <= (230 + this.xPosition) && mouseClickX >= this.xPosition)
		{
			if(mouseClickY == this.yPosition || mouseClickY <= (150 + this.yPosition) && mouseClickY >= this.yPosition)
			{
				console.log('Click event was in area of ' + this.idName);
				return true;
			}	
		} 
		else 
		{
			return false;
		}
	};
	
}

/*
 * BPMNEvents Class 
 */
function BPMNEvents(width, height, x, y, idName, label)
{
	// Call super constructor
	BPMNElement.call(this, width, height, x, y, idName, label);	
	
	this.borderThickness = 5;
	
	if(this.width != this.height)
	{
		throw new error('width and height must be the same to draw circle');
	}
	
	this.drawEndEvent = function()
	{
		this.customHTML = '<div id="' + this.idName + '" style=\"' + 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px; ' + 'position: absolute; top:' + this.yPosition + 'px; ' + 'left:' + this.xPosition + 'px; border: solid ' + this.borderThickness + 'px #9F1600; background:#FF7878; -webkit-border-radius: 5em; -moz-border-radius: 5em; border-radius: 5em;' + this.css3DropShadow + '\">';
		this.customHTML += '</div>';
		document.write(this.customHTML);
	}
	this.drawStartEvent = function()
	{
		this.customHTML = '<div id="' + this.idName + '" style=\"' + 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px; ' + 'position: absolute; top:' + this.yPosition + 'px; ' + 'left:' + this.xPosition + 'px;  border: solid ' + this.borderThickness + 'px #9F1600; background:#FF7878; -webkit-border-radius: 5em; -moz-border-radius: 5em; border-radius: 5em;' + this.css3DropShadow + '\">';
		this.customHTML += '</div>';
		document.write(this.customHTML);
	}
	
	
}
//Inherit parent class
BPMNEvents.prototype = new BPMNElement();
BPMNEvents.prototype.constructor=BPMNEvents;

/*
 * BPMNActivities Class 
 */
function BPMNActivities(width, height, x, y, idName, label)
{
	// Call super constructor
	BPMNElement.call(this, width, height, x, y, idName, label);	
	
	this.borderWidth = 4;
	
	this.drawRoundedRectangle = function(ctx, x, y, width, height, radius) 
	{
		
			ctx.beginPath();
			ctx.moveTo(x, y + radius);
			ctx.lineWidth = this.borderWidth;
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
	this.drawActivity = function()
	{
		var borderWidthHTML = this.borderWidth + 'px';
		
		this.customHTML = '<div id="' + this.idName + '" style=\"' + 'width:' + this.width + 'px; ' + 'height:' + this.height + 'px; ' + 'position: absolute; top:' + this.yPosition + 'px; ' + 'left:' + this.xPosition + 'px; border: solid ' + borderWidthHTML + ' #000; background:#ffffff; -webkit-border-radius: 1em; -moz-border-radius: 1em; border-radius: 1em;'  + '\">';
		this.customHTML += '</div>';
		
		var labelX = this.xPosition;
		var labelY = this.yPosition;
		var labelWidth = 50.0;
		var labelHeight = 50.0;
		
		
		// Find centre point for label 
		labelX = this.xPosition + (((this.width + this.borderWidth) / 2) - (labelWidth / 2));
		labelY = this.yPosition + (((this.height + this.borderWidth) / 2) - (labelHeight / 2));
		
		var label = '<div style=" width: 50px; height: 50px; background: #000; position: absolute; z-index:1; left:' + labelX + 'px; top: ' + labelY + 'px;">';
		label += '</div>';
		
		this.customHTML += label;
		document.write(this.customHTML);
		
	};
	
	
}
// Inherit class
extend(BPMNActivities,BPMNElement);


/*-- Add to document --*/

tester = new BPMNElement(500,500,500, 10, 'test1', 'label1');
tester.createCustomCanvas();
tester2 = new BPMNEvents(50, 50, 100, 100, 'test2', 'label');
tester2.drawEndEvent();

tester3 = new BPMNActivities(200, 140, 45, 200, 'test3', 'label3');
tester3.createCustomCanvas();
//Experimenting with selecting objects
var ctx = document.getElementById('canvas-' + 'test3').getContext('2d');

// Needs noting that the rectangle is drawn and extra 4px in as this is the width
// of the border
tester3.drawRoundedRectangle(ctx, 4, 4, 200, 140, 10);

$('#canvas-test3').dblclick(
	function()
	{
		console.log('clicked');
	});

var newElement = document.createElement('div');

$('body').append(newElement);

/*
 * Class Extend function - performs classical inheritence
 */
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

