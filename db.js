const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: "syndev14197",
  port: 8080,
});

module.exports = pool;
