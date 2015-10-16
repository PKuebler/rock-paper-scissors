
// Socket (ws)
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({ port: 8081 });

// Battle
var Battle = require('./backend/battle.js'),
	battle = new Battle();

// Escape
var striptags = require('striptags');

wss.on('connection', function connection(ws) {
	console.log('new client');
	ws.isopen = true;

	ws.on('message', function(msg) {
		// Battle Command
		msg = JSON.parse(msg);
		var command = msg.command;
		var text = striptags(msg.text);

		if (command != 'rock' && command != 'paper' && command != 'scissors')
			return;

		console.log('New Knight: '+command);

		battle.addClient(command, text, function(result) {
			// Callback
			if (ws.isopen)
				ws.send(JSON.stringify(result));
		});
	});

	ws.on('close', function close() {
		console.log('disconnected');

		ws.isopen = false;
	});
});

// Website
var Web = require('./frontend/webserver.js'),
	web = new Web();

web.start(8080);
