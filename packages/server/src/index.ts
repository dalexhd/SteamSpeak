import './core/TeamSpeak';

/**
 * Check if instance environment variable is set.
 * IF true => Return, so we dont load other core modules.
 */
if (!process.env.INSTANCE) {
	/**
	 * IF false => load above core modules.
	 */
	require('./core/Database');
	require('./core/Steam');
	require('./core/Website');
}
