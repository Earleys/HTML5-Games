var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var title = require('console-title');
var constants = require('./constants');

var data = [];
var users = [];

var uptime = 0;
var uptimeTimer;

/*app.get('/', function(req, res) {
	res.send('<p>Connected!</p>');
});*/

var latestPacket = null;
var totalEachSecond = 0;
var currentPlayer = null;
var serverStatus = "Waiting for players...";

var drawTimer = null;
var currentDrawer = null;
var currentDrawerSocket = null;
var timeLeft = constants.TIME_TO_DRAW;
var gameStarted = false;
var sentServerStatus = false;
var wordToGuess = "random";
var delay = new Date();
var currentDate = new Date();

var afterDelay = true;

io.on('connection', function(socket) {
	console.log('Client connected - Sending ' + data.length + ' packets to client.');

	//Send saved drawing (data array) to the latest user that connected, so their screen is up-to-date.
	for (var i=0; i<data.length; i++) {
		socket.emit('joinDraw', data[i]);
	}
	sendServerStatusToEveryone();

	var user = {
		id: socket.id,
		realUsername: Math.floor((Math.random() * 1000) + 1),
		canDraw: false,
		currentClient: false
	}
	users.push(user);
	for (var i=0; i < users.length; i++) {
		io.emit('userJoin', users[i]);
	}

	socket.emit('youAreThis', user.id);

	socket.on('disconnect', function() {
		console.log('Client disconnected');
		var user = findElement(users, 'id', socket.id);
		var index = users.indexOf(user);
		for (var i=0; i < users.length; i++) {
			if (users[i].id  === user.id) {
				users.splice(i, 1);
				break;
			}
		}
		io.sockets.emit('userQuit', user);
	});

	socket.on('drawing', function(msg) {
		//socket.broadcast.emit('drawingSent', msg);
		io.sockets.emit('drawing', msg);
		data.push(msg);
	});

	socket.on('chatMessage', function(msg) {
		var user = findElement(users, 'id', socket.id);
		if (msg.toLowerCase() == "/clearall") {
			sendClearCanvasToEveryone();
			data = [];
			console.log("Drawings have been cleared.");
		} else {
			sendChatMessageToEveryone(user.realUsername, msg);
		}
	})

});

function findElement(arr, propName, propValue) {
	for (var i=0; i < arr.length; i++)
		if (arr[i][propName] == propValue)
			return arr[i];

  // will return undefined if not found; you could return a default instead
}

function update() {
	if (users.length >= constants.MIN_PLAYERS_NEEDED && new Date() > delay) {
		gameStarted = true;
		if (afterDelay) {
			console.log("Changed timeout back to 1 second.");
			clearInterval(drawTimer);
			drawTimer = setInterval(update, 1000);
			// first take away draw access from everyone

			io.emit('drawAccessRevoke', currentDrawer);
			sendClearCanvasToEveryone();
		}

		if (currentDrawer === null || currentDrawer === undefined) {
			// if no one has drawn yet, give the first user access to draw
			currentDrawer = users[0];
		} 
		currentDrawer.canDraw = false;
		// once finished, pick the next user in the list
		var index = users.indexOf(currentDrawer);

		if ((index > users.length - 1) && timeLeft <= 0) {
			// if this user doesn't exist, first make sure it will pick the first in  the list again
			console.log('All players have finished drawing. Restarting at 0.');
			index = 0;
			if (users.length < constants.MIN_PLAYERS_NEEDED) {
				// after that, check again if there are enough players. If not, wait until there are
				gameStarted = false;
				console.log('Restarting aborted. Need ' + (constants.MIN_PLAYERS_NEEDED - users.length) + ' more player(s).');
				serverStatus = "Waiting for players...";
				if (!sentServerStatus) {
					sendServerStatusToEveryone();
					sentServerStatus = true;
				}
			}
		} else {
			timeLeft--;
			io.emit('timeLeft', timeLeft);
			if (timeLeft <= 0) {
				sentServerStatus = false;
				console.log(currentDrawer.id + " ran out of time.");
				currentDrawer.canDraw = false;
				currentDrawerSocket.emit('drawAccess', currentDrawer);
				currentDrawerSocket.emit('solution', 'random word');
				sendServerStatusToEveryone(currentDrawer.id + ' ran out of time! Word:' + wordToGuess);
				sendChatMessageToEveryone('SERVER', currentDrawer.realUsername + ' ran out of time! The word was: ' + wordToGuess + '.');
				sendChatMessageToEveryone('SERVER', 'The next user will be able to draw in ' + constants.DRAWING_DELAY + ' seconds. Get ready!');
				delay = new Date();
				delay.setSeconds(delay.getSeconds() + constants.DRAWING_DELAY);
				console.log("Waiting " + constants.DRAWING_DELAY + " seconds...");
				index += 1;
				currentDrawer = users[index];


				afterDelay = true;
				timeLeft = constants.TIME_TO_DRAW;
			}
			else if (afterDelay) {
				// only does this once for every new drawer
				currentDrawerSocket = io.sockets.connected[currentDrawer.id];
				console.log(currentDrawer.realUsername + ' can now draw.')
				currentDrawer.canDraw = true;
				currentDrawerSocket.emit('drawAccess', currentDrawer);
				currentDrawerSocket.emit('guessWord', wordToGuess);
				serverStatus = currentDrawer.realUsername + " is currently drawing";
				sentServerStatus = false;
				if (!sentServerStatus) {
					sendServerStatusToEveryone();
					sentServerStatus = true;
				}
				afterDelay = false;
			}
		}
	} else {
		serverStatus = "Waiting for players...";
	}

}

function sendServerStatusToEveryone() {
	io.emit('midMessage', serverStatus);
}

function sendServerStatusToDrawer(user) {
	io.broadcast.to(user.id).emit('midMessage', serverStatus);
}

function sendChatMessageToEveryone(username, message) {
	io.emit('chatMessage', username + ': ' + message);
	console.log(username + ': ' + message);
}

function sendClearCanvasToEveryone() {
	io.emit('clearAll', null);
}

http.listen(22555, function() {
	console.log('listening on *:22555');
	uptimeTimer = setInterval(updateTerminalTitle, 1000);
	drawTimer = setInterval(update, 1000);
});

function updateTerminalTitle(title)
{
	uptime++;

	if (uptime > 60 && uptime <= 3600) {
		process.title = "Drawing Game Server - Uptime: " + Math.round(uptime / 60) + " minutes - Connected players: " + users.length;
	} else if (uptime > 3600 && uptime <= 86400) {
		process.title = "Drawing Game Server - Uptime: " + Math.round(uptime / 3600) + " hours - Connected players: " + users.length;
	} else if (uptime > 86400) {
		process.title = "Drawing Game Server - Uptime: " + Math.round(uptime / 86400) + " days - Connected players: " + users.length;
	} else {
		process.title = "Drawing Game Server - Uptime: " + uptime + " seconds - Connected players: " + users.length;
	}

}