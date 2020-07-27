function Player(canvas, connection) {
	this.x = 200;
	this.y = 200;
	this.canvas = canvas;

	this.moveRight = function(gridsize) {
		this.x += gridsize;
	}	

	this.moveLeft = function(gridSize) {
		this.x -= gridSize;
	}

	this.moveDown = function(gridSize) {
		this.y += gridSize;
	}

	this.moveUp = function(gridSize) {
		this.y -= gridSize;
	}
	
}