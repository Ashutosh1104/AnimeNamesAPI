const Pool = require('pg').Pool

var pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host : process.env.DB_HOST,
  port: 5432,
  database : 'animesql',
})

module.exports = pool;