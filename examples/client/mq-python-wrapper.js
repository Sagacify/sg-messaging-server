var SgMessagingClient = require('sg-messaging-client');
var sgMessagingClient = new SgMessagingClient();

var zerorpc = require('zerorpc');

var client = new zerorpc.Client({
	timeout: 1 * 60 * 5
});
client.connect('tcp://127.0.0.1:4242');

client.invoke('COMMAND_LIST', {}, function (e, res, streaming) {
	if(e) {
		return console.log(e);
	}

	function commandWrapper (commands, command) {
		return function (input, progressCallback, callback) {
			client.invoke(command, input, callback);
		};
	}

	var commands = {};
	var parameters;
	for(var command in res) {
		parameters = res[command];

		sgMessagingClient().subscribe(command, commandWrapper(commands, command), parameters);
	}

	var server = new zerorpc.Server(commands);
	server.bind('tcp://127.0.0.1:4241');

	server.on('error', function (e) {
		console.log(e);
	});

});