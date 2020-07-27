function Pipe(canvas) {
	const OFFSET = 30;
	const MIN_HEIGHT = 5;
	this.x = canvas.width;
	this.width = 10;
	this.lengthTop = Math.floor(Math.random() * canvas.height / 2 - OFFSET) + MIN_HEIGHT;
	this.lengthBottom = Math.floor(Math.random() * canvas.height / 2 - OFFSET) + MIN_HEIGHT;
	this.hasGiftedPoint = false;


	this.move = function(pipe) {
		pipe.x--;
	}
}