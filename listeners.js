/*
	This file contains the listener functions. Current listeners are;
		- Keyboard Button Down = keyHandlerDown()
		- Keyboard Button Up = keyHandlerUp()
		- Mouse Movement = onMoveListener()
		- Mouse Button Down = onMouseClickListener()
		- Mouse Button Up = onMouseClickUpListener()

*/


function keyHandlerDown(e){
	/*
		1: 49
		2: 50
		3: 51
	*/
	var keyCode = e.keyCode;
	
	//a
	if(keyCode == 65){
	keyboard.a_key = true;
	keyboard.isPressed = true;
	}
	//d
	if(keyCode == 68){
	keyboard.d_key = true;
	keyboard.isPressed = true;
	}
	//w
	if(keyCode == 87){
	keyboard.w_key = true;
	keyboard.isPressed = true;
	}
	//s
	if(keyCode == 83){
	keyboard.s_key = true;
	keyboard.isPressed = true;
	}
	
	/*
	if(keyCode == 49 || keyCode == 50 || keyCode == 51){
		uiSelect.tileSwap(keyCode);
	}
	*/
	
	else{
		uiSelect.tileSwap(keyCode);
	}
}

function keyHandlerUp(e){
	var keyCode = e.keyCode;
	//a
	if(keyCode == 65){keyboard.a_key = false;}
	//d
	if(keyCode == 68){keyboard.d_key = false;}
	//w
	if(keyCode == 87){keyboard.w_key = false;}
	//s
	if(keyCode == 83){keyboard.s_key = false;}
}

function onMoveListener(e){
	var x;
	var y;
	
	x = e.offsetX;
	y = e.offsetY;
	mouse.setNewMxMy(x, y);
	mouse.isMoved = true;
	//mouseHover();
}

function onMouseClickListener(e){
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 27, 64, 128 + 32);
	//airController.createProcess();
	var x;
	var y;
	x = e.offsetX;
	y = e.offsetY;
	mouse.setNewMxMy(x, y);
	
	mouse.isDown = true;
	lastMouseOnTile.addNewEnvironmentSameWidth(towerSheet, 0, 0, 64,64);
	towerController.addTower(new Tower(1, lastMouseOnTile.xCoord , lastMouseOnTile.yCoord));
	/*
	lastMouseOnTile.source_ix = uiSelect.ix;
	lastMouseOnTile.source_iy = uiSelect.iy;
	*/
	
	//alert(lastMouseOnTile.mapX + ", " + lastMouseOnTile.mapY);
	
	//player.xCoord = mouse.mx - worldShift.xShift;
	//player.yCoord = mouse.my - worldShift.yShift;	
}
	
function onMouseClickUpListener(e){
	mouse.isDown = false;
	uiSelect.oneObjectPut = false;
}
