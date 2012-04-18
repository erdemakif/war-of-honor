/*
	Information;

	variables;
	- lastCheck: [Date] Last stored date from the previous cycle
	
	methods;

	- updateLastCheck: [Void] -> [Void]
	Sets lastCheck date to the current date by recreating the date object

	- getTimePassed: [Void] -> [Number]
	Gets the total milliseconds passed until the lastCheck date's milliseconds

	- update: [Void] -> [Void]
	Updates the content of controller. This is called at every game loop

*/


function CreatureController(){
	//variables
	this.lastCheck = new Date();

	this.creatures = new Array();

	//methods
	this.updateLastCheck = updateLastCheck;
	this.getTimePassed = getTimePassed;

	this.update = update;



	//updateLastCheck: [Void] -> [Void]
	function updateLastCheck(){
		this.lastCheck = new Date();
	}
	
	//getTimePassed: [Void] -> [Number]
	function getTimePassed(){
		var d = new Date();
		return  d.getTime() - this.lastCheck.getTime();
	}

	function update(){
		var timepassed = this.getTimePassed();
		this.updateLastCheck();

		

		for(var i = 0; i < this.creatures.length; i++){
			this.creatures[i].update();
		}


		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillText(timepassed, 50, 100);

	}

}