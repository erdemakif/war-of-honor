/*
	Information;
		- Tile object is holding information about a piece of isometric tile that is a map's simple bit

	variables;
		- source: [String] source is a string that refers to the image file
		- source_ix: [Number] refers to the which portion of image file does the real img starts at x Coordinate
		- source_iy: [Number] refers to the which portion of image file does the real img starts at y Coordinate
		- width: [Number] width of the object
		- height: [Number] height of the object
		- xCoord: [Number] X coordinate of the object
		- yCoord: [Number] Y coordinate of the object
		- bounds: [List of Points] List of points that indicates the polygon outline
		- isMouseOn: [Boolean] True if the mouse is inside the polygon, else False
		- objectsOn: [List of Environment] List of environments that is stacked upon the tile
		- mapY: [Number] Y Index on isometricMapInfo array
		- mapX: [Number] X Index on isometricMapInfo array
	
	methods;
		- renderSelf: [Void] -> [Void]
		Draw's the tile's image to the x/y coordinate of it's own

		- renderSelfLighted: [String] -> [Void]
		Draw a lighted shade on tile's image. Input is rgba string of shade

		- renderObjectsOn: [Void] -> [Void]
		Draws stacked environments on tile

		- inScreen: [Void] -> [Void]
		True if the tile is in screen, else false

		- addNewEnvironmentSameWidth: [String] [Number] [Number] [Number] [Number] -> [Void]
		Adds new environment to the stack of environment. First input is a path to the image file that will be new environment's source

		- getXCoord: [Void] -> [Number]
		Gets the X coordinate of the tile. It also depends on world shift

		- getYCoord: [Void] -> [Number]
		Gets the Y coordinate of the tile. It also depends on world shift

		- getExactBounds: [Void] -> [List of Points] 
		Gets the exact point polygon of tile

*/

function Tile(source, source_ix, source_iy, width, height, xCoord, yCoord){

	//variables
	
	//this.source = source;
	//this.source_ix = source_ix;
	//this.source_iy = source_iy;
	this.width = width;
	this.height = height;
	

	this.selfImage = new ImagePiece(source, source_ix, source_iy, width, height);

	this.xCoord = xCoord;
	this.yCoord = yCoord;
	this.bounds = [new Point(this.xCoord, this.yCoord + this.height/2), new Point(this.xCoord + this.width/2, this.yCoord + this.height), 
	new Point(this.xCoord + this.width, this.yCoord + this.height/2), new Point(this.xCoord + this.width/2, this.yCoord)];
	this.isMouseOn = false;
	this.objectsOn = new Array();
	var mapY;
	var mapX;
	
	//methods
	this.renderSelf = renderSelf;
	this.renderSelfLighted = renderSelfLighted;
	this.renderObjectsOn = renderObjectsOn;
	this.inScreen = inScreen;
	this.addNewEnvironmentSameWidth = addNewEnvironmentSameWidth;
	this.getXCoord = getXCoord;
	this.getYCoord = getYCoord;
	this.getExactBounds = getExactBounds;
	
	//getExactBounds: [Void] -> [List of Points] 
	function getExactBounds(){
		var cache = new Array();
		
		for(var i = 0; i < this.bounds.length; i++){
			cache[i] = new Point(this.bounds[i].px + worldShift.getXShift(), this.bounds[i].py + worldShift.getYShift());
		}
		return cache;
	}
	
	//getXCoord: [Void] -> [Number]
	function getXCoord(){
		return this.xCoord + worldShift.getXShift();
	}
	
	//getYCoord: [Void] -> [Number]
	function getYCoord(){
		return this.yCoord + worldShift.getYShift();
	}
		
	//renderSelf: [Void] -> [Void]
	function renderSelf(){
		totalDraws += 1;
		//alert(this.diagMapX + ", " + this.diagMapY);
		//alert(diagMap[4][2].diagMapY);
		
		if(this.inScreen()){
			//ctx.fillText(this.mapX + " " + this.mapY, this.getXCoord() + 5, this.getYCoord() + 5);
			/*
			ctx.drawImage(this.source, 
				this.source_ix * this.width,
				this.source_iy * this.height,
				this.width, this.height,
				this.getXCoord(), this.getYCoord(),
				this.width, this.height);
*/
			this.selfImage.drawImageAt(this.getXCoord(), this.getYCoord());

			if(this.isMouseOn){this.renderSelfLighted("rgba(225, 225, 125, 0.4)");}
			
			ctx.fillStyle = "rgb(0, 0, 0)";
			
			//Old version
			//ctx.fillText(this.diagMapX + ", " + this.diagMapY, this.getXCoord() + 32, this.getYCoord() + 16);
			//ctx.fillText(this.mapX + ", " + this.mapY, this.getXCoord() + 32, this.getYCoord() + 16);
			
		}
	}
	
	//renderSelfLighted: [String] -> [Void]
	function renderSelfLighted(rgba){
		ctx.fillStyle = rgba;
		ctx.beginPath();
		
		var theBounds = this.getExactBounds();
		
		ctx.moveTo(theBounds[0].px, theBounds[0].py);
		for(var i = 0; i < theBounds.length; i++){
			ctx.lineTo(theBounds[i].px, theBounds[i].py);
		}
		ctx.fill();
		/*
		ctx.moveTo(this.getXCoord() - 1, this.getYCoord() + this.height/2);
		ctx.lineTo(this.getXCoord() + this.width/2, this.getYCoord() + this.height + 1);
		ctx.lineTo(this.getXCoord() + this.width + 2, this.getYCoord() + this.height/2);
		ctx.lineTo(this.getXCoord() + this.width/2, this.getYCoord());
		ctx.fill();
		*/
	}
	
	//renderObjectsOn: [Void] -> [Void]
	function renderObjectsOn(){	
		for(var i = 0; i < this.objectsOn.length; i++){
			this.objectsOn[i].renderSelf();
			if(this.isMouseOn && i == this.objectsOn.length - 1){this.objectsOn[i].renderSelfLighted("rgba(225, 225, 125, 0.4)");}
		}
		
	}
	
	//inScreen: [Void] -> [Void]
	function inScreen(){
		return this.getXCoord() >= -64 && this.getXCoord() <= canvasWidth && this.getYCoord() <= canvasHeight && this.getYCoord() >= -32;
	}

	//addNewEnvironmentSameWidth: [String] [Number] [Number] [Number] [Number] -> [Void]
	function addNewEnvironmentSameWidth(source, source_ix, source_iy, width, height){
		//There is no environment on yet
	
		if(this.objectsOn.length == 0){
			//alert(1);
			var yDiff = this.height - height;
			this.objectsOn[0] = new Environment(source, source_ix, source_iy, width, height, 0, yDiff, this);
		}
		
		else{
			
			var yDiff = 32 - height;
			yDiff = this.objectsOn[this.objectsOn.length - 1].yDiff + yDiff;
			this.objectsOn[this.objectsOn.length] = new Environment(source, source_ix, source_iy, width, height, 0, yDiff, this);
			
		}
	}

}