const Pool = require('pg').Pool

var pool = new Pool({
  user: 'postgres',
  password: 'lawliet2211',
  host : 'localhost',
  port: 5432,
  database : 'animesql',
})

module.exports = pool;