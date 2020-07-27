function User() {
	this.userList = [];

	this.findElement = function(propName, propValue) {
	for (var i=0; i < this.userList.length; i++) {
		if (this.userList[i][propName] == propValue) {
			return this.userList[i];
		}
	}

  // will return undefined if not found; you could return a default instead
	}
}