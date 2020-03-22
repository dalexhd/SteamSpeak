const { EventEmitter } = require('events');
const NodeCache = require('node-cache');
const config = require('../../config/cache');

class Cache extends EventEmitter {
  /**
   * Construct the Cache class.
   */
  constructor() {
    super();
    try {
      this.cache = new NodeCache(config);
    } catch (error) {
      this.emit('connection_error', error);
    }
  }
}

module.exports = Cache;
