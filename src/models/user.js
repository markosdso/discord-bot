const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
	id: {
		type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.DataTypes.STRING,
    tag: Sequelize.DataTypes.STRING,
    description: Sequelize.DataTypes.STRING,
    homePark: Sequelize.DataTypes.STRING,
    favManufacturer: Sequelize.DataTypes.STRING
});

module.exports = User;