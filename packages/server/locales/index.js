const lang = require('../config/language');
const log = require('../utils/log.js');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, lang))) {
	log.error(`Language ${lang} doesn't exist.`);
	process.exit(1);
}

const error = require(`./${lang}/error`);
const message = require(`./${lang}/message`);
const steam = require(`./${lang}/steam`);

module.exports = {
	error,
	message,
	steam
};
