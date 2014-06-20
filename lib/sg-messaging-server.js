var kue = require('kue');

function sgMessagingServer (config) {
	var instance = this;

	config = config || {};

	this.port = 6379;
	if('port' in config) {
		this.port = config.port;
	}

	this.host = '127.0.0.1';
	if('host' in config) {
		this.host = config.host;
	}

	this.q = kue.createQueue({
		prefix: 'q',
		redis: {
			port: this.port,
			host: this.host,
			auth: config.password,
			options: config.options
		}
	});

	this.priorities = ['low', 'normal', 'medium', 'high', 'critical'];

	return (sgMessagingServer = function () {
		return instance;
	});
}

sgMessagingServer.prototype.publish = function (jobName, jobInput, options, callback) {
	if(arguments.length === 3) {
		callback = options;
		options = {};
	}

	var priority = 'normal';
	if(~this.priorities.indexOf(options.priority)) {
		priority = options.priority;
	}

	var attempts = 1;
	if(typeof options.attempts === 'number' && options.attempts > 1) {
		attempts = options.attempts;
	}

	var job = this.q.create(jobName, jobInput)
	.priority(priority)
	.attempts(attempts);

	if(typeof options.delay === 'number' && options.delay > 5) {
		job.delay(options.delay);
	}

	job
	.on('complete', callback.bind(null, null))
	.on('failed', callback.bind(null, true));

	if(typeof options.progressCallback === 'function') {
		job
		.on('progress', options.progressCallback);
	}
};

module.exports = sgMessagingServer;







