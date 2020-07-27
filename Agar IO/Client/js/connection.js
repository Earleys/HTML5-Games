function Connection() {
	this.ip = "94.225.141.237";
	this.port = 22555;
	this.socket = null; 
	this.timer;

	/*this.connect = function() {
		this.socket = io.connect('http://' + this.ip + ':' + this.port);


		this.socket.on('error', function() {
        // wait 5 seconds then try again
        if (!socket.socket.connected) {
        	this.timer = window.setInterval(function() { 
        		this.connect();
        		console.log('fail');

        	}, 5000);

        }
    });
}*/

this.connect = function() {
	this.socket = io.connect("http://"+this.ip+":"+this.port);

	this.socket.on('connect_error', function() {
        // wait 5 seconds then try again      
        this.timer = window.setInterval(function() {
        	//this.connect();
        	console.log('Connection failed - retrying in 5 seconds...');

        }, 5000);
    });

	this.socket.on('connect', function() {
        // we've connected so clear the timer
        window.clearInterval(timer);
    });
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