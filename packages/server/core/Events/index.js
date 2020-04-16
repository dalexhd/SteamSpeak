var EventEmitter2 = require('eventemitter2').EventEmitter2;
var Events = new EventEmitter2({
	wildcard: true,
	maxListeners: 20
});

module.exports = Events;
