const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Ranking = sequelize.define('ranking', {
	name: {
		type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
	},
    park: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    id: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    rank: { 
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Ranking;