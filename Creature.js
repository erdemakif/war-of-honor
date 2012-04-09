/*
	Information;
		- Creature object is simply every moving object in the game. It has it's
		own update and path.

	variables;
		- xCoord: [Number] X coordinate of the creature [Left of creature]
		- yCoord: [Number] Y coordinate of the creature [Bottom of creature]
		- drawn: [Boolean] Indicates if the creature is drawn in the current cycle
		- path: [Array of Tiles] Creature's path. It will move to these tiles
	
	methods;
		- init: [Void] -> [Void]
		Initializes creature object when it is created

		- update: [Void] -> [Void]
		Creature's function to be called at every cycle. This is AI

		- renderSelf: [Void] -> [Void]
		Draw's the creature's image to the x/y coordinate of it's own

		- getXCoord: [Void] -> [Number]
		Gets the X coordinate of the creature. It also depends on world shift

		- getYCoord: [Void] -> [Number]
		Gets the Y coordinate of the creature. It also depends on world shift

*/


function Creature(x,y){
	//variables
	this.xCoord = x;
	this.yCoord = y;
	this.drawn = false;
	this.path = new Array();

	//methods
	this.renderSelf = renderSelf;
	this.getXCoord = getXCoord;
	this.getYCoord = getYCoord;
	this.update = update;
	this.init = init;
	
	//Call of initialization
	this.init();

	//init: [Void] -> [Void]
	function init(){}

	//update: [Void] -> [Void]
	function update(){
		var vecX;
		var vecY;
		var angle;
		var speed = 1
		if(this.path.length>0){
			vecX = this.path[0].getXCoord() + 32 - this.getXCoord();
			vecY = this.path[0].getYCoord() + 16 - this.getYCoord();
			angle = Math.atan2(vecY, vecX);
			//getTileAt(this.getXCoord(), this.getYCoord()).source_ix = 2;
			//this.path[0].source_iy = 2;
			//alert(this.path[0].getYCoord() + " " + this.getYCoord() + vecY);
			//alert(angle);
			this.xCoord += speed * Math.cos(angle);
			this.yCoord += speed * Math.sin(angle);
			//ctx.fillRect(this.path[0].getXCoord(), this.path[0].getYCoord(), 20, 20);
			if(distance(this.path[0].getXCoord() + 32, this.path[0].getYCoord() + 16, this.getXCoord(), this.getYCoord()) <= 1){
				this.path.splice(0, 1);
			}
		}
		else if(this.path.length == 0){
			this.path.push(isometricMapInfo[randomBetween(0, 10)][randomBetween(0, 10)]);
		}
	}

	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		ctx.fillStyle = "rgb(250,250,250)"
		ctx.fillRect(this.getXCoord(), this.getYCoord() - 40, 20, 40);
	}

	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return this.xCoord + worldShift.xShift;
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return this.yCoord + worldShift.yShift;
	} 
}