const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Rollercoaster = sequelize.define('rollercoaster', {
	name: {
		type: Sequelize.DataTypes.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        primaryKey: true
	},
    park: {
        type: Sequelize.DataTypes.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        primaryKey: true
    },
    manufacturer: Sequelize.DataTypes.STRING,
    model: Sequelize.DataTypes.STRING,
    country: Sequelize.DataTypes.STRING,
    seating: Sequelize.DataTypes.STRING,
    type: Sequelize.DataTypes.STRING,
    height: Sequelize.DataTypes.INTEGER,
    speed: Sequelize.DataTypes.FLOAT,
    length: Sequelize.DataTypes.INTEGER,
    inversionCount: Sequelize.DataTypes.INTEGER,
    openingDate: Sequelize.DataTypes.DATEONLY,
    imgSrc: Sequelize.DataTypes.STRING
});

module.exports = Rollercoaster;