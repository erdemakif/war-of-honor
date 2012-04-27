/*
	Information;


	variables;

	methods;


*/

function ImagePiece(whole_image, sx, sy, width, height){
	this.sx = sx;
	this.sy = sy;
	this.width = width;
	this.height = height;
	this.img = whole_image;

	this.drawImageAt = drawImageAt;

	function drawImageAt(x, y){
		ctx.drawImage(this.img, this.sx, this.sy, this.width, this.height, x, y, this.width, this.height);
	}
}