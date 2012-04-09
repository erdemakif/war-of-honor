/*
	Information;
		- MouseInfo holds data about mouse and it's interaction such as if the button is
		being pressed or where the mouse is in x/y plane

	variables;
		- mx: [Number] X coordinate of Mouse
		- my: [Number] Y Coordinate of Mouse
		- isDown: [Boolean] If mouse button is down True, else False
		- isMoved: [Boolean] If mouse is held still True, else False
	
	methods;
		- setNewMxMy: [Number] [Number] -> [Void] 
		Sets new values to mx and my

*/
function MouseInfo(){
	//Variables
	this.mx = 0;
	this.my = 0;
	this.isDown = false;
	this.isMoved = false;
	//Methods
	this.setNewMxMy = setNewMxMy;

	//setNewMxMy: [Number] [Number] -> [Void] 
	function setNewMxMy(newMx, newMy){
		this.mx = newMx;
		this.my = newMy;
	}	
	
}