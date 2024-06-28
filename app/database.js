import * as mysql from "promise-mysql";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.host,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password
});

const getConnection = async () => connection;

export { getConnection };
