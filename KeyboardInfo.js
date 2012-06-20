/*
	Information;
		- MouseInfo holds data about keyboard and it's interaction with user

	variables;
		- a_key: [Boolean] If 'A' key is being pressed True, else False
		- d_key: [Boolean] If 'D' key is being pressed True, else False
		- s_key: [Boolean] If 'S' key is being pressed True, else False
		- w_key: [Boolean] If 'W' key is being pressed True, else False
		- isPressed: [Boolean] If any of these key is being pressed True, else False

	methods;

*/
function KeyboardInfo(){
	this.a_key = false;
	this.d_key = false;
	this.s_key = false;
	this.w_key = false;
	this.isPressed = false;
	this.h_key = false;
}