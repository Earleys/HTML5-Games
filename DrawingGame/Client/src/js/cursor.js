function Cursor(canvas) {
	this.canvas = canvas;
	this.x = 0;
	this.y = 0;

	this.updateMousePosition = function(cursor) {
		var rect = canvas.getBoundingClientRect();	
		var scaleX = canvas.width / rect.width;
		var scaleY = canvas.height / rect.height;
		this.x = (cursor.clientX - rect.left) * scaleX,
		this.y = (cursor.clientY - rect.top) * scaleY;	
	}
}