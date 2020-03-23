const mysql = require('mysql');
const log = require('../../utils/log.js');
const config = require('../../config/database.js');

/* !fix Problema al renombrar los nombres...
Parece que los nombres o algo no cuadrán con la cache que esta bien.
*/

const Database = mysql.createConnection({
  host: config.ip,
  user: config.user,
  password: config.password,
  database: config.database,
  debug: config.debug
});
Database.connect((err) => {
  if (err) {
    log.error(err.message, 'database');
    process.exit();
  }
  log.success('Connected to the database!', 'database');
  setInterval(() => {
    Database.query('SELECT 1');
    log.debug('Sent query to prevent disconnect ^^');
  }, 600000);
});

module.exports = Database;
