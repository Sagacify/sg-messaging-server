var SgMessagingClient = require('sg-messaging-client');
var sgMessagingClient = new SgMessagingClient();

console.log('[Client] Job - Created!');

function myJob (input, progressCallback, callback) {
	console.log('[Client] Job - Received!');
	console.log('[Client] Job - Arguments:');
	console.log(arguments);

	var counter = 0;
	var max = 10;

	setInterval(function () {
		if(counter === max) {
			var random = input.number;
			var result = random + 1;
			callback(null, result);
		}
		else {
			counter += 1;
			progressCallback(counter, max);
		}
	}, 1000);
}

sgMessagingClient().subscribe('myJob', myJob, {
	progress: true
});