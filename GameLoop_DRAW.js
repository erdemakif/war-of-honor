/*
	This file contains draw function and draw related functions. [draw] function is called at
	every game loop
		
		Functions;

		- draw: [Void] -> [Void] 
		The function that is being called at every game loop cycle 
		It is responsible to display images on screen

		- drawObjectsOn: [Void] -> [Void] 
		Draws environments on tiles.
		For now, creatures are being drawn in this phase

		- drawBastTileLayer: [Void] -> [Void] 
		Draws the tiles in screen

		- clearScreen: [Void] -> [Void] 
		Clears screen by displaying a big black rectangle

		- drawUI: [Void] -> [Void] 
		Draws the UI panel at the right of the screen


*/

//draw: [Void] -> [Void] 
function draw(){
	//clearScreen();
	drawBaseTileLayer();
	drawObjectsOn();

	
	airController.renderAir();

	drawUI();


	for(var a = 0; a < creatureController.creatures.length; a++){
		creatureController.creatures[a].drawn = false;		
	}
	
	//firstborn.drawn = false;

	/*
	for(var y = 0; y < isometricMapInfo.length; y++){
		for(var x = 0; x < isometricMapInfo[y].length; x++){
			theTile = isometricMapInfo[y][x]

			ctx.fillStyle = "rgb(100, 0, 0)"
			ctx.fillText(theTile.mapX + ", " + theTile.mapY, theTile.getXCoord() + 32, theTile.getYCoord() + 16);
		}
	}
	*/

	
	//an1.getImagePiece().drawImageAt(100, 200);
	//an1.update(30);
	

}


//drawObjectsOn: [Void] -> [Void]
function drawObjectsOn(){
	var cacheTile;

	//theTile = getTileAt(30, 30);
	//theTile.renderObjectsOn();


	
	for(var i = 0; i < diagMap.length; i++){
		for(var j = 0; j < diagMap[i].length; j++){
			cacheTile = diagMap[i][j];
			if(cacheTile.getYCoord() < - 32){
				i += makePositive(Math.floor(cacheTile.getYCoord() / 32) + 2);
				break;
			}
			
			//Ekranin altinda kalan environmentlarin kirpilma boundi
			if(cacheTile.getYCoord() - 32 * 5> canvasHeight){
				return;
				//i = diagMap.length;
				//continue;
			}
			
			if(cacheTile.getXCoord() > canvasWidth){
				j = diagMap[i].length;
				continue;
			}
			
			// -32 yapýnca acaip saçma bi hatalar browser takiliyo
			if(cacheTile.getXCoord() < -64){
				j = makePositive(Math.floor(cacheTile.getXCoord() / 64) + 2);
				continue;
			}

			/*
			if(!firstborn.drawn &&
			cacheTile.getYCoord() + 16 - firstborn.getYCoord() <= 16
			&& cacheTile.getYCoord() + 16 - firstborn.getYCoord()>= 0){
				firstborn.renderSelf();
				firstborn.drawn = true
				//cacheTile.xCoord = 10;
				
				//Hangi tile da cizildigini gostermek icin
				//ctx.fillRect(cacheTile.getXCoord() + 32, cacheTile.getYCoord() + 16, 10, 10);
			}
			*/

			// her tile da degil her sirada sor
			/*
			while(true){
				if(creatureController.creatures.length != lastCreature &&
				cacheTile.getYCoord() + 16 - creatureController.creatures[lastCreature].getYCoord() <= 16 &&
				cacheTile.getYCoord() + 16 - creatureController.creatures[lastCreature].getYCoord() >= 0){
				
				creatureController.creatures[lastCreature].renderSelf();
				lastCreature = lastCreature + 1;
				}
				else{
					break;
				}

			}
			*/

			for(var a = 0; a < creatureController.creatures.length; a++){
				if(creatureController.creatures[a].drawn == false &&
				cacheTile.getYCoord() + 16 - creatureController.creatures[a].getYCoord() <= 16 &&
				cacheTile.getYCoord() + 16 - creatureController.creatures[a].getYCoord() >= 0){
					creatureController.creatures[a].renderSelf();
					creatureController.creatures[a].drawn = true;
				}
			}


			
			//ctx.fillStyle = "rgb(255, 0, 0)"
			//ctx.fillText(lastCreature, 100, 200);
		
			
			cacheTile.renderObjectsOn();
			

			
		}
	}	
}

//drawBastTileLayer: [Void] -> [Void]
function drawBaseTileLayer(){
	var cacheTile;
	var num = 0;
	for(var i = 0; i < diagMap.length; i++){
		for(var j = 0; j < diagMap[i].length; j++){
			cacheTile = diagMap[i][j];
			
			//Sicramaya bakmak icin
			//ctx.fillStyle = "rgb(130, 20, 50)";
			//ctx.fillText(num, cacheTile.getXCoord() + 32, cacheTile.getYCoord());

			num++;
			totalChecks += 1;
			
			//jump to view point
			
			if(cacheTile.getYCoord() < - 32){
				i += makePositive(Math.floor(cacheTile.getYCoord() / 32) + 2);
				/*
				if(i >= diagMap.length){
					return;
				}
				*/
				break;
			}
			

			if(cacheTile.getYCoord() > canvasHeight){
				return;
				//i = diagMap.length;
				//continue;
			}
			
			if(cacheTile.getXCoord() > canvasWidth){
				j = diagMap[i].length;
				continue;
			}
			
			// -32 yapýnca acaip saçma bi hatalar browser takiliyo
			if(cacheTile.getXCoord() < -64){
				j = makePositive(Math.floor(cacheTile.getXCoord() / 64) + 2);
				continue;
			}		
		
			cacheTile.renderSelf();
			
			//cacheTile.renderObjectsOn();
			/*
			if(!player.drawn && cacheTile.getYCoord() + 16 - player.getYCoord() <= 64
			&& cacheTile.getYCoord() + 16 - player.getYCoord() >= 32){
				
				player.renderSelf();
				player.drawn = true;
			}
			*/
		}
	}
}

//clearScreen: [Void] -> [Void]
function clearScreen(){
	ctx.fillStyle = "rgb(0, 10, 5)";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

//drawUI: [Void] -> [Void]
function drawUI(){
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(800, 0, 200, 600);
	
	ctx.fillStyle = "rgb(50, 50, 50)";
	var shift = 10;
	ctx.fillRect(800 + shift, 0 + shift, 200 - shift * 2, 600 - shift * 2);
	
	var d = new Date();
	var r = 30;
	var g = 160;
	var b = 50;

	ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
	ctx.fillText("Total Tiles: " + isometricMapInfo.length * isometricMapInfo[0].length, 815, 25); 
	
	ctx.fillText("Map Shift X: " + worldShift.xShift, 815, 40);
	ctx.fillText("Map Shift Y: " + worldShift.yShift, 815, 55);
	
	ctx.fillText("Mouse X: " + mouse.mx, 815, 80);
	ctx.fillText("Mouse Y: " + mouse.my, 815, 95);
	
	ctx.fillText("OnMouseTile mapX: " + lastMouseOnTile.mapX, 815, 120);
	ctx.fillText("OnMouseTile mapY: " + lastMouseOnTile.mapY, 815, 135);
	
	ctx.fillText("Max air objects: " + airController.maxQuantity, 815, 160);
	ctx.fillText("Current air objects: " + airController.airSet.length, 815, 175);
	ctx.fillText("Cooldown: " + airController.cooldown + " MS", 815, 190);
	ctx.fillText("Cd progress: " + airController.currentProgress + " MS", 815, 205);

	ctx.fillText("Total Render Checks: " + totalChecks, 815, 230);
	ctx.fillText("Total Render: " + totalDraws, 815, 245);

	ctx.fillText("Total Creatures: " + creatureController.creatures.length, 815, 270);

	ctx.fillText("Total Animations: " + animationController.animations.length, 815, 295);

	ctx.fillText("SELECTED TILE", 840, 450);
	ctx.drawImage(tileSheet, 64 * uiSelect.ix, 32 * uiSelect.iy, 64, 32, 865, 470, 64, 32);
	
	ctx.fillText("Selected Tile X: " + uiSelect.ix, 815, 520);
	ctx.fillText("Selected Tile Y: " + uiSelect.iy, 815, 535);
	
	if(uiSelect.tileOn){
		ctx.fillText("Tile swapping", 815, 550);
	}
	else{
		ctx.fillText("Object putting", 815, 550);
	}
}