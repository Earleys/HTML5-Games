var canvas;
var canvasContext;
var timer;
var player;
var ball;
var mouse;
var bricks = [];

const BRICK_ROWS = 5;
const BRICK_COLUMNS = 8;
const BRICK_WIDTH = 85;
const BRICK_HEIGHT = 20;
const PLAYER_BRICK_WIDTH = 85;
const PLAYER_BRICK_HEIGHT = 15;

function initialize() {
	canvas = document.getElementById('game');
	canvasContext = canvas.getContext("2d");

	timer = setInterval(update, 1000 / 30);
	player = new Player(canvas, PLAYER_BRICK_WIDTH, PLAYER_BRICK_HEIGHT);
	ball = new Ball(canvas, player);
	mouse = new Mouse(canvas);

	var rowOffset = 30;
	var columnOffset;

	for (var i=0; i < BRICK_ROWS; i++) {
		rowOffset += BRICK_HEIGHT + 5;
		columnOffset = canvas.width / BRICK_COLUMNS / 2.5;
		for (var j=0; j < BRICK_COLUMNS; j++) {
			bricks.push(new Brick(columnOffset, rowOffset, BRICK_WIDTH, BRICK_HEIGHT));
			columnOffset += BRICK_WIDTH + 5;
		}
	}

	canvas.addEventListener('mousemove', function(evt) {
		mouse.updateMousePosition(evt);
		player.move(mouse.x - (PLAYER_BRICK_WIDTH / 2));
	});

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

function changeYSpeed(brick) {
	ball.ballSpeedY = -ball.ballSpeedY;
	var deltaX = ball.x - (brick.x + brick.width / 2);
	ball.ballSpeedX = deltaX * 0.25;
}

window.onload = function() {
	initialize();
}

function update() {
	ball.move();
	drawRectangle(0, 0, canvas.width, canvas.height, '#000000');
		drawRectangle(player.x, player.y, PLAYER_BRICK_WIDTH, PLAYER_BRICK_HEIGHT, "#FFFFFF"); // player brick
		drawBall(ball.x, ball.y, 15, "#FFFFFF");
		for (var i = bricks.length - 1; i >= 0; i--) {
			drawRectangle(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height, "#FFFFFF");
			if (ball.hits(bricks[i]))  {
				changeYSpeed(bricks[i]);
				bricks.splice(i, 1);
				player.score++;
				if (player.score % 10 == 0) {
					player.lifes++;
				}
			}
		}
		if (ball.hits(player)) {
			changeYSpeed(player);
		}
		else if (ball.hitsBottom(canvas)) {
			ball.reset();
			player.lifes--;
		}

		canvasContext.font = "14px Arial";
		canvasContext.fillText("Score: " + player.score, 20, 20);
		canvasContext.fillText("Lifes: " + player.lifes, 20, 40);

		if (bricks.length == 0) {
			ball = null;
			canvasContext.font = "16px Arial";
			canvasContext.fillText("YOU WON, Congratulations!", canvas.width / 2, canvas.height / 2);
			canvasContext.fillText("Reload page to play again.", canvas.width / 2, canvas.height / 2 + 25);
			clearInterval(timer);
		} else if (player.lifes <= 0) {
			canvasContext.font = "16px Arial";
			canvasContext.fillText("YOU LOST, You ran out of lifes!", canvas.width / 2, canvas.height / 2);
			canvasContext.fillText("Reload page to try again.", canvas.width / 2, canvas.height / 2 + 25);
			clearInterval(timer);
		}
	}

