/*
	This file contains the essential calculation tools for other classes and functions
		
		Functions;

		- distance: [Number] [Number] [Number] [Number] -> [Number]
		Gets the distance between 2 points. Input order is, x1 y1 x2 y2
		
		- makeNegative: [Number] -> [Number]
		Makes the number negative. If it is already negative, does nothing

		- makePositive: [Number] -> [Number]
		Makes the number positive. If it is already positive, does nothing

		- randomBetween: [Number] [Number] -> [Number]
		Gives a random number between given 2 bounds. The bounds are also included

		- report: [Array of atomic variable] -> [Void]
		Gets an array of constant and reports them togather with alert()

		- pointInPolygon: [Point] [Array of Point] -> [Boolean]
		Checks if the given point is inside of the given polygon [array of points]
		
		- isPointInside: [Tile] [Number] [Number] -> [Boolean]
		Checks if the given 2 coordinates (x,y) is inside the Tile's borders

		- getTileAt: [Number] [Number] -> [Tile] / [False]
		Gets the tile that includes given coordinates (x,y) in it's borders
		If there is no such tile, gives False

*/

//distance: [Number] [Number] [Number] [Number] -> [Number]
function distance(x1, y1, x2, y2){
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

//makeNegative: [Number] -> [Number]
function makeNegative(num){
	if(num > 0){
		return -1 * num;
	}
	else{
		return num;
	}
}

//makePositive: [Number] -> [Number]
function makePositive(num){
	if(num > 0){
		return num;
	}
	else{
		return num * -1;
	}
}

//report: [Array of atomic variable] -> [Void]
function report(variables){
	var str = "";
	for(var i = 0; i < variables.length; i++){
		str = str + ", " + variables[i];
	}
	alert(str);
}

//pointInPolygon: [Point] [Array of Point] -> [Boolean]
function pointInPolygon(thePoint, polygon){
	var polySides = polygon.length;
		
	var i, j = polySides - 1;
	var oddNodes = false;
		
	for (i=0; i<polySides; i++) {
		if (polygon[i].py< thePoint.py && polygon[j].py>= thePoint.py
		||  polygon[j].py< thePoint.py && polygon[i].py>= thePoint.py) {
		if (polygon[i].px+(thePoint.py-polygon[i].py)/(polygon[j].py-polygon[i].py)*(polygon[j].px-polygon[i].px)<thePoint.px) {
			oddNodes=!oddNodes; }}
		j=i; 
	}
	
	return oddNodes;
}

//isPointInside: [Tile] [Number] [Number] -> [Boolean]
function isPointInside(theTile, x, y){
	thePoint = new Point(x, y);
	return pointInPolygon(thePoint, theTile.getExactBounds());
}

//randomBetween: [Number] [Number] -> [Number]
function randomBetween(x, y){
	return Math.round(Math.random() * (y - x) + x);
}

//getTileAt: [Number] [Number] -> [Tile] / [False]
function getTileAt(x, y){
	cnt = 0;
	for(var i = 0; i < diagMap.length; i++){
		for(var j = 0; j < diagMap[i].length; j++){
			cnt  = cnt + 1;
			var theTile = diagMap[i][j];
			
			if(theTile.getYCoord() - 64 > y){
				return false;
			}
			if(theTile.getYCoord() + 64 < y){
				var diff = y - theTile.getYCoord();
				diff = Math.floor(diff / 32);
				i += diff - 1;
				break;
				//j = 0;
			}
			if(x - theTile.getXCoord() < 0){
				break;
			}
			if(theTile.getXCoord() + 128 < x){
				var diff = x - theTile.getXCoord();
				diff = Math.floor(diff / 64);
				j += diff - 1;
				if(j >= diagMap[i].length){
					return false;
				}
			}
			//otherwise, check if the mouse is inside the tile.
			if(isPointInside(diagMap[i][j], x, y)){
				//lastMouseOnTile.isMouseOn = false;
				//diagMap[i][j].isMouseOn = true;
				//lastMouseOnTile = diagMap[i][j];
				return diagMap[i][j];
			}
		}
	}
	return false;

}