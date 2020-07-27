var socket;
var allowedOrigins = "http://localhost:* http://127.0.0.1:*";

function setup() {
	createCanvas(200, 200);
	background(10);

	socket = socket.io.connect('http://127.0.0.1:3000');
}

function draw() {
	noStroke();
  background(51);
  ellipse(mouseX, mouseY, 60, 60);
}