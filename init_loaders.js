/*
	This file contains init function and update related functions. [init] function is called when the code 
	is executed
		
		Functions;

		- init: [Void] -> [Void]
		init loads and creates the data that will be used inside game cycles.

		- addListeners: [Void] -> [Void]
		sets the listeners to their corresponding functions

		- loadAirController: [Void] -> [Void]
		creates and initializes the air controller which will control the clouds

		- loadMap: [Void] -> [Void]
		fills the isometricMapInfo with tiles [Tiles are constant]
		
		- loadRandomMap: [Void] -> [Void]
		fills the isometricMapInfo with tiles [Tiles are random]

		- getDiagVersionOfMap: [2D array of Tiles] -> [2D array of Tiles]
		gets a normal order array and gives back a diagonal style array

		- loadImages: [Void] -> [Void]
		loads image files from given pathes

		- loadMapIndex: [Void] -> [Void]
		fills index of tiles in isometric order


*/

//init: [Void] -> [Void]
function init(){  
	canvas = document.getElementById('window');   
	ctx = canvas.getContext('2d');  
	globalA = 1;
	//document.getElementById("tuxie").style.opacity = 0.2;
	millis = new Date();
	worldShift = new WorldShift();
	mouse = new MouseInfo();
	keyboard = new KeyboardInfo();
	addListeners();
	
	loadImages();
	//loadMap();
	loadRandomMap();
	loadMapIndex();
	
	loadAirController();
	
	//Testy things goes here LOL
	totalDraws = 0;
	totalChecks = 0;
	totalMouseHoverChecks = 0;
	
	
	//IMPORTANT STUFF
	//aPoly = [new Point(100, 100 + 16), new Point(100 + 32, 100 + 32), new Point(100 + 64, 100 + 16), new Point(100 + 32, 100)];
	
	uiSelect = new UserInterfaceSelect();
	
	firstborn = new Creature(200,100);
	canvasWidth = 800;
	canvasHeight = 600;
	setInterval(gameLoop, 10);
}

//addListeners: [Void] -> [Void]
function addListeners(){
	document.addEventListener("keydown", keyHandlerDown, false);
	document.addEventListener("keyup", keyHandlerUp, false);
	canvas.addEventListener('mousemove', onMoveListener);
	canvas.addEventListener('mousedown', onMouseClickListener);
	canvas.addEventListener('mouseup', onMouseClickUpListener);
}

//loadAirController: [Void] -> [Void]
function loadAirController(){

	var cloudImages = new Array();
	cl0 = new Image();
	cl0.src = "./images/cl0.png";
	
	cl1 = new Image();
	cl1.src = "./images/cl1.png";
	
	cl2 = new Image();
	cl2.src = "./images/cl2.png";
	
	cl3 = new Image();
	cl3.src = "./images/cl3.png";
	
	cl4 = new Image();
	cl4.src = "./images/cl4.png";
	
	cloudImages[0] = cl0;
	cloudImages[1] = cl1;
	cloudImages[2] = cl2;
	cloudImages[3] = cl3;
	cloudImages[4] = cl4;

	airController = new AirController(cloudImages, 8, 20, 80);

	//alert(airController.airSet.length);
}

//loadMap: [Void] -> [Void]
function loadMap(){
	
	//Tile(source, source_ix, source_iy, width, height, xCoord, yCoord)
	
	isometricMapInfo = new Array();
	for(var i = 0; i < 20; i++){
		var cacheArray = new Array();
		for(var j = 0; j < 20; j++){
			cacheArray[j] = new Tile(tileSheet, 0, 1, 64, 32,
			32 * j + 20 + i * 32,
			i * 32 + j * -16 + 100 + i * - 16);
		
		}
		isometricMapInfo[i] = cacheArray;
	}
	
	lastMouseOnTile = isometricMapInfo[4][4];
	//Test
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 26, 64, 64 + 32 + 32 + 32 + 32);
	
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 1, 14, 64, 64);
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 1, 14, 64, 64);
	
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 1, 64, 32);
	
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 1, 14, 64, 64);
	
	diagMap = new Array();
	diagMap = getDiagVersionOfMap(isometricMapInfo);
}

//loadRandomMap: [Void] -> [Void]
function loadRandomMap(){
	isometricMapInfo = new Array();
	for(var i = 0; i < 20; i++){
		var cacheArray = new Array();
		for(var j = 0; j < 20; j++){
			cacheArray[j] = new Tile(tileSheet, randomBetween(0, 6), 1, 64, 32,
			32 * j + 20 + i * 32,
			i * 32 + j * -16 + 100 + i * - 16);

			var times = randomBetween(0, 5);
			if(times == 0){
				times = randomBetween(0, 3);
				while(times > 0){
				cacheArray[j].addNewEnvironmentSameWidth(tileSheet, randomBetween(1, 8), 14, 64, 64);
				times--;
			}
			}
			
			
		}
		isometricMapInfo[i] = cacheArray;
	}
	lastMouseOnTile = isometricMapInfo[0][0];
	//Test
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 26, 64, 64 + 32 + 32 + 32 + 32);
	
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 1, 14, 64, 64);
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 1, 14, 64, 64);
	
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 1, 64, 32);
	//lastMouseOnTile.addNewEnvironmentSameWidth(tileSheet, 0, 1, 64, 32);
	
	diagMap = new Array();
	diagMap = getDiagVersionOfMap(isometricMapInfo);
}

//getDiagVersionOfMap: [2D array of Tiles] -> [2D array of Tiles]
function getDiagVersionOfMap(isoMap){
	var baseArray = new Array();
	var cacheArray = new Array();
	
	//DANGER
	var xStabil = isometricMapInfo[0].length - 1;
	var yStabil = 0;
	
	var xChange = xStabil;
	var yChange = yStabil;
	ctx.fillStyle = "rgb(100, 0, 0)";
	ctx.font = "10pt Arial";
	
	var count = 0;
	
	/*
	//Index Stuff
	var indexX = 0;
	var indexY = 0;
	*/
	
	while(true){
		//isometricMapInfo[yChange][xChange].renderObjectsOn();
		cacheArray[cacheArray.length] = isoMap[yChange][xChange];
		
		/*
		//Index Stuff
		isoMap[yChange][xChange].diagMapY = indexY;
		isoMap[yChange][xChange].diagMapX = indexX;
		*/
		
		count++;
		xChange++;
		yChange++;
		
		//Index Stuff
		//indexX++;

		//limit
		if(xChange >= isometricMapInfo[0].length || yChange >= isometricMapInfo.length){
			//Terminate while
			if(xChange == yChange){
				baseArray[baseArray.length] = cacheArray;
				cacheArray = new Array();
				break;
			}
			else{
				baseArray[baseArray.length] = cacheArray;
				cacheArray = new Array();
				yChange = yStabil;
				xStabil--;
				xChange = xStabil;
				
				/*
				//Index stuff
				indexX = 0;
				indexY++;
				*/
			}
		}
	}
	
	xStabil = 0;
	yStabil = 1;
	
	/*
	//Index Stuff
	indexX = 0;
	indexY++;
	*/
	
	yChange = yStabil;
	xChange = xStabil;
	
	cacheArray = new Array();
	while(true){
		

		cacheArray[cacheArray.length] = isoMap[yChange][xChange];
		
		/*
		//Imdex Stýff
		isoMap[yChange][xChange].diagMapY = indexY;
		isoMap[yChange][xChange].diagMapX = indexX;
		*/
		
		count++;
		xChange++;
		yChange++;
		
		//Index stuff
		//indexX++;
		
		//limit
		if(xChange >= isometricMapInfo[0].length || yChange >= isometricMapInfo.length){
			baseArray[baseArray.length] = cacheArray;
			cacheArray = new Array();
			yStabil++;
			yChange = yStabil;
			xChange = xStabil;
			
			/*
			//Index stuff
			indexX = 0;
			indexY++;
			*/
		
		}
		if(yStabil == isometricMapInfo.length){
			baseArray[baseArray.length] = cacheArray;
			cacheArray = new Array();
			break;
		}
	
	}
	
	return baseArray;
}

//loadImages: [Void] -> [Void]
function loadImages(){
	tileSheet = new Image();
	//tileSheet.src = "http://www.hizliupload.com/di-ZG0W.png";
	//tileSheet.src = "akiftile.png";
	//tileSheet.src = "sayfa22.png";
	tileSheet.src = "http://www.hizliupload.com/di-ZG0W.png";
}

//loadMapIndex: [Void] -> [Void]
function loadMapIndex(){
	for(var y = 0; y < isometricMapInfo.length; y++){
		for(var x = 0; x < isometricMapInfo[y].length; x++){
			isometricMapInfo[y][x].mapY = y;
			isometricMapInfo[y][x].mapX = x;
		}
	}
}