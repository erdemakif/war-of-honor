function TowerController(){

	this.towers = new Array();
	this.totalMs = 0;




	//methods
	this.update = update;
	this.addTower = addTower;
	this.deleteTower = deleteTower;

	function update(passedMs){
		for(var i = 0; i < this.towers.length; i++){
			this.towers[i].update(passedMs);
		}
	}


	function addTower(givenTower){
		this.towers[this.towers.length] = givenTower;
	}

	function deleteTower(givenTower){
		for(var i = 0; i < this.towerslength; i++){
			if(this.towers[i] == givenTower){
				animationController.deleteAnimation(this.towers[i].towerAnim);
				this.towers.splice(i, 1);
			}
		}
	}


}
