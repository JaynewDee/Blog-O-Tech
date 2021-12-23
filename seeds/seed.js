const sequelize = require('../config/connection');
const { User } = require('../models');

const userSeed = require('./userSeed.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeed, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);

};

seedDatabase();