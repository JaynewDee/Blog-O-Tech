const Sequelize = require('sequelize');
require('dotenv').config();
let sequelize;

// Begin authenticated sequelize database session through heroku Vars Config
// If heroku is not available, create database session served locally with credentials secured through environmental variables
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

// Ensure that connection is OK using built-in sequelize method "authenticate()"
(async function auth() {
  try {
    await sequelize.authenticate();
    console.log('Database API connection successfully established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}())

module.exports = sequelize;