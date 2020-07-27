var canvas;
var canvasContext;
var timer;
var connection;
var boxes = [];
var player = null;

var gridSize = 32;

var columns = 14;
var rows = 14;

var wallImage = new Image();
var crateImage = new Image();
var groundImage = new Image();

var currentGame;

function initialize()
{
	canvas = document.getElementById("game");
	canvasContext = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	connection = new Connection();
	player = new Player(canvas, connection);
	window.addEventListener('keydown', keyPress, false);
	timer = setInterval(update, 1000 / 30);

	wallImage.src = 'images/wall.png';
	crateImage.src = 'images/crate.jpg';
	groundImage.src = 'images/wood.jpg';

	currentGame = level; // move to server

}

function keyPress(e) {

	if (e.keyCode == '38') { // up
		player.moveUp(gridSize);
	} else if (e.keyCode == '40') {  // down
		player.moveDown(gridSize);
	} else if (e.keyCode == '37') { // left
		player.moveLeft(gridSize);
	} else if (e.keyCode == '39') { // right
		player.moveRight(gridSize);
	}

}

function refreshLevel() {
// level has to come from server
	var row = 0;
	for (var i = 0; i < currentGame.length; i++) {
		for (var j = 0; j < currentGame[i].length; j++) {
			drawTile(row, currentGame[i][j]);
		}
		row++;
	}
}

function drawTile(row, tile) {
	switch (tile) {
		case 0: 
			canvasContext.drawImage(groundImage, row, tile);

		break;
		case 1:
			canvasContext.drawImage(wallImage, row, tile);
		 break;
		case 2:
			canvasContext.drawImage(crateImage, row, tile);
		 break;
		default: break;
	}
}

function update() {
	drawRectangle(0, 0, canvas.width, canvas.height, '#000000');
	refreshLevel();
}

window.onload = function() {
	initialize();
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