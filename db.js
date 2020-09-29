const Pool = require("pg").Pool;

const pool = new Pool({
  user: "ojtdkgyxzkfmhy",
  password: "b47b901f25eccfc4c50053f0aa6c4b402e225e3e837ef73fd7d9808cc14f92d6",
  host: "ec2-23-23-36-227.compute-1.amazonaws.com",
  port: 5432,
  database: "d7rjh0vtg2dsnb",
  ssl: true,
  rejectUnhauthorized: false,
});

module.exports = pool;
