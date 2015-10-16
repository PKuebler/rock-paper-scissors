var next_battleid = 0;

function Battle() {
	this.waiting_clients = [];
}

Battle.prototype.addClient = function(command, text, callback) {
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
		callback({
			result: opponent,
			player: command,
			opponent: o.command,
			text: (opponent == 'win')?o.text:''
		});
		o.callback({
			result: player,
			player: o.command,
			opponent: command,
			text: (player == 'win')?text:''
		});
	} else {
		// Add Waiting List
		this.waiting_clients.push({
			command: command,
			callback: callback,
			text: text
		});
	}
};

module.exports = Battle;