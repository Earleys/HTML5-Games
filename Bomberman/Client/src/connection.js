function Connection() {
	this.ip = "94.225.141.237";
	this.port = 22555;
	this.socket = null; 

	this.connect = function() {
		this.socket = io.connect('http://' + this.ip + ':' + this.port);

	}

	this.sendDrawPacket = function(data) {
		this.socket.emit('drawing', data);
		//console.log('sending');
	}

	this.sendChatMessage = function(message) {
		this.socket.emit('chatMessage', message.value);
		console.log('sending ' + message.value);
	}

	this.sendUserJoinRequest = function() {
		this.socket.emit('userJoinRequest');
	}

}