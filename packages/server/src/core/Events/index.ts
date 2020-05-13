const EventEmitter2 = require('eventemitter2').EventEmitter2;
const Events = new EventEmitter2({
	wildcard: true,
	maxListeners: 20
});

export default Events;
