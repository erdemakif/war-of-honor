/*
	Information;

	variables;
	
	methods;

	- update: [Void] -> [Void]
	Updates the content of controller. This is called at every game loop

*/


function CreatureController(){

	this.creatures = new Array();

	//methods
	this.update = update;

	function update(passedMs){
		for(var i = 0; i < this.creatures.length; i++){
			this.creatures[i].update(passedMs);
		}
	}

}