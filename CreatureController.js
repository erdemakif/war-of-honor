/*
	Information;

	variables;
	
	methods;

	- update: [Void] -> [Void]
	Updates the content of controller. This is called at every game loop

*/


function CreatureController(){

	this.creatures = new Array();
	this.creationList = new Array();
	this.totalMs = 0;


	//this.creationList[0] = {second: 1, xCoord: 50, yCoord: 110, path: [isometricMapInfo[0][0], isometricMapInfo[10][0], isometricMapInfo[10][5], isometricMapInfo[14][5]]}

	for(var M = 0; M < 10; M++){
		this.creationList[M] = {second: M, xCoord: 50, yCoord: 110, path: [isometricMapInfo[0][1], isometricMapInfo[10][1], isometricMapInfo[10][5], isometricMapInfo[14][5]]}
	}

	for(var M = 10; M < 25; M++){
		this.creationList[M] = {second: M + 5, xCoord: 50, yCoord: 110, path: [isometricMapInfo[0][1], isometricMapInfo[10][1], isometricMapInfo[10][5], isometricMapInfo[14][5]]}
	}

	//methods
	this.update = update;
	this.addCreature = addCreature;
	this.deleteCreature = deleteCreature;

	function update(passedMs){
		this.totalMs += passedMs;

		for(var i = 0; i < this.creatures.length; i++){
			this.creatures[i].update(passedMs);
		}

		if(this.creationList.length > 0 && this.creationList[0].second * 1000 <= this.totalMs){
			var theCreature = new Creature(this.creationList[0].xCoord, this.creationList[0].yCoord);
			theCreature.path = this.creationList[0].path;
			//theCreature.speed += randomBetween(0, 3);

			this.addCreature(theCreature);

			this.creationList.splice(0, 1);
		}

		ctx.fillText(this.totalMs, 100, 50);
	}


	function addCreature(givenCreature){
		this.creatures[this.creatures.length] = givenCreature;
	}

	function deleteCreature(givenCreature){
		for(var i = 0; i < this.creatures.length; i++){
			if(this.creatures[i] == givenCreature){
				animationController.deleteAnimation(this.creatures[i].creatureAnim);
				this.creatures.splice(i, 1);
			}
		}
	}



}