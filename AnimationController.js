/*
	Information;

	variables;

	methods;

*/

function AnimationController(){
	this.animations = new Array();

	this.addAnimation = addAnimation;
	this.createAnimation = createAnimation;
	this.updateAll = updateAll;
	this.deleteAnimation = deleteAnimation;

	function createAnimation(changeTime){
		this.animations[this.animations.length] = new Animation(changeTime);
	}
	function addAnimation(theAnim){
		this.animations[this.animations.length] = theAnim;
	}

	function updateAll(passedMs){
		for(var i=0; i<this.animations.length;i++){
			this.animations[i].update(passedMs);
		}
	}

	function deleteAnimation(anim){
		for(var i=0; i<this.animations.length;i++){
			if(anim == this.animations[i]){
				this.animations.splice(i, 1);
			}
		}
	}
	
}
