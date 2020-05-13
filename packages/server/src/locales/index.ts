import lang from '@config/language';
import log from '@utils/log';
import * as fs from 'fs';
import * as path from 'path';

if (!fs.existsSync(path.resolve(__dirname, lang))) {
	log.error(`Language ${lang} doesn't exist.`);
	process.exit(1);
}

const error = require(`./${lang}/error`).default;
const message = require(`./${lang}/message`).default;
const steam = require(`./${lang}/steam`).default;
export default { error, message, steam };
