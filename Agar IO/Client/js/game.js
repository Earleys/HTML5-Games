var canvas;
var canvasContext;
var timer;
var conn;

function initialize() {
	canvas = document.getElementById("game");
	canvasContext = canvas.getContext("2d");
	timer = setInterval(update, 1000 / 30);
	conn = new Connection();
	conn.connect();
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

function update() {

}

window.onload = function() {
	initialize();
}
