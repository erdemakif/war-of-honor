/*
	Information;
		- AirController object creates/deletes air environments and also controls them.
		It has it's own time-passed system

	variables;
		- imageSet: [Array of String] Each element refers to an image file
		- maxQuantity: [Number] Determines how many air environment can be in game
		- minX: [Number] Gives the minimum bound of X that must be traveled by air environments
		- maxX: [Number] Gives the maximum bound of X that must be traveled by air environments
		- airSet: [Array of AirEnvironment] AirEnvironment objects in game
		- cooldown: [Number] Milliseconds that indicates the frequency to add new air environment
		- currentProgress: [Number] Milliseconds that passed until the last cooldown is done
		- lastCheck: [Date] Last stored date from the previous cycle

	
	methods;
		- renderAir: [Void] -> [Void]
		Draws all AirEnvironments in airSet to the screen

		- updateAir: [Void] -> [Void]
		Updates the AirEnvironment objects in airSet according to their data and timePassed
		Note: Put a self-update to airEnvironments where they will move their (x,y) coordinates

		- createProcess: [Void] -> [Void]
		Adds a new AirEnvironment to the airSet

		- updateLastCheck: [Void] -> [Void]
		Sets lastCheck date to the current date by recreating the date object

		- getTimePassed: [Void] -> [Number]
		Gets the total milliseconds passed until the lastCheck date's milliseconds

		- deleteAirObject: [AirEnvironment] -> [Void]
		Deletes the given Air Environment from the Air Set


*/

function AirController(imageSet, maxQuantity, minX, maxX){
	//variables
	this.imageSet = imageSet;
	this.maxQuantity = maxQuantity;
	this.minX = minX;
	this.maxX = maxX;
	this.airSet = new Array();
	this.cooldown = 2000;
	this.currentProgress = 0;
	this.lastCheck = new Date();
	
	//methods
	this.renderAir = renderAir;
	this.updateAir = updateAir;
	this.createProcess = createProcess;
	
	this.updateLastCheck = updateLastCheck;
	this.getTimePassed = getTimePassed;
	this.deleteAirObject = deleteAirObject;

	//deleteAirObject: [AirEnvironment] -> [Void]
	function deleteAirObject(airObj){
		for(var i = 0; i < this.airSet.length; i++){
			if(this.airSet[i] == airObj){
				this.airSet.splice(i, 1);
			}
		}
	}
	
	//updateLastCheck: [Void] -> [Void]
	function updateLastCheck(){
		this.lastCheck = new Date();
	}
	
	//getTimePassed: [Void] -> [Number]
	function getTimePassed(){
		var d = new Date();
		return  d.getTime() - this.lastCheck.getTime();
	}
	
	//renderAir: [Void] -> [Void]
	function renderAir(){
		for(var i = 0; i < this.airSet.length; i++){
			this.airSet[i].renderSelf();
		}
	}
	
	//updateAir: [Void] -> [Void]
	function updateAir(passedMs){
		this.currentProgress += passedMs;
		for(var i = 0; i < this.airSet.length; i++){
			this.airSet[i].update(passedMs);
		}
		if(this.airSet.length < this.maxQuantity && this.currentProgress >= this.cooldown){
			this.currentProgress = 0;
			this.createProcess();
		}
	}
	
	//createProcess: [Void] -> [Void]
	function createProcess(){
		var theImage = this.imageSet[randomBetween(0, 4)];
		this.airSet[this.airSet.length] = new AirEnvironment(theImage , 0, 0, theImage.width
		, theImage.height, randomBetween(-200, canvasWidth - 50) - worldShift.xShift * 7 / 5, 
		randomBetween(-50, canvasHeight) - worldShift.yShift * 7 / 5, randomBetween(this.minX, this.maxX), 0);
		
		
	}

}