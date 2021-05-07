const { Pool } = require("pg");

const db = new Pool({
  host: "0.0.0.0",
  user: "user",
  password: "admin",
  database: "shopinglist",
  port: 6661,
  // connectionString: "postgres://user:admin@db:5555/shopinglist?sslmode=disable",
});

db.connect();
//process.env.DB_HOST || "localhost" ||

module.exports = db;
