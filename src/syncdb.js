const sequelize = require('./utils/database');
const Rollercoaster = require('./models/rollercoaster');

sequelize.sync({force: true});
Rollercoaster.sync({force: true});
// sequelize.sync({alter: true});