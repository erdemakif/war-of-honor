/*
	UserInterfaceSelect

*/
function UserInterfaceSelect(){
	this.ix = 0;
	this.iy = 0;
	
	this.tileOn = true;
	this.oneObjectPut = false;
	
	this.tileSwap = tileSwap;
	
	
	function tileSwap(keyCode){
		
		/*
		sagOk: 39
		solOk: 37
		yukariOk: 38
		asagiOk:40
		*/
		
		
		if(keyCode == 37){
			this.ix--;
			
		}
		
		
		else if(keyCode == 38){
			this.iy -= 1;
		}
		
		else if(keyCode == 39){
			this.ix++;
		}
		
		else if(keyCode == 40){
			this.iy += 1;
		}
		
		else if(keyCode == 82){
			this.iy = 0;
			this.ix = 0;
		}
		
		else if(keyCode == 67){
			this.tileOn = !this.tileOn;
		}
	}
	
	
	/*
	function tileSwap(keyCode){
		if(keyCode == 49){
			if(this.iy == 0){
				if(this.ix < 1){
					this.ix++;
				}
				else{
					this.ix = 0;
				}
			}
			else{
				this.iy = 0;
				this.ix = 0;
			}
		}
		
		if(keyCode == 50){
			if(this.iy == 2){
				if(this.ix < 2){
					this.ix++;
				}
				else{
					this.ix = 0;
				}
			}
			else{
				this.iy = 2;
				this.ix = 0;
			}
		}
		
		if(keyCode == 51){
			if(this.iy == 4){
				if(this.ix < 2){
					this.ix++;
				}
				else{
					this.ix = 0;
				}
			}
			else{
				this.iy = 4;
				this.ix = 0;
			}
		}
		
	
	}
	*/

}