function Tower(type,x,y){
	//variables
	this.type = type;
	this.xCoord = x;
	this.yCoord = y;
	this.drawn = false;
	this.speed = 25;
	this.reward = 10;
	this.range = 50;
	this.totalCooldown = 1000;
	this.currentCooldownProgress = 0;
	this.towerAnim = new Animation(90);
	this.towerAnim.addScene(new ImagePiece(towerSheet, 0, 0, 64, 64));
	this.towerAnim.run = true;
	animationController.addAnimation(this.towerAnim);

	//methods
	//this.renderSelf = renderSelf;
	this.getXCoord = getXCoord;
	this.getYCoord = getYCoord;
	this.update = update;
	this.init = init;
	this.shootSequence = shootSequence;

	
	//Call of initialization
	this.init();

	//init: [Void] -> [Void]
	function init(){}

	//update: [Void] -> [Void]
	function update(passedMs){
		this.currentCooldownProgress = this.currentCooldownProgress - passedMs;
		if(this.currentCooldownProgress <= 0){
			this.shootSequence();
		}
		
	}

	function shootSequence(){
		for(var i=0;i<creatureController.creatures.length;i++){
			if(distance(this.getXCoord(), this.getYCoord(), creatureController.creatures[i].getXCoord(),  creatureController.creatures[i].getYCoord()) <= this.range){
				//creatureController.deleteCreature(creatureController.creatures[i]);
				var targetCreature = creatureController.creatures[i];
				targetCreature.receiveDamage(13);

				this.currentCooldownProgress = this.totalCooldown;
				break;
			}
				
		}
	}


	//renderSelf: [Void] -> [Void]
	/*
	function renderSelf(){
		this.towerAnim.getImagePiece().drawImageAt(this.getXCoord(), this.getYCoord() - 30);
	}
	*/

	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return Math.round(this.xCoord) + worldShift.xShift;
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return Math.round(this.yCoord) + worldShift.yShift;
	} 
}