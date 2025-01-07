const sequelize = require('./utils/database');
const Rollercoaster = require('./models/rollercoaster');
const User = require('./models/user');
const Ranking = require('./models/ranking');

// sequelize.sync({force: true});

// User.sync({force: true});

// Rollercoaster.sync({force: true});

//Ranking.sync({force: true});

Rollercoaster.hasMany(Ranking);
Ranking.belongsTo(Rollercoaster);

User.hasMany(Ranking);
Ranking.belongsTo(User);

