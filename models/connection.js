const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT || 3306,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});

module.exports = connection;
