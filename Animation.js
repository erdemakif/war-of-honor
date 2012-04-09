	/* GUIDE : How to create animations 
		
		what you need to do is creating a updateAndrender function (i will call it 'uar' from now on):
			*you need to provide a function when you add your object's animation to the animation queue. 
			*this function takes a parameter called 'coeff'. coeff is a number which indicates 
				the time coefficient that you need to consider while calculating x-Difference, y-Difference and sprite index as well.
				for example 
					new_x = speed_x * coeff;
					next_image_index = coeff < 0.5 ? lastIndex : lastIndext+1 ;


		THOUGHTS (maybe todo) : 
			*after getting standartized sprites we could generate a global image index or provide image index from AnimationHandler
				Not doing it now because the example sprites that we used do not share the same width, height or other offset values. 


		//***this part is deprecated, i will delete after being sure about the new system.
		- animRender has two parameters: (world, timePassed)
			*first world information which holds neccessary data for update of your animation, a world is an object. inside of that object is up to you, only neccessary fields are 'timePassed:0' and 'framerate:(your call)' fields.
			*second input is time passed until last call of your animRender function. You should add following lines to your animRender function's head. Overall skelethon of your function should look something like this:

			function animRender(world, timePassed){
				world.timePassed += timePassed;
				if(world.timePassed>=world.framerate){
					world.timePassed = 0; //reset timePassed
					...update code here
					...render code here
				}else{
					...only render code here
				}
			}
		//***
	*/
	function AnimationHandler(){
		
		this.render = render;
		this.addAnimation = addAnimation;
		this.list = new Array();
		
		this.goalFPS = 60;
		//
		this.lastTime = 0
		this.elapsedTime = 0;

		this.totalFPS = 0;
		this.avgFPS = 0;
		this.FPS = 0;
		this.coeff = 1;
		this.innerCount = 0;

		this.calcTime = calcTime;

		function render(){
			this.calcTime();
		    for(var i=0; i<this.list.length; i++){
		    	this.list[i](this.coeff);
		    }
			
		}

		function addAnimation(updateAndRender){
			this.list.push(updateAndRender);
		}

		function calcTime(){
			var newTime = new Date().getTime();
			this.elapsedTime = newTime - this.lastTime;
			this.lastTime = newTime;

			this.FPS = 1000/this.lastTime;
			this.totalFPS += this.FPS;
			this.innerCount++;
			this.avgFPS = this.totalFPS / this.innerCount;
			this.coeff = this.goalFPS / this.FPS;
		}
	}
