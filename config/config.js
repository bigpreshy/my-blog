

require('dotenv').config(); // Load environment variables from .env

module.exports = {
  development: {
   
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT ,
    timezone: process.env.DB_TIMEZONE || "+01:00"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
    dialect: "mysql"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    timezone: process.env.DB_TIMEZONE || "+01:00"
  }
};


