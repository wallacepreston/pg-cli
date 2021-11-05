const config = require('../config');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const dialectOptions = env === 'production' 
  ? {
    ssl: {
      rejectUnauthorized: false
    }
  }
  : {};

let db;

if(config && config.db) {
  db = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    operatorsAliases: Sequelize.Op,
    query: {
      raw: true
    },
    pool: {
      max: 30,
      min: 0,
      idle: 10000
    },
    define: {
      timestamps: false,
      freezeTableName: true,
      schema: config.db.schema
    }
  });
} else {

  const {DATABASE_NAME = 'pg-cli'} = process.env;
  const {DATABASE_URL = `postgres://localhost:5432/${DATABASE_NAME}`} = process.env;
  db = new Sequelize(DATABASE_URL,
    {
      logging: false,
      dialectOptions
    }
  )
}

module.exports = db;
