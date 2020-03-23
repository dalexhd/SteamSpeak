const NodeCache = require('node-cache');
const config = require('../../config/cache');

const Cache = new NodeCache(config);

module.exports = Cache;
