var bull = require('bull');

module.exports = (function () {
	'use strict';

	function SGSMessagingServer () {
		this.queues = null;
	}

	SGSMessagingServer.prototype.init = function (config) {
		config = config || {};

		this.port = 6379;
		if('port' in config) {
			this.port = config.port;
		}

		this.host = '127.0.0.1';
		if('host' in config) {
			this.host = config.host;
		}

		this.queues = {};
	};

	SGSMessagingServer.prototype.publish = function (jobName, jobInput) {
		if (!(jobName in this.queues)) {
			this.queues[jobName] = bull(jobName, this.port, this.host);
		}

		this.queues[jobName].add(jobInput);
	};

	return new SGSMessagingServer();
})();
