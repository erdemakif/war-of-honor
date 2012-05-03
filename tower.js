function Tower(type,x,y){
	//variables
	this.type = type;
	this.xCoord = x;
	this.yCoord = y;
	this.drawn = false;
	this.speed = 25;
	this.reward = 10;
	this.range = 50;
	this.towerAnim = new Animation(90);
	this.towerAnim.addScene(new ImagePiece(towerSheet, 0, 0, 64, 64));
	this.towerAnim.run = true;
	animationController.addAnimation(this.towerAnim);

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
		for(var i=0;i<creatureController.creatures.length;i++){
			if(distance(this.getXCoord(), this.getYCoord(), creatureController.creatures[i].getXCoord(),  creatureController.creatures[i].getYCoord()) <= this.range)
				creatureController.deleteCreature(creatureController.creatures[i]);
		}
	}


	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		this.towerAnim.getImagePiece().drawImageAt(this.getXCoord(), this.getYCoord() - 30);
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