/*
	Information;
		- AirEnvironment is an object that has an image a point a speed and a limit. By 
		these data, it can represent a floating object on map. It will be used for flying
		objects that do not have got a direct impact on gameplay

	variables;
		- source: [String] source is a string that refers to the image file
		- source_ix: [Number] refers to the which portion of image file does the real img starts at x Coordinate
		- source_iy: [Number] refers to the which portion of image file does the real img starts at y Coordinate
		- width: [Number] width of the image
		- height: [Number] height of the image
		- xCoord: [Number] X coordinate of the object
		- yCoord: [Number] Y coordinate of the object
		- xSpeed: [Number] speed/direction in X line
		- ySpeed: [Number] speed/direction in Y line
		- alpha: [Number] Transparency value of the object
		- limitX: [Number] Determines in which X will the cloud disappear
	
	methods;
		- getXCoord: [Void] -> [Number]
		Gets the X coordinate of the air environment. It depends on world shift

		- getYCoord: [Void] -> [Number]
		Gets the Y coordinate of the air environment. It depends on world shift

		- renderSelf: [Void] -> [Void]
		Draw's the object's image to the x/y coordinate of it's own

*/

function AirEnvironment(source, source_ix, source_iy, width, height, xCoord, yCoord, xSpeed, ySpeed){
	//variables
	this.source = source;
	this.source_ix = source_ix;
	this.source_iy = source_iy;
	this.width = width;
	this.height = height;
	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;
	this.alpha = 0;
	this.limitX = this.xCoord + randomBetween(60, 300);
	
	//methods
	this.getXCoord = getXCoord;
	this.getYCoord = getYCoord;
	this.renderSelf = renderSelf;
	
	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.source, 
			this.source_ix * 64,
			this.source_iy * 32,
			this.width, this.height,
			this.getXCoord(), this.getYCoord(),
			this.width, this.height);
		ctx.globalAlpha = 1;
	}
	
	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return this.xCoord + (worldShift.xShift * 7 / 5);
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return this.yCoord + worldShift.yShift * 7 / 5;
	}

}