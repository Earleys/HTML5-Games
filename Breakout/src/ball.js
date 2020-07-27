function Ball(canvas, player) {
	this.canvas = canvas;
	this.x = player.x;
	this.y = canvas.height / 2;
	this.ballSpeedX = 5;
	this.ballSpeedY = 5;

	const defaultSpeed = 5;

	this.move = function() {
		this.x += this.ballSpeedX;
		this.y += this.ballSpeedY;

		if (this.x > this.canvas.width) {
			this.ballSpeedX = -this.ballSpeedX;
		}
		else if (this.x < 0) {
			this.ballSpeedX = -this.ballSpeedX;
		}
		if (this.y < 0) {
			this.ballSpeedY = -this.ballSpeedY;
		} else if (this.y > this.canvas.height) {
			this.ballSpeedY = -this.ballSpeedY;
		}
	}

	this.hits = function(brick) {
		if (this.x > brick.x && this.x < brick.x+brick.width && this.y > brick.y && this.y < brick.y + brick.height) {
			return true;
		}
	}

	this.hitsBottom = function(canvas) {
		if (this.y >= canvas.height) {
			return true;
		}
	}

	this.reset = function() {
		this.x = player.x;
		this.y = canvas.height / 2;
		this.ballSpeedX = defaultSpeed;
		this.ballSpeedY = defaultSpeed;
	}

}