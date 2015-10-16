
// Socket (ws)
var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({ port: 8081 });

// Battle
var Battle = require('./backend/battle.js'),
	battle = new Battle();

wss.on('connection', function connection(ws) {
	console.log('new client');
	ws.isopen = true;

	ws.on('message', function(msg) {
		// Battle Command
		if (msg != 'rock' && msg != 'paper' && msg != 'scissors')
			return;

		console.log('New Player: '+msg);

		battle.addClient(msg, ws);
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
