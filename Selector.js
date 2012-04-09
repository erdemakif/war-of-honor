		uiSelect = new UserInterfaceSelect();

		circle = new Image();
    	circle.src = "images/circle.png";
		SELECTOR = 0;
		selectorObj = null

			//-------------
	//SELECTOR CODE
	//------------- 
	//will be fixed when we start to put environment actually
	//is not make sense with map builder like application
	//QUESTION is --??-- where is the actualy draw last mouse on tile when click codeh???
	function handleSelector(e){
		if(selectorObj){
			checkSelectorSelection(e);	
		}else{
			//determine how many options should we use blah blah
			//pass to the selectorObj
			//selectorObj.options = [tower1, tower2 ..];
			//
			var x = lastMouseOnTile.mapX;
			var y = lastMouseOnTile.mapY;
			selectorObj =  {x:e.offsetX, y:e.offsetY, options:["option1","option2","option3"], currW:5, currH:5, tileX:x, tileY:y, timePassed:0, framerate:20};

			anim.addAnimation(selectorAnimation, selectorObj, SELECTOR);			
		}
	}
	
	function checkSelectorSelection(mouse){
		/*COMPATIBILITY
		* this part should be fixed
		*
		*/
		var x = mouse.offsetX;
		var y = mouse.offsetY;
		
		//is mouse in circular area? any more accurate method??
		var interval = Math.PI*2 / selectorObj.options.length;
		for(var i=0; i<selectorObj.options.length; i++){
			if(distance(x,y, selectorObj.x+Math.sin(interval*i)*75, selectorObj.y-Math.cos(interval*i)*75) <= 20){
				//alert("option"+(i+1)+" clicked!");
				lastMouseOnTile = isometricMapInfo[selectorObj.tileX][selectorObj.tileY];
			}	
		}
		if(distance(x,y, selectorObj.x, selectorObj.y)>75){
			removeOldSelector();
		}
	}
	
	function removeOldSelector(){
		for(var i=0; i<anim.list.length; i++){
			if(anim.list[i].priority == SELECTOR){ anim.list.splice(i,1); break; }
		}
		selectorObj = null;
	}
	
	function selectorAnimation(s, time){
		s.timePassed += time;
		if(s.timePassed>=s.framerate){
			//alert("time");
			s.timePassed = 0;
			if(s.currH < 150 || s.currW < 150  ){
	       	 	s.currW += 20;
	        	s.currH += 20;
			}else{
				if(s.options.length == 0) return; //there's no reason to show a optionless selector. 
				var interval = Math.PI*2 / s.options.length;
				for(var i=0; i<s.options.length; i++){
					ctx.drawImage(circle, s.x+Math.sin(interval*i)*75-20, s.y-Math.cos(interval*i)*75-20, 40, 40);	
				} 
			}
	    	ctx.drawImage(circle, s.x-s.currW/2, s.y-s.currH/2, s.currW, s.currH);
		}else{
			//alert("not time");
			if(!(s.currH < 150 || s.currW < 150)){
				if(s.options.length == 0) return; //there's no reason to show a optionless selector. 
				var interval = Math.PI*2 / s.options.length;
				for(var i=0; i<s.options.length; i++){
					ctx.drawImage(circle, s.x+Math.sin(interval*i)*75-20, s.y-Math.cos(interval*i)*75-20, 40, 40);	
				} 
			}
	    	ctx.drawImage(circle, s.x-s.currW/2, s.y-s.currH/2, s.currW, s.currH);
		}
	    
	}
	//END SELECTOR CODE