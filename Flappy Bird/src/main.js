var canvas;
var canvasContext;
var timer;
var bird;
var score = 0;
var gameOver = false;
var pipes = [];

var latestPipe = new Date();

const PIPE_SPAWN_DELAY = 1; // seconds

function initialize() {
	canvas = document.getElementById('game');
	canvasContext = canvas.getContext('2d');
	pipes = [];
	bird = new Bird(canvas);

	window.addEventListener('mousedown', jump, false);
	window.addEventListener('keydown', jump);
	timer = setInterval(update, 1000 / 30);
}

window.onload = function() {
	initialize();
}

function jump() {
	bird.jump();
	if (gameOver) {
		initialize();
		gameOver = false;
	}
}

function update() {
	var current = new Date();
	drawRectangle(0, 0, canvas.width, canvas.height, '#000000');

	if (current > latestPipe ) {
		latestPipe = current.getTime() + PIPE_SPAWN_DELAY * 1000;
		pipes.push(new Pipe(canvas));
	}

	for (var i=pipes.length - 1; i >= 0; i--) {
		if (pipes[i].x < 0 - pipes[i].width - 1) { // if pipe leaves screen it can be removed
			pipes.splice(i, 1);
		}

		pipes[i].move(pipes[i]);
		drawRectangle(pipes[i].x, 0, pipes[i].width, pipes[i].lengthTop, '#FFFFFF');
		drawRectangle(pipes[i].x, canvas.height, pipes[i].width, -pipes[i].lengthBottom, '#FFFFFF');

		if (bird.passing(pipes[i])) {
			if (bird.hit(pipes[i])) {
				gameOver = true;
			} else if (!pipes[i].hasGiftedPoint) {
				score++;
				pipes[i].hasGiftedPoint = true;
			}
		}
	}

	drawBall(bird.x, bird.y, 10, '#FFFFFF');
	bird.resetVelocity();
	bird.update();
	if (bird.y > canvas.height) {
		gameOver = true;
	}
	canvasContext.font = "14px Arial";
	canvasContext.fillStyle = 'yellow';
	canvasContext.fillText("Score: " + score, 10, 20);

	if (gameOver) {
		canvasContext.font = "16px Arial";
		canvasContext.font = "yellow";
		canvasContext.fillText("You died!", 5, canvas.height /2);
		canvasContext.fillText("Press any button to retry.", 5, canvas.height /2 + 20);
		score = 0;
		clearInterval(timer);
	}
}

function drawRectangle(offsetX, offsetY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(offsetX, offsetY, width, height);
}

function drawBall(offsetX, offsetY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}