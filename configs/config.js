require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '123456aA@',
    database: process.env.DB_NAME || 'art_craft_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_jT06Wr4yDiC9mCPHzCQ',
    database: process.env.DB_NAME || 'defaultdb',
    host: process.env.DB_HOST || 'mysql-db1f6a2-sharadchandel2005-7c5b.f.aivencloud.com',
    port: process.env.DB_PORT || 22977,
    dialect: process.env.DB_DIALECT || 'mysql'
  }
};
