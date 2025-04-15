require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456aA@',
    database: process.env.DB_NAME || 'art_craft_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USER|| 'freedb_sharad',
    password: process.env.DB_PASSWORD || 'FrdGa%AKjtB6As5',
    database: process.env.DB_NAME || 'freedb_art_craft_db',
    host: process.env.DB_HOST || 'sql.freedb.tech',
    dialect: process.env.DB_DIALECT || 'mysql'
  }
};