function Animation(changeTime){

	this.atScene = 0;
	this.scenes = new Array();
	this.loop = true;
	this.run = false;
	this.isFinished = false;

	this.sceneChangeMilli = changeTime;
	this.sceneChangeMiliLeft = changeTime;

	this.addScene = addScene;
	this.update = update;
	this.getImagePiece = getImagePiece;

	function addScene(newScene){
		this.scenes[this.scenes.length] = newScene;
	}

	function update(passedMs){

		if(this.run){
			this.sceneChangeMiliLeft -= passedMs;

			if(this.sceneChangeMiliLeft <= 0){
				this.atScene += 1;
				this.sceneChangeMiliLeft = this.sceneChangeMilli;
				if(this.atScene >= this.scenes.length){
					this.atScene = 0;
					this.isFinished = true;
				}
			}
		}

		if(this.isFinished){
			if(this.loop){
				this.isFinished = false;
			}
			else{
				this.run = false;
				//animationController.deleteAnimation(this);
			}
		}

	}

	function reset(){
		this.atScene = 0;
		this.run = false;
	}

	function getImagePiece(){
		if(!this.isFinished && this.run){
			return this.scenes[this.atScene];
		}
		//alert("Animation: getImagePiece returns null");
		return this.scenes[this.atScene];
	}
}