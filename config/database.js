import mysql from "promise-mysql";
import config from "./config";

const connection = mysql.createConnection({
  host: config.host,
  database: "db_expenses",
  user: "root",
  password: config.password,
});

const getConnection = () => {
  console.log("DB Connected!");
  return connection;
};

module.exports = {
  getConnection,
};
