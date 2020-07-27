function Bird(canvas) {
	const VELOCITY = 10;
	this.x = 70;
	this.y = canvas.width / 2;
	this.canvas = canvas;
	this.velocity = VELOCITY;

	this.update = function() {
		if (this.y > canvas.height) {
			this.y = this.y;
		} else {
			this.y += this.velocity;
		}
	}

	this.jump = function() {
		if (this.y > 0 + VELOCITY) {
			this.velocity -= this.velocity + VELOCITY;
		}
	}

	this.resetVelocity = function() {
		if (this.velocity < VELOCITY) {
			this.velocity ++;
		}
	}

	this.hit = function(pipe) {
		if (this.passing(pipe)) {
			if (this.y >= 0 && this.y <= pipe.lengthTop || this.y >= (canvas.height - pipe.lengthBottom) && this.y <= canvas.height) {
				return true;
			}
		}
	}

	this.passing = function(pipe) {
		// this means the player is going through the pipe area (or hitting it, which is decided in the hit function)
		if (this.x >= pipe.x  && this.x <= (pipe.x + pipe.width)) {
			return true;
		} else {
			return false;
		}
	}
}