/*
	This file contains update function and update related functions. [update] function is called at
	every game loop
		
		Functions;

		- update: [Void] -> [Void]
		The function that is being called at every game loop cycle. It is responsible to update game data

		- userKeyUpdate: [Void] -> [Void]
		Takes care of when user uses a key on keyboard [includes button down/up/hold]

		- mouseHover: [Void] -> [Void]
		Updates lastMouseOnTile when it is called by taking tile at mouse position


*/

//update: [Void] -> [Void]
function update(){

	var updateNewDate = new Date();
	var milliPassed = updateNewDate.getTime() - updateLastDate.getTime();
	updateLastDate = updateNewDate;

	ctx.fillStyle = "rgb(255, 0, 0)"
	ctx.fillText(milliPassed, 100, 100);


	userKeyUpdate(milliPassed);
	airController.updateAir(milliPassed);
	creatureController.update(milliPassed);
	towerController.update(milliPassed);
	animationController.updateAll(milliPassed);
	
	
}

function measureChangeByTime(oneSecondChangeQuantity, ms){
	return (oneSecondChangeQuantity * ms) / 1000;
}


//userKeyUpdate: [Void] -> [Void]
function userKeyUpdate(passedMs){
	if(keyboard.a_key){
		worldShift.xShift += measureChangeByTime(400, passedMs);
	}
	if(keyboard.d_key){
		worldShift.xShift += measureChangeByTime(-400, passedMs);
	}
	if(keyboard.w_key){
		worldShift.yShift += measureChangeByTime(400, passedMs);
	}
	if(keyboard.s_key){
		worldShift.yShift += measureChangeByTime(-400, passedMs);
	}
	if(keyboard.h_key){
		mightymagician = new MightyMagician();
		mightymagician.spell();
	}
}

//mouseHover: [Void] -> [Void]
function mouseHover(){
	var theTile = getTileAt(mouse.mx, mouse.my);
	if(theTile != false){
		lastMouseOnTile.isMouseOn = false;
		lastMouseOnTile = theTile;
		lastMouseOnTile.isMouseOn = true;
	}
}
