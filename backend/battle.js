var next_battleid = 0;

function Battle() {
	this.waiting_clients = [];
}

Battle.prototype.addClient = function(command, socket) {
	// Search for Opponent
	
	if (this.waiting_clients.length > 0) {
		// Get first
		var o = this.waiting_clients.shift(); // opponent
		
		var opponent = 'lose';
		var player = 'lose';
		// Battle
		if (command == o.command) {
			opponent = 'tie';
			player = 'tie';
		} else if ((command == 'rock' && o.command == 'paper') ||
			(command == 'paper' && o.command == 'scissors') ||
			(command == 'scissors' && o.command == 'rock')) {
			// Opponent Win
			opponent = 'win';
		} else {
			// Player Win
			player = 'win';
		}

		// Send Results
		if (socket.isopen) {
			socket.send(JSON.stringify({
				result: opponent,
				player: command,
				opponent: o.command
			}));
		}
		if (o.socket.isopen) {
			o.socket.send(JSON.stringify({
				result: player,
				player: o.command,
				opponent: command
			}));
		}
	} else {
		// Add Waiting List
		this.waiting_clients.push({
			command: command,
			socket: socket
		});
	}
};

module.exports = Battle;