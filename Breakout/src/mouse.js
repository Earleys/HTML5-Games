function Mouse(canvas) {

	this.x = 0;
	this.y = 0;

	this.updateMousePosition = function(cursor) {
	var rect = canvas.getBoundingClientRect();	
	this.x = cursor.clientX - rect.left,
	this.y = cursor.clientY - rect.top;	
	}

}