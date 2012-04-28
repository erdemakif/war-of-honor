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
	this.speed = 25;
	this.path = new Array();

	/*
	this.color = {r : randomBetween(0, 255),
				g : randomBetween(0, 255),
				b : randomBetween(0, 255)}
				*/
	this.creatureAnim = new Animation(90);
	for(var z = 0; z < 3; z++){
		for(var u = 0; u < 8; u++)
		this.creatureAnim.addScene(new ImagePiece(anSheet, u * 40, z * 40, 40, 40));
	}
	this.creatureAnim.run = true;
	animationController.addAnimation(this.creatureAnim);

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
	function update(passedMs){
		var vecX;
		var vecY;
		var angle;
		if(this.path.length>0){
			vecX = this.path[0].getXCoord() + 32 - this.getXCoord();
			vecY = this.path[0].getYCoord() + 16 - this.getYCoord();
			angle = Math.atan2(vecY, vecX);

			this.xCoord += measureChangeByTime(this.speed, passedMs) * Math.cos(angle);
			this.yCoord += measureChangeByTime(this.speed, passedMs) * Math.sin(angle);

			if(distance(this.path[0].getXCoord() + 32, this.path[0].getYCoord() + 16, this.getXCoord(), this.getYCoord()) <= 1){
				this.path.splice(0, 1);
			}
		}
		else if(this.path.length == 0){
			//this.path.push(isometricMapInfo[randomBetween(0, 10)][randomBetween(0, 10)]);
			creatureController.deleteCreature(this);
		}
	}


	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		//ctx.fillStyle = "rgb(250,250,250)"

		/*
		ctx.fillStyle = "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")"
		ctx.fillRect(this.getXCoord(), this.getYCoord() - 40, 20, 40);
		*/
		this.creatureAnim.getImagePiece().drawImageAt(this.getXCoord(), this.getYCoord() - 30);
	}

	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return Math.round(this.xCoord) + worldShift.xShift;
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return Math.round(this.yCoord) + worldShift.yShift;
	} 
}