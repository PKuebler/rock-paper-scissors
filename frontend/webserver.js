var express = require('express');

function Webserver() {
	this.server = null;

	this.app = express();
	this.app.use(express.static('public'));

}

Webserver.prototype.start = function(port) {
	this.server = this.app.listen(port, function() {
		console.log('Listening at ', port);
	});
};

module.exports = Webserver;