function MightyMagician(){
	
	this.healer = new Image();
	this.healer.src = "images/healer.png";
	this.healerAnim = new Animation(1500);
	this.healerAnim.loop = false;

	this.healEffect = new Image();
	this.healEffect.src = "images/heal.png";
	this.healAnim = new Animation(1500);

	this.update = update;
	this.renderSelf = renderSelf;

	this.y = 600;
	this.x = 200;

	this.spell = spell;

	this.rising = true;
	this.spelled = false;

	function spell(){

		for (var i = creatureController.creatures.length - 1; i >= 0; i--){
			creatureController.creatures[i].currentHp = 100;
			
			this.healAnim.loop = false;
			for (var k = 0; k <= 5; k++){
				this.healAnim.addScene(new ImagePiece(this.healEffect, k*64, k*64, 64, 64));
			};
			this.healAnim.run = true;
			animationController.addAnimation(this.healAnim)
		};

		this.healerAnim.run = true;
		animationController.addAnimation(this);

		this.spelled = true;
	}

	function update(passedMsec){
		
		if(this.rising){
			if(this.y>100)
				this.y -= 5;
			else
				this.rising = false;
		}else{
			if(this.y<600)
				this.y += 5;
			else{
				this.healerAnim.run = false;
				this.healAnim.run = false;
			}
		}
		
	}

	function renderSelf(){
		if(this.spelled){
		for (var i = creatureController.creatures.length - 1; i >= 0; i--){
			this.healAnim.getImagePiece().drawImageAt(creatureController.creatures[i].getXCoord(), creatureController.creatures[i].getYCoord()-64);
		};

		ctx.drawImage(this.healer, this.x, this.y, 440, 410 );	
		}
		
	}
}