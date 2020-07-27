var canvas;
var canvasContext;
var cursor;
var updateTimer;
var timer2;
var sendTimer;
var connection;
var isMouseDown = false;
var isMouseMoving = false;
var lastClickX = 0;
var lastClickY = 0;
var user;


function initialize() {
	canvas = document.getElementById("game");
	canvasContext = canvas.getContext('2d');
	drawRectangle(0, 0, canvas.width, canvas.height, "#000");
	canvas.addEventListener('mousedown', mouseDown, false);
	canvas.addEventListener('mouseup', mouseUp, false);
	cursor = new Cursor(canvas);
	connection = new Connection();
	user = new User();
	connection.connect();
	timer2 = setInterval(function(){ sendDrawing() });
	connection.sendUserJoinRequest();

	canvas.addEventListener('mousemove', function(evt) {
		cursor.updateMousePosition(evt);
		isMouseMoving = true;


	});
	updateTimer = setInterval(update, 1000 );
}


function mouseDown() {
	isMouseDown = true;

}

function mouseUp() {
	isMouseDown = false;
	isMouseMoving = false;
}

function update() {
	if (isMouseDown) {
		//isMouseMoving = false;
	}

	//drawBall(cursor.x, cursor.y, 6, "#FF0000");
}

function checkEnterPress(e) {

	if (e.keyCode === 13) {
		e.preventDefault();
		var message = document.getElementById('chatMessage');
		connection.sendChatMessage(message);
	}

}

function sendDrawing() {
	// Only sends data when the mouse is down and moving.
	// There is no need to send the same position over and over. 
	var u = user.findElement('currentClient', true);
	if (isMouseDown && isMouseMoving && u.canDraw) {
		var selectedColor = document.getElementById("colorPicker");
		var selectedSize = document.getElementById("drawSize");
		var data = {
			x: cursor.x,
			y: cursor.y,
			size: selectedSize.value,
			color: selectedColor.options[selectedColor.selectedIndex].value
		}
		connection.sendDrawPacket(data);	

	}
}

function drawBall(offsetX, offsetY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(offsetX, offsetY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function drawRectangle(offsetX, offsetY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(offsetX, offsetY, width, height);
}

function updatePlayersOnlineList() {
	var ul = document.getElementById('playerOnline');
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	for (var i=0; i < user.userList.length; i++) {
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(user.userList[i].username));
		ul.appendChild(li);
	}

}


window.onload = function() {
	initialize();

	connection.socket.on('drawing', function(msg) {
		drawBall(msg.x, msg.y, msg.size, msg.color);
	});

	connection.socket.on('joinDraw', function(msg) {
		console.log('received');
		drawBall(msg.x, msg.y, msg.size, msg.color);
			console.log(connection);
	});

	connection.socket.on('chatMessage', function(msg) {
		var ul = document.getElementById('chatlog');
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(msg));
		ul.appendChild(li);
		document.getElementById("chatMessage").value = "";
	});

	connection.socket.on('clearAll', function(msg) {
		canvasContext.clearRect(0,0, canvas.width, canvas.height);
		drawRectangle(0, 0, canvas.width, canvas.height, "#000");
	});

	connection.socket.on('midMessage', function(msg) {
		document.getElementById("midPartText").innerHTML = msg;
	});

	connection.socket.on('userJoin', function(msg) {
		console.log(msg);
		
		var u = {
			id: msg.id,
			username: msg.realUsername,
			canDraw: msg.canDraw,
			currentClient: msg.currentClient
		}
		for (var i=0; i < user.userList.length; i++) {
			if (user.userList[i].id == u.id) {
				console.log(user.userList[i].username + " is not added as it already exists.");
				return;
			}
		}
		user.userList.push(u);
		updatePlayersOnlineList();
	});

	connection.socket.on('userQuit', function(msg) {
		console.log('user ' + msg.id + ' has quit');
		var u = user.findElement('id', msg.id);
		var index = user.userList.indexOf(u);
		user.userList.splice(index, 1);
		updatePlayersOnlineList();
	});

	connection.socket.on('youAreThis', function(id) {
		var u = user.findElement('id', id);
		u.currentClient = true;
	});

	connection.socket.on('drawAccess', function(msg) {
		var u = user.findElement('id', msg.id);
		u.canDraw = msg.canDraw;
		console.log('Access to draw: ' + msg.canDraw);
	});

		connection.socket.on('drawAccessRevoke', function(msg) {
			for (var i=0; i < user.userList.length; i++) {
				user.userList[i].canDraw = false;
			}
		console.log('No one can draw.');
	});

	connection.socket.on('timeLeft', function(msg) {
		document.getElementById('timeLeft').innerHTML = msg;
	});

}