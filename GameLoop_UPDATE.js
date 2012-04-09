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
	userKeyUpdate();
	airController.updateAir();
	firstborn.update();
	
	if(mouse.isDown && uiSelect.tileOn){
		//lastMouseOnTile.source_ix = uiSelect.ix;
		//lastMouseOnTile.source_iy = uiSelect.iy;
		firstborn.path[firstborn.path.length] = lastMouseOnTile;
		
		//firstborn.xCoord = mouse.mx - worldShift.getXShift();
		//firstborn.yCoord = mouse.my - worldShift.getYShift();
		//firstborn.path.push(lastMouseOnTile);
	}
	
	else if(mouse.isDown && !uiSelect.tileOn && !uiSelect.oneObjectPut){
		lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 2, 28, 64, 128);
		uiSelect.oneObjectPut = true;
	}
	
}

//userKeyUpdate: [Void] -> [Void]
function userKeyUpdate(){
	if(keyboard.a_key){
		worldShift.xShift += 5;
		//shiftMap(5, 0);
		//mouseHover();
	}
	if(keyboard.d_key){
		worldShift.xShift += -5;
		//shiftMap(-5, 0);
		//mouseHover();
	}
	if(keyboard.w_key){
		worldShift.yShift += 5;
		//shiftMap(0, 5);
		//mouseHover();
	}
	if(keyboard.s_key){
		worldShift.yShift += -5;
		//shiftMap(0, -5);
		//mouseHover();
	}

	//mouseHover();
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
