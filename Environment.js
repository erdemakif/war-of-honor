/*
	Information;
		- Environment objects are things that can be placed on tiles and can be stacked

	variables;
		- source: [String] Source is a string that refers to the image file
		- source_ix: [Number] refers to the which portion of image file does the real img starts at x Coordinate
		- source_iy: [Number] refers to the which portion of image file does the real img starts at y Coordinate
		- width: [Number] width of the image
		- height: [Number] height of the image
		- xDiff: [Number] Difference between Bount Tile and Environment object in X line
		- yDiff: [Number] Difference between Bount Tile and Environment object in Y line
		- boundTile: [Tile] A tile that the environment is bound to
	
	methods;
		- renderSelf: [Void] -> [Void]
		Draw's the environment's image to the x/y coordinate of it's own

		- renderSelfLighted: [String] -> [Void]
		Draw a lighted shade on environment's image. Input is rgba string of shade

		- getXCoord: [Void] -> [Number]
		Gets the X coordinate of the creature. It also depends on bound tile

		- getYCoord: [Void] -> [Number]
		Gets the Y coordinate of the creature. It also depends on bound tile

*/


function Environment(source, source_ix, source_iy, width, height, xDiff, yDiff, boundTile){
	
	//variables	
	this.source = source;
	this.source_ix = source_ix;
	this.source_iy = source_iy;
	this.width = width;
	this.height = height;
	this.xDiff = xDiff;
	this.yDiff = yDiff;
	this.boundTile = boundTile;

	//methods
	this.renderSelf = renderSelf;
	this.renderSelfLighted = renderSelfLighted;
	//this.inScreen = inScreen;
	this.getXCoord = getXCoord;
	this.getYCoord = getYCoord;
	

	//renderSelfLighted: [String] -> [Void]
	function renderSelfLighted(rgba){
		var xCoord = this.xDiff + this.boundTile.getXCoord();
		var yCoord = this.yDiff + this.boundTile.getYCoord();
		ctx.fillStyle = rgba;
		ctx.beginPath();
		ctx.moveTo(xCoord - 1, yCoord + 32 /2);
		ctx.lineTo(xCoord + 64/2, yCoord + 32 + 1);
		ctx.lineTo(xCoord + 64 + 2, yCoord + 32/2);
		ctx.lineTo(xCoord + 64/2, yCoord);
		ctx.fill();
	}
	
	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		
		if(this.boundTile.isMouseOn){
				ctx.globalAlpha = 0.5;
		}
		ctx.drawImage(this.source, 
		this.source_ix * 64, //These constants are based on tilesheet resolution
		this.source_iy * 32,
		this.width, this.height,
		this.xDiff + this.boundTile.getXCoord(), this.yDiff + this.boundTile.getYCoord(), this.width, this.height);
		ctx.globalAlpha = globalA;
			
		//Coordinate information
		//ctx.fillText(this.getXCoord() + ", " + this.getYCoord(),  this.getXCoord() + this.width/2, this.getYCoord());
	}
	
	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return this.xDiff + this.boundTile.getXCoord();
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return this.yDiff + this.boundTile.getYCoord();
	}
	
	/*
	function inScreen(){
		return this.boundTile.getXCoord() >= -64 && 
		this.boundTile.getXCoord() <= canvasWidth && this.boundTile.getYCoord() <= canvasHeight && 
		this.boundTile.getYCoord() >= -32;
	}
	*/
	
	function inScreen(){
		return this.getXCoord() >= -64 && 
		this.getXCoord() <= canvasWidth && this.getYCoord() <= canvasHeight && 
		this.getYCoord() >= -32;
	}
	
}