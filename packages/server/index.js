/**
 * Check if instance environment variable is set.
 * IF true => Only require TeamSpeak core module.
 */
if (process.env.INSTANCE) return require('./core/TeamSpeak');
/**
 * IF false => load above core modules.
 */
require('./core/TeamSpeak');
require('./core/Database');
require('./core/Steam');
require('./core/Website');
