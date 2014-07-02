var SgMessagingServer = require('sg-messaging-server');
var sgMessagingServer = new SgMessagingServer();

var random = Math.floor((Math.random() * 10) + 1);

console.log('[Server] Job - Start!');
console.log('[Server] Job - Input:');
console.log({
	random: random
});

// sgMessagingServer().publish('myJob', {
// 	number: random
// }, {
// 	progressCallback: function (progress) {
// 		console.log('[Server] Progress - ' + progress + '%');
// 	}
// }, function () {

// 	console.log('[Server] Job - Done!');
// 	console.log('[Server] Job - Results:');
// 	console.log(arguments);

// });

sgMessagingServer().publish('hello', {
	num: random
}, {
	progressCallback: function (progress) {
		console.log('[Server] Progress - ' + progress + '%');
	}
}, function () {

	console.log('[Server] Job - Done!');
	console.log('[Server] Job - Results:');
	console.log(arguments);

});