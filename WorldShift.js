/*
	Information;
		- WorldShift class is for keeping the track of how much the and in which 
		direction the player's camera is moved. Every object in screen with a point
		is effected by these values of xShift and yShift

	variables;
		- xShift: [Number] Holds information about how X coordinate of camera is shifted
		- yShift: [Number] Holds information about how Y coordinate of camera is shifted
	
	methods;
		- getXShift: [Void] -> [Number] 
		Returns the value of xShift in the object

		- getYShift: [Void] -> [Number] 
		Returns the value of yShift in the object

*/

function WorldShift(){
	//Variables
	this.xShift = 0;
	this.yShift = 0;
	
	//Methods
	this.getXShift = getXShift;
	this.getYShift = getYShift;
	
	//getXShift: [Void] -> [Number] 
	function getXShift(){
		return this.xShift;
	}
	
	//getYShift: [Void] -> [Number] 
	function getYShift(){
		return this.yShift;
	}
	
}