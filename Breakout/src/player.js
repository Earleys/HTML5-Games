var canvas;

function Player(canvas, width, height) {
	this.x = canvas.width / 2;
	this.y = canvas.height - 50;
	this.width = width;
	this.height = height;
	this.canvas = canvas;
	this.lifes = 3;
	this.score = 0;

	this.move = function(x) {
		this.x = x;
	}

}